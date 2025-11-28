import { GoogleGenAI, Type } from "@google/genai";
import { Song } from "../types";

// Safe initialization
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateSetlistSuggestion = async (
  vibe: string,
  availableSongs: Song[]
): Promise<{ songIds: string[]; description: string; name: string }> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return {
      songIds: availableSongs.slice(0, 5).map(s => s.id),
      description: "Auto-generated fallback setlist (AI unavailable).",
      name: "Standard Setlist"
    };
  }

  const songListString = availableSongs.map(s => `${s.id}: ${s.title} by ${s.artist} (${s.genre}, ${s.mood})`).join('\n');

  const prompt = `
    Create a setlist of 5-8 songs from the following list based on this vibe: "${vibe}".
    
    Available Songs:
    ${songListString}

    Return a JSON object with:
    - "name": A creative name for this setlist.
    - "description": A short, hype description of why these songs fit the vibe.
    - "songIds": An array of the IDs of the selected songs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                songIds: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            },
            required: ["name", "description", "songIds"]
        }
      },
    });

    const result = response.text ? JSON.parse(response.text) : null;
    if (result) {
        return result;
    }
    throw new Error("Empty response");

  } catch (error) {
    console.error("AI Setlist generation failed:", error);
    // Fallback
    return {
      songIds: availableSongs.slice(0, 3).map(s => s.id),
      description: "AI generation failed, here are some random picks.",
      name: "Emergency Setlist"
    };
  }
};

export const analyzeBookingInquiry = async (details: string): Promise<string> => {
    if (!ai) return "AI Analysis Unavailable";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze this booking inquiry and give a 1-sentence summary of the tone and key requirement: "${details}"`
        });
        return response.text || "No analysis available.";
    } catch (e) {
        return "Could not analyze.";
    }
}

export const analyzeSongRequest = async (song: string, artist: string): Promise<string> => {
    if (!ai) return "AI Unavailable";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `The band is a high-energy cinematic synthwave/rock band. A fan requested "${song}" by "${artist}". 
            Give a 1-sentence verdict on whether this song fits the vibe (be witty/sarcastic if it doesn't).`
        });
        return response.text || "No analysis.";
    } catch (e) {
        return "Analysis failed.";
    }
}
