var express = require('express');
var app=express();
var server = require('http').Server(app);
const io = require('socket.io')(server);
// const records = require('./records.js'); // 新增這行

const USER_NUM=5;
const HIST_NUM=USER_NUM*(USER_NUM-1)/2;

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
        id:'12',
        msg:[]
    },
    {
        id:'13',
        msg:[]
    },
    {
        id:'14',
        msg:[]
    },
    {
        id:'15',
        msg:[]
    },
    {
        id:'23',
        msg:[]
    },
    {
        id:'24',
        msg:[]
    },
    {
        id:'25',
        msg:[]
    },
    {
        id:'34',
        msg:[]
    },
    {
        id:'35',
        msg:[]
    },
    {
        id:'45',
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

    socket.on('login',function(name){
       console.log('login');
       console.log(name);

    });

   

    socket.on('disconnect', function(){
      onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
      io.emit("online", onlineCount);
    });

    socket.on('send', function(chat_index,formData){
        console.log("index in send func:"+chat_index);
        history[chat_index].msg.push(formData);
        socket.emit('send', formData);

      });
//new add
    socket.on('switch_chat',function(me,them){
        var chat_index=findChatIndex(me,them);
        console.log("chat_index:"+chat_index);
        console.log("me:"+me+"them:"+them);
        


        socket.emit('switch_chat',chat_index,history[chat_index]);
    });

      
    
  }); 

function findChatIndex(me,them){
    for(let i=0;i<HIST_NUM;i++){
        var my_id=me.slice(-1);//get '1' in user1 
        var their_id=them.slice(-1);
        var hist_id=history[i].id;
        if(my_id+their_id==hist_id||their_id+my_id==hist_id){
        return i;
        }
    }
 
}


server.listen(3000, function(){
  console.log('listening on *:3000');
});
