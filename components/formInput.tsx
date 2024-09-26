import { InputHTMLAttributes } from "react";

interface IParams {
  name: string;
  error?: string;
  icon: React.ReactNode;
}

export default function FormInput({
  name,
  error = "",
  icon,
  ...rest
}: IParams & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div
        className={`w-full py-4 px-3 border ${
          error === ""
            ? "border-gray-200 has-[:focus]:ring-gray-300"
            : "border-red-400 has-[:focus]:ring-red-500 : "
        } rounded-2xl flex items-center h-4 bg-white has-[:focus]:ring-2  has-[:focus]:ring-offset-2`}
      >
        <div className="*:size-3 *:fill-gray-500 mr-2">{icon}</div>
        <input className="outline-none" name={name} {...rest} />
      </div>
      <span className="text-red-500 font-medium">{error}</span>
    </div>
  );
}
