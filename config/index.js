import "dotenv/config";

module.exports = {
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	db: process.env.DB,
	dbDialect: process.env.DB_DIALECT,
	dbUsername: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbPort: process.env.DB_PORT,
	dbHost: process.env.DB_HOST
}