import mongoose from "mongoose";

// Definiere Todo Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projectList: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } ],
    friendsList: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    incomingReq: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    outgoingReq: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

// DB-Funktion zum Abrufen eines bestimmten User-Eintrags per username
export async function findUserByUsername(username) {
    return await User.findOne({username: username});
}

export async function findUserById(userId) {
    return await User.findOne({_id:userId});
}

// DB-Funktion zum Erstellen eines neuen User-Eintrags
export async function insertNewUser(userBody) {
    try {
        // Erstelle neue Instanz des User Models
        const newUser = new User(userBody);

        // Speichere neue Instanz
        return await newUser.save();

    } catch (error) {
        console.log("🚀 ~ file: user.model.js:28 ~ insertNewUser ~ error:", error)
        // Pruefe, ob Conflict durch Dupletten-Verletzung
        if ( (error.hasOwnProperty('code')) && (error.code === 11000) ) {
            // Schmeisse entsprechendes Fehlerobjekt
            throw {
                code: 409,
                message: error.message
            };

        } else {
            // Muss ein Validierungsproblem sein
            // sende entsprechendes Fehlerobjekt
            throw {
                code: 400,
                message: error.message
            };
        }
    }
}

// DB-Funktion zum Abrufen aller User-Eintraege
export async function getAll() {
    return await User.find();
}

export async function getUserProjects(userId){
    return await User.find({_id:userId},{projectList:1}).populate('projectList')
}

export async function connectProjectToUser(userId, projectId) {
    let user = await findUserById(userId);
    user.projectList.push(projectId);
    return await user.save();
}

export async function findUsersByQuery(query){
    
    const target = { username: { $regex: query, $options: 'i' } };
    const sort = { username: 1 };

    return await User.find(target).sort(sort)
}

export async function askUserToByConnected(askingUser, userId) {

    let user = await findUserById(userId);
    user.incomingReq.push(askingUser);
    await user.save();

    let requester = await findUserById(askingUser);
    requester.outgoingReq.push(user);
    await requester.save();
    
    return {success: true}
}

export async function connectionData(userId) {
    return await User.findById(userId)
    .select(['friendsList', 'incomingReq', 'outgoingReq'])
    .populate(['friendsList', 'incomingReq', 'outgoingReq'])
}