import io from "socket.io-client";

const STRAPI_ENDPOINT: string = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export const socket = io(STRAPI_ENDPOINT);
