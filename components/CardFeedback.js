import Card from "./Card";
import Button from "./Button";
import Image from "next/image";
import UpvoteButton from "./UpvoteButton";

import React, { useState } from "react";

export default function CardFeedback({ feedback, roadmap }) {
  const responsiveClasses = roadmap ? false : true;
  const [headingColor, setHeadingColor] = useState("text-dark-grey");

  return (
    <Card onMouseEnterCard={() => setHeadingColor("text-dark-blue")} onMouseLeaveCard={() => setHeadingColor("text-dark-grey")} tailwindStyles={"bg-white rounded-lg"}>
      <div className={`grid grid-cols-2 gap-5 ${responsiveClasses && "sm:grid-cols-feedback-card sm:gap-0"}`}>
        <div className={`order-2 ${responsiveClasses && "sm:order-none"}`}>
          <UpvoteButton value={feedback.upvotes.length} roadmap={roadmap} feedbackId={feedback.id} upvoteData={feedback.upvotes} />
        </div>

        <section className={`grow order-1 col-span-2 ${responsiveClasses && "sm:col-span-1 sm:order-none"}`}>
          <h3 className={`mb-2 text-lg font-bold ${headingColor}`}>{feedback.title}</h3>
          <p className="mb-2 text-light-slate">{feedback.detail}</p>
          <Button value={feedback.category?.name || "none"} noHover={true} />
        </section>

        <div className={`flex items-center order-3 ml-auto ${responsiveClasses && "sm:order-none sm:ml-0"}`}>
          <Image src={"/images/comment-icon.svg"} width={"20"} height={"20"} alt={"Comment icon"} />
          <p className="ml-4 font-bold">{feedback.comments.length}</p>
        </div>
      </div>
    </Card>
  );
}
