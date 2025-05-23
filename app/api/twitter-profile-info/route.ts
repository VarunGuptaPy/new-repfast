import { db } from "@/utils/firebase";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import getEmotionForText from "@/utils/getEmotionForText";
const emotions_string =
  "happy, sad, angry, excited, anxious, calm, frustrated, joyful, depressed, nervous, peaceful, irritated, elated, hopeless, hopeful, confused, confident, scared, relieved, annoyed, proud, ashamed, guilty, surprised, shocked, disgusted, amused, bored, curious, inspired, motivated, motivational, overwhelmed, lonely, loved, jealous, envious, grateful, thankful, tense, relaxed, stressed, content, disappointed, satisfied, unsatisfied, eager, hesitant, doubtful, certain, pleased, displeased, optimistic, pessimistic, regretful, nostalgic, thrilled, terrified, embarrassed, humiliated, sympathetic, empathetic, apathetic, indifferent, passionate, detached, warm, cold, hurt, healed, betrayed, trusting, suspicious, amazed, awed, bewildered, playful, serious, silly, mischievous, grumpy, cheerful, melancholy, sentimental, bitter, sweet, resentful, forgiving, vengeful, merciful, exhausted, energized, defeated, victorious, trapped, free, restless, patient, impatient, determined, uncertain, brave, cowardly, bold, shy, outraged, pitying, admiring, disdainful, respectful, disrespectful, smug, humble, arrogant, modest, desperate, assured, insecure, secure, rejected, accepted, included, excluded, overjoyed, underwhelmed, intrigued, disinterested, fascinated, distracted, focused, lost, found, yearning, fulfilled, empty, full, agitated, soothed, enraged, tranquil, innocent, righteous, wicked, gleeful, somber, lighthearted, heavyhearted, reflective";
const twitterioapi = process.env.TWITTER_IO_API;
async function first200Tweets(userId: string) {
  var tweetsList = [];
  var next_cursor = "";
  var has_next_page = true;
  while (tweetsList.length < 40 && has_next_page) {
    try {
      const response = await axios.get(
        "https://api.twitterapi.io/twitter/user/last_tweets",
        {
          headers: {
            "x-api-key": twitterioapi,
          },
          params: {
            userId,
            cursor: next_cursor,
          },
        }
      );
      next_cursor = response.data.next_cursor;
      has_next_page = response.data.has_next_page;
      const tweetsTempList = response.data.data.tweets;
      for (let index = 0; index < tweetsTempList.length; index++) {
        const element = tweetsTempList[index];
        if (element.text !== "") {
          tweetsList.push(element.text);
        }
      }
    } catch (e) {
      console.log(e);
      break;
    }
  }
  return tweetsList;
}
// from:VarunGuptaPy filter:replies
async function first200ReplyAndtheirtweet(username: string) {
  var replies = [];
  var post = [];
  var next_cursor = "";
  var count = 0;
  var resPostDic: { [key: string]: string } = {};
  while ((count == 0 || next_cursor) && replies.length <= 50) {
    const response = await axios.get(
      "https://api.twitterapi.io/twitter/tweet/advanced_search",
      {
        headers: { "x-api-key": twitterioapi },
        params: {
          query: `from:${username} filter:replies`,
          cursor: count == 0 ? "" : next_cursor,
        },
      }
    );

    const data = response.data;
    for (let index = 0; index < data.tweets.length; index++) {
      const element = data.tweets[index];
      if (element.inReplyToId != null) {
        const res = await axios.get(
          "https://api.twitterapi.io/twitter/tweets",
          {
            headers: { "x-api-key": twitterioapi },
            params: { tweet_ids: element.inReplyToId },
          }
        );
        if (res.data.tweets.length != 0) {
          replies.push(element.text);
          const tweetText = res.data.tweets[0].text;
          post.push(tweetText);
          resPostDic[tweetText] = element.text;
        }
      }
    }
    next_cursor = data.next_cursor;
    count++;
    console.log(replies.length);
    if (!data.has_next_page) {
      break;
    }
  }
  return [replies, post, resPostDic];
}

async function getProfileDes(userId: string, username: string) {
  const tweetList = await first200Tweets(userId);
  console.log(tweetList);
  const detail = await first200ReplyAndtheirtweet(username);
  console.log(detail);
  const reply = detail[0];
  const replysPost = detail[1];
  const replyPostDict = detail[2];
  var tweetEmotion = [];
  var emotionCount: { [key: string]: number } = {};
  var postAndReplyEmotion: { [key: string]: [string] } = {};
  var combinationCount: { [key: string]: number } = {};
  for (let index = 0; index < tweetList.length; index++) {
    const element = tweetList[index];
    var postEmotion = "";
    while (true) {
      postEmotion = await getEmotionForText(element);
      console.log(postEmotion);

      const postSplitted = postEmotion.split(" ");
      if (postSplitted.length != 1) {
        continue;
      } else {
        break;
      }
    }
    const postNormalizedEmotion = postEmotion.toLowerCase();
    console.log(postNormalizedEmotion);
    emotionCount[postNormalizedEmotion] =
      (emotionCount[postNormalizedEmotion] || 0) + 1;
  }
  for (let index = 0; index < replysPost.length; index++) {
    const currentPost = replysPost[index];
    var postEmotion = "";
    while (true) {
      postEmotion = await getEmotionForText(currentPost);
      console.log(postEmotion);
      const postSplitted = postEmotion.split(" ");
      if (postSplitted.length != 1) {
        continue;
      } else {
        break;
      }
    }
    const postNormalizedEmotion = postEmotion.toLowerCase();
    console.log(currentPost, " ", postNormalizedEmotion);
    console.log(postNormalizedEmotion);
    var postsReplyEmotion = "";
    while (true) {
      postsReplyEmotion = await getEmotionForText(replyPostDict[currentPost]);
      console.log(postsReplyEmotion);
      const postSplitted = postEmotion.split(" ");
      if (postSplitted.length != 1) {
        continue;
      } else {
        break;
      }
    }
    console.log(replyPostDict[currentPost], " ", postsReplyEmotion);
    emotionCount[postNormalizedEmotion] =
      (emotionCount[postNormalizedEmotion] || 0) + 1;
    emotionCount[postsReplyEmotion] =
      (emotionCount[postsReplyEmotion] || 0) + 1;
    const postReplyEmotionNormalized = postsReplyEmotion.toLowerCase();

    var currentList = postAndReplyEmotion[postNormalizedEmotion] ?? [];
    postAndReplyEmotion[postNormalizedEmotion] = currentList;
    combinationCount[`${postNormalizedEmotion},${postReplyEmotionNormalized}`] =
      (combinationCount[
        `${postNormalizedEmotion},${postReplyEmotionNormalized}`
      ] || 0) + 1;
  }
  return [emotionCount, postAndReplyEmotion, combinationCount];
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const userId = searchParams.get("userId");
    console.log(username, userId);
    updateDoc(doc(db, "users", userId), {
      status: "learning",
    });
    const profileDes = await getProfileDes(userId!, username!);

    updateDoc(doc(db, "users", userId), {
      status: "learned",
      emotionCount: profileDes[0],
      postAndReplyEmotion: profileDes[1],
      combinationCount: profileDes[2],
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
