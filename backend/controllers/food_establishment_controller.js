import {db} from '../helpers/database.js';

const getEstablishments = async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM food_establishment';
        const rows = await db.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const getExcellentEstablishments = async function(req,res){
    try {
        const sqlQuery = `SELECT fe.estab_id, fe.estab_name, AVG(fr.rating) AS avg_rating FROM food_establishment fe JOIN food_review fr ON fe.estab_id = fr.estab_id
        GROUP BY fe.estab_id
        HAVING AVG(fr.rating) >= 4
        ORDER BY avg_rating DESC`;
        const rows = await db.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

export {getEstablishments, getExcellentEstablishments};