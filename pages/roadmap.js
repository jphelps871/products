import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import FeedBackButton from "@/components/FeedBackButton";
import CardFeedback from "@/components/CardFeedback";
import RoadmapContainer from "@/components/RoadmapContainer";
import { allFeedback } from "@/lib/prismaQueries/feedback";
import prisma from "./api/prisma/prisma";
import Link from "next/link";
import { useState } from "react";

export async function getStaticProps() {
  const feedbackData = await prisma.feedback.findMany({
    select: allFeedback,
  });

  let planned = [];
  let inProgress = [];
  let live = [];

  feedbackData.forEach((feedback) => {
    if (feedback.status.name.toLowerCase() === "planned") {
      planned.push(feedback);
    } else if (feedback.status.name.toLowerCase() === "in-progress") {
      inProgress.push(feedback);
    } else if (feedback.status.name.toLowerCase() === "live") {
      live.push(feedback);
    }
  });

  return {
    props: {
      feedbackData: {
        planned: planned,
        inProgress: inProgress,
        live: live,
      },
    },
  };
}

export default function Roadmap({ feedbackData }) {
  const [activeTab, setActiveTab] = useState("planned");

  function createActiveTab(status, color) {
    if (status === activeTab) return `border-${color} border-b-4`;
    return "border-gray-300 border-b opacity-50";
  }

  return (
    <div className="max-w-screen-xl w-full sm:w-11/12 mx-auto sm:pt-6">
      <Card tailwindStyles={"sm:rounded-lg bg-slate text-white"}>
        <div className="flex items-center">
          <div>
            <BackLink color={"light"} />
            <h1 className="mt-2 font-bold sm:text-2xl text-xl">Roadmap</h1>
          </div>
          <div className="ml-auto">
            <FeedBackButton bgColor={"bg-dark-purple"}>+ Add Feedback</FeedBackButton>
          </div>
        </div>
      </Card>

      {/* Tabs for mobile */}
      <div className="flex justify-evenly sm:hidden">
        <button onClick={() => setActiveTab("planned")} className={`w-full px-2 py-5 font-bold text-dark-grey text-sm ${createActiveTab("planned", "orange")}`}>
          Planned ({feedbackData.planned.length})
        </button>
        <button onClick={() => setActiveTab("inProgress")} className={`w-full px-2 py-5 font-bold text-dark-grey text-sm ${createActiveTab("inProgress", "dark-purple")}`}>
          In-Progress ({feedbackData.inProgress.length})
        </button>
        <button onClick={() => setActiveTab("live")} className={`w-full px-2 py-5 font-bold text-dark-grey text-sm ${createActiveTab("live", "light-blue")}`}>
          Live ({feedbackData.live.length})
        </button>
      </div>

      <div className="mt-6 md:mt-8 flex gap-3 mx-2">
        {/* Planned */}
        <div className={`w-full ${activeTab !== "planned" && "hidden sm:block"}`}>
          <div className="mb-4 md:mb-6">
            <h2 className="mt-2 font-bold md:text-xl text-lg text-dark-grey">Planned ({feedbackData.planned.length})</h2>
            <p className="text-light-slate md:text-md text-sm">Ideas prioritized for research</p>
          </div>
          {feedbackData.planned.map((data) => (
            <Link key={data.id} href={`/comments/${data.id}`}>
              <RoadmapContainer status={data.status.name} color={"orange"}>
                <CardFeedback roadmap={true} feedback={data} />
              </RoadmapContainer>
            </Link>
          ))}
        </div>

        {/* In Progress */}
        <div className={`w-full ${activeTab !== "inProgress" && "hidden sm:block"}`}>
          <div className="mb-4 md:mb-6">
            <h2 className="mt-2 font-bold md:text-xl text-lg text-dark-grey">In-Progress ({feedbackData.inProgress.length})</h2>
            <p className="text-light-slate md:text-md text-sm">Currently being developed</p>
          </div>
          {feedbackData.inProgress.map((data) => (
            <Link key={data.id} href={`/comments/${data.id}`}>
              <RoadmapContainer status={data.status.name} color={"dark-purple"}>
                <CardFeedback roadmap={true} feedback={data} />
              </RoadmapContainer>
            </Link>
          ))}
        </div>

        {/* Live */}
        <div className={`w-full ${activeTab !== "live" && "hidden sm:block"}`}>
          <div className="mb-4 md:mb-6">
            <h2 className="mt-2 font-bold md:text-xl text-lg text-dark-grey">Live ({feedbackData.live.length})</h2>
            <p className="text-light-slate md:text-md text-sm">Released features</p>
          </div>
          {feedbackData.live.map((data) => (
            <Link key={data.id} href={`/comments/${data.id}`}>
              <RoadmapContainer status={data.status.name} color={"light-blue"}>
                <CardFeedback roadmap={true} feedback={data} />
              </RoadmapContainer>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
