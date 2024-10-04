"use client";

import TweetCard, { TweetCardParams } from "@/components/tweetCard";
import { getMoreTweet, handleForm } from "./action";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, dispatch] = useFormState(handleForm, 0);
  const [tweets, setTweets] = useState<TweetCardParams[] | null>(null);

  const setTweetsFromPage = async (thisPage: number) => {
    const data = await getMoreTweet(thisPage);
    setTweets(data);
  };

  useEffect(() => {
    setTweetsFromPage(page);
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6">
      <div className="text-7xl pb-20">🔥</div>
      <div className="flex flex-col items-center gap-5 w-1/2">
        {tweets?.map((tweet, idx) => {
          return <TweetCard {...tweet} key={idx} />;
        })}
      </div>
      <div className="pt-14 flex justify-between items-center w-2/3 *:flex *:justify-center *:items-center">
        <form
          action={dispatch}
          className="cursor-pointer rounded-full border border-gray-200 bg-white size-16"
        >
          <button name="direction" value="before">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </form>
        <span>Page {page + 1}</span>
        <form
          action={dispatch}
          className="cursor-pointer rounded-full border border-gray-200 bg-white size-16"
        >
          <button name="direction" value="next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
