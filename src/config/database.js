import dotenv from 'dotenv';
dotenv.config();

export default {
    dialect: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    dialectOptions: {
        timezone: 'Etc/GMT+3',
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },
    timezone: 'Etc/GMT+3'
}
