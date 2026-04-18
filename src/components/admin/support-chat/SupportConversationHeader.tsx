import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";

type SupportConversationHeaderProps = {
  conversation: SupportConversation;
};

export default function SupportConversationHeader({
  conversation,
}: SupportConversationHeaderProps) {
  return (
    <div className="border-b border-[#EAECF0] bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            <Avatar className="h-11 w-11">
              <AvatarFallback
                className="text-sm font-semibold text-white"
                style={{ backgroundColor: conversation.avatarColor }}
              >
                {conversation.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-[#101828]">
              {conversation.participantName}
            </h3>
            <p className="truncate text-xs text-[#98A2B3]">
              {conversation.carrierName} • {conversation.participantRoleLabel} •{" "}
              {conversation.participantEmail}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085]"
          aria-label="Conversation options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
