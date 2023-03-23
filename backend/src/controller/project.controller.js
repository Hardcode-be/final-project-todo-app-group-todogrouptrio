import * as ProjectModel from "../model/project.model.js";

// Controller Funktion fuer GET /todos
export async function getAllProjects(req, res) {
    // Rufe Model-Funktion auf und speichere Ergebnis
    let project = await ProjectModel.getAll();

    res.send(project);
}


// Controller Funktion fuer POST /todos
export async function addNewProject(req, res) {
    // Extrahiere body aus Request Objekt
    let body = req.body;

    // Rufe Model-Funktion auf und speichere Ergebnis
    let result = await ProjectModel.insertProject(body);

    if (result.status === 409) {
        res.status(409).send(result);
        return;
    }

    // Sende Ergebnis zurueck
    res.send(result);
}


// Controller Funktion fuer PUT /todos/:id
export async function updateProjectById(req, res) {
    // Extrahiere ID aus URL Parametern
    let id = req.params.id;
    // Extrahiere Body
    let body = req.body;

    // Fuehre Model-Funktion aus und speichere Ergebnis
    let result = await ProjectModel.update(id, body);

    // Wenn Ergebnis leer ist error code 404
    if (result === null) {
        res.status(404).send({
            error: `Todo with ID ${id} not found`
        });
        return;
    }

    // Sende Updateergbnis zurueck
    res.send(result);
}


// Controller Funktion fuer DELETE /todos/:id
export async function deleteProjectById(req, res) {
    // Extrahiere ID aus URL Parametern
    let id = req.params.id;

    // Fuehre Model-Funktion aus und speichere Ergebnis
    let result = await ProjectModel.remove(id);

    // Wenn Ergebnis leer, 404
    if (result === null) {
        res.status(404).send({
            error: `Todo with ID ${id} not found`
        });
        return;
    }

}

