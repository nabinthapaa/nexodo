"use client";
import { Task, TodoForm } from "@/components";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<any[]>([]);
  const [totalIncomplete, setTotalIncomplete] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        if (!session?.user?.email) return;
        const res = await fetch(
          `http://localhost:3000/api/todos?id=${session?.user?.email}`,
          {
            method: "GET",
            cache: "no-cache",
          }
        );
        const data = await res.json();
        const complete = data?.filter((e: any) => e.completed).length || 0;
        const incomplete = data?.length - complete || 0;

        setTodos(data);
        setTotalIncomplete(incomplete);
        setTotalCompleted(complete);
      } catch (error) {
        console.error("Fetch error:", error);
        return;
      }
    })();
  }, [session?.user?.email]);

  return (
    session?.user && (
      <div className="w-fit">
        <TodoForm />
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="completed w-96">
            <h2 className="font-bold text-xl">To Complete</h2>
            {todos?.map((todo) =>
              !todo.completed ? <Task key={todo.id} {...todo} /> : null
            )}
            {!totalIncomplete ? "No more task left to do" : null}
          </div>
          <div className="notCompleted w-96">
            <h2 className="font-bold text-xl">Completed</h2>
            {todos?.map((todo) =>
              todo.completed ? <Task key={todo.id} {...todo} /> : null
            )}
            {!totalCompleted ? "Complete some task" : null}
          </div>
        </div>
      </div>
    )
  );
}
