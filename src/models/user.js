
import {Sequelize, DataTypes, UUIDV4} from 'sequelize';
import {databaseConnection} from '../config/database.js'

export const User = databaseConnection.define('User', {
    id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
  },{createdAt:true, updatedAt:false});
