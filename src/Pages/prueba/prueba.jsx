import io from 'socket.io-client';
import { useState, useEffect } from 'react';

//const socket = io.connect('http://localhost:3003');


function Prueba() {
  const [message, setMessage] = useState('');
  const [log, setLog] = useState([]);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setLog([...log, data.message]);
  //   });
  //   socket.on("receive_leaderBoard", (data) => {
  //     console.log('leaderboard', data);   
  //   })
  // }, [socket]);

  const sendMessage = () => {
    console.log('message sended', message); 
    // socket.emit("send_message", { message: message });
    // socket.emit("update_leaderBoard", { message: message });
  }; 
  return (
    <div>
      <h1>Prueba socket.io</h1>
      <div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder='mensaje...' />
        <button onClick={sendMessage}>Enviar mensaje</button>
      </div>
      <div>
        <h1>Log</h1>
        {log.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  )
}

export default Prueba; 