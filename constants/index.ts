import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

export const UserSideBarItems = [
  { name: 'Stream', path: '/', icon: Fullscreen },
  { name: 'Keys', path: '/keys', icon: KeyRound },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Community', path: '/community', icon: Users },
] as const;
