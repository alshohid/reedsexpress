import { cn } from "@/lib/utils";
import { formatMessageTimestamp } from "@/src/components/admin/support-chat/supportChatUtils";
import type { SupportMessage } from "@/src/types/adminSupportChatTypes";

type SupportMessageBubbleProps = {
  message: SupportMessage;
};

export default function SupportMessageBubble({
  message,
}: SupportMessageBubbleProps) {
  if (message.sender === "system") {
    return (
      <div className="flex justify-center">
        <span className="rounded-full border border-[#D0D5DD] bg-white px-3 py-1 text-xs font-medium text-[#667085]">
          {message.body}
        </span>
      </div>
    );
  }

  const isAdminMessage = message.sender === "admin";

  return (
    <div className={cn("flex", isAdminMessage ? "justify-end" : "justify-start")}>
      <div className="max-w-[86%] sm:max-w-[64%]">
        <div
          className={cn(
            "rounded-[14px] px-4 py-3 text-sm leading-6 shadow-[0_8px_18px_rgba(16,24,40,0.04)]",
            isAdminMessage
              ? "rounded-br-[4px] bg-[linear-gradient(135deg,#5B0FAE_0%,#43108A_100%)] text-white"
              : "rounded-bl-[4px] bg-[#F2F4F7] text-[#344054]",
          )}
        >
          <p>{message.body}</p>
          <div
            className={cn(
              "mt-1.5 text-[11px] font-medium",
            isAdminMessage
                ? "text-white/70"
                : "text-[#98A2B3]",
            )}
          >
            {formatMessageTimestamp(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
