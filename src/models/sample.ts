import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ISampleModel } from '../interfaces/sample';

// Refer to following doc to define models
// https://www.npmjs.com/package/sequelize-typescript#model-definition

@Table({
    underscored: true, // Use snake_case for column names
    timestamps: true, // Add createdAt and updatedAt columns
    freezeTableName: false, // Use model name as table name
})

export default class sample extends Model<ISampleModel> {
    // A primary key (id) will be inherited from base class Model.
    // This primary key is by default an INTEGER and has autoIncrement=true
    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;
}