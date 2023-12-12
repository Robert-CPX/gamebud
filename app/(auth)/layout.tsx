import React from "react"

const AuthRootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="row-center">
      {children}
    </div>
  )
}

export default AuthRootLayout
