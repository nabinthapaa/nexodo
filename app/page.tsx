import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
  return (
    <section>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere,
        accusamus odit aliquam delectus rem mollitia reprehenderit debitis ab!
        Dolores quos aut ad delectus tempora distinctio voluptatem odio.
        Eligendi, autem incidunt labore quo neque vitae praesentium sunt
        nostrum, aliquam esse amet. Quod molestiae nemo, hic repellendus sequi
        atque minima error corrupti cupiditate? Mollitia quisquam ea ipsum qui,
        sequi harum earum ipsam sint quo repellendus, nemo est pariatur
        necessitatibus et! Ut quae sunt modi, molestiae alias fuga sequi
        eveniet?
      </p>
    </section>
  );
}
