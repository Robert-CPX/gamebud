'use server'

import { CreateIngressOptions, IngressAudioEncodingPreset, IngressClient, IngressInput, IngressVideoEncodingPreset, RoomServiceClient } from 'livekit-server-sdk';
import { getSelf } from './user.action';

import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';
import { db } from '../db';
import { revalidatePath } from 'next/cache';

const roomServer = new RoomServiceClient(process.env.LIVEKIT_API_URL!);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const createIngress = async (ingressType: IngressInput) => {
  const currentUser = await getSelf()
  await resetIngress(currentUser.id)
  const options: CreateIngressOptions = {
    name: currentUser.username,
    roomName: currentUser.id,
    participantName: currentUser.username,
    participantIdentity: currentUser.id,
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
  };
  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress')
  }
  await db.stream.update({
    where: { userId: currentUser.id },
    data: {
      ingressId: ingress.ingressId,
      streamKey: ingress.streamKey,
      serverUrl: ingress.url,
    }
  })
  revalidatePath(`/${currentUser.id}/keys`)
  return ingress;
}

export const resetIngress = async (hostId: string) => {
  const ingresses = await ingressClient.listIngress({ roomName: hostId });
  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
  for (const room of await roomServer.listRooms([hostId])) {
    await roomServer.deleteRoom(room.name);
  }
}