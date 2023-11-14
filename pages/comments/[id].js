import Head from "next/head";
import prisma from "../api/prisma/prisma";
import CommentForm from "@/components/CommentForm";
import Card from "@/components/Card";
import CardFeedback from "@/components/CardFeedback";
import FeedBackButton from "@/components/FeedBackButton";
import Comments from "@/components/Comments";
import BackLink from "@/components/BackLink";
import supabase from "@/utils/supabase";
import Link from "next/link";
import { getComments } from "@/services/getComments";
import { allFeedback } from "@/lib/prismaQueries/feedback";
import { useEffect, useState } from "react";

function buildCommentTree(comments) {
  const commentMap = {};
  const tree = [];

  comments.forEach((comment) => {
    comment.children = [];
    commentMap[comment.id] = comment;
    if (!comment.parentId) {
      tree.push(comment);
    } else {
      const parentComment = commentMap[comment.parentId];
      if (parentComment) {
        const parentUsername = parentComment.user.username;
        parentComment.children.push({ ...comment, parentUsername });
      }
    }
  });

  return tree;
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const feedbackData = await prisma.feedback.findUnique({
    where: {
      id: parseInt(id),
    },
    select: allFeedback,
  });

  return { props: { feedbackData } };
}

export default function CommentPage({ feedbackData }) {
  const [allComments, setComments] = useState();
  const [feedback, setFeedback] = useState(feedbackData);
  const [commentsLength, setCommentsLength] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getComments(feedback.id).then((data) => {
      const comments = buildCommentTree(data.comments);

      // Set states
      setCommentsLength(data.comments.length);
      setComments(comments);
      setLoading(false);
    });
  }, [feedback.id]);

  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "Comment",
      },
      () => {
        getComments(feedback.id)
          .then((data) => {
            const comments = buildCommentTree(data.comments);

            // Update the number of comments shown in feedback component
            const updatedFeedback = { ...feedback };
            const updatedComments = [...updatedFeedback.comments];
            updatedComments.push({ test: "test" });

            updatedFeedback.comments = updatedComments;
            setFeedback(updatedFeedback);
            setCommentsLength(commentsLength + 1);

            setComments(comments);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    )
    .subscribe();

  return (
    <>
      <Head>
        <title>Feedback Board | Comments</title>
      </Head>
      <div className="max-w-screen-md mx-auto pt-5 px-5 sm:pt-10">
        <div className="flex items-center justify-between">
          <div>
            <BackLink />
          </div>
          <div>
            <Link href={`/feedback/edit/${feedback.id}`}>
              <FeedBackButton bgColor={"bg-dark-blue"}>Edit Feedback</FeedBackButton>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <CardFeedback feedback={feedback} />

          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <Card tailwindStyles={"bg-white rounded-lg"}>
              <p className="font-bold text-dark-grey text-xl">{commentsLength} Comments</p>

              <Comments comments={allComments} />
            </Card>
          )}
        </div>

        <div className="mt-10 mb-20">
          <Card tailwindStyles={"bg-white rounded-lg"}>
            <p className="font-bold text-dark-grey text-xl mb-8 ">Add Comment</p>
            <CommentForm buttonText={"Post Comment"} feedbackId={feedback.id} />
          </Card>
        </div>
      </div>
    </>
  );
}
