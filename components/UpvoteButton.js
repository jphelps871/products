import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpvoteButton({ value, roadmap, feedbackId, upvoteData }) {
  const responsiveClasses = roadmap ? false : true;
  const [upvoteActived, setUpvoteActived] = useState(false);
  let [upvoteValue, setUpvoteValue] = useState(value);
  const user = useUser();

  useEffect(() => {
    if (user) {
      upvoteData.forEach((upvote) => {
        if (user.id == upvote.userId) {
          setUpvoteActived(true);
          return;
        }
      });
    }
  }, [user, upvoteData]);

  const handleOnClick = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("You must be logged in to upvote");
      return;
    }

    const userId = user.id;

    try {
      const response = await fetch("/api/upvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, feedbackId }),
      });

      const result = await response.json();

      if (result.upvote) {
        setUpvoteActived(true);
        setUpvoteValue((upvoteValue += 1));
      } else {
        setUpvoteActived(false);
        setUpvoteValue((upvoteValue -= 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleOnClick} className={`${upvoteActived ? "bg-dark-grey text-white" : "bg-cream text-dark-grey"} rounded-lg px-3 py-2 dark-grey flex ${responsiveClasses && "sm:block sm:px-2 sm:py-1"} hover:bg-hover`}>
      <Image src={`/images/${upvoteActived ? "upvote-icon-white.svg" : "upvote-icon.svg"}`} width="12" height="12" alt="Up icon" className={`inline-block mr-1 ${responsiveClasses && "sm:mr-0"}`} />
      <p className="text-sm font-bold">{upvoteValue}</p>
    </button>
  );
}
