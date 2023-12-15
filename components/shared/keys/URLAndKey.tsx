'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

type Prop = {
  value: string | null
}

export const ServerURL = ({ value }: Prop) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value ?? "")

    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000);

    toast.success("Copied!")
  }
  const Icon = isCopied ? Check : Copy;

  return (
    <div className="flex-center h-[5rem] justify-between rounded-lg bg-background px-6 invert-[0.05]">
      <p className="w-[13rem] text-primary">Server URL</p>
      <Input disabled value={value ?? ""} placeholder="Server URL" className="rounded-md bg-input text-white invert focus-visible:ring-0 focus-visible:ring-offset-0" />
      <Button className="bg-transparent text-sm invert" disabled={isCopied || !value} onClick={handleCopy}>
        <Icon />
      </Button>
    </div>
  )
}

export const StreamKey = ({ value }: Prop) => {
  const [isCopied, setIsCopied] = useState(false)
  const [show, setShow] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value ?? "")
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000);
    toast.success("Copied!")
  }

  const Icon = isCopied ? Check : Copy;

  return (
    <div className="flex h-[8rem] items-start justify-between rounded-lg bg-background px-6 pt-6 invert-[0.05]">
      <p className="w-[12rem] text-primary">Stream Key</p>
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex-center w-full">
          <Input disabled value={value ?? ""} type={show ? "text" : "password"} placeholder="Stream key" className="w-full rounded-md invert focus-visible:ring-0 focus-visible:ring-offset-0" />
          <Button disabled={isCopied || !value} className="bg-transparent invert" onClick={handleCopy}>
            <Icon />
          </Button>
        </div>
        <Button className="border-none bg-transparent text-sm text-primary invert-0 hover:bg-muted" onClick={() => { setShow(!show) }}>{show ? "Hide" : "Show"}</Button>
      </div>
    </div>
  )
}