// Customer Page
const userSelect = document.getElementById('user-select');
const username = document.getElementById('username');
const rewardProgress = document.getElementById('reward-progress');
const openBinBtn = document.getElementById('open-bin');
const message = document.getElementById('message');
const binLid = document.getElementById('bin-lid');
const wasteButtons = document.querySelectorAll('.waste-btn');
const weightInput = document.getElementById('weight-input');
const submitWasteBtn = document.getElementById('submit-waste');
const conveyor = document.getElementById('conveyor');

let userPoints = {Alice:0,Bob:0,Charlie:0};
let selectedWaste = null;

// ====== User selection ======
if(userSelect){
    userSelect.addEventListener('change', ()=>{
        username.textContent = userSelect.value;
        rewardProgress.style.width = userPoints[userSelect.value] + '%';
        rewardProgress.textContent = userPoints[userSelect.value] + ' Points';
        message.textContent = '';
        updateRewards(); // update reward buttons on user change
    });
}

// ====== Open Bin Simulation ======
openBinBtn.addEventListener('click', ()=>{
    binLid.classList.add('open');
    message.textContent = 'Bin lid opened! Please choose waste type.';
    setTimeout(()=>{binLid.classList.remove('open');},1000);
});

// ====== Select waste type ======
wasteButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        selectedWaste = btn.dataset.type;
        message.textContent = `Selected Waste: ${selectedWaste}`;
    });
});

// ====== Submit waste & animate ======
submitWasteBtn.addEventListener('click', ()=>{
    if(!selectedWaste){
        alert('Please select a waste type!');
        return;
    }
    let weight = parseFloat(weightInput.value);
    if(weight <=0){
        alert('Enter valid weight!');
        return;
    }

    let points = 0;
    let wasteClass = '';
    if(selectedWaste==='Metal') { points = weight*10; wasteClass='waste-metal'; }
    else if(selectedWaste==='Plastic') { points = weight*5; wasteClass='waste-plastic'; }
    else { points = weight*3; wasteClass='waste-paper'; }

    const user = userSelect.value;
    userPoints[user] += points;
    rewardProgress.style.width = Math.min(userPoints[user],100)+'%';
    rewardProgress.textContent = Math.round(userPoints[user])+' Points';
    message.textContent = `Waste deposited: ${selectedWaste}, Weight: ${weight}kg. Points earned: ${points}.`;

    // Animate waste
    const waste = document.createElement('div');
    waste.classList.add('waste',wasteClass);
    conveyor.appendChild(waste);

    setTimeout(()=>{
        waste.style.top='120px';
    },50);

    setTimeout(()=>{
        if(selectedWaste==='Metal') waste.style.left='110px';
        else if(selectedWaste==='Plastic') waste.style.left='10px';
        else waste.style.left='65px';
        waste.style.top='0px';
    },1100);

    setTimeout(()=>{conveyor.removeChild(waste);},2200);

    selectedWaste=null;

    // Update rewards after points change
    updateRewards();
});

// ====== Rewards Section ======
function updateRewards() {
    const points = userPoints[userSelect.value];
    document.querySelectorAll('.reward-card').forEach(card => {
        const requiredPoints = parseInt(card.querySelector('p').textContent);
        const btn = card.querySelector('button');
        btn.disabled = points < requiredPoints;
    });
}

// Redeem button functionality
document.querySelectorAll('.redeem-btn').forEach(btn => {
    btn.addEventListener('click', ()=>{
        const card = btn.closest('.reward-card');
        const rewardPoints = parseInt(card.querySelector('p').textContent);
        const user = userSelect.value;

        if(userPoints[user] >= rewardPoints){
            userPoints[user] -= rewardPoints;
            alert(`You have redeemed ${card.querySelector('img').alt}!`);
            // Update points display
            rewardProgress.style.width = Math.min(userPoints[user],100)+'%';
            rewardProgress.textContent = Math.round(userPoints[user])+' Points';
            // Refresh reward buttons
            updateRewards();
        }
    });
});

// Initialize rewards on page load
updateRewards();
