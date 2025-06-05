"use client";

import MeetingCard from "@/components/MeetingCard";
import useCallList from "@/hooks/useCallList";
import { useRouter } from "next/navigation";
import React from "react";

const Upcoming = () => {
  const router = useRouter();
  const { calls, isLoading, error } = useCallList();

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return error.toString?.();
  }

  const upcomingCalls = (() => {
    const now = new Date();

    return calls?.filter(({ state: { startsAt } }) => {
      return startsAt && new Date(startsAt) > now;
    });
  })();

  if (!upcomingCalls?.length) {
    return "No upcoming calls";
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <ul className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {upcomingCalls.map((call) => (
          <li key={call.id}>
            <MeetingCard
              icon="bi-calendar-event"
              title={call.state?.custom?.description || "No Description"}
              subTitle={
                <MeetingCard.dateStr
                  date={call.state?.startsAt?.toLocaleString()}
                />
              }
              bottomSlot={
                <>
                  <MeetingCard.ParticipantAvatars />
                  <MeetingCard.ActionBtns
                    buttonIcon="bi-play-fill"
                    buttonText="Start"
                    handleClick={() => router.push(`/meetings/${call.id}`)}
                    link={`${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${call.id}`}
                  />
                </>
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Upcoming;
