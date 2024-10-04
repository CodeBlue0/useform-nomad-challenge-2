"use server";

import { PAGE_TWEETS_NUM } from "@/lib/constants";
import db from "@/lib/db";

export async function getMoreTweet(page: number) {
  const tweet = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: { Like: true },
      },
    },
    skip: page * PAGE_TWEETS_NUM,
    take: PAGE_TWEETS_NUM,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweet;
}

async function getTweetsCount() {
  const count = await db.tweet.count();
  return count;
}

export const handleForm = async (prevState: number, formData: FormData) => {
  const data = {
    direction: formData.get("direction") == "before" ? -1 : 1,
    totalCount: await getTweetsCount(),
  };
  const NextPage = prevState + data.direction;
  if (NextPage < 0 || NextPage * PAGE_TWEETS_NUM > data.totalCount)
    return prevState;

  return NextPage;
};
