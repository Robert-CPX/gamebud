import { currentUser } from '@clerk/nextjs';
import UserSidebar from './UserSidebar';
import BrowsingSidebar from './BrowsingSidebar';

const Sidebar = async () => {
  const user = await currentUser();
  return (
    (user == null) ? <BrowsingSidebar /> : <UserSidebar />
  )
}

export default Sidebar