import express from 'express';
import {getFoodItems, getFoodItemsByType, getFoodItemsByRangeType} from '../controllers/food_item_controller.js';


const foodRouter = express.Router();

foodRouter.get('/get-all-foods', getFoodItems); // parameter estab is required, optional parameter isSorted (true/false) for sorting by price
// example: http://localhost:3001/foods/get-all-foods?estab=2&isSorted=true, http://localhost:3001/foods/get-all-foods?estab=2
foodRouter.get('/get-all-foods-by-type', getFoodItemsByType); // parameters estab and type are required
// example: http://localhost:3001/foods/get-all-foods-by-type?estab=2&type=Meat
foodRouter.get('/get-foods-with-range-type', getFoodItemsByRangeType); // you may use upper and lower parameters only, or type only, or combination of both
// example: http://localhost:3001/foods/get-foods-with-range-type?lower=0&upper=500,
// http://localhost:3001/foods/get-foods-with-range-type?type=Meat
// http://localhost:3001/foods/get-foods-with-range-type?type=Meat&lower=1&upper=500



export {foodRouter};
