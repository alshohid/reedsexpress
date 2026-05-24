"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    ArrowLeft,

    FileText,
    LogOut,
    Paperclip,
    Phone,
    Search,
    SendHorizonal,

} from "lucide-react";
import AdminSupportChatProvider from "@/src/components/admin/support-chat/AdminSupportChatProvider";
import SupportConversationPanel from "@/src/components/admin/support-chat/SupportConversationPanel";
import SupportInboxSidebar from "@/src/components/admin/support-chat/SupportInboxSidebar";
import SupportRequestDocumentModal from "@/src/components/admin/support-chat/SupportRequestDocumentModal";
import {
    formatConversationTimestamp,
    formatMessageTimestamp,
} from "@/src/components/admin/support-chat/supportChatUtils";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { useAdminSupportChat } from "@/src/hooks/useAdminSupportChat";
import type {
    SupportConversation,
    SupportDocumentRequest,
    SupportMessage,
} from "@/src/types/adminSupportChatTypes";

const mobileConversationAvatars: Record<string, string> = {
    "support-mandy": "/images/user/user_01.png",
    "support-jennifer": "/images/user/user_02.png",
    "support-robinson": "/images/user/user_03.png",
    "support-jacob": "/images/user/user_04.png",
    "support-olivia": "/images/user/user_05.png",
};

const mobileConversationNames: Record<string, string> = {
    "support-jennifer": "Jennifer",
    "support-robinson": "Robinson",
};

function getMobileConversationName(conversation: SupportConversation) {
    return mobileConversationNames[conversation.id] ?? conversation.participantName;
}

function MobileHomeIndicator() {
    return (
        <div className="flex h-5 shrink-0 items-center justify-center bg-white">
            <span className="h-1 w-[134px] rounded-full bg-[#0F172A]" />
        </div>
    );
}

