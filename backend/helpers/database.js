import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config({path: '.env_local'});

const db = mariadb.createPool(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5
    }
);

db.getConnection((err, connection) => {
    if(err){
        console.log("Error Connecting to Database.");
    }
    if(connection){
        connection.release();
        console.log("Successfully connected to database.")
    } return
})

export {db};