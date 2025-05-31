"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_APP_KEY;
const secret = process.env.STREAM_APP_SECRET;

export const getCallToken = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not authenticated");
  if (!apiKey) throw new Error("Stream API key secret is missing");
  if (!secret) throw new Error("Stream API secret is missing");

  const client = new StreamClient(apiKey, secret);
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // 1 hour

  return client.createToken(user.id, exp);
};
