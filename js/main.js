// init

let joueur = {
    pseudo: "Rori",
    XP: 0,
    gold: 0,
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
        imagePath:"../assets/zombie-1.png",
        hp:"15"
    },
    {
        name:"Tank",
        imagePath:"../assets/zombie-2.png",
        hp:"20"
    },
    {
        name:"Faiblard",
        imagePath:"../assets/zombie-3.png",
        hp:"10"
    }
]

