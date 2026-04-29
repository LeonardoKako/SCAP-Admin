import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        components: {
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {type: 'boolean', example: false, default: false},
                        error: {
                            type: 'object',
                            properties: {
                                code: {type: 'string', example: 'RESOURCE_NOT_FOUND'},
                                message: {type: 'string', example: 'Recurso não encontrado'},
                            }
                        }    
                    }
                },
                Access: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        userId: {
                            type: 'integer', 
                            description: 'ID do usuário que realizou o acesso', 
                            example: 1
                        },
                        accessType: {
                            type: 'string', 
                            enum: ['ENTRY', 'EXIT'],
                            description: 'Define se o acesso é uma entrada ou saída',
                            example: 'ENTRY'
                        },
                        dateTime: {type: 'string', format: 'date-time', example: '2026-04-28T23:50:00Z'}
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        name: {type: 'string', example: 'João Silva'},
                        email: {type: 'string', example: 'joao@gmail.com'},
                        profileId: {
                            type: 'integer',
                            description: 'ID do perfil atribuído a esse usuário',
                            example: 1
                        },
                        sectorId: {
                            type: 'integer',
                            description: 'ID do setor atribuído a esse usuário',
                            example: 1
                        },
                        createdAt: { 
                            type: 'string', 
                            format: 'date-time', 
                            description: 'Data de criação do usuário',
                            example: '2024-05-20T10:00:00Z',
                            readOnly: true
                        },
                        updatedAt: { 
                            type: 'string', 
                            format: 'date-time', 
                            description: 'Data da última atualização do usuário',
                            example: '2024-05-21T15:30:00Z',
                            readOnly: true
                        }
                    }
                },
                Sector: {
                    type: 'object',
                    properties: {
                        id: {type: 'integer', example: 1},
                        name: {type: 'string', example: 'Administrativo'},
                        createdAt: { 
                            type: 'string', 
                            format: 'date-time', 
                            description: 'Data de criação do usuário',
                            example: '2024-05-20T10:00:00Z',
                            readOnly: true
                        },
                        updatedAt: { 
                            type: 'string', 
                            format: 'date-time', 
                            description: 'Data da última atualização do usuário',
                            example: '2024-05-21T15:30:00Z',
                            readOnly: true
                        }
                    }
                }
            }
        },
        info: {
            title: 'Api SCAP-ADMIN',
            version: '1.0.0',
            description: 'Documentação dos endpoints da api do sistema SCAP-ADMIN',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: [path.resolve(process.cwd(), 'backend/src/modules/**/*.js')],
};

console.log(swaggerOptions.apis);

const swaggerDocs = swaggerJsDoc(swaggerOptions);

console.log(swaggerDocs.paths);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.get('/api-docs-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
}