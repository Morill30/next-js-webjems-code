import { useEffect, useState } from "react";
import SignInModal from "../signInModal";
import { useSession } from "next-auth/react";
import { SessionData } from "@/pages/api/auth/[...nextauth]";
import { socket } from "@/config/web-socket";
import axios from "axios";

type ReactInputEvent = React.ChangeEvent<HTMLInputElement> & {
  key: any;
};

type UserInfo = {
  username?: string;
  email?: string;
  id?: number;
  provider?: string;
  displayName?: string;
  profileImage?: string;
};

export default function ChatRoom({
  friendId,
  groupChatName,
}: {
  friendId?: number;
  groupChatName?: string;
}) {
  const { data: session, status }: SessionData = useSession();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [messagesLoaded, setMessagesLoaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [friendInfo, setFriendInfo] = useState<UserInfo>({});

  function setShowModalRedirect(data: boolean): void {
    console.log(data);
    setShowModal(data);
    if (data === false) {
      window.location.href = "/";
    }
  }

  async function getOnlineMessages() {
    const response = await fetch("/api/socket-rooms", {
      method: "POST",
      body: JSON.stringify({
        groupChatName,
        friendId,
        userId: session?.id,
        user: session?.user,
      } as ConnectionObject),
    });
    return await response.json();
  }

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
    setMessagesLoaded(true);
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

  const sendMessage = () => {
    if (inputMessage && status === "authenticated") {
      const userMessage: MessageData = {
        message: inputMessage,
        user: session?.user,
        userId: session?.id,
        connectionObject: {
          userId: session?.id,
          user: session?.user,
          groupChatName,
          friendId,
        },
      };
      setMessages([userMessage, ...messages]);
      socket.emit("sendMessage", userMessage, (error: string) => {
        // Sending the message to the backend
        if (error) {
          alert(error);
        }
      });
      setInputMessage("");
    }
  };

  const handleChange = (e: ReactInputEvent) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      sendMessage();
    }
  };

  function getChatName(): string | undefined {
    if (friendId && friendId > 0) {
      return friendInfo.displayName
        ? friendInfo.displayName
        : friendInfo?.username;
    } else {
      return groupChatName;
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowModal(true);
    }
    if (status === "authenticated" && session?.user) {
      const connectionObject: ConnectionObject = {
        groupChatName,
        friendId,
        userId: session?.id,
        user: session?.user,
      };
      socket.emit("join", connectionObject, (error: string) => {
        //Sending the username to the backend as the user connects.
        if (error) return alert(error);
      });
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

  useEffect(() => {
    if (friendId) {
      axios.get(`/api/user/${friendId}`).then((response) => {
        if (response.data) {
          setFriendInfo(response.data?.data);
        }
      });
    }
  }, [friendId]);

  return (
    <div className=" bg-white h-[calc(100vh-56px)] md:h-[100vh] w-full max-w-full overflow-hidden flex flex-col items-center">
      <div className=" flex items-center gap-4 w-full bg-slate-200 p-4">
        <div className=" flex justify-center items-center rounded-full h-9 w-9 bg-green-600 text-white uppercase">
          {getChatName()?.[0]}
        </div>
        <div className=" inline-block text-slate-500">
          {getChatName()} {groupChatName && "Chat"}
        </div>
      </div>
      <div className="flex flex-1 flex-col-reverse max-w-[700px] w-full h-full overflow-auto px-3 pb-4">
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
        ) : !messagesLoaded ? (
          <ul className="mt-5 space-y-3 animate-pulse">
            <li className="w-36 h-11 ml-auto bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-36 h-11 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-72 h-11 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-36 h-11 ml-auto bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-36 h-11 bg-gray-200 rounded-md dark:bg-gray-700"></li>
            <li className="w-56 h-11 ml-auto bg-gray-200 rounded-md dark:bg-gray-700"></li>
          </ul>
        ) : (
          <div className="flex justify-center">Chat has not started yet!</div>
        )}
      </div>
      <div className=" h-[86px] box-border flex justify-center p-5 bg-white shadow-inner w-full">
        <input
          className=" rounded-lg w-full max-w-[400px] bg-slate-100 border-2 border-slate-200"
          type="text"
          placeholder="Type your message"
          value={inputMessage}
          disabled={!isConnected}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className={` ${
            !isConnected && " bg-slate-400"
          } bg-slate-500 py-2 px-4 ml-2 rounded-lg text-white`}
          disabled={!isConnected}
          onClick={sendMessage}
        >
          Send
        </button>
        <div className=" flex items-center ml-5">
          {isConnected ? (
            <span className=" block h-3 w-3 bg-green-600 rounded-full shadow-md" />
          ) : (
            <span className=" block h-3 w-3 bg-red-600 rounded-full shadow-md" />
          )}
        </div>
      </div>
      <span className=" text-center pb-2 text-slate-800 font-thin">
        Webjems Powered chat v0.0.2
      </span>
      <SignInModal showModal={showModal} setShowModal={setShowModalRedirect} />
    </div>
  );
}
