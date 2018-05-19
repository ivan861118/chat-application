var express = require('express');
var app=express();
var server = require('http').Server(app);
const io = require('socket.io')(server);
// const records = require('./records.js'); // 新增這行


var target = 'user1';
var user = '';
let onlineCount = 0;
var users = [
    {
        id:1,
        name:'user1',
    },
    {
        id:2,
        name:'user2',
    },
    {
        id:3,
        name:'user3',
    },
    {
        id:4,
        name:'user4',
    },

    {
        id:5,
        name:'user5',
    },
]

var history=[
    {
        id:12,
        msg:[]
    },
    {
        id:13,
        msg:[]
    },
    {
        id:14,
        msg:[]
    },
    {
        id:15,
        msg:[]
    },
    {
        id:23,
        msg:[]
    },
    {
        id:24,
        msg:[]
    },
    {
        id:25,
        msg:[]
    },
    {
        id:34,
        msg:[]
    },
    {
        id:35,
        msg:[]
    },
    {
        id:45,
        msg:[]
    }
];
// //view engine
// app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));
// //



// app.use('/',express.static('views'));
app.use('/login',express.static('views'));




app.get('/', function(req, res){
  res.sendFile(__dirname+'/views/login.html');

});

app.get('/login', function(req, res){
    res.sendFile(__dirname+'/views/index.html');
  
  });


app.post('/login',function(req,res){
    
    res.redirect('/login');
});
  



io.on('connection', function(socket){


    //有連線發生時增加人數
    onlineCount++;
    // 發送人數給網頁
    io.emit("online", onlineCount);

    // socket.on('login',function(){
    //     res.redirect('/index.html');
   
    // });

    socket.on('disconnect', function(){
      onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
      io.emit("online", onlineCount);
    });

    socket.on('send', function(formData){
        
        history.push(formData);
        io.emit('send', formData);
      });

    // socket.on('switch_chat',function(target_name){
    //     target=target_name;//紀錄現在聊天對象
    //     // var hist = xxxxx;
        


        


    //     io.emit('switch_chat',hist);
    // });

      
    
  }); 

//   ///cookies for log in
//   function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     var user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 365);
//         }
//     }
// }

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
