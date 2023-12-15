import { ServerURL, StreamKey } from "@/components/shared/keys/URLAndKey"
import Toggle from "@/components/shared/keys/Toggle"
import { getStream } from "@/lib/actions/stream.action"

const Page = async () => {
  const stream = await getStream()

  return (
    <section className="flex w-full flex-col p-8">
      <div className="flex-center justify-between">
        <p className="pb-6 text-4xl">Keys & URLs</p>
        <Toggle />
      </div>
      <div className="flex flex-col gap-4">
        <ServerURL value={stream.serverUrl} />
        <StreamKey value={stream.streamKey} />
      </div>
    </section>
  )
}

export default Page
