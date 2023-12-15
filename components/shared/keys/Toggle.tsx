'use client'

import { Button } from "@/components/ui/button"
import { createIngress } from "@/lib/actions/ingress.action"

const Toggle = () => {
  return (
    <Button
      className="rounded-md bg-primary text-sm"
      onClick={() => { createIngress(0) }}
    >
      Generate Connection
    </Button>
  )
}

export default Toggle
