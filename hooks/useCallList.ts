import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useCallList = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!user || !client) return;

    setIsLoading(true);

    // https://getstream.io/video/docs/react/guides/querying-calls/#filters
    client
      .queryCalls({
        sort: [{ field: "starts_at", direction: -1 }],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      })
      .then(({ calls: queriedCalls }) => setCalls(queriedCalls))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [client, user]);

  return { calls, error, isLoading };
};

export default useCallList;
