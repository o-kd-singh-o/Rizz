import { ChatGPTAPIBrowser } from 'chatgpt'
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
let convo_id = null;
let p_id = null;
async function example() {
  // use puppeteer to bypass cloudflare (headful because of captchas)
  const api = new ChatGPTAPIBrowser({
    email: "singhkundan278@gmail.com",
    password: "Leavemealone@69"
  })

  await api.initSession()



  app.post("/",async (req,res)=>{
    const result = (convo_id && p_id)? await api.sendMessage(req.body.msg +" " + `send a flirty response` + "in context of above messages sent on dating app", {
    conversationId: convo_id,
    parentMessageId: p_id
    }) : await api.sendMessage(req.body.msg +" " + `send a flirty response` + "in context of above messages sent on dating app", );
    convo_id = result.conversationId;
    p_id = result.messageId;
    res.json({msg: result.response});
  })

  app.listen(8080, ()=>{
    console.log(`server started`)
  })
}

example()