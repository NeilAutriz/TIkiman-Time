import {db} from '../helpers/database.js';

const getFoodItems = async function(req,res){
    if(!req.query.estab){
        res.status(400).send("Invalid query")
        return
    }
    const estabID = req.query.estab
    try {
        var sqlQuery = 'SELECT * FROM food_item WHERE estab_id = ?';
        if(req.query.isSorted){
            sqlQuery = req.query.isSorted === 'true' ? `${sqlQuery} ORDER BY price` : sqlQuery;
        }
        const rows = await db.query(sqlQuery, estabID);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const getFoodItemsByType = async function(req,res){
    if(!req.query.estab || !req.query.type){
        res.status(400).send("Invalid query")
        return
    }
    const estabID = req.query.estab;
    const type = req.query.type;
    try {
        const sqlQuery = 'SELECT * FROM food_item i NATURAL JOIN food_type t WHERE estab_id = ? AND t.food_type = ?';
        const rows = await db.query(sqlQuery, [estabID, type]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const getFoodItemsByRangeType = async function(req,res){
    if((!req.query.lower || !req.query.upper) && !req.query.type){
        res.status(400).send("Invalid query")
        return
    }
    const lower = req.query.lower;
    const upper = req.query.upper;
    if (lower >= upper){
        res.status(400).send("Invalid query")
        return
    }
    const type = req.query.type;
    try {
        var sqlQuery = `SELECT fi.item_id, fi.food_name, fi.price, fi.food_desc, ft.food_type
        FROM food_item fi
        JOIN food_type ft ON (fi.item_id = ft.item_id) WHERE`;
        sqlQuery = lower < upper ? `${sqlQuery} fi.price BETWEEN ${lower} AND ${upper}` : sqlQuery;
        sqlQuery = (lower < upper) && type ? `${sqlQuery} AND` : sqlQuery;
        sqlQuery = type ? `${sqlQuery} ft.food_type = "${type}"` : sqlQuery;
        const rows = await db.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

export {getFoodItems, getFoodItemsByType, getFoodItemsByRangeType};