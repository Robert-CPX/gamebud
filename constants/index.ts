import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

export const userSideBars = [
  { name: 'Stream', path: '/', icon: Fullscreen },
  { name: 'Keys', path: '/keys', icon: KeyRound },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Community', path: '/community', icon: Users },
] as const;

export const chatSettings = [
  { title: 'Enable Chat', key: 'isChatEnabled' },
  { title: 'Delay chat', key: 'isChatDelayed' },
  { title: 'Must be following to chat', key: 'isChatFollowersOnly' },
] as const;