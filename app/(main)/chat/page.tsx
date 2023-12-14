import ChatSettingItem from "@/components/shared/ChatSettingItem"
import { getStream } from "@/lib/actions/stream.action"
import { chatSettings } from "@/constants"

const Page = async () => {
  const stream = await getStream()

  return (
    <section className="flex w-full flex-col p-8">
      <p className="pb-6 text-4xl">Chat Settings</p>
      <div className="flex flex-col gap-4">
        {chatSettings.map((setting) => (
          <ChatSettingItem
            key={setting.key}
            title={setting.title}
            enabled={stream[setting.key]}
          />
        ))}
      </div>
    </section>
  )
}

export default Page
