"use client";

import React from "react";
import MeetingModal from "./MeetingModal";
import useCreateMeeting from "@/hooks/useCreateMeeting";
import { useRouter } from "next/navigation";

const InstantMeetingModal = ({ trigger = <></> }) => {
  const router = useRouter();
  const { createMeeting } = useCreateMeeting();

  const instantCall = () => {
    createMeeting({
      description: "Instant Meeting",
      postCreate: (call) => {
        router.push(`/meetings/${call.id}`);
      },
    });
  };

  return (
    <MeetingModal
      title="Start an Instant Meeting"
      className="text-center text-dark"
      buttonText="Start Meeting"
      handleClick={instantCall}
      trigger={trigger}
    />
  );
};

export default InstantMeetingModal;
