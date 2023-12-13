import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'

export async function POST(req: Request) {

  const WEBHOOK_SECRET = process.env.CLERK_SIGNING_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username } = evt.data;
    const createdUser = await createUser({
      userId: id,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
      username: username ?? '',
    })
    return new Response(`user created succeed: ${createdUser}`, { status: 200 })
  }
  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username } = evt.data;
    const updatedUser = await updateUser({
      userId: id,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
      username: username ?? '',
    })
    if (!updatedUser) { return new Response('user not found', { status: 404 }) }
    return new Response(`user updated succeed: ${updatedUser}`, { status: 200 })
  }
  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    if (!id) {
      return new Response('user id is required', { status: 400 })
    }
    const deletedUser = await deleteUser(id)
    return new Response(`user deleted succeed: ${deletedUser}`, { status: 200 })
  }

  return new Response('', { status: 200 })
}