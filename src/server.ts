import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipantTrip } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getAllActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getAllLinks } from "./routes/get-links";
import { getAllParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify()

app.register(cors,
    {
        origin: '*',
    }
)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipantTrip)
app.register(getTripDetails)

app.register(updateTrip)

app.register(createActivity)
app.register(getAllActivities)
app.register(createLink)
app.register(getAllLinks)

app.register(getAllParticipants)
app.register(getParticipant)

app.register(createInvite)



app.listen({port:env.PORT}).then(
    ()=> {
        console.log('Server running...')
    }
)