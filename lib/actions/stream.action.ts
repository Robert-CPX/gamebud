'use server'

import { revalidatePath } from "next/cache";
import { db, Stream } from "../db";
import { getSelf } from "./user.action";

export const getStream = async () => {
  try {
    const user = await getSelf();
    const stream = await db.stream.findUnique({
      where: { userId: user.id },
    })
    if (!stream) {
      throw new Error('Can not find user stream')
    }
    return stream
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateStream = async (values: Partial<Stream>) => {
  try {
    let currentSetting = await getStream()
    let stream: Stream
    stream = {
      name: values.name ?? currentSetting.name,
      thumbnailUrl: values.thumbnailUrl ?? currentSetting.thumbnailUrl,
      isLive: values.isLive === undefined ? currentSetting.isLive : values.isLive,
      isChatEnabled: values.isChatEnabled === undefined ? currentSetting.isChatEnabled : values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly === undefined ? currentSetting.isChatFollowersOnly : values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed === undefined ? currentSetting.isChatDelayed : values.isChatDelayed,
      user: {
        connect: {
          id: currentSetting.userId
        }
      }
    }
    const newStream = await db.stream.update({ where: { id: currentSetting.id }, data: stream })
    revalidatePath('/chat');

    return newStream
  } catch (error) {
    console.log(error)
    throw error
  }
}