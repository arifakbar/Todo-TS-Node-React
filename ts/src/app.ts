import express from 'express';
// import bodyParser from 'body-parser';

import todoRouter from './routes/todo';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
                "Access-Control-Allow-Methods",
                "OPTIONS, GET, POST, PUT, PATCH, DELETE"
        );
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        next();
})

app.use(todoRouter);

app.listen(8000);