import React from "react"
import Logo from "@/components/shared/auth/Logo"

const AuthRootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <Logo />
      {children}
    </div>
  )
}

export default AuthRootLayout
