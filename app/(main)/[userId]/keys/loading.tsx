import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section className="flex w-full flex-col p-8">
      <div className="flex-center justify-between">
        <p className="pb-6 text-4xl">Keys & URLs</p>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="flex-center h-[5rem] justify-between rounded-lg bg-background px-6 invert-[0.05]"></Skeleton>
        <Skeleton className="flex-center h-[7rem] justify-between rounded-lg bg-background px-6 invert-[0.05]"></Skeleton>
      </div>
    </section>
  )
}

export default Loading
