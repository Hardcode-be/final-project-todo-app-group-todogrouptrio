import { Router } from "express";
import jwt from 'jsonwebtoken';
import { addNewProject, updateProjectById, getAllProjects, deleteProjectById } from "../controller/project.controller.js";

// Middleware-Funktion zum Validieren von Tokens im Header
function verifyToken(req, res, next) {
    // Wenn Authorization im Header nicht gesetzt, breche ab und sende Fehler
    if (!req.headers.authorization) return res.status(401).send({success: false, message: 'Token missing'});
    // if (!req.cookies.access_token) return res.status(401).send({success: false, message: 'Token missing'});

    // Extrahiere Token aus dem authorization Feld im HTTP Request Header
    let token = req.headers.authorization.split(' ')[1];
    // let token = req.cookies.access_token.split(' ')[1];

    // Verifiziere extrahierten Token mittels Signaturpruefung
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        // Wenn Verifizierung fehlgeschlagen, brich ab und sende Fehler
        if (err) return res.status(401).send({success: false, message: 'Invalid token'});

        // Alles gut, speichere payload im req-Objekt
        req.tokenPayload = payload;
        console.log("🚀 ~ file: protected.route.js:22 ~ jwt.verify ~ payload:", payload)

        // Fahre mit Anfrage fort
        next();
    });
}

// Erstelle neue Router Instanz
const protectedRouter = Router();

// Setze Tokenverifizierungs-Middleware fuer alle Endpoints des Routers
protectedRouter.use(verifyToken);

// Routen Definition fuer todos
protectedRouter.route('/projects')
    .get(getAllProjects)
    .post(addNewProject)

// Routen Definition fuer todos mit bestimmter ID
protectedRouter.route('/projects/:id')
    .put(updateProjectById)
    .delete(deleteProjectById)

//-------------------------------------------------------

// Routen Definition fuer todos
// protectedRouter.route('/todos')
//     .get(getAllTodos);
//     .post(addNewTodo);

// Routen Definition fuer todos mit bestimmter ID
// protectedRouter.route('/todos/:id')
//     .put(updateTodoById);
//     .delete(deleteTodoById);



// Routen Definition fuer root
protectedRouter.route('/')
    .get((req, res) => {
        res.send({data: 'Some confidential data...'})
    });

export default protectedRouter;