"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

export default function Task(props: any) {
  const [isCompleted, setIsCompleted] = useState(props.completed);
  const router = useRouter();
  const { data: session } = useSession();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsCompleted((prev: any) => (prev === 0 ? 1 : 0));
    await fetch("http://localhost:3000/api/todos", {
      method: "PATCH",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !isCompleted,
        id: props.id,
        email: session?.user?.email,
      }),
    });

    router.refresh();
  }

  async function handleDelete() {
    await fetch("http://localhost:3000/api/todos", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });
    router.refresh();
  }

  return (
    <div className="mt-2 flex gap-2 w-fit items-start">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => handleChange(e)}
        className="mt-2 cursor-pointer p-10"
      />
      <div>
        <p
          className="font-md text-md w-96 flex items-center gap-1"
          datatype={props.completed}
        >
          {props.task + "  "}
          {isCompleted ? (
            <span
              onClick={handleDelete}
              className="bg-red-500 text-white text-sm cursor-pointer aspect-square p-1 rounded-full text-[10px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          ) : null}
        </p>
        {!isCompleted ? (
          <p className="createdAt text-gray-500 text-sm">
            {new Date(props.createdAt).toLocaleString()}
          </p>
        ) : (
          <>
            <p className="text-green-500 text-sm">
              {new Date(props.completedAt).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
