import { ServerURL, StreamKey } from "@/components/shared/keys/URLAndKey"
import { Button } from "@/components/ui/button"

const Page = async () => {

  return (
    <section className="flex w-full flex-col p-8">
      <div className="flex-center justify-between">
        <p className="pb-6 text-4xl">Keys & URLs</p>
        <Button className="rounded-md bg-primary text-sm">Generate</Button>
      </div>
      <div className="flex flex-col gap-4">
        <ServerURL value={""} />
        <StreamKey value={""} />
      </div>
    </section>
  )
}

export default Page
