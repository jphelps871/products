import Card from "./Card";
import Button from "./Button";
import Image from "next/image";

export default function CardFeedback({category, upvoteNumber, heading, body, commentsNumber}) {
    return (
        <Card>
            <div className="grid sm:grid-cols-feedback-card grid-cols-2 gap-5 sm:gap-0">
                <div className="order-2 sm:order-none">
                    <Button value={upvoteNumber} upvote={true} />
                </div>

                <section className="grow order-1 sm:order-none col-span-2 sm:col-span-1">
                    <h3 className="mb-2 text-lg font-bold text-dark-grey">{heading}</h3>
                    <p className="mb-2 text-light-slate">{body}</p>
                    <Button value={category} noHover={true} />
                </section>

                <div className="flex items-center ml-4 order-3 sm:order-none ml-auto sm:ml-0 sm:ml-4">
                    <Image src={'/images/comment-icon.svg'} width={'20'} height={'20'} alt={'Comment icon'} />
                    <p className="ml-2 font-bold">{commentsNumber}</p>
                </div>
            </div>
        </Card>
    )
}