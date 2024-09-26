"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  const password = formData.get("password");
  if (password === "12345") {
    return {
      success: true,
    };
  } else
    return {
      success: false,
      error: "Wrong password",
    };
};
