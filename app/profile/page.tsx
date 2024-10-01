import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        email: true,
        username: true,
        bio: true,
      },
    });
    if (user) return user;
  }
  notFound();
};

const handleForm = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export default async function Profile() {
  const { username, email, bio } = await getUser();

  return (
    <div className="flex flex-col">
      <span>username: {username}</span>
      <span>email: {email}</span>
      {bio && <span>bio: {bio}</span>}
      <form action={handleForm} className="w-32">
        <Button text="log-out" />
      </form>
    </div>
  );
}
