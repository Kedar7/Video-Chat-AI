"use client";

import React, { FC, ReactNode, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Textarea } from "./ui/textarea";
import "react-datepicker/dist/react-datepicker.css";
import MeetingModal from "./MeetingModal";
import useCreateMeeting from "@/hooks/useCreateMeeting";
import { useToast } from "./ui/use-toast";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const ScheduleCallModal: FC<{ trigger: ReactNode }> = ({ trigger }) => {
  const { toast } = useToast();
  const [model, setModel] = useState(initialValues);
  const { call: createdCall, createMeeting } = useCreateMeeting();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${createdCall?.id}`;

  return (
    <>
      {createdCall && (
        <MeetingModal
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
      )}
      <MeetingModal
        key={createdCall?.id}
        title="Create Meeting"
        className="text-center"
        buttonText="Schedule Meeting"
        handleClick={() => createMeeting(model)}
        trigger={trigger}
      >
        <>
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setModel({ ...model, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={model.dateTime}
              onChange={(date) => setModel({ ...model, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </>
      </MeetingModal>
    </>
  );
};

export default ScheduleCallModal;
