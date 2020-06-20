// Discord RPC
const { ipcRenderer } = require('electron');

const checkPresence = () => {
    if (document.getElementById('frame').contentWindow.document.getElementById('song-select')) ipcRenderer.send('RpcToSongSelect');
    else if (document.getElementById('frame').contentWindow.document.getElementById('game')) {
        if ((document.getElementById('frame').contentWindow.document.getElementById('game').classList.contains('game-paused'))) ipcRenderer.send('RpcToPaused');
        if ((document.getElementById('frame').contentWindow.document.getElementById('game').classList.contains('multiplayer'))) ipcRenderer.send('RpcToMultiplayer');
        const data = {
            "songname": `${document.getElementById('frame').contentWindow.debugObj.controller.selectedSong.title}`,
            "difficulty": `${document.getElementById('frame').contentWindow.debugObj.controller.selectedSong.difficulty}`
        }
        ipcRenderer.send('RpcToGame', data);
    } 
    else if (document.getElementById('frame').contentWindow.document.getElementById('load-song')) ipcRenderer.send('RpcToLoading');
    else ipcRenderer.send('RpcToMainMenu');
}

setInterval(checkPresence, 15000);

// Config
const config = require(`${require('os').homedir()}\\taikoconfig.json`);

if (!config.url) document.getElementById('frame').src = 'https://taiko.derpyenterprises.org';
else document.getElementById('frame').src = config.url;