import SteamProvider from "@/providers/StreamProvider";
import React, { FC, ReactNode } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import StreamCallProvider from "@/providers/StreamCallProvider";

const MeetingLayout: FC<{
  params: { meetingId: string };
  children: ReactNode;
}> = ({ params, children }) => {
  return <StreamCallProvider>{children}</StreamCallProvider>;
};

export default MeetingLayout;
