"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function TodoForm() {
  const [task, setTask] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (task === "") return;
    await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        task,
        email: session?.user?.email,
      }),
    });
    setTask("");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="w-fit space-x-3">
      <input
        type="text"
        className="border-light-blue-500 py-2 px-3 rounded-lg outline-4 outline-blue-500 border-2"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <button
        type="submit"
        className="bg-green-500 rounded-xl px-4 py-2 focus-visible:outline-purple-600 focus-visible:outline-offset-2"
      >
        Add Task
      </button>
    </form>
  );
}
