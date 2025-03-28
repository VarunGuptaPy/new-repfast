import axios from "axios";
const emotions_string =
  "happy, sad, angry, excited, anxious, calm, frustrated, joyful, depressed, nervous, peaceful, irritated, elated, hopeless, hopeful, confused, confident, scared, relieved, annoyed, proud, ashamed, guilty, surprised, shocked, disgusted, amused, bored, curious, inspired, motivated, motivational, overwhelmed, lonely, loved, jealous, envious, grateful, thankful, tense, relaxed, stressed, content, disappointed, satisfied, unsatisfied, eager, hesitant, doubtful, certain, pleased, displeased, optimistic, pessimistic, regretful, nostalgic, thrilled, terrified, embarrassed, humiliated, sympathetic, empathetic, apathetic, indifferent, passionate, detached, warm, cold, hurt, healed, betrayed, trusting, suspicious, amazed, awed, bewildered, playful, serious, silly, mischievous, grumpy, cheerful, melancholy, sentimental, bitter, sweet, resentful, forgiving, vengeful, merciful, exhausted, energized, defeated, victorious, trapped, free, restless, patient, impatient, determined, uncertain, brave, cowardly, bold, shy, outraged, pitying, admiring, disdainful, respectful, disrespectful, smug, humble, arrogant, modest, desperate, assured, insecure, secure, rejected, accepted, included, excluded, overjoyed, underwhelmed, intrigued, disinterested, fascinated, distracted, focused, lost, found, yearning, fulfilled, empty, full, agitated, soothed, enraged, tranquil, innocent, righteous, wicked, gleeful, somber, lighthearted, heavyhearted, reflective";

async function first200Tweets(userId: string) {
  var tweetsList = [];
  for (let index = 0; index < 10; index++) {
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
    if (tweetsTempList.length === 0) {
      break;
    } else {
      tweetsList.push(...tweetsTempList);
    }
  }
  return tweetsList;
}

