import { db, Stream } from "../db";
import { CreateStreamParams } from "./shared";
import { getSelf } from "./user.action";

export const createStream = async (streamData: CreateStreamParams) => {
  try {
    const user = await getSelf();
    if (!user) {
      throw new Error('User not found')
    }
    let stream: Stream
    stream = {
      name: streamData.name,
      thumbnailUrl: streamData.imageUrl,
      isLive: streamData.isLive,
      isChatEnabled: streamData.isChatEnabled,
      isChatFollowersOnly: streamData.isChatFollowersOnly,
      user: {
        connect: {
          id: user.id
        }
      }
    }
    const newStream = await db.stream.create({ data: stream })
    return newStream
  } catch (error) {
    console.log(error)
    throw error
  }
}