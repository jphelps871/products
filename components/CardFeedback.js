import Card from "./Card";
import Button from "./Button";
import Image from "next/image";
import UpvoteButton from "./UpvoteButton";

export default function CardFeedback({category, upvoteNumber, heading, body, commentsNumber, roadmap}) {
    const responsiveClasses = roadmap ? false : true

    return (
        <Card tailwindStyles={'bg-white rounded-lg'}>
            <div className={`grid grid-cols-2 gap-5 ${responsiveClasses && 'sm:grid-cols-feedback-card sm:gap-0'}`}>
                <div className={`order-2 ${responsiveClasses && 'sm:order-none'}`}>
                    <UpvoteButton value={upvoteNumber} roadmap={roadmap} />
                </div>

                <section className={`grow order-1 col-span-2 ${responsiveClasses && 'sm:col-span-1 sm:order-none'}`}>
                    <h3 className="mb-2 text-lg font-bold text-dark-grey">{heading}</h3>
                    <p className="mb-2 text-light-slate">{body}</p>
                    <Button value={category} noHover={true} />
                </section>

                <div className={`flex items-center order-3 ml-auto ${responsiveClasses && 'sm:order-none sm:ml-0'}`}>
                    <Image src={'/images/comment-icon.svg'} width={'20'} height={'20'} alt={'Comment icon'} />
                    <p className="ml-4 font-bold">{commentsNumber}</p>
                </div>
            </div>
        </Card>
    )
}