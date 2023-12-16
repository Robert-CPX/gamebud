import EditInfo from "@/components/shared/stream/EditInfo"
import HostInfo from "@/components/shared/stream/HostInfo"
import LiveRoom from "@/components/shared/stream/LiveRoom"
import { isFollowingUser } from "@/lib/actions/follow.action"
import { getUser } from "@/lib/actions/user.action"

type Params = {
  userId: string
}

export default async function Home({ params }: { params: Params }) {
  const user = await getUser(params.userId)
  const isFollowing = await isFollowingUser(params.userId)

  return (
    <section className="flex flex-col">
      <div className="flex w-full">
        <LiveRoom />
      </div>
      <div className="separate" />
      <HostInfo
        userId={user.id}
        profilePic={user.imageUrl}
        name={user.username}
        bio={user.bio ?? ""}
        isOnline={user.stream?.isLive ?? false}
        isFollowing={isFollowing}
      />
      <EditInfo
        name={user.username}
        thumbnail={user.imageUrl}
      />
    </section>
  )
}
