'use client'
import React, { use, useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { ArrowRightFromLine, ArrowLeftFromLine, Video } from 'lucide-react'
import { getRecommendedUsers } from '@/lib/actions/user.action'
import { User } from '@/lib/db'
import Image from 'next/image'
import { useSidebarStore } from '@/store/useSidebar'

const LeftSidebar = () => {
  const expanded = useSidebarStore((state) => state.expanded)
  const onExpand = useSidebarStore((state) => state.onExpand)
  const onCollapse = useSidebarStore((state) => state.onCollapse)

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const recommendedUsers = await getRecommendedUsers({ limit: 20, factor: 'new' })
      setUsers(recommendedUsers)
    }
    getUsers()
  }, [])

  return (
    <aside className={`relative h-full ${expanded ? "w-[16rem]" : "w-[4rem]"} border-r border-border bg-background max-lg:w-[4rem]`}>
      <div className='flex-center justify-between p-2 max-lg:hidden'>
        <p className={`text-sm ${!expanded && 'hidden'}`}>For you</p>
        <Button onClick={expanded ? onCollapse : onExpand} className='bg-transparent invert hover:invert-[0.9]'>
          {expanded ? <ArrowLeftFromLine className='h-4 w-4' /> : <ArrowRightFromLine className='h-4 w-4' />}
        </Button>
      </div>
      <div className={`flex flex-col p-2 ${!expanded && 'items-center gap-4'} max-lg:hidden`}>
        <p className={`${!expanded && 'hidden'}`}>Recommended Channel</p>
        <Video className={`h-4 w-4 ${expanded && 'hidden'}`} />
        <ul className='flex flex-col gap-4'>
          {users.map((user) => (
            <li key={user.id} className='flex-center justify-between gap-2'>
              <Image src={user.imageUrl} alt={user.username} width={32} height={32} className='h-8 w-8 rounded-full' />
              <div className={`flex w-full ${!expanded && 'hidden'}`}>
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
