import * as ProjectModel from "../model/project.model.js";

// Controller Funktion fuer GET /todos
export async function getAllProjects(req, res) {
    // Rufe Model-Funktion auf und speichere Ergebnis
    let project = await ProjectModel.getAll();

    res.send(project);
}


// Controller Funktion fuer POST /todos
export async function addNewProject(req, res) {
    const userId = req.tokenPayload.userId;
    let body = req.body;

    // Rufe Model-Funktion auf und speichere Ergebnis
    let result = await ProjectModel.insertProject(body, userId);

    if (result.status === 409) {
        res.status(409).send(result);
        return;
    }

    // Sende Ergebnis zurueck
    res.send(result);
}


// Controller Funktion fuer PUT /todos/:id
export async function addTodoToProjectById(req, res) {
    // Extrahiere ID aus URL Parametern
    let id = req.params.id;
    // Extrahiere Body
    let body = req.body;

    try {
        let response = await ProjectModel.addTodoToProjectById(id, body);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function updateProjectById(req, res) {
    // Extrahiere ID aus URL Parametern
    let id = req.params.id;
    // Extrahiere Body
    let body = req.body;

    try {
        let response = await ProjectModel.updateProjectById(id, body);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}


// Controller Funktion fuer DELETE /todos/:id
export async function deleteProjectById(req, res) {
    // Extrahiere ID aus URL Parametern
    let id = req.params.id;

    // Fuehre Model-Funktion aus und speichere Ergebnis
    let result = await ProjectModel.removeProject(id);

    // Wenn Ergebnis leer, 404
    if (result === null) {
        res.status(404).send({
            error: `Todo with ID ${id} not found`
        });
        return;
    } else {
        res.status(200).send({deleted : {success: true}})
    }
}

export async function deleteTodoByProjectAndId(req, res) {
    let todoId = req.params.todoId;
    let projectId = req.params.projectId

    try {
        let response = await ProjectModel.deleteTodoById(projectId, todoId);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function editTodoById(req, res) {

    let todoId = req.params.todoId;
    let projectId = req.params.projectId;
    let newTodoText = req.body;

    try {
        let response = await ProjectModel.editTodoById(projectId, todoId, newTodoText);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
    
}



export async function changeTodoState(req, res) {
    let todoId = req.params.todoId;
    let projectId = req.params.projectId;
    let state = req.body;

    try {
        let response = await ProjectModel.changeState(projectId, todoId, state);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function getProjectParticipants(req, res) {
    let projectId = req.params.id

    try {
        let response = await ProjectModel.getProjectParticipants(projectId);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}


export async function addUserToProject(req, res) {
    let projectId = req.params.projectId
    let userId = req.params.userId

    try {
        let response = await ProjectModel.addUserToProject(projectId, userId);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}
