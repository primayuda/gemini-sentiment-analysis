import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.API_KEY;

const genAI = new GoogleGenerativeAI(apiKey)
export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const message = data.get("message");
  // Validate the data - you'll probably want to do more than this
  if (!message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  console.log(message);
  try {
    const userInput = message;

    // Call Gemini API for sentiment analysis
    const geminiResponse = await run(userInput);

    const sentimentResult = geminiResponse;
    console.log(sentimentResult);
    // Send sentiment result back to the client
    return new Response(
      JSON.stringify({
        sentimentResult
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
  
};

// Basic Function API to generate content/result using Gemini
async function run(userInput: FormDataEntryValue) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Analyze the sentiment of the sentence given below.\n${userInput}\nThe output should be in the format- Semtiment: Value`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}