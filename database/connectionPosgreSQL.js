import pg from 'pg';

export const pool = new pg.Pool({
    host: "localhost", // Cambia esto por tu host de PostgreSQL
    database: "App_db", 
    password: "",      
    port: 5432, // Puerto por defecto de PostgreSQL
    user: "postgres",

    });


export default pool;

