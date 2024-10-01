"use server";

import { z } from "zod";
import { PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const regexString: RegExp = PASSWORD_REGEX;

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .endsWith("@zod.com", "Only @zod.com emails are allowed"),
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long."),
    password: z
      .string()
      .min(10, "Password should be at least 10 characters long.")
      .regex(
        regexString,
        "Password should contain at least one number (0123456789)."
      ),
    bio: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    bio: formData.get("bio"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 5);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        bio: result.data.bio,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");

    // return {
    //   success: true,
    // };
  }
};
