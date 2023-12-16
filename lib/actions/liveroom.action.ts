import { getStream } from "./stream.action"

export const getToken = async () => {
  try {
    const stream = await getStream()
    const resp = await fetch(
      `/api/livekit/get-participant-token?room=${stream.name}&username=${stream.userId}`
    );
    const data = await resp.json();
    return data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
}