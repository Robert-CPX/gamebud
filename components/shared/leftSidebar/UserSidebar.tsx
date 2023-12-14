'use client'
import { Button } from '../../ui/button'
import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react'
import { useSidebarStore } from '@/store/useSidebar'
import { UserSideBarItems } from '@/constants'
import Link from 'next/link'

const UserSidebar = () => {
  const expanded = useSidebarStore((state) => state.expanded)
  const onExpand = useSidebarStore((state) => state.onExpand)
  const onCollapse = useSidebarStore((state) => state.onCollapse)

  return (
    <aside className={`relative h-full ${expanded ? "w-[16rem]" : "w-[4rem]"} border-r border-border bg-background max-lg:w-[4rem]`}>
      <div className='flex-center justify-between p-2 max-lg:hidden'>
        <p className={`text-sm ${!expanded && 'hidden'}`}>Dashboard</p>
        <Button onClick={expanded ? onCollapse : onExpand} className='bg-transparent invert hover:invert-[0.9]'>
          {expanded ? <ArrowLeftFromLine className='h-4 w-4' /> : <ArrowRightFromLine className='h-4 w-4' />}
        </Button>
      </div>
      <div className={`flex flex-col p-2 ${!expanded && 'items-center gap-4'} max-lg:hidden`}>
        <ul className='flex flex-col gap-4'>
          {UserSideBarItems.map((item) => (
            <Link href={item.path} key={item.name} className='flex-center w-full gap-4 rounded-md px-4 py-2 hover:bg-background hover:invert-[0.05]'>
              <item.icon className='h-4 w-4' />
              <p className={`${!expanded && 'hidden'}`}>{item.name}</p>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default UserSidebar
