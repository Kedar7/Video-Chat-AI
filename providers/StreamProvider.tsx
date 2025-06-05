import { getCallToken } from "@/actions/callClient.actions";
import { currentUser } from "@clerk/nextjs/server";

import React, { FC, ReactNode } from "react";
import StreamClientProvider from "./StreamClientProvider";

const SteamProvider: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const user = await currentUser();
  const token = await getCallToken();

  if (!user) return;

  return (
    <StreamClientProvider
      user={{
        id: user.id,
        name: user.fullName || user.id,
        image: user.imageUrl,
      }}
      token={token}
    >
      {children}
    </StreamClientProvider>
  );
};

export default SteamProvider;
