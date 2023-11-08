import React from "react";
import ChatRoom from "@/components/Chat/ChatRoom";
import { useRouter } from "next/router";

export default function UserChat() {
  const router = useRouter();

  return <ChatRoom friendId={parseFloat(router.query.id as string)} />;
}
