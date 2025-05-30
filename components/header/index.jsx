import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, auth } from "@/auth";

const SignIn = (props) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button {...props}>Sign in</button>
    </form>
  );
};

const SignOut = (props) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props}>Sign out</button>
    </form>
  );
};

const Header = async () => {
  const session = await auth();

  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      <Link href="/client">Client Side Component</Link>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          <Image src={session.user.image} alt="user" width={32} height={32} />
          <span>{session.user.name}</span>
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
};

export default Header;
