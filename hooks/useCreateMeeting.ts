"use client";

import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";

const useCreateMeeting = () => {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const [call, setCall] = useState<Call>();

  const createMeeting = async ({
    id = crypto.randomUUID(),
    dateTime = new Date(),
    description = "",
    postCreate = (call: Call) => {},
  }) => {
    if (!client || !user) {
      console.warn("Client or User not available", { client, user });
      return;
    }
    try {
      if (!dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }

      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        dateTime.toISOString() || new Date(Date.now()).toISOString();
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCall(call);

      postCreate(call);

      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  return { call, createMeeting };
};

export default useCreateMeeting;
