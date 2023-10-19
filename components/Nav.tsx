"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Nav() {
  const router = useRouter();

  async function handleSignIn() {
    try {
      await signIn("github");
      router.push("/");
    } catch (e) {
      console.log({ e });
    }
  }
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between py-4">
      <div className="font-bold text-xl">NEXT TODO</div>
      <div className="flex gap-2 items-center">
        {session?.user ? (
          <button
            className="p-2 px-4 cursor-pointer bg-red-200 rounded-md shadow-slate-200"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        ) : (
          <button
            className="p-2 px-4 cursor-pointer bg-green-200 rounded-md shadow-slate-200"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        )}
        {session?.user ? (
          <div className="w-8 h-8 inline-block rounded-full overflow-hidden">
            <Image
              src={session?.user.image || ""}
              alt=""
              width={100}
              height={100}
            />
          </div>
        ) : null}
      </div>
    </nav>
  );
}
