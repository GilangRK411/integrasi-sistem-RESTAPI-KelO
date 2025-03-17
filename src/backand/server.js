import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import ApiRouter from './api/api.router.js'; 
import UserAuth from './routers/user.auth.route.js';
import FoodRouter from './routers/food.router.js';

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

app.use(express.json());

app.use('/api', ApiRouter);  
app.use('/auth', UserAuth);  
app.use('/food', FoodRouter);

const PORT = 5050;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
