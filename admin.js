// Example: simulate real-time fill level updates
const bins = {
    bin1: {fill: 30, status: 'Partially Full', lastUpdated: '10:30 AM'},
    bin2: {fill: 80, status: 'Almost Full', lastUpdated: '10:28 AM'},
    bin3: {fill: 10, status: 'Empty', lastUpdated: '10:20 AM'}
};

function updateBins() {
    Object.keys(bins).forEach(id => {
        const bin = bins[id];
        const binCard = document.getElementById(id);
        binCard.querySelector('.fill').style.height = bin.fill + '%';
        binCard.querySelector('.status').textContent = bin.status;
        binCard.querySelector('.last-updated').textContent = bin.lastUpdated;
    });
}

// Simulate periodic updates every 5 seconds
setInterval(() => {
    // Randomly change fill levels for demo purposes
    Object.keys(bins).forEach(id => {
        bins[id].fill = Math.min(100, bins[id].fill + Math.floor(Math.random()*10));
        bins[id].status = bins[id].fill < 50 ? 'Partially Full' : bins[id].fill < 90 ? 'Almost Full' : 'Full';
        bins[id].lastUpdated = new Date().toLocaleTimeString();
    });
    updateBins();
}, 5000);

// Initial update
updateBins();
