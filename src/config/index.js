const config = {
  API_KEY:
    process.env.API_KEY ||
    "7c62db1cfb47550927b11191b7995f6cd482b7481fd0d98f1d8b403937b909f9",
  API_URL:
    process.env.API_URL ||
    "https://aitjmbzhsbagnbysj2jrinbrsq.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  TOKEN_URL:
    process.env.TOKEN_URL ||
    "https://bms-api.viatick.com/main/api/oauth2/token",
  X_API_KEY: process.env.X_API_KEY || "da2-zlk3xmy44fg4jpj73vlwlfi7sq",
};

export default config;
