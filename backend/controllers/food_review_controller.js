import {db} from '../helpers/database.js';

const getFoodReview = async function(req,res){
    var queryID;
    var sqlQuery;
    if(!req.query.estab) {
        if(!req.query.item){
            res.status(400).send("Invalid query")
            return
        } else{
            queryID = req.query.item
            sqlQuery = 'SELECT * FROM food_review WHERE item_id = ?';
        }
    } else{
        queryID = req.query.estab;
        sqlQuery = 'SELECT * FROM food_review WHERE estab_id = ?';
    }
    try {
        const rows = await db.query(sqlQuery, queryID);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const getFoodReviewThisMonth = async function(req,res){
    var queryID;
    var sqlQuery;
    if(!req.query.estab) {
        if(!req.query.item){
            res.status(400).send("Invalid query")
            return
        } else{
            queryID = req.query.item
            sqlQuery = 'SELECT * FROM food_review WHERE review_date BETWEEN(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND NOW() AND item_id = ?';
        }
    } else{
        queryID = req.query.estab;
        sqlQuery = 'SELECT * FROM food_review WHERE review_date BETWEEN(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND NOW() AND estab_id = ?';
    }
    try {
        const rows = await db.query(sqlQuery, queryID);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

export {getFoodReview, getFoodReviewThisMonth};