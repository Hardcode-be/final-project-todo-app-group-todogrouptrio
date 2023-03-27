import { Router } from "express";
import jwt from 'jsonwebtoken';
import { addNewProject, updateProjectById, addTodoToProjectById,  getAllProjects, deleteProjectById, deleteTodoByProjectAndId, editTodoById, changeTodoState, getProjectParticipants, addUserToProject } from "../controller/project.controller.js";
import { getUserProjects, getStatus, findUsersByQuery, askUserToByConnected, connectionData, acceptUserInvitation, declineUserInvitation, getFriends } from "../controller/user.controller.js";


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

        // Fahre mit Anfrage fort
        next();
    });
}

// Erstelle neue Router Instanz
const protectedRouter = Router();

// Setze Tokenverifizierungs-Middleware fuer alle Endpoints des Routers
protectedRouter.use(verifyToken);

protectedRouter.route('/status')
    .get(getStatus)

protectedRouter.route('/users')
    .get(findUsersByQuery)

// Routen Definition fuer todos
protectedRouter.route('/projects')
    .get(getAllProjects)
    .post(addNewProject)

// Routen Definition fuer todos
protectedRouter.route('/user/projects')
    .get(getUserProjects)

protectedRouter.route('/projects/:projectId/todo/:todoId')
    .delete(deleteTodoByProjectAndId)
    .put(editTodoById)
    .patch(changeTodoState)

// Routen Definition fuer todos mit bestimmter ID
protectedRouter.route('/projects/:id')
    .put(addTodoToProjectById)
    .patch(updateProjectById)
    .delete(deleteProjectById)

protectedRouter.route('/invite/:id')
    .get(askUserToByConnected)

protectedRouter.route('/accept/:id')
    .get(acceptUserInvitation)

protectedRouter.route('/decline/:id')
    .get(declineUserInvitation)

protectedRouter.route('/connect')
    .get(connectionData)

protectedRouter.route('/friends')
    .get(getFriends)

protectedRouter.route('/participants/:id')
    .get(getProjectParticipants)

    // /projects/${id}/invite/${friendId}
protectedRouter.route('/projects/:projectId/invite/:userId')
    .get(addUserToProject)

// Routen Definition fuer root
protectedRouter.route('/')
    .get((req, res) => {
        res.send({data: 'Some confidential data...'})
    });

export default protectedRouter;