import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import {db, dbDialect, dbHost, dbPassword, dbPort, dbUsername,} from "../config";

const config = {
	dialect: dbDialect,
	host: dbHost,
	port: dbPort
}
console.log({db, dbDialect, dbPassword, dbUsername});

const sequelize = new Sequelize(db,dbUsername, dbPassword, config)
let dbl = {};

fs.readdirSync(__dirname).filter(file => {
	return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(file => {
	const model = sequelize.import(path.join(__dirname, file));
	dbl[model.name] = model;
});

Object.keys(dbl).forEach(modelName => {
	if ("association" in dbl[modelName]){
		dbl[modelName].associate(dbl);
	}
});

dbl.sequelize = sequelize;
dbl.Sequelize = Sequelize;

module.exports = dbl;