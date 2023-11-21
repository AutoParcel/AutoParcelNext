import axios from "axios";
import FormData from "form-data";

export default async function usePrediction(img: string) {
  console.log("sending image to server");
  const formData = new FormData();
  img = img.split(",")[1];
  formData.append("image", img);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const result = await axios
    .post("https://pythonserver-ftnw.onrender.com", formData, { headers })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.error("Failed to upload image:", error);
    });
  return result;
}
