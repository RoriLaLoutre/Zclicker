// init

let hpBar = document.getElementById("zombieHP");
let imgZombie = document.querySelector(".imgCard")
let card = document.querySelector(".zCard")

let maxHP = document.querySelector(".maxhp")
let currentHP = document.querySelector(".currenthp")

const playerName = document.querySelector(".infoName")
let playerExp = document.querySelector(".infoXP")
let playerGold = document.querySelector(".infoGold")

const saveButton = document.querySelector(".button")

let player = {
    pseudo: "Rori",
    xp: 0,
    gold: 0,
    killcount: 0,
    clickBuff:{
        sword: {
            number: 0,
            description: "Une épée de meilleure qualité pour faire plus de dégats au click",
            dmg: 1,
            baseCost: 10
        },
        potion:{
            number: 0,
            description: "Une potion remplie d'une force mystérieuse",
            dmg: 3,
            baseCost: 45
        },
        crest:{
            number: 0,
            description: "Une croix invoquant un puissant pouvoir, redoutable contre les morts-vivants",
            dmg: 10,
            baseCost: 150
        },
    },
    passiveBuff:{
        poison:{
            number: 0,
            description: "Un effet de poison infligeant des dégats sur la durée",
            dmg: 1,
            baseCost: 25
        },
        villager:{
            number: 0,
            description: "Un villageois vous aide à affronter les zombies",
            dmg: 3,
            baseCost: 105
        },
        kindZombie:{
            number: 0,
            description: "Un gentil Zombie vous aide à affronter ses congénères",
            dmg: 8,
            baseCost: 250
        },
    }
}


let zombieList = [
    {
        name:"Coureur",
        imagePath:"./assets/zombie-3.png",
        hp:15
    },
    {
        name:"Tank",
        imagePath:"./assets/zombie-2.png",
        hp:20
    },
    {
        name:"Faiblard",
        imagePath:"./assets/zombie-1.png",
        hp:10
    }
]
 
function spawnZombie(){
    const randomNumber = Math.floor(Math.random() * zombieList.length);
    zombieToSpawn = zombieList[randomNumber];
    return zombieToSpawn
}

function displayZombieInfo(maxhp , hp , img){
    maxHP.textContent =  Math.floor(maxhp)
    currentHP.textContent =  Math.floor(hp)
    imgZombie.src = img
}

function updateHpBar(current, max) {
    const safeCurrent = Math.max(0, Math.min(current, max));

    const percent = (safeCurrent / max) * 100;
    hpBar.style.width = percent + "%";

    if (percent <= 30) {
        hpBar.style.backgroundColor = "red";
    } else if (percent <= 60) {
        hpBar.style.backgroundColor = "orange";
    } else {
        hpBar.style.backgroundColor = "green";
    }
}

function displayPlayerInfo(player){
    playerName.textContent = player.pseudo;
    playerExp.textContent = player.xp + "🧬";
    playerGold.textContent = player.gold + "🪙"
}



function dealClickDamage(player){
    return 1 + calculDamageClick(player)
}

function calculDamageClick(player){
    let buffs = Object.values(player.clickBuff);
    let damage = 0;
    buffs.forEach(buff => {
        damage += buff.dmg * buff.number;
    });
    return damage;
}

function dealPassiveDamage(player){
    return calculPassiveDamage(player)
}

function calculPassiveDamage(player){
    let buffs = Object.values(player.passiveBuff);
    let damage = 0;
    buffs.forEach(buff => {
        damage += buff.dmg * buff.number;
    });
    return damage;
}

function savePlayer(player) {
    localStorage.setItem("playerData", JSON.stringify(player));

}

saveButton.addEventListener("click" , function(){
    savePlayer(player);
    alert("Progression Sauvegardée")
})

function loadPlayer(){
    const saved = localStorage.getItem("playerData")
    if(saved){
        return JSON.parse(saved);
    }
    else{
        return player
    }
}





let currentZombie = null
let zombieHP = null
let maxZombieHp = null
let ZombieImg = null

// logique jeu


function play(){

    player = loadPlayer()

    card.addEventListener("click", function(e){
        const dmg = dealClickDamage(player); // <-- calculer le damage
        zombieHP -= dmg;
        displayZombieInfo(maxZombieHp, zombieHP , ZombieImg)
        updateHpBar(zombieHP,maxZombieHp)
    
        // Floating damage
        const floating = document.createElement('span');
        floating.classList.add('floating-damage');
        floating.textContent = dmg;
    
        floating.style.left = e.offsetX + "px";
        floating.style.top = e.offsetY + "px";
    
        card.appendChild(floating);
    
        setTimeout(() => {
            floating.remove();
        }, 1000);
    });
    displayPlayerInfo(player);

    setInterval(() => {
        if(!currentZombie){
            currentZombie = spawnZombie()
            zombieHP = currentZombie.hp + Math.log(player.killcount + 1) * 2;
            maxZombieHp = currentZombie.hp + Math.log(player.killcount + 1) * 2
            ZombieImg = currentZombie.imagePath;
            displayZombieInfo(maxZombieHp, zombieHP , ZombieImg)
            updateHpBar(zombieHP,maxZombieHp)
        }
        else {
            if(zombieHP <= 0){

                player.gold += Math.floor(Math.random() * 4);
                player.xp += Math.floor(Math.random() * 4);
                displayPlayerInfo(player);
                player.killcount += 1

                savePlayer(player);
                currentZombie = null
            }
        }
    }, 50);
    setInterval(() => {
        if (currentZombie && zombieHP > 0) {
            zombieHP -= dealPassiveDamage(player);
            displayZombieInfo(maxZombieHp, zombieHP, ZombieImg);
            updateHpBar(zombieHP,maxZombieHp)
            if (zombieHP <= 0) {

                player.gold += Math.floor(Math.random() * 4);
                player.xp += Math.floor(Math.random() * 4);
                displayPlayerInfo(player);
                player.killcount += 1

                savePlayer(player);

                currentZombie = null;
            }
        }
    }, 1000);
}

play()