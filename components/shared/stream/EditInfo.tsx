'use client'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import Image from 'next/image'

import React from 'react'

type Props = {
  name: string;
  thumbnail: string;
}

const EditInfo = ({ name, thumbnail }: Props) => {
  const handleEdit = () => {

  }

  return (
    <section className='flex flex-col rounded-t-lg bg-background'>
      <div className='flex-center justify-between'>
        <div className='flex-center gap-2'>
          <Pencil className='bg-purple-800' />
          <div className='flex flex-col p-1'>
            <p className='text-xl'>Edit Your Stream Info</p>
            <p className='text-sm'>Maximize your visibility</p>
          </div>
        </div>
        <Button className='bg-transparent text-xl text-white' onClick={handleEdit}>Edit</Button>
      </div>
      <div className='separate my-4' />
      <div className='flex flex-col items-start'>
        <p className='text-sm'>name</p>
        <p className='text-sm text-white'>{name}</p>
        <p className='text-sm'>Thumbnail</p>
        <Image src={thumbnail} alt="thumbnail" width={280} height={280} className='h-[280px] w-[280px] rounded-sm border border-border' />
      </div>
    </section>
  )
}

export default EditInfo
