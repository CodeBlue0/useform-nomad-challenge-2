"use server";

import { z } from "zod";

const regexString: RegExp = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long."),
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
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (result.success) {
    return {
      success: true,
    };
  } else
    return {
      success: false,
      errors: result.error.flatten(),
    };
};
