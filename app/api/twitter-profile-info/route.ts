import axios from "axios";
import { NextResponse } from "next/server";
const emotions_string =
  "happy, sad, angry, excited, anxious, calm, frustrated, joyful, depressed, nervous, peaceful, irritated, elated, hopeless, hopeful, confused, confident, scared, relieved, annoyed, proud, ashamed, guilty, surprised, shocked, disgusted, amused, bored, curious, inspired, motivated, motivational, overwhelmed, lonely, loved, jealous, envious, grateful, thankful, tense, relaxed, stressed, content, disappointed, satisfied, unsatisfied, eager, hesitant, doubtful, certain, pleased, displeased, optimistic, pessimistic, regretful, nostalgic, thrilled, terrified, embarrassed, humiliated, sympathetic, empathetic, apathetic, indifferent, passionate, detached, warm, cold, hurt, healed, betrayed, trusting, suspicious, amazed, awed, bewildered, playful, serious, silly, mischievous, grumpy, cheerful, melancholy, sentimental, bitter, sweet, resentful, forgiving, vengeful, merciful, exhausted, energized, defeated, victorious, trapped, free, restless, patient, impatient, determined, uncertain, brave, cowardly, bold, shy, outraged, pitying, admiring, disdainful, respectful, disrespectful, smug, humble, arrogant, modest, desperate, assured, insecure, secure, rejected, accepted, included, excluded, overjoyed, underwhelmed, intrigued, disinterested, fascinated, distracted, focused, lost, found, yearning, fulfilled, empty, full, agitated, soothed, enraged, tranquil, innocent, righteous, wicked, gleeful, somber, lighthearted, heavyhearted, reflective";
const twitterioapi = "383b32236ee9476ba6f226de768ad8e8";
async function first200Tweets(userId: string) {
  var tweetsList = [];
  for (let index = 0; index < 10; index++) {
    try {
      const response = await axios.get(
        "https://api.twitterapi.io/twitter/user/last_tweets",
        {
          headers: {
            "x-api-key": "383b32236ee9476ba6f226de768ad8e8",
          },
          params: {
            userId,
            cursor: index == 0 ? "" : `${index}`,
          },
        }
      );
      const tweetsTempList = response.data.tweets;
      for (let index = 0; index < tweetsTempList.length; index++) {
        if (tweetsTempList.length === 0) {
          break;
        }
        const element = tweetsTempList[index];
        tweetsList.push(element.text);
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
  var resPostDic: { [key: string]: string } = {};
  for (let index = 0; index < 10; index++) {
    const response = await axios.get(
      "https://api.twitterapi.io/twitter/tweet/advanced_search",
      {
        headers: { "x-api-key": twitterioapi },
        params: { query: `from:${username} filter:replies` },
      }
    );
    const data = response.data;
    for (let index = 0; index < data.tweets.length; index++) {
      const element = data.tweets[index];
      replies.push(element.text);
      const res = await axios.get("https://api.twitterapi.io/twitter/tweets", {
        headers: { "x-api-key": twitterioapi },
        params: { tweet_ids: [element.inReplyToId] },
      });
      const tweetText = res.data.tweets[0].text;
      post.push(tweetText);
      resPostDic[element.text] = tweetText;
    }
    if (!data.has_next_page) {
      break;
    }
  }
  return [replies, post, resPostDic];
}

async function getEmotionForText(sentence: String) {
  const res = await axios.post(
    "https://api.helpingai.co/v1/chat/completions",
    {
      model: "helpingai2.5-10b",
      messages: [
        {
          role: "system",
          content:
            "You would be given a text as input you have to tell what emotion does it lie amount happy, sad, angry, excited, anxious, calm, frustrated, joyful, depressed, nervous, peaceful, irritated, elated, hopeless, hopeful, confused, confident, scared, relieved, annoyed, proud, ashamed, guilty, surprised, shocked, disgusted, amused, bored, curious, inspired, motivated, motivational, overwhelmed, lonely, loved, jealous, envious, grateful, thankful, tense, relaxed, stressed, content, disappointed, satisfied, unsatisfied, eager, hesitant, doubtful, certain, pleased, displeased, optimistic, pessimistic, regretful, nostalgic, thrilled, terrified, embarrassed, humiliated, sympathetic, empathetic, apathetic, indifferent, passionate, detached, warm, cold, hurt, healed, betrayed, trusting, suspicious, amazed, awed, bewildered, playful, serious, silly, mischievous, grumpy, cheerful, melancholy, sentimental, bitter, sweet, resentful, forgiving, vengeful, merciful, exhausted, energized, defeated, victorious, trapped, free, restless, patient, impatient, determined, uncertain, brave, cowardly, bold, shy, outraged, pitying, admiring, disdainful, respectful, disrespectful, smug, humble, arrogant, modest, desperate, assured, insecure, secure, rejected, accepted, included, excluded, overjoyed, underwhelmed, intrigued, disinterested, fascinated, distracted, focused, lost, found, yearning, fulfilled, empty, full, agitated, soothed, enraged, tranquil, innocent, righteous, wicked, gleeful, somber, lighthearted, heavyhearted, reflective emotions. You just need to reply with one emotion that perfectly tells the emotion of the text. You don't need to type anything else except the emotion word. No explanation",
        },
        {
          role: "user",
          content: sentence,
        },
      ],
      max_tokens: 2,
    },
    {
      headers: {
        Authorization: "Bearer hl-191a2d01-ec27-4bd8-b43f-5533f10e1f43",
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.message.content;
}

async function getProfileDes(userId: string, username: string) {
  const tweetList = await first200Tweets(userId);
  const detail = await first200ReplyAndtheirtweet(username);
  const reply = detail[0];
  const replysPost = detail[1];
  const replyPostDict = detail[2];
  var tweetEmotion = [];
  var emotionCount: { [key: string]: number } = {};
  var postAndReplyEmotion: { [key: string]: number } = {};
  //   for (let index = 0; index < tweetList.length; index++) {
  //     const element = tweetList[index];
  //     getEmotionForText(element);
  //   }
  return tweetList;
}

export async function GET(respone) {
  const tweetList = await getProfileDes("1608765933354635266", "VarunGuptaPy");
  NextResponse.json(tweetList);
}
