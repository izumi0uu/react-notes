import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import ClientComponent from "@/components/clientComponent";

export default async function ClientPage() {
  const session = await auth();

  if (session?.user)
    session.user = {
      name: session.user.name,
      image: session.user.image,
      email: session.user.email,
    };

  return (
    <SessionProvider session={session}>
      <ClientComponent />
    </SessionProvider>
  );
}
