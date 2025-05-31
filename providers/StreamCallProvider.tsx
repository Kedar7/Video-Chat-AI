"use client";

import useCallById from "@/hooks/useCallById";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { FC, ReactNode } from "react";

const StreamCallProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { meetingId } = useParams();
  const { call, isLoading } = useCallById(meetingId as string);

  if (isLoading) return "Loading...";

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  return <StreamCall call={call}>{children}</StreamCall>;
};

export default StreamCallProvider;
