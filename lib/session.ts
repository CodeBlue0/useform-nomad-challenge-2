import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface IParam {
  id?: number;
}

export default function getSession() {
  return getIronSession<IParam>(cookies(), {
    cookieName: "user",
    password: process.env.COOKIE_PASSWORD!,
  });
}
