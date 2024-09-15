import express from 'express';
import {getEstablishments, getExcellentEstablishments} from '../controllers/food_establishment_controller.js';


const establishmentRouter = express.Router();

establishmentRouter.get('/get-all-estabs', getEstablishments); // use as is
establishmentRouter.get('/get-excellent-estabs', getExcellentEstablishments); // use as is

export {establishmentRouter};
