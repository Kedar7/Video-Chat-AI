"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import {
  CallingState,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { FC, useState } from "react";

type MeetingProps = {
  params: { meetingId: string };
};

const Meeting: FC<MeetingProps> = (props) => {
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  return (
    <StreamTheme>
      {isSetupCompleted ? (
        <MeetingRoom />
      ) : (
        <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
      )}
    </StreamTheme>
  );
};

export default Meeting;
