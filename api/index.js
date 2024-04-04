import axios from "axios";
import * as FileSystem from "expo-file-system";

export const sendAudioToBackend = async (uri) => {
  const audioFile = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const url =
    "http://192.168.0.167:5001/getstuffdone-80541/us-central1/transcribeAudio";

  try {
    const response = await axios.post(
      url,
      { audioFile: audioFile },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error("Error sending audio file:", error);
    return "";
  }
};

export const analyzeTranscript = async (context) => {
  const functionsUrl =
    "http://192.168.0.167:5001/getstuffdone-80541/us-central1/openAICompletion";
  const model = "gpt-3.5-turbo";

  try {
    const response = await axios.post(
      functionsUrl,
      {
        context: context,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
