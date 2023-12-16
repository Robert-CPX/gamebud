'use client'

import { Button } from '@/components/ui/button';
import { followUser, unfollowUser } from '@/lib/actions/follow.action';
import { Heart } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  userId: string;
  profilePic: string;
  name: string;
  bio: string;
  isOnline: boolean;
  isFollowing: boolean;
}

const HostInfo = ({
  userId, profilePic, name, bio, isOnline, isFollowing
}: Props) => {
  const [follow, setFollow] = useState(isFollowing)

  useEffect(() => {
    { follow ? unfollowUser(userId) : followUser(userId) }
  }, [follow, userId])

  return (
    <section className='flex justify-between p-4'>
      <div className='flex-center gap-4'>
        <Image src={profilePic} alt='profile picture' height={32} width={32} className='rounded-full' />
        <div className='flex flex-col items-start justify-center gap-2'>
          <p className='text-sm'>{name}</p>
          <p className='text-sm'>{bio}</p>
          <p className={`text-xs ${isOnline ? "invert" : "invert-[0.8]"}`}>{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>
      <Button className='gap-2 rounded-md bg-purple-800 px-2 text-sm text-white' onClick={() => { setFollow(!follow) }} >
        <Heart />
        {follow ? "Followed" : "Unfollow"}
      </Button>
    </section>
  )
}

export default HostInfo
