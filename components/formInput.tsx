import { InputHTMLAttributes } from "react";

interface IParams {
  name: string;
  errors?: string[];
  icon: React.ReactNode;
}

export default function FormInput({
  name,
  errors = [],
  icon,
  ...rest
}: IParams & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div
        className={`w-full py-4 px-3 border ${
          errors.length === 0
            ? "border-gray-200 has-[:focus]:ring-gray-300"
            : "border-red-400 has-[:focus]:ring-red-500 : "
        } rounded-2xl flex items-center h-4 bg-white has-[:focus]:ring-2  has-[:focus]:ring-offset-2`}
      >
        <div className="*:size-3 *:fill-gray-500 mr-2">{icon}</div>
        <input className="outline-none w-full" name={name} {...rest} />
      </div>
      {errors.map((error, idx) => (
        <div className="text-red-600 font-medium text-xs p-1" key={idx}>
          {error}
        </div>
      ))}
    </div>
  );
}
