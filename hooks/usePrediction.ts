import axios from "axios";
import FormData from "form-data";

export default async function usePrediction(img: string) {
  console.log("send the image to the model and get the prediction");
  const formData = new FormData();
  img = img.split(",")[1];
  formData.append("image", img);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  await axios
    // .post("https://pythonserver-ftnw.onrender.com", formData, { headers })
    .post("http://127.0.0.1:8000", formData, { headers })
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((error) => {
      console.error("Failed to upload image:", error);
    });
  return "test";
}
