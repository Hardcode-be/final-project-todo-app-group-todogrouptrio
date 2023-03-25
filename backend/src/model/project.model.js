import mongoose from "mongoose";
import { connectProjectToUser } from "./user.model.js";

const todoSubSchema = mongoose.Schema({
    // _id: false,
    text: {type: String, required: true, unique: true},
    completed: {type: Boolean, required: true}
}, {timestamps: true})

// Definiere Todo Schema
const projectSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    todos: [{type: todoSubSchema}],
    userList: [{type: mongoose.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});


const Project = mongoose.model('Project', projectSchema);

export async function getAll() {
    return await Project.find();
}

// Datenbank Zugriffsfunktion fuer das Erstellen und Speichern eines neuen Todo  Eintrags per ID
export async function insertProject(body, userId) {
    // Erstelle neue Instanz des Todo Models mit entsprechenden Daten
    let project = new Project({
        title: body.title,
        description: body.description,
        userList: [userId]
    });

    // Versuche zu Speichern und den Eintrag zurueckzuliefern
    try {
        await connectProjectToUser(userId, project._id)
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

export async function updateProjectById(projectId, newTodo){
    return await Project.findOneAndUpdate(
        { _id: projectId }, // Filtern nach der ID des Projekts
        { $push: { todos: newTodo } }, // Verwenden Sie den $push-Operator, um das neue Todo zur Liste von Todos hinzuzufügen
        { new: true } 
      );

}

export async function deleteTodoById(projectId, todoId) {
    return await Project.findOneAndUpdate(
        { _id: projectId }, // Filtern nach der ID des Projekts
        { $pull: { todos: { _id: todoId } } },  // Verwenden Sie den $pull-Operator, um das Todo-Objekt aus der Liste von Todos zu entfernen
        { new: true } 
      );
}

export async function editTodoById(projectId, todoId, newTodoText) {
    return await Project.findOneAndUpdate(
        { _id: projectId, "todos._id": todoId }, // Filtern nach der ID des Projekts
        { $set: { "todos.$.text": newTodoText } },  // Verwenden Sie den $pull-Operator, um das Todo-Objekt aus der Liste von Todos zu entfernen
        { new: true } 
      );
}

export async function changeState(projectId, todoId, state) {
    
    return await Project.findOneAndUpdate(
        { _id: projectId, "todos._id": todoId }, // Filtern nach der ID des Projekts
        { $set: { "todos.$.completed": state.completed } },  // Verwenden Sie den $pull-Operator, um das Todo-Objekt aus der Liste von Todos zu entfernen
        { new: true } 
      );
}

export async function removeProject(id) {
    return await Project.deleteOne({_id: id})
}

