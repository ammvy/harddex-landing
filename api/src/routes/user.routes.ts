import type { FastifyInstance } from 'fastify';
import type { UserController } from '@/controllers/user.controller';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { createUserDTO, updateUserDTO, paramIdDTO } from '@/dtos/user.dto';

export function userRoutes(controller: UserController) {
  return async (app: FastifyInstance) => {
    
    // GET /users
    app.get('/users', {
      schema: {
        description: 'Recupera a lista de todos os usuários',
        tags: ['Users'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    avatarUrl: { type: 'string', nullable: true },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    }, controller.getAll.bind(controller));

    // GET /users/:id
    app.get('/users/:id', {
      schema: {
        description: 'Recupera um usuário pelo seu ID (UUID)',
        tags: ['Users'],
        params: zodToJsonSchema(paramIdDTO),
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  avatarUrl: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    }, controller.getById.bind(controller));

    // POST /users
    app.post('/users', {
      schema: {
        description: 'Cria um novo usuário',
        tags: ['Users'],
        body: zodToJsonSchema(createUserDTO),
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  avatarUrl: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          400: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  details: { type: 'object', additionalProperties: true },
                },
              },
            },
          },
        },
      },
    }, controller.create.bind(controller));

    // PUT /users/:id
    app.put('/users/:id', {
      schema: {
        description: 'Atualiza os dados de um usuário existente',
        tags: ['Users'],
        params: zodToJsonSchema(paramIdDTO),
        body: zodToJsonSchema(updateUserDTO),
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  avatarUrl: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    }, controller.update.bind(controller));

    // DELETE /users/:id
    app.delete('/users/:id', {
      schema: {
        description: 'Remove um usuário e seu avatar associado do Storage',
        tags: ['Users'],
        params: zodToJsonSchema(paramIdDTO),
        response: {
          204: {
            type: 'null',
            description: 'Usuário removido com sucesso',
          },
          404: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    }, controller.delete.bind(controller));

    // PATCH /users/:id/avatar
    app.patch('/users/:id/avatar', {
      schema: {
        description: 'Faz o upload da foto de avatar de um usuário',
        tags: ['Users'],
        params: zodToJsonSchema(paramIdDTO),
        consumes: ['multipart/form-data'],
        body: {
          type: 'object',
          required: ['avatar'],
          properties: {
            avatar: {
              type: 'string',
              format: 'binary',
              description: 'Arquivo de imagem do avatar (JPEG, PNG, etc.)',
            },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  avatarUrl: { type: 'string', nullable: true },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    }, controller.uploadAvatar.bind(controller));

  };
}
