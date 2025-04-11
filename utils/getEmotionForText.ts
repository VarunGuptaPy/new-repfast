import axios from "axios";
async function getEmotionForText(
  sentence: String,
  retries = 3
): Promise<string> {
  try {
    const res = await axios.post(
      "https://api.helpingai.co/v1/chat/completions",
      {
        model: "helpingai3-raw",
        messages: [
          {
            role: "system",
            content:
              "You just have to write one word i.e of emotinn and nothing else no thinking of yours. You would be given a text as input you have to tell what emotion does it lie amount happy, sad, angry, excited, anxious, calm, frustrated, joyful, depressed, nervous, peaceful, irritated, elated, hopeless, hopeful, confused, confident, scared, relieved, annoyed, proud, ashamed, guilty, surprised, shocked, disgusted, amused, bored, curious, inspired, motivated, motivational, overwhelmed, lonely, loved, jealous, envious, grateful, thankful, tense, relaxed, stressed, content, disappointed, satisfied, unsatisfied, eager, hesitant, doubtful, certain, pleased, displeased, optimistic, pessimistic, regretful, nostalgic, thrilled, terrified, embarrassed, humiliated, sympathetic, empathetic, apathetic, indifferent, passionate, detached, warm, cold, hurt, healed, betrayed, trusting, suspicious, amazed, awed, bewildered, playful, serious, silly, mischievous, grumpy, cheerful, melancholy, sentimental, bitter, sweet, resentful, forgiving, vengeful, merciful, exhausted, energized, defeated, victorious, trapped, free, restless, patient, impatient, determined, uncertain, brave, cowardly, bold, shy, outraged, pitying, admiring, disdainful, respectful, disrespectful, smug, humble, arrogant, modest, desperate, assured, insecure, secure, rejected, accepted, included, excluded, overjoyed, underwhelmed, intrigued, disinterested, fascinated, distracted, focused, lost, found, yearning, fulfilled, empty, full, agitated, soothed, enraged, tranquil, innocent, righteous, wicked, gleeful, somber, lighthearted, heavyhearted, reflective emotions. You just need to reply with one emotion that perfectly tells the emotion of the text. You don't need to type anything else except the emotion word. No explanation",
          },
          {
            role: "user",
            content:
              "Just return one word of emotion for the senecece and don't return a list of emotion just a single emotion : " +
              sentence,
          },
        ],
        max_tokens: 1,
      },
      {
        headers: {
          Authorization: "Bearer hl-191a2d01-ec27-4bd8-b43f-5533f10e1f43",
          "Content-Type": "application/json",
        },
        timeout: 5000, // example timeout in milliseconds
      }
    );
    console.log(res.data);
    return res.data.choices[0].message.content;
  } catch (error: any) {
    if (error.code === "ECONNABORTED" && retries > 0) {
      console.warn(
        `Timeout error occurred, retrying... (${retries} retries left)`
      );
      return await getEmotionForText(sentence, retries - 1);
    }
    throw error; // rethrow the error if not a timeout or retries are exhausted
  }
}

export default getEmotionForText;
