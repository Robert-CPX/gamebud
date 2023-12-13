'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRightFromLine, ArrowLeftFromLine, Video } from 'lucide-react'
import { getRecommendedUsers } from '@/lib/actions/user.action'
import { User } from '@/lib/db'
import Image from 'next/image'

const LeftSidebar = () => {
  const [isExpand, setIsExpand] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const recommendedUsers = await getRecommendedUsers({ limit: 20, factor: 'new' })
      setUsers(recommendedUsers)
    }
    getUsers()
  }, [])

  return (
    <aside className={`h-full ${isExpand ? "w-[16rem]" : "w-[4rem]"} max-lg:w-[4rem]`}>
      <div className='flex-center justify-between p-2 max-lg:hidden'>
        <p className={`text-sm ${!isExpand && 'hidden'}`}>For you</p>
        <Button onClick={() => (setIsExpand(!isExpand))} className='bg-transparent invert hover:invert-[0.9]'>
          {isExpand ? <ArrowLeftFromLine className='h-4 w-4' /> : <ArrowRightFromLine className='h-4 w-4' />}
        </Button>
      </div>
      <div className={`flex flex-col p-2 ${!isExpand && 'items-center gap-4'} max-lg:hidden`}>
        <p className={`${!isExpand && 'hidden'}`}>Recommended Channel</p>
        <Video className={`h-4 w-4 ${isExpand && 'hidden'}`} />
        <ul className='flex flex-col gap-4'>
          {users.map((user) => (
            <li key={user.id} className='flex-center justify-between gap-2'>
              <Image src={user.imageUrl} alt={user.username} width={32} height={32} className='h-8 w-8 rounded-full' />
              <div className={`flex w-full ${!isExpand && 'hidden'}`}>
                <div className='flex w-full flex-col items-start'>
                  <p>{user.username}</p>
                  <p>{user.username}</p>
                </div>
                <div className='flex-center h-full gap-1 bg-cyan-800'>
                  <div className='h-3 w-3 rounded-full bg-red-700' />
                  <p>51.1K</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default LeftSidebar
