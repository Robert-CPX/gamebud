import { Navbar, LeftSidebar, RightSidebar } from "@/components/shared"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative pt-[5rem]">
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
