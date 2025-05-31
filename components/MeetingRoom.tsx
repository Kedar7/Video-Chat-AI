"use client";

import {
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  CancelCallButton,
  PaginatedGridLayout,
  ReactionsButton,
  RecordCallButton,
  ScreenShareButton,
  SpeakerLayout,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";

type LayoutTypes = "grid" | "speaker-right" | "speaker-left";

const layouts = [
  { type: "grid", display: "Grid" },
  { type: "speaker-left", display: "Speaker Left" },
  { type: "speaker-right", display: "Speaker Right" },
] satisfies Array<{ type: LayoutTypes; display: string }>;

const CancelCallControl: FC<{ isCreateByMe?: boolean }> = ({
  isCreateByMe,
}) => {
  const router = useRouter();
  const call = useCall();

  const leaveCall = async () => {
    await call?.leave();
    router.push("/");
  };

  const endCall = async () => {
    await call?.endCall();
    router.push("/");
  };

  if (isCreateByMe) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <CancelCallButton />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer" onClick={leaveCall}>
            Leave Call
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={endCall}>
            End Call for All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return <CancelCallButton onClick={leaveCall} />;
};

const CallLayout: FC<{ layout?: LayoutTypes }> = ({ layout }) => {
  switch (layout) {
    case "grid":
      return <PaginatedGridLayout />;
    case "speaker-right":
      return <SpeakerLayout participantsBarPosition="left" />;
    default:
      return <SpeakerLayout participantsBarPosition="right" />;
  }
};

const LayoutControl: FC<{
  layout: LayoutTypes;
  setLayout: (layoutType: LayoutTypes) => void;
}> = ({ layout, setLayout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
        <LayoutList size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Layouts</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={layout}
          onValueChange={(l) => setLayout(l as LayoutTypes)}
        >
          {layouts.map((layout) => (
            <DropdownMenuRadioItem
              key={layout.type}
              value={layout.type}
              className="cursor-pointer"
            >
              {layout.display}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MeetingRoom = () => {
  const call = useCall();
  const [layout, setLayout] = useState<LayoutTypes>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    if (call?.state.callingState === CallingState.IDLE) {
      call?.join();
    }

    return () => {
      if (
        call?.state.callingState !== CallingState.LEFT &&
        call?.state.callingState !== CallingState.JOINING
      ) {
        call?.leave();
      }
    };
  }, [call]);

  return (
    <div className="h-full w-full flex flex-col justify-between relative gap-4">
      {showParticipants && (
        <article className="show-block max-w-[300px] p-4 overflow-hidden bg-dark-2 z-10 absolute top-0 right-0 bottom-[70px]">
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </article>
      )}
      <CallLayout layout={layout} />
      <div className="flex-center gap-4 str-video__call-controls">
        {/* <CallControls onLeave={() => router.push(`/`)} /> */}
        <RecordCallButton />

        <ReactionsButton />

        <ScreenShareButton />

        <SpeakingWhileMutedNotification>
          <ToggleAudioPublishingButton />
        </SpeakingWhileMutedNotification>

        <ToggleVideoPublishingButton />

        <CancelCallControl isCreateByMe={call?.isCreatedByMe} />

        <LayoutControl layout={layout} setLayout={setLayout} />

        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;
