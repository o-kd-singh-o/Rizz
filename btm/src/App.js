import axios from "axios";
import {useState} from "react";

function App() {
    const [msg, setMsg] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [response, setResponse] = useState("");
    const [prompt, setPrompt] = useState("");

    const send_msg = async () =>{
        // console.log(msg);
        setMsgs((prevState)=>[...prevState, {content: response, res:false}])
        setResponse("");
        const res = await axios.post("http://localhost:8080/",{
            msg: response
        });
        setPrompt(res.data.msg.replace(/"/g, ''));
        // setMsgs((prevState)=>[...prevState, {content: res.data.msg, res:true}])
    }

  return (
    <div className="container">
        <div className='box them' >
            <textarea value={response} onInput={(e)=>{
                setResponse(e.target.value)
            }}/>
            <button onClick={()=>{
                setResponse("");
                send_msg();
            }}>send</button>
            <h1>Them</h1>
        </div>
      <div className="chat-container">
          <div className='chats'>
              {msgs.map((m)=>{
                  return <div className={`chat ${m.res?"chat-right":"chat-left"}`}>
                      {m.content}
                  </div>
              })}
          </div>
          <div className='chat-inp'>
              <input className='chat-input' value={msg} onInput={(e)=>{
                  setMsg(e.target.value);
              }}/>
              <button className='send-btn' onClick={()=>{
                  setMsgs((prevState)=>[...prevState, {content: msg, res:true}]);
                  setMsg("");
              }}>send</button>
          </div>
      </div>
        <div className='box us'>
            <div>{prompt}</div>
            <button onClick={()=>{
                setMsgs((prevState)=>[...prevState, {content: prompt, res:true}]);
                setPrompt("");
                }}>send</button>
                <h1>Prompt</h1>
        </div>
    </div>
  );
}

export default App;
