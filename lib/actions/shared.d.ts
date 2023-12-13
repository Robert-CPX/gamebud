
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