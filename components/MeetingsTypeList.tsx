/* eslint-disable camelcase */
"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import ScheduleCallModal from "./ScheduleCallModal";
import { Input } from "./ui/input";
import InstantMeetingModal from "./InstantMeetingModal";
import JoinMeetingModal from "./JoinMeetingModal";

const MeetingTypeList: FC<{ className: string }> = ({ className }) => {
  const router = useRouter();

  return (
    <section
      className={`grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 ${className}`}
    >
      <InstantMeetingModal
        trigger={
          <HomeCard
            icon="bi-plus-circle"
            title="New Meeting"
            description="Start an instant meeting"
          />
        }
      />

      <JoinMeetingModal
        trigger={
          <HomeCard
            icon="bi-box-arrow-in-right"
            title="Join Meeting"
            description="via invitation link"
            className="bg-blue-1"
          />
        }
      />

      <ScheduleCallModal
        trigger={
          <HomeCard
            icon="bi-calendar-plus"
            title="Schedule Meeting"
            description="Plan your meeting"
            className="bg-purple-1"
          />
        }
      />

      {/* {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )} */}

      {/* <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal> */}

      {/* <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      /> */}
    </section>
  );
};

export default MeetingTypeList;
