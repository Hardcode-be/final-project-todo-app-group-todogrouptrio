import mongoose from "mongoose";

const todoSubSchema = mongoose.Schema({
    // _id: false,
    text: {type: String, required: true},
    completed: {type: Boolean, required: true}
}, {timestamps: true})

// Definiere Todo Schema
const projectSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    todos: [{type: todoSubSchema}]
}, {timestamps: true});


const Project = mongoose.model('Project', projectSchema);

export async function getAll() {
    return await Project.find();
}

// Datenbank Zugriffsfunktion fuer das Erstellen und Speichern eines neuen Todo  Eintrags per ID
export async function insertProject(body) {
    // Erstelle neue Instanz des Todo Models mit entsprechenden Daten
    let project = new Project({
        title: body.title,
        description: body.description
    });

    // Versuche zu Speichern und den Eintrag zurueckzuliefern
    try {
        return await project.save();

    } catch (error) { // Fange moegliche Fehler 
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return {
                status: 409,
                error: 'Conflict',
                msg: `Conflict: A Todo entity with todoText '${body.projectText}' already exists.`
            }
        }
        return {
            error: error.name,
            msg: error.message
        };
    }
}

// Datenbank Zugriffsfunktion fuer das Erstellen und Speichern eines neuen Todo  Eintrags per ID
export async function insertTodo(body) {
    // Erstelle neue Instanz des Todo Models mit entsprechenden Daten
    let project = new Project({
        title: body.title,
        description: body.description
    });

    // Versuche zu Speichern und den Eintrag zurueckzuliefern
    try {
        return await project.save();

    } catch (error) { // Fange moegliche Fehler 
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return {
                status: 409,
                error: 'Conflict',
                msg: `Conflict: A Todo entity with todoText '${body.projectText}' already exists.`
            }
        }
        return {
            error: error.name,
            msg: error.message
        };
    }
}