"use client";


import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClientSideSuspense, useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Inbox = () => {
    return (
        <>
            <ClientSideSuspense fallback={
                <>
                    <Button
                        variant="ghost"
                        disabled
                        className="relative p-2 text-gray-600 hover:text-gray-800"
                        size="icon"    
                        >
                        <BellIcon className="size-5" />
                    </Button>
                    <Separator orientation="vertical" className="h-6"/>
                </>
            }>
                <InboxMenu />
            </ClientSideSuspense>
        </>
    );
}


const InboxMenu = () => {
    const { inboxNotifications } = useInboxNotifications();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative p-2 text-gray-600 hover:text-gray-800"
                        size="icon"    
                    >
                        <BellIcon className="size-5" />
                        {inboxNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 size-4 text-xs bg-sky-500 rounded-full text-white flex items-center justify-center">
                                {inboxNotifications.length}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-auto">
                    {
                        inboxNotifications.length > 0 ? (
                            <InboxNotificationList>
                                {inboxNotifications.map((inboxNotification) => (
                                    <InboxNotification
                                        key={inboxNotification.id}
                                        inboxNotification={inboxNotification}
                                    />
                                ))}
                            </InboxNotificationList>
                        ) : (
                            <div className="p-2 w-[400px] text-center text-muted-foreground">
                                No notifications
                            </div>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="h-6"/>
        </>
     )
}