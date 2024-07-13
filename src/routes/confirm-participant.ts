import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import { dayjs } from "../lib/dayjs";
import nodemailer from 'nodemailer';
import { ClientError } from "../errors/client-error";
import { env } from "../env";


export async function confirmParticipantTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/participant/:participantId/confirm', {
        schema: {
            params: z.object({
                participantId: z.string().uuid(),
            })
        }
    }
        , async (request, replay) => {
            const { participantId } = request.params

            const participant = await prisma.participant.findUnique({
                where : {
                    id: participantId
                }
            })
            if(!participant){
                throw new ClientError('Parcicipant not found.')
            }
            if(participant.is_confirmed){
                return replay.redirect(`${env.WEB_BASE_URL}/trips/${participant.trip_id}` )
            }

            await prisma.participant.update({
                where: { id: participantId },
                data: { is_confirmed: true},
            })

            
            return replay.redirect(`${env.WEB_BASE_URL}/trips/${participant.trip_id}` )
        })
}
