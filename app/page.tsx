"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (!session) {
      router.push("/auth");
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <h1 className="text-8xl font-bold underline text-green-500">
        Hello World
      </h1>
      <button className="h-10 w-40 bg-red-500" onClick={handleSignOut}>
        Sign out
      </button>
    </>
  );
}
