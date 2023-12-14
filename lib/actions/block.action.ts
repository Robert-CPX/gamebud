import { db } from "../db";
import { getSelf } from "./user.action";

export const blockUser = async (userId: string) => {
  try {
    const currentUser = await getSelf();
    if (currentUser.id === userId) {
      throw new Error("Cannot block yourself");
    }
    const existedUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existedUser) {
      throw new Error("User not found");
    }
    const blockingUser = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: existedUser.id,
        },
      },
    });
    if (blockingUser) {
      throw new Error("User already blocked");
    }
    const blockedUser = await db.block.create({
      data: {
        blockerId: currentUser.id,
        blockedId: existedUser.id,
      },
    });
    return blockedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBlockList = async () => {
  try {
    const currentUser = await getSelf();
    const blockedUsers = await db.block.findMany({
      where: {
        blockerId: currentUser.id,
      },
    });
    return blockedUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unblockUser = async (userId: string) => {
  try {
    const currentUser = await getSelf();
    if (currentUser.id === userId) {
      throw new Error("Cannot unblock yourself");
    }
    const blockedUser = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: userId,
        },
      },
    });
    if (!blockedUser) {
      throw new Error("User not blocked");
    }
    const unblockedUser = await db.block.delete({
      where: {
        id: blockedUser.id,
      },
    });
    return unblockedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isUserBlocked = async (userId: string) => {
  try {
    const existedUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existedUser) {
      throw new Error("User not found");
    }
    const currentUser = await getSelf();

    if (currentUser.id === existedUser.id) {
      return false;
    }
    const blockedUser = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: existedUser.id,
        },
      },
    });
    return !!blockedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};