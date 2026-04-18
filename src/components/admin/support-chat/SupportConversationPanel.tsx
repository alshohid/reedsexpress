import SupportConversationHeader from "@/src/components/admin/support-chat/SupportConversationHeader";
import SupportMessageComposer from "@/src/components/admin/support-chat/SupportMessageComposer";
import SupportMessageList from "@/src/components/admin/support-chat/SupportMessageList";
import SupportQuickActionBar from "@/src/components/admin/support-chat/SupportQuickActionBar";
import type { SupportConversation, SupportMessage } from "@/src/types/adminSupportChatTypes";

type SupportConversationPanelProps = {
  conversation: SupportConversation | null;
  draft: string;
  messages: SupportMessage[];
  onDraftChange: (value: string) => void;
  onSendMessage: (body: string) => void;
};

export default function SupportConversationPanel({
  conversation,
  draft,
  messages,
  onDraftChange,
  onSendMessage,
}: SupportConversationPanelProps) {
  if (!conversation) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center bg-white p-8">
        <div className="max-w-md rounded-[28px] border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-8 py-10 text-center">
          <h3 className="text-lg font-semibold text-[#101828]">
            Select a conversation
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Once a thread is selected, the mocked live chat panel, templates, and
            composer will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex h-full min-h-[560px] flex-col bg-white">
      <SupportConversationHeader conversation={conversation} />
      <SupportQuickActionBar
        actions={conversation.quickActions}
        onSendAction={onSendMessage}
      />
      <SupportMessageList
        messages={messages}
        isParticipantTyping={conversation.typing}
      />
      <SupportMessageComposer
        draft={draft}
        onDraftChange={onDraftChange}
        onSend={onSendMessage}
      />
    </section>
  );
}
