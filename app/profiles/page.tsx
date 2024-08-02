"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Profiles() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status !== "authenticated") {
      window.location.href = "/";
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white">
          Quem está assistindo?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-white
                overflow-hidden"
              >
                <img src="/images/default-blue.png" alt="Profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {session?.user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
