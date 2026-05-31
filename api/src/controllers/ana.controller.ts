import { IUserService } from '@/services';
import type { FastifyRequest, FastifyReply } from 'fastify';

export class AnaController {
    constructor(private readonly service: IUserService) { }

    async getAna(req: FastifyRequest, reply: FastifyReply) {
        reply.send({ 
            success: true,
            data: {
                nome: "Ana Tayná",
                age: 29
            }
        })
    }
}

// {
//     ana: {
//         nome: "Ana Tayná",
//         age: 29,
//     }
// }