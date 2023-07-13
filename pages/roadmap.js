import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import FeedBackButton from "@/components/FeedBackButton";
import CardFeedback from "@/components/CardFeedback";
import RoadmapContainer from "@/components/RoadmapContainer";
import { getLocalData } from '../lib/localData'
import Link from "next/link";

export async function getStaticProps() {
    const feedbackData = await getLocalData()

    let planned = []
    let inProgress = []
    let live = []

    feedbackData.forEach(feedback => {
        if (feedback.status.toLowerCase() === 'planned') {
            planned.push(feedback);
        } else if (feedback.status.toLowerCase() === 'in progress') {
            inProgress.push(feedback);
        } else if (feedback.status.toLowerCase() === 'live') {
            live.push(feedback);
        }
    });

    return {props: {feedbackData: {
        planned: planned,
        inProgress: inProgress,
        live: live,
    }}}
}  

export default function Roadmap({ feedbackData }) {
    return (
        <div className="max-w-screen-xl w-full sm:w-11/12 mx-auto sm:pt-6">
            <Card backgroundColor={'dark'} roundedOnSmallScreen={false}>
                <div className="flex items-center">
                    <div>
                        <BackLink color={"light"} />
                        <h1 className="mt-2 font-bold sm:text-2xl text-xl">Roadmap</h1>
                    </div>
                    <div className="ml-auto">
                        <FeedBackButton bgColor={'dark-purple'}>+ Add Feedback</FeedBackButton>
                    </div>
                </div>
            </Card>

            <div className="mt-8 flex gap-3">
                <div className="w-1/3">
                    {feedbackData.planned.map(data => (
                        <Link key={data.id} href={`/comments/${data.id}`}>
                            <RoadmapContainer status={data.status} color={'orange'}>
                                <CardFeedback roadmap={true} category={data.category} upvoteNumber={data.numberOfUpvotes} heading={data.heading} body={data.body} commentsNumber={data.numberOfComments} />
                            </RoadmapContainer>
                        </Link>
                    ))}
                </div>

                <div className="w-1/3">
                    {feedbackData.inProgress.map(data => (
                        <Link key={data.id} href={`/comments/${data.id}`}>
                            <RoadmapContainer status={data.status} color={'dark-purple'}>
                                <CardFeedback roadmap={true} category={data.category} upvoteNumber={data.numberOfUpvotes} heading={data.heading} body={data.body} commentsNumber={data.numberOfComments} />
                            </RoadmapContainer>
                        </Link>
                    ))}
                </div>

                <div className="w-1/3">
                    {feedbackData.live.map(data => (
                        <Link key={data.id} href={`/comments/${data.id}`}>
                            <RoadmapContainer status={data.status} color={'light-blue'}>
                                <CardFeedback roadmap={true} category={data.category} upvoteNumber={data.numberOfUpvotes} heading={data.heading} body={data.body} commentsNumber={data.numberOfComments} />
                            </RoadmapContainer>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}