import { db } from '@/lib/db';
import { WebhookReceiver } from 'livekit-server-sdk';
import { headers } from 'next/headers';

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);

// In order to use the validator, WebhookReceiver must have access to the raw POSTed string (instead of a parsed JSON object)
// if you are using express middleware, ensure that `express.raw` is used for the webhook endpoint
// app.use(express.raw({type: 'application/webhook+json'}));

export async function POST(req: Request) {
  const body = await req.text()
  const header = headers();
  const authorization = header.get("Authorization");
  if (!authorization) {
    return new Response('Error occured -- no authorization header', { status: 400 })
  }

  const event = receiver.receive(body, authorization);

  if (event.event === 'ingress_started') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true
      }
    })
  }
  if (event.event === 'ingress_ended') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false
      }
    })
  }
  return new Response('', { status: 200 })
}