
import axios from "axios";
const api_url = process.env.SNEAKER_API;


export default async function handler(req, res) {
    const {
        query: { sku },
        method,
    } = req

    // Get data from your endpoint
    try {
        if (!api_url) {
            throw new Error("You forgot to set API URL")
        }
        const api_url_sku = api_url + 'limit=10&sku=' + sku;
        const result = await axios.get(api_url_sku);
        res.status(200).json(result.data);
        console.log("backend console");

    } catch (error) {
        console.log("backend console", error);
    }


}
