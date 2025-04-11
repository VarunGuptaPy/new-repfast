import getEmotionForText from "@/utils/getEmotionForText";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import chatFunction from "@/utils/chatFunction";
export async function POST(request: Request) {
  try {
    const { tweetId, userId } = await request.json();

    if (!tweetId) {
      return NextResponse.json(
        { error: "Post content is required" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const twitterResponse = await axios.get(
      "https://api.twitterapi.io/twitter/tweets",
      {
        headers: {
          "x-api-key": process.env.TWITTER_IO_API,
        },
        params: {
          tweet_ids: tweetId,
        },
      }
    );

    if (!twitterResponse.data.tweets.length) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    const tweetText = twitterResponse.data.tweets[0].text;

    const userInfo = await getDoc(doc(db, "users", userId));
    if (userInfo.data()?.status !== "learned") {
      return NextResponse.json({ error: "User not learned" }, { status: 400 });
    }

    const postEmotion = await getEmotionForText(tweetText);
    const replyEmotions = userInfo.data()?.postAndReplyEmotion[postEmotion];
    if (replyEmotions) {
      const postAndReplyEmotionCount: { [key: string]: number } = {};
      const emotionCount: { [key: string]: number } = {};
      const emotionAndReply: { [key: string]: string } = {};
      const replies = []
      for (const emotion in replyEmotions) {
        emotionCount[emotion] = userInfo.data()?.emotionCount[emotion];
        postAndReplyEmotionCount[`${postEmotion},${emotion}`] =
          userInfo.data()?.combinationCount[`${postEmotion},${emotion}`];
        const reply = await chatFunction({
          systemPrompt: `You would be given a post with emotion ${postEmotion}, You have to craft a reply with emotion ${emotion} that should correctly match the coentent of the twitter i.e it should not include info that dosen't match the general idea of the post.`,
          userQuery: tweetText,
          maxTokens: 20,
        });
        emotionAndReply[emotion] = reply;
        replies.push(reply);
      }
      return NextResponse.json({
        response: replies,
      }); 
    } else {
      const res = await chatFunction({
        systemPrompt:
          "You would be given a post and you would need to craft a reply for that post. The emotion of the post is " +
          postEmotion +
          ". You have to take emotion of this post in account while crafting the reply. YOu have to make the reply under the word limit of 20",
        userQuery: tweetText,
        maxTokens: 20,
      });
      return NextResponse.json({
        response: res,
      });
      //Automatically write reply without any good context
    }
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get chat response" },
      { status: 500 }
    );
  }
}
