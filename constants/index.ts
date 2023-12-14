import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

export const userSideBars = [
  { name: 'Stream', path: '/', icon: Fullscreen },
  { name: 'Keys', path: '/keys', icon: KeyRound },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Community', path: '/community', icon: Users },
] as const;

export const chatSettings = [
  { title: 'Enable Chat', field: 'isChatEnabled' },
  { title: 'Delay chat', field: 'isChatDelayed' },
  { title: 'Must be following to chat', field: 'isChatFollowersOnly' },
] as const;