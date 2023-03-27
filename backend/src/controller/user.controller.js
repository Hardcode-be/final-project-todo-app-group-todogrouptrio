import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import * as UserModel from "../model/user.model.js";


// Controller Funktion zum Anlegen neuer User
export async function registerNewUser(req, res) {
    let body = req.body;

    // Ueberschreibe password-Property im body mit dem Hash des Passworts
    body.password = bcrypt.hashSync(body.password, 10);

    try {
        // Fuehre Model-Funktion zum Einfuegen eines neuen Users aus
        const user = await UserModel.insertNewUser(body);

        // Erstelle neuen JWT Token mit payload und Verfall nach einer Stunde (60 Minuten * 60 Sekunden)
        let token = jwt.sign({ userId: user._id, username: user.username}, process.env.JWT_SECRET);

        // Sende Erfolgsmeldung zurueck
        res.send({
            success: true,
            id: user._id,
            username: user.username,
            projects: user.projectList.length,
            token: token
        });

    } catch (error) {
        console.log(error);
        // TODO verfeinern, weil es unterschiedliche Fehler geben kann: 400 & 409
        res.status(error.code).send({
            success: false,
            message: error.message
        });
    }
}

// Controller Funktion zum Einloggen bestehender User
export async function login(req, res) {
    // extrahiere Properties aus dem body
    let { username, password } = req.body;

    // Hole entsprechenden User per username aus der DB
    let user = await UserModel.findUserByUsername(username);

    // Wenn user nicht gefunden wurde
    if (user === null) {
        // Sende 401 (UNAUTHORIZED) mit Nachricht
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
        // early return
        return;
    }

    // Vergleiche uebermitteltes password mit dem gehashten password aus der DB
    if (bcrypt.compareSync(password, user.password)) {

        // Erstelle neuen JWT Token mit payload und Verfall nach einer Stunde (60 Minuten * 60 Sekunden)
        let token = jwt.sign({ userId: user._id, username: user.username}, process.env.JWT_SECRET);

        // Token als httpOnly cookie
        // res.cookie('access_token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true })

        // Sende Erfolgsnachricht sowie neuen Token zurueck
        res.send({
            success: true,
            id: user._id,
            username: user.username,
            projects: user.projectList.length,
            token: token
        });

    } else {
        // Passwort falsch -> Sende Fehlermeldung zurueck
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
    }
}


export async function getAllUsers(req, res) {
    res.send(await UserModel.getAll());
}

export async function getUserProjects(req, res) {
    const userId = req.tokenPayload.userId;

    try {

        let response = await UserModel.getUserProjects(userId);
        let projects = [...response[0].projectList];
        // Prüfe wieviele todos completed: false sind
        projects = projects.map(obj => {
            let incompleteCount = obj.todos.filter(todo => !todo.completed).length;
            obj._doc.incompleteCount = incompleteCount
            return obj
        });

        res.send(projects)
        
    } catch (error) {
        console.log(error);
    }

}

export async function getStatus(req, res) {
    const userId = req.tokenPayload.userId;

    try {
        let user = await UserModel.findUserById(userId);
        
        res.send({
            success: true,
            id: user._id,
            username: user.username,
            projects: user.projectList.length,
            // token: req.tokenPayload
        });
        
    } catch (error) {
        console.log(error);
    }
}

export async function findUsersByQuery(req, res) {
    let query = req.query.q

    if(query === '') {
        return {data: []}
    }

    try {
        let response = await UserModel.findUsersByQuery(query);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function askUserToByConnected(req, res) {
    const askingUser = req.tokenPayload.userId;
    let userId = req.params.id

    try {
        let response = await UserModel.askUserToByConnected(askingUser, userId);
        res.send(response);
    } catch (error) {
        console.log(error);
    }

}

export async function connectionData(req, res) {
    const userId= req.tokenPayload.userId;

    try {
        let response = await UserModel.connectionData(userId);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function acceptUserInvitation(req, res) {
    const currentUser= req.tokenPayload.userId;
    let invitationSender = req.params.id


    try {
        let response = await UserModel.acceptUserInvitation(currentUser, invitationSender);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function declineUserInvitation(req, res) {
    const currentUser= req.tokenPayload.userId;
    let invitationSender = req.params.id


    try {
        let response = await UserModel.declineUserInvitation(currentUser, invitationSender);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export async function getFriends(req, res) {
    const currentUser= req.tokenPayload.userId;

    try {
        let response = await UserModel.getFriends(currentUser);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}