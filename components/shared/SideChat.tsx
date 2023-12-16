'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightFromLine, ArrowLeftFromLine, Users } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const SideChat = () => {
  const [expand, setExpand] = useState(true)

  const { user } = useUser()
  if (!user) return
  expand
  return (
    <aside className={`relative h-full ${expand ? "w-[22rem]" : "w-[4rem]"} border-r border-border bg-background max-lg:w-[4rem]`}>
      <div className='flex-center justify-between p-2 max-lg:hidden'>
        <Button onClick={() => { setExpand(!expand) }} className='bg-transparent invert hover:invert-[0.9]'>
          {!expand ? <ArrowLeftFromLine className='h-4 w-4' /> : <ArrowRightFromLine className='h-4 w-4' />}
        </Button>
        <p className={`text-sm ${!expand && 'hidden'}`}>Stream Chat</p>
        <Button className='bg-transparent invert hover:invert-[0.9]'>
          <Users className='h-4 w-4' />
        </Button>
      </div>
    </aside>
  )
}

export default SideChat
