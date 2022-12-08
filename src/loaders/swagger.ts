import Application from 'koa';
import { koaSwagger, SwaggerOptions } from 'koa2-swagger-ui';
import config from '../config';
import swaggerJSDoc from 'swagger-jsdoc';

export default (app: Application) => {
    if (config.enableSwagger) {
        // swagger definition
        const options = {
            // import swaggerDefinitions
            swaggerDefinition: {
                info: {
                    title: 'API', // Title (required)
                    version: '1.0.0', // Version (required)
                    description:
                        'Demonstrating how to describe a RESTful API with Swagger',
                },
                securityDefinitions: {
                    bearerAuth: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header',
                        description: "Must start with: 'Bearer '",
                    },
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
            },
            host: 'localhost:4000',
            basePath: '/',

            // path to the API docs
            apis: ['**/*.ts'],
        };

        // Initialize swagger-jsdoc -> returns validated swagger spec in json format
        const swaggerSpec = swaggerJSDoc(options);
        app.use(
            koaSwagger({
                routePrefix: '/swagger', // host at /swagger instead of default /docs
                swaggerOptions: {
                    spec: swaggerSpec,
                } as SwaggerOptions ,
                customCSS: `h1 { color: red }`, // Add Custom CSS on the html
            }),
        );
    }
};
