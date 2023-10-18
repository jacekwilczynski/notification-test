const broadcastChannel = new BroadcastChannel('service-worker-messages');
let counter = 1;
let interval = null;

addEventListener('activate', () => {
    if (interval === null) {
        notify();
        interval = setInterval(notify, 5_000);
    }
});

addEventListener('message', ({ data }) => {
    if (data === 'cleanup') {
        clearInterval(interval);
        interval = null;
    }
});

async function notify() {
    await self.registration.showNotification(`Test ${counter}`);
    broadcastChannel.postMessage(`Notification ${counter} dispatched.`);
    counter++;
}
