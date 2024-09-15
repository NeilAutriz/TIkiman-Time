import express from "express";
import dotenv from "dotenv";
import {establishmentRouter} from './routes/food_establishment_router.js';
import {reviewRouter} from './routes/food_review_router.js';
import {foodRouter} from './routes/food_item_router.js';

dotenv.config({path: '.env_local'});

const PORT = process.env.PORT_NUMBER;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/establishments', establishmentRouter);
app.use('/reviews', reviewRouter);
app.use('/foods', foodRouter);

app.listen(PORT, () => { 
        console.log(`Server listening at port ${PORT}`)
    }
);