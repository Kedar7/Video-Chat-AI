"use client";

import MeetingCard from "@/components/MeetingCard";
import useCallList from "@/hooks/useCallList";
import React from "react";

const Previous = () => {
  const { calls, isLoading, error } = useCallList();

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return error.toString?.();
  }

  const previousCalls = (() => {
    const now = new Date();

    return calls?.filter(({ state: { startsAt } }) => {
      return startsAt && new Date(startsAt) < now;
    });
  })();

  if (!previousCalls?.length) {
    return "No Previous calls";
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Previous</h1>
      <ul className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {previousCalls.map((call) => (
          <li key={call.id}>
            <MeetingCard
              icon="bi-clock-history"
              title={call.state?.custom?.description || "No Description"}
              subTitle={
                <MeetingCard.dateStr
                  date={call.state?.startsAt?.toLocaleString()}
                />
              }
              bottomSlot={<MeetingCard.ParticipantAvatars />}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Previous;
