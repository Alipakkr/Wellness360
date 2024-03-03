//
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
// console.log(process.env)
console.log(process.env.APIKEY)

const apikey = process.env.APIKEY;
const model = process.env.MODEL;

const OpenAI = require("openai");
const config = {
  // organization: organization,
  apiKey: apikey,
}
const openai = new OpenAI(config);

// create a simple express api that calls the function above
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3080;

app.post("/", async (req, res) => {
  const {message} = req.body;
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: 'assistant', content: `${message}` }] ,
  });
  const msgs = await response.choices[0].message.content;
  res.json({
       msgs
  });
});
// message: response.data.choices[0].text,
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     req.sendFile(path.resolve(__dirname, "client/build", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});