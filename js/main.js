// init

let hpBar = document.getElementById("zombieHP");
let imgZombie = document.querySelector(".imgCard")
let card = document.querySelector(".zCard")

const buffList = document.querySelector(".buff")
const passiveList = document.querySelector(".passive")

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
            baseCost: 10,
            logo:"🗡️"
        },
        potion:{
            number: 0,
            description: "Une potion remplie d'une force mystérieuse",
            dmg: 3,
            baseCost: 45,
            logo:"⚗️"
        },
        crest:{
            number: 0,
            description: "Une croix invoquant un puissant pouvoir, redoutable contre les morts-vivants",
            dmg: 10,
            baseCost: 150,
            logo:"✝️"
        },
    },
    passiveBuff:{
        poison:{
            number: 0,
            description: "Un effet de poison infligeant des dégats sur la durée",
            dmg: 1,
            baseCost: 25,
            logo:"☠️"
        },
        villager:{
            number: 0,
            description: "Un villageois vous aide à affronter les zombies",
            dmg: 3,
            baseCost: 105,
            logo:"👨‍🌾"
        },
        kindZombie:{
            number: 0,
            description: "Un gentil Zombie vous aide à affronter ses congénères",
            dmg: 8,
            baseCost: 250,
            logo:"🧟"
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



function generateBuffAndPassiveCard(Currentplayer ,typeOfItem,Item){
        let card = document.createElement("div");
        card.classList.add("buffcard");
        if(Item.baseCost <= Currentplayer.gold){
            card.style.backgroundColor = "green";
        }
        else{
            card.style.backgroundColor = "gray";

        }

        let cardLogo = document.createElement("div");
        cardLogo.textContent = Item.logo;
        let cardName = document.createElement("div");
        cardName.textContent = Item.description;
        let cardCost = document.createElement("div");
        cardCost.textContent = Item.baseCost + "🪙";

        card.appendChild(cardLogo);
        card.appendChild(cardName);
        card.appendChild(cardCost);

          card.addEventListener("click", () => {
        if(Currentplayer.gold >= Item.baseCost){

            Currentplayer.gold -= Item.baseCost;
            Item.number += 1;

            displayPlayerInfo(Currentplayer);
            generateAllBuffAndPassive(Currentplayer);
            // Sauvegarder
            savePlayer(Currentplayer);
        }
    });

        typeOfItem.appendChild(card);
}
function generateAllBuffAndPassive(Currentplayer){
    buffList.innerHTML = "<div class='buff gameW'>Liste des Buffs</div>"
    passiveList.innerHTML =  "<div class='passive gameW'>Liste de Passifs</div>"

    let buffs = Object.values(Currentplayer.clickBuff);
    let passives = Object.values(Currentplayer.passiveBuff);
    buffs.forEach(buff => {
        generateBuffAndPassiveCard(Currentplayer, buffList , buff)
    });
    passives.forEach(passive => {
        generateBuffAndPassiveCard(Currentplayer, passiveList , passive)
    });
}
 
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

    Currentplayer = loadPlayer()

    card.addEventListener("click", function(e){
        const dmg = dealClickDamage(Currentplayer); 
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
    displayPlayerInfo(Currentplayer);
    generateAllBuffAndPassive(Currentplayer);

    setInterval(() => {
        if(!currentZombie){
            currentZombie = spawnZombie()
            zombieHP = currentZombie.hp  + Math.pow(Currentplayer.killcount, 1.1);
            maxZombieHp = currentZombie.hp  + Math.pow(Currentplayer.killcount, 1.1);
            ZombieImg = currentZombie.imagePath;
            displayZombieInfo(maxZombieHp, zombieHP , ZombieImg)
            updateHpBar(zombieHP,maxZombieHp)
        }
        else {
            if(zombieHP <= 0){

                Currentplayer.gold += 1 + Math.floor(Math.random() * 5);
                Currentplayer.xp += 1 + Math.floor(Math.random() * 2);
                displayPlayerInfo(Currentplayer);
                generateAllBuffAndPassive(Currentplayer)
                Currentplayer.killcount += 1
                savePlayer(Currentplayer);
                currentZombie = null
            }
        }
    }, 50);
    setInterval(() => {
        if (currentZombie && zombieHP > 0) {
            zombieHP -= dealPassiveDamage(Currentplayer);
            displayZombieInfo(maxZombieHp, zombieHP, ZombieImg);
            updateHpBar(zombieHP,maxZombieHp)
            if (zombieHP <= 0) {

                Currentplayer.gold += 1 + Math.floor(Math.random() * 5);
                Currentplayer.xp += 1 + Math.floor(Math.random() * 2);
                displayPlayerInfo(Currentplayer);
                generateAllBuffAndPassive(Currentplayer)
                Currentplayer.killcount += 1
                savePlayer(Currentplayer);
                currentZombie = null;
            }
        }
    }, 500);
}

play()