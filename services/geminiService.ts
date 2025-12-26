
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const analyzePetSymptom = async (
  description: string,
  imageUri?: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are an expert Veterinary Diagnostic Assistant. 
    Analyze the user's description and optional photo of their pet's health concern.
    Provide:
    1. A list of potential differential diagnoses (what it could be).
    2. Suggested diagnostic tests (e.g., blood work, X-ray, Ultrasound).
    3. Urgency level (Routine, Urgent, Emergency).
    
    CRITICAL DISCLAIMER: Always state that you are an AI assistant and not a replacement for a licensed veterinarian. 
    Urge the user to see a professional immediately for diagnosis.
    Keep the tone professional, empathetic, and informative.
  `;

  try {
    const parts: any[] = [{ text: description }];
    
    if (imageUri) {
      const base64Data = imageUri.split(',')[1];
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error("Diagnostic analysis failed. Please try again later.");
  }
};
