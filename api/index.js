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
