import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/config/web-socket";
import { SessionWeb } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

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
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [message, setMessage] = useState("");

  async function onWelcome(data: MessageData, error: string): Promise<any> {
    //Getting the welcome message from the backend
    setMessages([data]); //Storing the Welcome Message
    // await fetch("http://localhost/api/messages") //Fetching all messages from Strapi
    //   .then(async (res) => {
    //     const response = await res.json();
    //     let arr: any = [welcome];
    //     response.data.map((one: any, i: number) => {
    //       arr = [...arr, one.attributes];
    //       setMessages([...arr]); // Storing all Messages in a state variable
    //     });
    //   })
    //   .catch((e) => console.log(e.message));
  }

  function onMessage(data: MessageData, error: string): any {
    //Listening for a message connection
    setMessages((prev) => [data, ...prev]);
    //   await fetch("http://localhost/api/messages")
    //     .then(async (res) => {
    //       const response = await res.json();
    //       let arr = [welcome];
    //       response.data.map((one, i: number) => {
    //         arr = [...arr, one.attributes];
    //         setMessages((msgs) => arr);
    //       });
    //     })
    //     .catch((e) => console.log(e.message));
  }

  function onConnect() {
    setIsConnected(true);
  }
  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      window.location.href = "/";
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
      <div className="flex flex-col-reverse max-w-[700px] w-full h-full overflow-auto px-3">
        {messages.map((item, index) => {
          const isCurrentUser = item.userId === session?.id;
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
        })}
      </div>
      <div className=" h-[86px] box-border flex justify-center p-5 bg-white border-t-2 border-slate-200 w-full">
        <input
          className=" rounded-lg w-full max-w-[400px]"
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className=" bg-blue-600 py-2 px-4 ml-2 rounded-lg text-white"
          onClick={handleClick}
        >
          send
        </button>
      </div>
      <span className=" text-center pb-2">
        Webjems Powered chat v0.0.1 beta
      </span>
    </div>
  );
}
