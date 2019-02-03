const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/',express.static(__dirname + "/public"))


let obj = {}
let rev_obj = {}

let grp_online_obj = {}
let g_id

io.on('connection',(socket)=>{

    socket.on('disconnect',()=>{
        console.log("disconnect")
        delete obj[socket.id]
        delete grp_online_obj[socket.id]
        // console.log(obj)
        
        io.to(g_id).emit('group_online',{ grpon : grp_online_obj })
        io.emit('update',obj)
    })


    console.log(socket.id)


    socket.on('login',(data)=>{        
        obj[socket.id] = data.usern 
        rev_obj[data.usern] = socket.id
        // console.log(obj)
      
        io.emit('update',obj)

    })
    
    socket.on('send msg',(data)=>{
    // console.log(data.message)
 
       socket.broadcast.emit('new msg',{message : data.message , username : obj[socket.id] }) 
    }) 
   
   socket.on('typing',()=>{
    //    console.log("here")
        socket.broadcast.emit('typing',{ username:obj[socket.id] })
   })

   
    socket.on("group_connection",(data)=>{

        grp_online_obj[socket.id] = obj[socket.id]
        socket.join(data.message)
        g_id = data.message
        io.to(g_id).emit('group_online',{ grpon : grp_online_obj })
        socket.emit('group_connected',{group_name : data.message })
       
        
      

    
    })



    socket.on('group_msg',(data)=>{
        // console.log( obj[socket.id])
        socket.broadcast.to(g_id).emit('group_new msg',{message : data.message, username_s : obj[socket.id]})
    })
 


    socket.on('group_typing',()=>{
        //    console.log("here")
        socket.to(g_id).emit('group_typing',{ username:obj[socket.id] })
       })

    
})

server.listen(1110,()=>{console.log("http://localhost:1110/")})