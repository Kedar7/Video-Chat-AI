"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCreateMeeting from "@/hooks/useCreateMeeting";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const DataRow = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <dt className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </dt>
      <dd className="text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </dd>
    </div>
  );
};

const Personal = () => {
  const router = useRouter();
  const { user } = useUser();
  const { call, createMeeting } = useCreateMeeting();
  const { toast } = useToast();

  const meetingId = user?.id;

  const startRoom = () => {
    if (!call) {
      createMeeting({
        id: meetingId,
        description: "Personal Meeting",
        postCreate: () => {
          router.push(`/meetings/${meetingId}`);
        },
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${meetingId}`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <DataRow
          title="Topic"
          description={`${user?.fullName || user?.username}'s Meeting Room`}
        />
        <DataRow title="Meeting ID" description={meetingId!} />
        <DataRow title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-dark-3 text-white hover:text-white" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3 text-white hover:text-white"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default Personal;
