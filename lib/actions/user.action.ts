'use server'

import { CreateUserParams, UpdateUserParams, GetRecommendedUsersParams } from "./shared"
import { db } from "../db"
import { Prisma } from "@prisma/client"

export const createUser = async (userData: CreateUserParams) => {
  try {
    let user: Prisma.UserCreateInput
    user = {
      email: userData.email,
      username: userData.username,
      imageUrl: userData.imageUrl,
      externalUserId: userData.userId,
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

export const getRecommendedUsers = async (params: GetRecommendedUsersParams) => {
  try {
    const users = await db.user.findMany({
      take: params.limit,
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