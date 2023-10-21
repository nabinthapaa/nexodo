import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function createDB() {
    const db = await open({
        filename: 'todobase.db',
        driver: sqlite3.Database
    })

    db.exec("create table if not exists User(email text primary key, name text not null, profile_url text not null, createdAt text not null)").then(
        () => {
            console.log("User Table created!!!")
        }
    ).catch(() => {
        throw new Error("Failed to create the Table User. Forfeiting !!!\nPlease re-run db.js")
    });
    db.exec("create table if not exists Todos(id number primary key, task text not null, completed number not null, createdAt text not null, completedAt text not null, email text not null, foreign key(email) references User(email))").then(
        () => {
            console.log("Todos table created!!")
        }
    ).catch(() => {
        console.log("Could not create table Todo");
        console.log("Dropping table User")
        db.exec("drop table User");
        throw new Error("Table User dropped\nPlease re-run db.js")
    })
}

createDB().catch(e => {
    console.error({ e })
});