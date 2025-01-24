"use client";

import { useSession } from "next-auth/react";

const ClientComponent = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      )}
    </div>
  );
};

export default ClientComponent;
