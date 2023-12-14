'use server'

import { CreateUserParams, UpdateUserParams, GetRecommendedUsersParams } from "./shared"
import { db } from "../db"
import { Prisma } from "@prisma/client"
import { currentUser } from "@clerk/nextjs";

export const createUser = async (userData: CreateUserParams) => {
  try {
    let user: Prisma.UserCreateInput
    user = {
      email: userData.email,
      username: userData.username,
      imageUrl: userData.imageUrl,
      externalUserId: userData.userId,
      stream: {
        create: {
          name: `${userData.username}'s stream`,
        }
      }
    }
    const newUser = await db.user.create({ data: user })
    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUser = async (userData: UpdateUserParams) => {
  try {
    let user: Prisma.UserUpdateInput
    user = {
      email: userData.email,
      username: userData.username,
      imageUrl: userData.imageUrl,
    }
    const updatedUser = await db.user.update({ where: { externalUserId: userData.userId }, data: user })
    return updatedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await db.user.delete({ where: { externalUserId: userId } })
    return deletedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSelf = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error('User not found')
    }
    const dbUser = await db.user.findUnique({ where: { externalUserId: user.id } })
    if (!dbUser) {
      throw new Error('User not found')
    }
    return dbUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getRecommendedUsers = async (params: GetRecommendedUsersParams) => {
  try {

    let currentUserId: string
    try {
      const user = await getSelf()
      currentUserId = user.id
    } catch {
      currentUserId = "";
    }

    const users = await db.user.findMany({
      take: params.limit,
      where: {
        NOT: {
          id: currentUserId
        }
      },
      orderBy: {
        createdAt: params.factor === 'new' ? 'desc' : 'asc'
      }
    })
    return users
  } catch (error) {
    console.log(error)
    throw error
  }
}
