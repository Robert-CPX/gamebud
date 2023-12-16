import { Navbar, Sidebar } from "@/components/shared"
import SideChat from "@/components/shared/SideChat"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative pt-[5rem]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        {children}
        <SideChat />
      </div>
    </main>
  )
}

export default MainLayout
