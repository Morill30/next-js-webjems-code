import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/config/web-socket";
import { SessionWeb } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import SignInModal from "@/components/signInModal";

type SessionData = {
  data: SessionWeb | null;
  status: string;
};

type MessageData = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  message: string;
  userId?: number;
};

type ReactInputEvent = React.ChangeEvent<HTMLInputElement> & {
  key: any;
};

export default function ChatRoom() {
  const { data: session, status }: SessionData = useSession();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function parseMessageResponse(): Promise<MessageData[]> {
    //Getting the welcome message from the backend
    const response = await getOnlineMessages();

    const onlineMessage: MessageData[] = response.data.map((message: any) => {
      return {
        user: {
          name: message.attributes.users_permissions_user.data.attributes
            .username,
          email:
            message.attributes.users_permissions_user.data.attributes.email,
        },
        message: message.attributes.messageString,
        userId: message.attributes.users_permissions_user.data.id,
      };
    });
    return onlineMessage;
  }

  async function onWelcome(data: MessageData, error: string): Promise<any> {
    if (data) {
      const onlineMessage = await parseMessageResponse();
      setMessages(onlineMessage); //Storing the Welcome Message
    } else {
      console.log("an error has occurred!");
    }
  }

  function onMessage(data: MessageData, error: string): any {
    //Listening for a message connection
    setMessages((prev) => [data, ...prev]);
  }

  async function onConnect() {
    setIsConnected(true);
    const onlineMessage = await parseMessageResponse();
    setMessages(onlineMessage); //Storing the Welcome Message
  }
  function onDisconnect() {
    setIsConnected(false);
  }

  async function getOnlineMessages() {
    const response = await fetch("/api/user-messages");
    return await response.json();
  }

  function setShowModalRedirect(data: boolean): void {
    console.log(data);
    setShowModal(data);
    if (data === false) {
      window.location.href = "/";
    }
  }

  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      // window.location.href = "/";
      setShowModal(true);
    }
    if (status === "authenticated" && session?.user) {
      socket.emit(
        "join",
        { id: session?.id, user: session?.user },
        (error: string) => {
          //Sending the username to the backend as the user connects.
          if (error) return alert(error);
        }
      );
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("welcome", onWelcome);
      socket.on("message", onMessage);

      if (!isConnected) {
        socket.connect();
      }
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("welcome", onWelcome);
      socket.off("message", onMessage);
    };
  }, [status]);

  const sendMessage = () => {
    if (message && status === "authenticated") {
      const userMessage: MessageData = {
        message,
        user: session?.user,
        userId: session?.id,
      };
      setMessages([userMessage, ...messages]);
      socket.emit("sendMessage", userMessage, (error: string) => {
        // Sending the message to the backend
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    }
  };

  const handleChange = (e: ReactInputEvent) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      sendMessage();
    }
  };

  const handleClick = () => {
    sendMessage();
  };

  return (
    <div className=" h-[calc(100vh-56px)] md:h-[100vh] w-full max-w-full overflow-hidden flex flex-col items-center">
      <div className="flex flex-col-reverse max-w-[700px] w-full h-full overflow-auto px-3 pb-4">
        {messages.length ? (
          messages.map((item, index) => {
            const isCurrentUser = item.userId === session?.id;
            if (item?.user?.name === "bot") {
              return (
                <div
                  key={index + "message-user"}
                  className={`flex flex-col items-center`}
                >
                  <span
                    className={`flex flex-col bg-slate-700 text-white px-4 py-2 w-fit rounded-lg my-2 shadow-md`}
                  >
                    <span className=" font-semibold text-sm">WebJems</span>
                    {item.message}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={index + "message-user"}
                className={`${
                  isCurrentUser && "ml-auto items-end"
                } flex flex-col`}
              >
                <span
                  className={` ${
                    isCurrentUser
                      ? "bg-teal-500 items-end rounded-br-none"
                      : " bg-green-500 items-start rounded-bl-none"
                  } flex flex-col text-white px-4 py-2 w-fit rounded-lg my-2 shadow-md`}
                >
                  <span className=" font-semibold text-sm">
                    {!isCurrentUser && item.user?.name}
                  </span>
                  {item.message}
                </span>
              </div>
            );
          })
        ) : (
          <ul className="mt-5 space-y-3 animate-pulse">
            <li className="w-36 h-11 ml-auto bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-36 h-11 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-72 h-11 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-36 h-11 ml-auto bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-36 h-11 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-56 h-11 ml-auto bg-gray-200 rounded-md dark:bg-gray-700"></li>
          </ul>
        )}
      </div>
      <div className=" h-[86px] box-border flex justify-center p-5 bg-white border-t-2 border-slate-200 w-full">
        <input
          className=" rounded-lg w-full max-w-[400px]"
          type="text"
          placeholder="Type your message"
          value={message}
          disabled={!isConnected}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className={` ${
            !isConnected && " bg-slate-400"
          } bg-blue-600 py-2 px-4 ml-2 rounded-lg text-white`}
          disabled={!isConnected}
          onClick={handleClick}
        >
          Send
        </button>
      </div>
      <span className=" text-center pb-2">
        {!isConnected && "disconneted!"}
      </span>
      <span className=" text-center pb-2">
        Webjems Powered chat v0.0.1 beta
      </span>
      <SignInModal showModal={showModal} setShowModal={setShowModalRedirect} />
    </div>
  );
}
