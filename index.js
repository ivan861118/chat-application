
var express = require('express');
var app=express();
var server = require('http').Server(app);
const io = require('socket.io')(server);


let onlineCount = 0;

app.use('/assets',express.static('assets'));


app.get('/', function(req, res){
  res.sendFile(__dirname+'/views/index.html');
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){

        console.log('message: ' + msg);
      });
    
  });

// // 修改 connection 事件
// io.on('connection', (socket) => {
//     // 有連線發生時增加人數
//     onlineCount++;
//     // 發送人數給網頁
//     io.emit("online", onlineCount);
 
//     socket.on("greet", () => {
//         socket.emit("greet", onlineCount);
//     });
 
//     socket.on('disconnect', () => {
//         // 有人離線了，扣人
//         onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
//         io.emit("online", onlineCount);
//     });

//     socket.on("send", (msg) => {
//         console.log(msg)
//     });
// });

server.listen(3000, function(){
  console.log('listening on *:3000');
});
