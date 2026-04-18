"use client";

import { useEffect, useRef } from "react";
import SupportMessageBubble from "@/src/components/admin/support-chat/SupportMessageBubble";
import SupportTypingIndicator from "@/src/components/admin/support-chat/SupportTypingIndicator";
import type { SupportMessage } from "@/src/types/adminSupportChatTypes";

type SupportMessageListProps = {
  isParticipantTyping: boolean;
  messages: SupportMessage[];
};

export default function SupportMessageList({
  isParticipantTyping,
  messages,
}: SupportMessageListProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isParticipantTyping]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto bg-white px-4 py-5 sm:px-6"
    >
      <div className="space-y-7">
        {messages.map((message) => (
          <SupportMessageBubble key={message.id} message={message} />
        ))}

        {isParticipantTyping ? <SupportTypingIndicator /> : null}
      </div>
    </div>
  );
}
