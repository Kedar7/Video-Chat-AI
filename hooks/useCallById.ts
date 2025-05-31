import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useCallById = (id: string) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!client) return;

    client
      .queryCalls({ filter_conditions: { id } })
      .then(({ calls }) => {
        if (calls?.length > 0) setCall(calls[0]);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [client, id]);

  return { call, isLoading };
};

export default useCallById;