function MobileConversationAvatar({
    conversation,
    className = "h-11 w-11",
    fallbackClassName = "text-sm",
}: {
    conversation: SupportConversation;
    className?: string;
    fallbackClassName?: string;
}) {
    const avatarSrc = mobileConversationAvatars[conversation.id];

    if (!avatarSrc) {
        return (
            <Avatar className={className}>
                <AvatarFallback
                    className={`${fallbackClassName} font-semibold text-white`}
                    style={{ backgroundColor: conversation.avatarColor }}
                >
                    {conversation.initials}
                </AvatarFallback>
            </Avatar>
        );
    }

    return (
        <span className={`${className} relative block shrink-0 overflow-hidden rounded-full bg-[#E4E7EC]`}>
            <Image
                src={avatarSrc}
                alt={`${conversation.participantName} avatar`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
            />
        </span>
    );
}

function MobileAdminAvatar() {
    return (
        <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#E4E7EC]">
            <Image
                src="/sidebar/profile_img.jpg"
                alt="Dispatcher avatar"
                width={32}
                height={32}
                className="h-full w-full object-cover"
            />
        </span>
    );
}

function MobileInboxItem({
    conversation,
    onSelect,
}: {
    conversation: SupportConversation;
    onSelect: (conversationId: string) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onSelect(conversation.id)}
            className="flex w-full items-start gap-3 rounded-[16px] px-1 py-2.5 text-left transition active:bg-[#F8FAFC]"
        >
            <MobileConversationAvatar conversation={conversation} className="h-11 w-11" />

            <span className="min-w-0 flex-1 pt-0.5">
                <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0 truncate text-[16px] font-semibold leading-5 text-[#101828]">
                        {getMobileConversationName(conversation)}
                    </span>
                    <span className="shrink-0 pt-0.5 text-[11px] font-medium text-[#667085]">
                        {formatConversationTimestamp(conversation.lastMessageAt)}
                    </span>
                </span>

                <span className="mt-1 flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-[13px] leading-4 text-[#98A2B3]">
                        {conversation.lastMessagePreview}
                    </span>
                    {conversation.unreadCount > 0 ? (
                        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#313A8A] px-1 text-[10px] font-semibold text-white">
                            {conversation.unreadCount}
                        </span>
                    ) : null}
                </span>
            </span>
        </button>
    );
}

function MobileInboxView({
    conversations,
    searchQuery,
    onSearchChange,
    onSelectConversation,
}: {
    conversations: SupportConversation[];
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onSelectConversation: (conversationId: string) => void;
}) {
    return (
        <section className="flex h-full min-h-0 flex-col bg-white">


            <div className="px-6 pt-4">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-[19px] font-semibold leading-6 text-[#101828]">
                        Communications
                    </h1>

                </div>

                <label className="relative mt-5 block" htmlFor="mobile-communication-search">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7C8798]" />
                    <input
                        id="mobile-communication-search"
                        value={searchQuery}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search"
                        className="h-12 w-full rounded-[10px] border border-[#D8DDE8] bg-[#F8FAFC] pl-12 pr-4 text-sm text-[#101828] outline-none placeholder:text-[#8A94A6] focus:border-[#C7D7FE] focus:bg-white"
                    />
                </label>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 pt-4">
                {conversations.length > 0 ? (
                    <div className="space-y-1.5">
                        {conversations.map((conversation) => (
                            <MobileInboxItem
                                key={conversation.id}
                                conversation={conversation}
                                onSelect={onSelectConversation}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-center text-sm text-[#667085]">
                        No conversations found.
                    </div>
                )}
            </div>

            <MobileHomeIndicator />
        </section>
    );
}

function MobileQuickActionBar({
    conversation,
    onRequestDocuments,
}: {
    conversation: SupportConversation;
    onRequestDocuments: () => void;
}) {
    if (!conversation.quickActions.length) {
        return null;
    }

    const promptAction = conversation.quickActions[0];
    const buttonAction = conversation.quickActions[1] ?? conversation.quickActions[0];

    return (
        <div className="border-b border-[#EAECF0] px-5 py-3">
            <div className="flex items-center justify-between gap-3 rounded-[8px] border border-[#BFD8FF] bg-[#EEF6FF] p-2">
                <div className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-[#006AFF]">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-white text-[#006AFF]">
                        <FileText className="h-4 w-4" />
                    </span>
                    <span className="truncate">{promptAction.label}</span>
                </div>

                <button
                    type="button"
                    onClick={onRequestDocuments}
                    className="inline-flex h-9 shrink-0 items-center justify-center rounded-[7px] bg-[#006AFF] px-5 text-sm font-medium text-white shadow-[0_8px_16px_rgba(0,106,255,0.18)] transition active:bg-[#0055D4]"
                >
                    {buttonAction.label.replace(" Documents", "")}
                </button>
            </div>
        </div>
    );
}

function MobileDocumentRequestCard({ message }: { message: SupportMessage }) {
    const requestedDocuments = message.documentRequest?.documentTypes ?? [];
    const note = message.documentRequest?.message?.trim() || "Need these documents";

    return (
        <div>
            <p className="mb-2 text-center text-xs font-medium text-[#98A2B3]">
                {formatMessageTimestamp(message.createdAt)}
            </p>
            <div className="flex justify-end">
                <article className="w-[198px] rounded-[10px] bg-[#EEF6FF] px-4 py-3 text-sm text-[#344054]">
                    <h4 className="font-semibold text-[#006AFF]">Document Request</h4>
                    <p className="mt-2 text-[13px] leading-5">{note}</p>
                    {requestedDocuments.length > 0 ? (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {requestedDocuments.map((documentType) => (
                                <span
                                    key={documentType}
                                    className="inline-flex h-9 items-center justify-center rounded-[6px] border border-[#D8DDE8] bg-white px-3 text-sm font-medium text-[#101828]"
                                >
                                    {documentType}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </article>
            </div>
        </div>
    );
}

function MobileMessageBubble({
    conversation,
    message,
}: {
    conversation: SupportConversation;
    message: SupportMessage;
}) {
    if (message.sender === "system") {
        return (
            <div className="flex justify-center">
                <span className="rounded-full bg-[#F2F4F7] px-3 py-1 text-xs text-[#667085]">
                    {message.body}
                </span>
            </div>
        );
    }

    if (message.documentRequest) {
        return <MobileDocumentRequestCard message={message} />;
    }

    const isOutgoing = message.sender === "admin";

    return (
        <div>
            <p className="mb-2 text-center text-xs font-medium text-[#98A2B3]">
                {formatMessageTimestamp(message.createdAt)}
            </p>
            <div className={`flex items-end gap-2 ${isOutgoing ? "justify-end" : "justify-start"}`}>
                {!isOutgoing ? (
                    <MobileConversationAvatar
                        conversation={conversation}
                        className="h-6 w-6"
                        fallbackClassName="text-[10px]"
                    />
                ) : null}

                <div
                    className={`max-w-[76%] rounded-[10px] px-4 py-2.5 text-[15px] leading-6 ${isOutgoing
                        ? "rounded-br-[3px] bg-[#313A8A] text-white"
                        : "rounded-bl-[3px] bg-[#F2F4F7] text-[#101828]"
                        }`}
                >
                    {message.body}
                </div>

                {isOutgoing ? <MobileAdminAvatar /> : null}
            </div>
        </div>
    );
}

function MobileMessageList({
    conversation,
    messages,
}: {
    conversation: SupportConversation;
    messages: SupportMessage[];
}) {
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
    }, [conversation.typing, messages.length]);

    return (
        <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
            <div className="space-y-4 pb-3">
                {messages.map((message) => (
                    <MobileMessageBubble
                        key={message.id}
                        conversation={conversation}
                        message={message}
                    />
                ))}

                {conversation.typing ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#98A2B3]">
                        <MobileConversationAvatar
                            conversation={conversation}
                            className="h-6 w-6"
                            fallbackClassName="text-[10px]"
                        />
                        Typing...
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function MobileComposer({
    draft,
    onDraftChange,
    onSend,
}: {
    draft: string;
    onDraftChange: (value: string) => void;
    onSend: (body: string) => void;
}) {
    const handleSend = () => {
        if (!draft.trim()) {
            return;
        }

        onSend(draft);
    };

    return (
        <div className="shrink-0 border-t border-[#EAECF0] bg-white px-5 pb-4 pt-3">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="inline-flex h-9 w-7 shrink-0 items-center justify-center text-[#101828]"
                    aria-label="Attach file"
                >
                    <Paperclip className="h-5 w-5" />
                </button>

                <div className="flex min-w-0 flex-1 items-center rounded-full border border-[#E4E7EC] bg-white px-4 shadow-[0_8px_18px_rgba(16,24,40,0.04)]">
                    <input
                        value={draft}
                        onChange={(event) => onDraftChange(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Type your message"
                        className="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#8A94A6]"
                    />

                    {draft.trim() ? (
                        <button
                            type="button"
                            onClick={handleSend}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#313A8A] text-white"
                            aria-label="Send message"
                        >
                            <SendHorizonal className="h-4 w-4" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function MobileConversationView({
    conversation,
    draft,
    messages,
    onBack,
    onDraftChange,
    onRequestDocuments,
    onSendMessage,
}: {
    conversation: SupportConversation | null;
    draft: string;
    messages: SupportMessage[];
    onBack: () => void;
    onDraftChange: (value: string) => void;
    onRequestDocuments: () => void;
    onSendMessage: (body: string) => void;
}) {
    if (!conversation) {
        return (
            <section className="flex h-full flex-col bg-white">
                <div className="flex flex-1 items-center justify-center px-8 text-center text-sm text-[#667085]">
                    Select a conversation to start chatting.
                </div>
                <MobileHomeIndicator />
            </section>
        );
    }

    return (
        <section className="flex h-full min-h-0 flex-col bg-white">


            <header className="shrink-0 border-b border-[#EAECF0] px-5 pb-3 pt-2">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="-ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#101828] transition active:bg-[#F2F4F7]"
                            aria-label="Back to conversations"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="relative shrink-0">
                            <MobileConversationAvatar conversation={conversation} className="h-11 w-11" />
                            {conversation.online ? (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#0A7CFF]" />
                            ) : null}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-[16px] font-semibold leading-5 text-[#101828]">
                                {conversation.participantName}
                            </h2>
                            <p className="mt-1 truncate text-xs leading-4 text-[#98A2B3]">
                                {conversation.carrierName} • {conversation.participantRoleLabel} • {conversation.participantEmail}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#101828] transition active:bg-[#F2F4F7]"
                        aria-label="Call participant"
                    >
                        <Phone className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <MobileQuickActionBar
                conversation={conversation}
                onRequestDocuments={onRequestDocuments}
            />
            <MobileMessageList conversation={conversation} messages={messages} />
            <MobileComposer
                draft={draft}
                onDraftChange={onDraftChange}
                onSend={onSendMessage}
            />
            <MobileHomeIndicator />
        </section>
    );
}

function AdminSupportMessageWorkspace() {
    const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false);
    const [isMobileRequestModalOpen, setIsMobileRequestModalOpen] = useState(false);
    const {
        activeConversation,
        activeConversationId,
        activeDraft,
        activeMessages,
        filteredConversations,
        searchQuery,
        selectConversation,
        sendDocumentRequest,
        sendMessage,
        updateDraft,
        updateSearch,
    } = useAdminSupportChat();

    const handleMobileConversationSelect = (conversationId: string) => {
        selectConversation(conversationId);
        setIsMobileConversationOpen(true);
    };

    const handleMobileDocumentRequest = (payload: SupportDocumentRequest) => {
        sendDocumentRequest(payload);
    };

    return (
        <>
            <section className="hidden h-[calc(100vh-132px)] min-h-[620px] overflow-hidden rounded-[22px] border border-[#E4E7EC] bg-white shadow-[0_14px_34px_rgba(16,24,40,0.08)] md:block">
                <div className="grid h-full min-h-0 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)]">
                    <SupportInboxSidebar
                        activeConversationId={activeConversationId}
                        conversations={filteredConversations}
                        searchQuery={searchQuery}
                        onSearchChange={updateSearch}
                        onSelectConversation={selectConversation}
                    />

                    <SupportConversationPanel
                        conversation={activeConversation}
                        draft={activeDraft}
                        messages={activeMessages}
                        mode="dispatcher"
                        onDraftChange={updateDraft}
                        onSendMessage={sendMessage}
                        onSendDocumentRequest={sendDocumentRequest}
                    />
                </div>
            </section>

            <section className="-m-4 h-[calc(100dvh-72px)] min-h-[620px] overflow-hidden bg-white md:hidden">
                {isMobileConversationOpen ? (
                    <MobileConversationView
                        conversation={activeConversation}
                        draft={activeDraft}
                        messages={activeMessages}
                        onBack={() => setIsMobileConversationOpen(false)}
                        onDraftChange={updateDraft}
                        onRequestDocuments={() => setIsMobileRequestModalOpen(true)}
                        onSendMessage={sendMessage}
                    />
                ) : (
                    <MobileInboxView
                        conversations={filteredConversations}
                        searchQuery={searchQuery}
                        onSearchChange={updateSearch}
                        onSelectConversation={handleMobileConversationSelect}
                    />
                )}
            </section>

            <SupportRequestDocumentModal
                isOpen={isMobileRequestModalOpen}
                onClose={() => setIsMobileRequestModalOpen(false)}
                onSubmit={handleMobileDocumentRequest}
            />
        </>
    );
}

export default function DispatcherCommunicationContainer() {
    return (
        <AdminSupportChatProvider>
            <AdminSupportMessageWorkspace />
        </AdminSupportChatProvider>
    );
}
