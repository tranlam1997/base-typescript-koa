import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import config from '../config';

//https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
const sequelize = new Sequelize({
    database: config.db.database,
    username: config.db.username,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect as Dialect,
    timezone: config.db.timezone, // timezone when saving to database
    pool: {
        max: 10, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 80000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
    },
    models: [__dirname + './../models'], 
    logging: config.db.logging, // log query to console
} as SequelizeOptions);

export const SequelizeInstance = sequelize; // export SequenlizeInstance
export default async (): Promise<void> => {
    // { alter: true } This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
    await SequelizeInstance.sync({ alter: true, force: true });
};
