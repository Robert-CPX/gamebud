import { Navbar, LeftSidebar, RightSidebar } from "@/components/shared"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div>
        <LeftSidebar />
        {children}
        <RightSidebar />
      </div>
    </main>
  )
}

export default MainLayout
