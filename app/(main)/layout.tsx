import { Navbar, Sidebar } from "@/components/shared"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative pt-[5rem]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </main>
  )
}

export default MainLayout
