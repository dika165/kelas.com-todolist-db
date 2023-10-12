import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: "mauFJcuf5dhRMQrjj",
    database: "batch_13",
    port: 3307
});

export default dbPool