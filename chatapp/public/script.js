$(()=>{

    
    let socket = io()
    let input = $('#inputbox')
    let send = $('#send')
    let list = $('#list')
    let inner = $('#inner') 
    let login = $("#login")
    let username = $('#username')
    let userbtn = $('#userbtn')
    let update = $('#update')
    let typing = $('#typing')
    // let general = $('#general')
    let group = $('#group')
    let group_login = $('#group_login')
    let group_btn = $('#group_btn')
    let group_name = $('#group_name')
    let group_general = $('#group_general') 
    let group_inner = $('#group_inner')
    let group_list = $('#group_list')
    let group_input = $('#group_inputbox')
    let group_send = $('#group_send')
    let group_typing = $('#group_typing')
    let group_general_button = $('#group_general_button')
    let update_group = $('#update_group')
    let group_group = $('#group_group')
    // let text_user = $('#text_user')
    // let exit_group = $('#exit_group')
    // let send_grp = $('#send_grp')
    // let to_user = $('#to_user')
    

inner.hide()
group_login.hide()
group_inner.hide()
let userid
    socket.on('update',(data)=>{

        let arr = Object.keys(data)

        update.empty()

        for(let i in arr)
        {
            // console.log(data[arr[i]])
            update.append(`<li class="rounded1" >${data[arr[i]]}</li>`)

        }
    })

    userbtn.click(()=>{

        login.hide()
        inner.show()

       userid= username.val()
        // console.log(userid)
        socket.emit('login',{usern : userid})


    })
    username.keyup ( function (ev) {
        if (ev.keyCode == 13) {
           
            login.hide()
            inner.show()
    
            let userid= username.val()
            // console.log(userid)
            socket.emit('login',{usern : userid})

        }
      })

      
    send.click(()=>{     
        let msg = input.val()
        input.val("")
        list.append(`<div style ="margin-left:650px;" class="talk-bubble tri-right round btm-right talktext block" > you : ${msg}</div>`)
        socket.emit('send msg',{message : msg})
            
               
     })

     input.keyup (function(ev)
     {

         if(ev.keyCode == 13)
         {
            let msg = input.val()
            input.val("")
            list.append(`<div style ="margin-left:650px;" class="talk-bubble tri-right round btm-right talktext block " > you : ${msg}</div>`)
            socket.emit('send msg',{message : msg})
         }
         else
         {
            // console.log("here")
            socket.emit('typing',{})
         }
     })

    
     
     socket.on('typing',(data)=>{
           console.log(data)
      typing.text(`${data.username} is typing....`)
     })
     
    socket.on("new msg",(data)=>{
        typing.text("") 
        // console.log("hi")
        list.append(`<div class="talk-bubble tri-right round btm-left talktext block ">${data.username} : ${data.message}</div>`)
        
    })


    // group

    group.click(()=>{
        inner.hide()
        group_login.show()
        
        group_btn.click(()=>{
            // console.log("here1")
            // console.log(group_name.val())
            socket.emit("group_connection",{message:group_name.val()})
        })
       
    })

    group_name.keyup(function(ev)
    {

        if(ev.keyCode == 13)
        {
           
            socket.emit("group_connection",{message:group_name.val()})
        }
        
    })




    socket.on('group_connected',(data)=>{

        group_login.hide()
        // console.log(group_general.text())
        group_general.text(data.group_name)
        group_inner.show()

        //group update
       
       
    })

    group_send.click(()=>{
        // console.log(group_input.val())
        let msg1 = group_input.val()
        group_list.append(`<div style ="margin-left:650px;" class="talk-bubble tri-right round btm-right talktext block" > you : ${msg1}</div>`)  
        socket.emit("group_msg",{message:msg1})
        group_input.val("")
    })

    group_input.keyup (function(ev)
    {

        if(ev.keyCode == 13)
        {
            group_list.append(`<div style ="margin-left:650px;" class="talk-bubble tri-right round btm-right talktext block" > you : ${group_input.val()}</div>`)  
            socket.emit("group_msg",{message:group_input.val()})
            group_input.val("")
        }
        else
        {
           // console.log("here")
           socket.emit('group_typing',{})
        }
    })

    socket.on("group_new msg",(data)=>{
        group_typing.text("") 
        // console.log(data)
        group_list.append(`<div class="talk-bubble tri-right round btm-left talktext block ">${data.username_s} : ${data.message}</div>`)  
        
    })

    
    socket.on('group_typing',(data)=>{
        console.log(data)
   group_typing.text(`${data.username} is typing....`)
  })

  group_general_button.click(()=>{
     group_inner.hide()
     inner.show()
      console.log("general")
  })

  group_group.click(()=>{
      group_inner.hide()
      group_login.show()
        
      group_btn.click(()=>{
          // console.log("here1")
          // console.log(group_name.val())
          socket.emit("group_connection",{message:group_name.val()})
      })

  })
  

  socket.on('group_online',(data)=>{
    console.log(data.grpon)
    console.log("group_online")
let arrg = Object.keys(data.grpon)
// console.log(arrg)
update_group.empty()

for(let j in arrg)
{
   console.log(data.grpon[arrg[j]])
   update_group.append(`<li class="rounded1" >${data.grpon[arrg[j]]}</li>`)

}

})



})