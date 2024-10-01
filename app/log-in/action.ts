"use server";

import { z } from "zod";
import { PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const regexString: RegExp = PASSWORD_REGEX;

const formSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed"),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      regexString,
      "Password should contain at least one number (0123456789)."
    ),
});

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const passwordCheck = await bcrypt.compare(
      result.data.password,
      user?.password ?? ""
    );
    if (passwordCheck && user) {
      const session = await getSession();
      session.id = user.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password"],
          email: [],
        },
      };
    }
  }
};
