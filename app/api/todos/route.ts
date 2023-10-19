import { NextRequest } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

let db: any = null;

export async function GET(req: NextRequest, res: Response) {
  const email = req.nextUrl.searchParams.get("id");

  if (!db) {
    db = await open({
      filename: "./todobase.db",
      driver: sqlite3.Database,
    });
  }
  const todos = await db.all("SELECT * FROM Todos where email=?", email);
  return new Response(JSON.stringify(todos), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(req: Request, res: Response) {
  const { task, email } = await req.json();
  if (task === "") {
    return new Response(
      JSON.stringify({
        error: "Task not specified",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  let id = Math.floor(Math.random() * 20000);
  let createdAt = new Date().toISOString();
  if (!db) {
    db = await open({
      filename: "./todobase.db",
      driver: sqlite3.Database,
    });
  }
  await db.run(
    "insert into Todos (id, task, completed, createdAt, completedAt, email) values (?,?,?,?,?,?)",
    id,
    task,
    0,
    createdAt,
    "",
    email
  );
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PATCH(req: Request, res: Response) {
  const { isCompleted, id, email } = await req.json();
  const completed = isCompleted ? 1 : 0;
  const completedAt = isCompleted ? new Date().toISOString() : "";
  if (!db) {
    db = await open({
      filename: "./todobase.db",
      driver: sqlite3.Database,
    });
  }
  await db.run(
    "update Todos set completed=?, completedAt=? where id=? and email=?",
    completed,
    completedAt,
    id,
    email
  );
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function DELETE(req: Request, res: Response) {
  const { id, email } = await req.json();
  if (!db) {
    db = await open({
      filename: "./todobase.db",
      driver: sqlite3.Database,
    });
  }
  await db.run("delete from Todos where id=? and email=?", id, email);
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
