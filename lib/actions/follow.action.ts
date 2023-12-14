'use server'

import { db } from "../db";
import { getSelf } from "./user.action";

// get my followers, show if fans are live, order by live, then by date
//TODO: filter block list
export const getFollowers = async () => {
  try {
    const currentUser = await getSelf()
    const followers = await db.follow.findMany({
      where: {
        followerId: currentUser.id
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true
              }
            }
          }
        }
      },
      orderBy: [
        {
          following: {
            stream: {
              isLive: 'desc'
            }
          }
        },
        {
          createdAt: 'desc'
        }
      ]
    })
    return followers
  } catch (error) {
    console.log(error)
    throw error
  }
}

// check if user exist, then check if already following
export const isFollowing = async (followerId: string) => {
  try {
    const currentUser = await getSelf()
    const otherUser = await db.user.findUnique({
      where: {
        id: followerId
      }
    })
    if (!otherUser) {
      throw new Error('User does not exist')
    }
    const follow = await db.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: otherUser.id
      }
    })
    return !!follow
  } catch (error) {
    console.log(error)
    throw error
  }
}
//get myself, check if other user exist, check if already following, if not, create follow
export const follow = async (followerId: string) => {
  try {
    const otherUser = await db.user.findUnique({
      where: {
        id: followerId
      }
    })
    if (!otherUser) { throw new Error('User does not exist') }
    const currentUser = await getSelf()
    if (otherUser.id === currentUser.id) { throw new Error('Cannot follow yourself') }

    const alreadyFollowed = await isFollowing(otherUser.id)
    if (alreadyFollowed) {
      throw new Error('Already following')
    }
    const follow = await db.follow.create({
      data: {
        followerId: currentUser.id,
        followingId: otherUser.id
      },
      include: {
        follower: true,
        following: true
      }
    })
    return follow
  } catch (error) {
    console.log(error)
    throw error
  }
}

// check if other user exist, check if already following, if yes, delete follow
export const unfollow = async (followerId: string) => {
  try {
    const otherUser = await db.user.findUnique({
      where: {
        id: followerId
      }
    })
    if (!otherUser) { throw new Error('User does not exist') }

    const currentUser = await getSelf()
    if (otherUser.id === currentUser.id) { throw new Error('Cannot unfollow yourself') }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: otherUser.id
      }
    })
    if (!existingFollow) {
      throw new Error('Not following')
    }

    const unfollowUser = await db.follow.delete({
      where: {
        id: existingFollow.id
      },
      include: {
        following: true,
      }
    })
    return unfollowUser
  } catch (error) {
    console.log(error)
    throw error
  }
}