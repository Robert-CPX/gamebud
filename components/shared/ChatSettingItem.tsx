'use client'
import { toast } from "sonner";
import React, { useTransition, useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch"
import { updateStream } from '@/lib/actions/stream.action'

type Props = {
  field: string
  title: string
  enabled: boolean
}

const ChatSettingItem = ({ field, title, enabled }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(enabled)
  const update = (value: boolean) => {
    setValue(value)
    startTransition(() => {
      updateStream({ [field]: value })
        .then(() => toast.success("Chat settings updated!"))
        .catch(() => toast.error("Something went wrong"));
    })
  }

  return (
    <div className='flex-center h-[5rem] w-full justify-between rounded-xl bg-background p-4 invert-[0.08]'>
      <p>{title}</p>
      <Switch disabled={isPending} checked={value} onCheckedChange={update} />
    </div>
  )
}

export default ChatSettingItem
