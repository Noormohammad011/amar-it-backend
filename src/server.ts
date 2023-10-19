import { Server } from 'http';
import app from './app';
import config from './config';

async function bootstrap() {
    const server: Server = app.listen(config.port, () => {
        //eslint-disable-next-line
        console.log(`🚀 Server running on port ${config.port}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                //eslint-disable-next-line
                console.log('Server closed');
            });
        }
        //eslint-disable-next-line
        console.log('Process terminated');
        process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
        //eslint-disable-next-line
        console.log(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
}

bootstrap();
