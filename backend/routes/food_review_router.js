import express from 'express';
import {getFoodReview, getFoodReviewThisMonth} from '../controllers/food_review_controller.js';


const reviewRouter = express.Router();

reviewRouter.get('/get-all-food-review', getFoodReview); // use either one of the parameters estab or item
reviewRouter.get('/get-review-by-month', getFoodReviewThisMonth); // use either one of the parameters estab or item

export {reviewRouter};
