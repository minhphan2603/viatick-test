import axios from "axios";
import config from "../config";

const { API_KEY, API_URL, TOKEN_URL, X_API_KEY } = config;

const getAccessToken = async () => {
  try {
    const created_at = Date.now();
    const { data = {} } = await axios.post(
      TOKEN_URL,
      {},
      {
        headers: { grant_type: "client_credentials", scope: API_KEY },
      }
    );
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expired_at", created_at + 3600 * 1000);
  } catch (error) {
    console.log("GET TOKEN ERROR", error);
  }
};

export default async function gqlRequest({ query = "", variables = {} }) {
  let ACCESS_TOKEN = localStorage.getItem("access_token");
  let EXPIRED_AT = localStorage.getItem("expired_at");
  if (
    !ACCESS_TOKEN ||
    !EXPIRED_AT ||
    Date.now() > new Date(Number(EXPIRED_AT))
  ) {
    await getAccessToken();
    ACCESS_TOKEN = localStorage.getItem("access_token");
    EXPIRED_AT = localStorage.getItem("expired_at");
  }
  try {
    const response = await axios({
      method: "post",
      url: API_URL,
      headers: {
        "X-Api-Key": X_API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        query,
        variables,
      }),
    });
    return response.data;
  } catch (error) {
    console.log("CALL API ERROR", error);
  }
}
