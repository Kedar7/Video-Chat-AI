"use client";

import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import React, { FC, ReactNode, useEffect, useState } from "react";
import StreamCallProvider from "./StreamCallProvider";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_APP_KEY;

type PropType = {
  user: any;
  token: string;
  children: ReactNode;
};

const StreamClientProvider: FC<PropType> = ({ user, token, children }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user,
      token,
    });

    setVideoClient(client);

    return () => {
      client
        .disconnectUser()
        .catch((error) => console.error(`Couldn't disconnect user`, error));
      setVideoClient(undefined);
    };
  }, [token, user]);

  if (!videoClient) return null;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
