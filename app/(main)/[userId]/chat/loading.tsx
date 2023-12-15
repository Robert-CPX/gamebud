import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section className="flex w-full flex-col p-8">
      <p className="pb-6 text-4xl">Chat Settings</p>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} className="flex-center h-[5rem] w-full rounded-xl bg-background p-4 invert-[0.08]" />
        ))}
      </div>
    </section>
  )
}

export default Loading
