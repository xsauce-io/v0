
import axios from "axios";
const api_url = process.env.SNEAKER_API;


export default async function handler(req, res) {
  const {
    query: { limit },
    method,
  } = req

  // Get data from your endpoint
  try {
    if (!api_url) {
      throw new Error("You forgot to set API URL")
    }
    const api_url_limit = api_url + 'limit=' + limit;
    const result = await axios.get(api_url_limit);
    res.status(200).json(result.data);
    console.log("backend console");

  } catch (error) {
    console.log("backend console", error);
  }


}
