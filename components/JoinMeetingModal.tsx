import React, { useState } from "react";
import MeetingModal from "./MeetingModal";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const JoinMeetingModal = ({ trigger = <></> }) => {
  const router = useRouter();
  const [link, setLink] = useState("");

  const joinMeeting = () => {
    router.push(link);
  };

  return (
    <MeetingModal
      title="Type the link here"
      className="text-center"
      buttonText="Join Meeting"
      handleClick={joinMeeting}
      trigger={trigger}
    >
      <Input
        placeholder="Meeting link"
        onChange={(e) => setLink(e.target.value)}
        className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </MeetingModal>
  );
};

export default JoinMeetingModal;
