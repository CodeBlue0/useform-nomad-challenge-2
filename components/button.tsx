"use client";

import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return pending ? (
    <button
      disabled
      className="cursor-not-allowed rounded-2xl text-neutral-30 h-8 w-full bg-neutral-400"
    >
      Loading
    </button>
  ) : (
    <button className="rounded-2xl h-8 w-30 bg-gray-200 hover:bg-gray-300">
      Log in
    </button>
  );
}
