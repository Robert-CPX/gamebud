'use client'
import React from 'react'
import { Switch } from "@/components/ui/switch"
import { updateStream } from '@/lib/actions/stream.action'

type Props = {
  title: string
  enabled: boolean
  key: string
}

const ChatSettingItem = ({ title, enabled, key }: Props) => {
  const update = (value: boolean) => {
    updateStream({ [key]: value })
  }
  return (
    <div className='flex-center h-[5rem] w-full justify-between rounded-xl bg-background p-4 invert-[0.08]'>
      <p>{title}</p>
      <Switch checked={enabled} onCheckedChange={update} />
    </div>
  )
}

export default ChatSettingItem
