import React from "react"
import Logo from "./_components/Logo"

const AuthRootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex-center flex-col gap-3">
      <Logo />
      {children}
    </div>
  )
}

export default AuthRootLayout
