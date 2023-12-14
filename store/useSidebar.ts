import { create } from 'zustand'

interface SidebarState {
  expanded: boolean
  onExpand: () => void
  onCollapse: () => void
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  expanded: true,
  onExpand: () => set({ expanded: true }),
  onCollapse: () => set({ expanded: false }),
}))