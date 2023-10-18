if (!('serviceWorker' in navigator)) {
    alert('Your browser does not support service workers. The notifications will not work.');
}

const logContainer = document.getElementById('log');
const broadcastChannel = new BroadcastChannel('service-worker-messages');
broadcastChannel.addEventListener('message', ({ data }) => log(data));

document.getElementById('start').addEventListener('click', async () => {
    const permissionStatus = await Notification.requestPermission();

    if (permissionStatus !== 'granted') {
        alert('Notification permissions denied. Please go into the site settings in your browser and allow notifications.');
        return;
    }

    await navigator.serviceWorker.register('service-worker.js');
    log(`Service worker registered.`);
});

document.getElementById('stop').addEventListener('click', async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const registration of registrations) {
        registration.active.postMessage('cleanup');
        await registration.unregister();
        log(`Service worker unregistered.`);
    }
});

function log(text) {
    logContainer.innerText += `\n${text}`;
}
