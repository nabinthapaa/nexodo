import { Task, TodoForm } from "@/components";
import { wait } from "@/utils/wait";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface returnType {
  todos: any[];
  complete: number | undefined;
  incomplete: number;
}

async function fetchTodos(email: string): Promise<returnType> {
  try {
    const res = await fetch(`http://localhost:3000/api/todos?id=${email}`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await res.json();
    const complete = data?.filter((e: any) => e.completed).length || 0;
    const incomplete = data?.length - complete || 0;
    return { todos: data, complete, incomplete };
  } catch (error) {
    console.error("Fetch error:", error);
    return { todos: [], complete: 0, incomplete: 0 };
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session === null) redirect("/");
  const { todos, complete, incomplete } = await fetchTodos(
    session?.user?.email as string
  );
  // Delayed so that the nav signin button changes to sign out at the same
  // time as the todos are loaded
  await wait(500);

  return (
    <div className="w-fit">
      <TodoForm />
      <div className="flex gap-4 mt-4 flex-wrap">
        <div className="completed w-96">
          <h2 className="font-bold text-xl">To Complete</h2>
          {todos?.map((todo) =>
            !todo.completed ? <Task key={todo.id} {...todo} /> : null
          )}
          {!incomplete ? "No more task left to do" : null}
        </div>
        <div className="notCompleted w-96">
          <h2 className="font-bold text-xl">Completed</h2>
          {todos?.map((todo) =>
            todo.completed ? <Task key={todo.id} {...todo} /> : null
          )}
          {!complete ? "Complete some task" : null}
        </div>
      </div>
    </div>
  );
}
