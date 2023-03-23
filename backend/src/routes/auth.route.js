import { Router } from "express";
import { registerNewUser, login} from "../controller/user.controller.js";

// Erstelle neue Router Instanz
const authRouter = Router();

// Routen Definition fuer /register
authRouter.route('/register')
    .post(registerNewUser);

// Routen Definition fuer /login
authRouter.route('/login')
    .post(login);


// Routen Definition fuer todos
authRouter.route('/todos')
    .get(getAllTodos)
    .post(addNewTodo)

// Routen Definition fuer todos mit bestimmter ID
authRouter.route('/todos/:id')
    .put(updateTodoById)
    .delete(deleteTodoById)


export default authRouter;