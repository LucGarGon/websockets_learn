const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");
let allChat = [];
const ip = process.env.IP
let ws = new WebSocket(`ws://${ip}:8000`, ["json"])


ws.addEventListener("message", (event) => {

    const data = JSON.parse(event.data)
    allChat.push(data)
    render()
})

chat.addEventListener("submit", function(e){
 
    e.preventDefault();

    postNewMsg(chat.elements.user.value, chat.elements.text.value);
    chat.elements.text.value = "";
})

async function postNewMsg(user,text) {
    const data = {
        user,
        text
    };
    ws.send(JSON.stringify(data))
}

function render(){
    const html = allChat.map(({user, text}) => template(user, text));
    msgs.innerHTML = html.join("\n");
}

const template = (user,msg) => 
 `<li><span>${user}</span><span>${msg}</span></li>` 