var crashed = new Boolean(false);
const VK = require('vk-node-sdk')
const Group = new VK.Group('')

const {Rcon} = require("rcon-client");
const client = new Rcon({
    host: 'localhost', port:'25575', password: '123123'
})
client.on('connect',() =>
{
    console.log('connect')
    crashed = false;
})
client.on('end',() =>
{
    crashed = true;
    console.log('меня ударили черпаком_disconnected')

})
client.on('error', () =>
{
    console.log("меня ударили черпаком")
    crashed = true
    Group.sendMessage({user_id: 000000000, message: 'Сервер упал'}, (messageId, error) => {
        if (messageId) {
            console.log('Сообщение отправлено!\n message_id: ', messageId)
        } else {
            console.log('Не удалось отправить сообщение', error)
        }
    })
})
async function delay(n = 0){
    return new Promise(r => setTimeout(r,n))
}

async function reconnect(){
    while (true) {
        if(crashed == true)
            console.log('Reconnecting after 5s...')
        await client.connect().catch(() => {})
        await delay(5000)
    }
}
reconnect().catch(console.error)
