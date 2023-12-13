'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react'

const LeftSidebar = () => {
  const [isExpand, setIsExpand] = useState(false)
  return (
    <aside className={`h-full ${isExpand ? "w-[14rem]" : "w-[4rem]"}`}>
      <div className='flex-center justify-between p-4'>
        <p className={`text-sm ${!isExpand && 'hidden'}`}>For you</p>
        <Button onClick={() => (setIsExpand(!isExpand))} className='bg-transparent invert hover:invert-[0.9]'>
          {isExpand ? <ArrowLeftFromLine className='h-4 w-4' /> : <ArrowRightFromLine className='h-4 w-4' />}
        </Button>
      </div>
    </aside>
  )
}

export default LeftSidebar
