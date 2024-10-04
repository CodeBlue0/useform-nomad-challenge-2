import Link from "next/link";

export interface TweetCardParams {
  tweet: string;
  id: number;
  created_at: Date;
  user: {
    username: string;
  } | null;
  _count: {
    Like: number;
  };
}

export default function TweetCard({
  id,
  tweet,
  user,
  _count,
  created_at,
}: TweetCardParams) {
  console.log(id, tweet, user?.username, _count, created_at);
  return (
    <Link
      href={`/tweets/${id}`}
      className="border border-gray-200 w-full h-20 bg-white px-3 py-1 rounded-xl cursor-pointer"
    >
      {tweet}
    </Link>
  );
}
