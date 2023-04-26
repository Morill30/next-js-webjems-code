import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
import { SessionWeb } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

type SessionData = {
  data: SessionWeb | null;
  status: string;
};

type welcomeMessage = {
  user: string;
  message: string;
};

export default function ChatRoom({ username = "jemorillo", id = 1 }) {
  const { data: session, status }: SessionData = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const io = socket("http://localhost"); //Connecting to Socket.io backend
  let welcome: welcomeMessage;
  useEffect(() => {
    io.emit("join", { username }, (error: string) => {
      //Sending the username to the backend as the user connects.
      if (error) return alert(error);
    });
    io.on("welcome", async (data, error) => {
      //Getting the welcome message from the backend
      let welcomeMessage = {
        user: data.user,
        message: data.text,
      };
      welcome = welcomeMessage;
      console.log("hello", welcome, welcomeMessage);
      setMessages([welcomeMessage]); //Storing the Welcome Message
      console.log(messages);
      await fetch("http://localhost/api/messages") //Fetching all messages from Strapi
        .then(async (res) => {
          const response = await res.json();
          let arr: any = [welcome];
          response.data.map((one: any, i: number) => {
            arr = [...arr, one.attributes];
            setMessages([...arr]); // Storing all Messages in a state variable
          });
        })
        .catch((e) => console.log(e.message));
    });
    console.log("wow");
    io.on("message", async (data, error) => {
      //Listening for a message connection
      console.log("message", data);
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
    });
  }, [username]);

  const sendMessage = (message: string) => {
    if (message) {
      io.emit("sendMessage", { message, user: username }, (error: string) => {
        // Sending the message to the backend
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
    sendMessage(message);
  };
  return (
    <>
      {session?.user?.name} {session?.id} email={session?.user?.email}
      {messages.map((item) => (
        <>- {}</>
      ))}
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={handleChange}
      />
      <button onClick={handleClick}>send</button>
    </>
  );
}
