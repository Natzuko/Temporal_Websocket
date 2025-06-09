let ws = new WebSocket('wss://lightningstorms-b87ed702e11d.herokuapp.com:443');

let controlledByTD = document.querySelector('.controlledByTD');

let controllTD = document.querySelector('.controllTD');
controllTD.addEventListener('input', (event) => {

    ws.send(JSON.stringify({ 'slider1': controllTD.value / 100.0 }))
    console.log(controllTD.value);
});

ws.addEventListener('open', (event) => {
    console.log('websocket opened');
});

ws.addEventListener('message', (message) => {
    if (message.data == 'ping') {
        ws.send('pong');
        return;
    }

    let data = JSON.parse(message.data);
    if ('slider1' in data) {
        let val = data['slider1'];
        controlledByTD.value = val * 100;
        console.log('val', val)
    }


    console.log(data);
});

ws.addEventListener('error', (error) => {
    console.error('websocket closed');
});

ws.addEventListener('close', (event) => {
    console.log('websocket closed');
});
