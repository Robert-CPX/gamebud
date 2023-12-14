
export type CreateUserParams = {
  userId: string
  email: string
  username: string
  imageUrl: string
}

export type UpdateUserParams = {
  userId: string
  email: string
  username: string
  imageUrl: string
}

export type GetRecommendedUsersParams = {
  limit: number
  factor: 'new' | 'old'
}

export type CreateStreamParams = {
  name: string
  imageUrl: string

  isLive: boolean
  isChatEnabled: boolean
  isChatFollowersOnly: boolean
}

export type UpdateStreamSettingParams = {
  name?: string
  imageUrl?: string

  isLive?: boolean
  isChatEnabled?: boolean
  isChatFollowersOnly?: boolean
}