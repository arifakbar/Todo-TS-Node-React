import { Router } from 'express';

import { Todo } from '../models/todo';

const router = Router();

let todos: Todo[] = [];
type requestBody = { text: string };
type requestParam = { todoId: string };

router.get('/todos', (req, res, next) => {
        res.status(200).json({ message: "Fetched successfully!", todos: todos });
});

router.post('/todos', (req, res, next) => {
        const body = req.body as requestBody;
        const newTodo: Todo = {
                id: new Date().toISOString(),
                text: body.text
        }
        todos.push(newTodo);
        res.status(201).json({ message: "Created successfully!", todo: newTodo, todos: todos })
});

router.put('/todos/:todoId', (req, res, next) => {
        const params = req.params as requestParam;
        const body = req.body as requestBody;
        const tid = params.todoId;
        const todoIndex = todos.findIndex(todo => todo.id === tid);
        if (todoIndex >= 0) {
                todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
                return res.status(201).json({ message: "Updated successfully!", todos: todos })
        }
        res.status(404).json({ message: "Id not found" });
});

router.delete("/todos/:todoId", (req, res, next) => {
        const params = req.params as requestParam;
        const tid = params.todoId;
        todos = todos.filter(todo => todo.id !== tid);
        res.status(200).json({ message: "Deleted successfully!", todos: todos });
})

export default router;