'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

// Ensure the API key is available
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// Define function to summarize a recording
export async function summarizeRecording(recordingUrl: string) {
  try {
    console.log(`Fetching recording from: ${recordingUrl}`);

    // Fetch the recording file
    const response = await fetch(recordingUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch recording: ${response.statusText}`);
    }

    // Get the file content as a Blob or ArrayBuffer
    // We'll use ArrayBuffer for potential future processing (e.g., sending to API)
    const recordingBlob = await response.blob();

    console.log("Recording fetched successfully.");

    // Prepare the file part for Gemini
    const filePart = {
      inlineData: {
        data: Buffer.from(await recordingBlob.arrayBuffer()).toString('base64'),
        mimeType: recordingBlob.type
      },
    };

    // Define the prompt for summarization
    const prompt = "Please provide a concise summary of this meeting recording.";

    // Get the Gemini model that supports processing audio
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    console.log("Sending recording to Gemini...");

    // Send the prompt and the file to Gemini
    const result = await model.generateContent([prompt, filePart]);

    console.log("Received response from Gemini.");

    // Extract the summary from the response
    const geminiResponse = result.response;
    const summary = geminiResponse.text();

    console.log("Generated Summary:", summary);

    // TODO: Store the summary (optional, depending on your data strategy)

    return summary;

  } catch (error) {
    console.error("Error summarizing recording:", error);
    throw new Error("Failed to summarize recording.");
  }
}

// Define function to answer questions about a recording
export async function askQuestionAboutRecording(recordingUrl: string, question: string) {
  try {
    console.log(`Received question for recording: ${recordingUrl}`);
    console.log(`Question: ${question}`);

    // Implement logic to access the recording content
    console.log(`Fetching recording from: ${recordingUrl}`);
    const response = await fetch(recordingUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch recording for Q&A: ${response.statusText}`);
    }

    const recordingBlob = await response.blob();
    console.log("Recording fetched successfully for Q&A.");

    // Prepare the file part for Gemini transcription
    const filePart = {
      inlineData: {
        data: Buffer.from(await recordingBlob.arrayBuffer()).toString('base64'),
        mimeType: recordingBlob.type
      },
    };

    // Use gemini-2.0-flash to transcribe the audio
    const transcriptionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log("Sending audio for transcription...");

    const transcriptionResult = await transcriptionModel.generateContent(["Provide a transcript of this audio:", filePart]);
    const transcriptionResponse = transcriptionResult.response;
    const transcript = transcriptionResponse.text();
    console.log("Transcription received.", transcript.substring(0, 100) + '...'); // Log part of transcript

    if (!transcript) {
      throw new Error("Could not obtain transcript from recording.");
    }

    // Use gemini-1.5-pro to answer the question based on the transcript
    const qaModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log("Sending transcript and question to Gemini for Q&A...");

    const qaPrompt = `Based on the following transcript, answer this question:

Transcript: ${transcript}

Question: ${question}`;
    const qaResult = await qaModel.generateContent(qaPrompt);
    const qaResponse = qaResult.response;
    const answer = qaResponse.text();

    console.log("Generated Answer:", answer);

    return answer;

  } catch (error) {
    console.error("Error asking question about recording:", error);
    throw new Error("Failed to get answer about recording.");
  }
}

// You can now define functions here to interact with the Gemini model.
// For example:
/*
export async function runGemini(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});`
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
}
*/ 