import FormInput from "@/component/formInput";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 mt-20 items-center">
      <div className="text-4xl">🔥</div>
      <form className="flex flex-col gap-3">
        <FormInput name="email" placeholder="Email" />
        <FormInput name="username" placeholder="Username" />
        <FormInput name="password" placeholder="Password" />
      </form>
    </div>
  );
}
