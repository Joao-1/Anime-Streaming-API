import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { Sequelize } from 'sequelize-typescript';
import helmet from 'helmet';
import Minddlewares from './middlewares/index';
import config from './config/config';
import routes from './routers';
import errorMiddleware from './middlewares/ApiErrorHandler';
// C:\Program Files\PostgreSQL\13\bin>pg_ctl -D "C:\Program Files\PostgreSQL\13\data" start
class App {
    express: express.Application;

    constructor() {
        this.express = express();
        this.database();
        this.middlewares();
        this.routes();
    }

    public start(): express.Application {
        console.log(`
        ################################################
                 Server listening on port: ${config.app.port} 
        ################################################
        `);
        return this.express;
    }

    private middlewares(): void {
        this.express.use(logger('dev'));
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(express.json());
        this.express.use(cors(config.cors));
        this.express.use(helmet());
        this.express.use(...Minddlewares);
    }

    private async database() {
        const { database } = config;
        try {
            const connection = new Sequelize({
                database: database.database,
                password: database.password,
                username: database.username,
                dialect: 'postgres',
                models: [`${process.cwd()}/src/models`],
            });
            connection.authenticate();
            console.log('Banco de dados conectado com sucesso');
        } catch (error) {
            console.log(error);
        }
    }

    private routes(): void {
        this.express.use(routes);
        this.express.use(errorMiddleware);
    }
}

export default App;
