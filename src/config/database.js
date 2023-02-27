import { Sequelize } from "sequelize";

const host = 'localhost';
const database = 'user_info';
const userName = 'root';
const password = 'Vishal1980!' ;
const dialect = 'mysql'
export const databaseConnection = new Sequelize( 
    database, userName, password, { host :host, dialect: dialect }
);