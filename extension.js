
class Player {
    constructor(name, pronouns, classID) {
        this.name = name;
        this.pronouns = pronouns;
        this.classID = classID;
    }
}

let allMaps = {
    "control": {
        "TBD": "TBD_control.png",
        "Lijiang Tower": "Lijiang_Tower.png",
        "Busan": "Busan.png",
        "Nepal": "Nepal.jpg",
        "Antarctic Peninsula": "Antarctic_Peninsula.png",
    },
    "escort": {
        "TBD": "TBD_escort.png",
        "Dorado": "Dorado.png",
        "Shambali Monastery": "Shambali.png",
        "Route 66": "Route_66.png",
        "Rialto": "Rialto.png",
    },
    "hybrid": {
        "TBD": "TBD_hybrid.png",
        "Blizzard World": "Blizzard_World.png",
        "King’s Row": "King's_Row.png",
        "Midtown": "Midtown.png",
        "Numbani": "Numbani.png",
    },
    "push": {
        "TBD": "TBD_push.png",
        "New Queen Street": "New_Queen_Street.jpg",
        "Colosseo": "Colosseo.png",
        "Esperanca": "Esperanca.png",
    },
    "flashpoint": {
        "TBD": "TBD_flashpoint.png",
        "New Junk City": "New_Junk_City.png",
        "Suravasa": "Suravasa.png",
    }
}

// TEAM DEFINITIONS
let teams = {
    "Washington Waff1ers": [
        new Player("Astrophobe", "offense"),
        new Player("Ghillie", "offense"),
        new Player("Omnic", "tank"),
        new Player("Interflux", "support"),
        new Player("Mika", "support"),
    ],
    "Cute Cats From Portugal": [
        new Player("Boto", "offense"),
        new Player("Yoon", "offense"),
        new Player("Keegan", "tank"),
        new Player("Fite", "support"),
        new Player("Jack", "support"),
    ],
    "Pilkers": [
        new Player("Beemer", "offense"),
        new Player("Rogue", "offense"),
        new Player("DXHyperKnight", "tank"),
        new Player("Saya", "support"),
        new Player("zeo", "support"),
    ],
    "DantehFanFans": [
        new Player("Scout", "offense"),
        new Player("Toasty", "offense"),
        new Player("DantehFanFan", "tank"),
        new Player("Paydin", "support"),
        new Player("VTag", "support"),
    ],
    "Soapbox Dominators": [
        new Player("Mustard", "offense"),
        new Player("Ysontay", "offense"),
        new Player("BaccaCat", "tank"),
        new Player("Danny", "support"),
        new Player("Mazoku", "support"),
    ],
    "Heart Pirates": [
        new Player("Casey", "offense"),
        new Player("Mexicant", "offense"),
        new Player("Astaroth420", "tank"),
        new Player("Art3mis", "support"),
        new Player("John", "support"),
    ],
    "GET SOME": [
        new Player("Awpi", "offense"),
        new Player("EggJakey", "offense"),
        new Player("Chris", "tank"),
        new Player("Fancy", "support"),
        new Player("Joshua404", "support"),
    ],
}

module.exports = function (nodecg) {
    const teamRep = nodecg.Replicant("teams");
    teamRep.value = teams;

    const mapRep = nodecg.Replicant("allMaps");
    mapRep.value = allMaps;

    // OTHER REPLICANT INITIALIZATIONS
    nodecg.Replicant("teamDisplay");
    nodecg.Replicant("left"); // {name: left.value, score:0};
    nodecg.Replicant("right"); // {name: right.value, score:0};
    nodecg.Replicant("currentMaps"); // {maps: currentMaps, index: 0}
    nodecg.Replicant("caster1"); // {name: name1.value, twitter: twitter1.value}
    nodecg.Replicant("caster2"); // {name: name2.value, twitter: twitter2.value}

    nodecg.Replicant("centerInput");
    // all tuples
    nodecg.Replicant("topInput");
    nodecg.Replicant("colorInput");
    nodecg.Replicant("teamScoreInput");
    nodecg.Replicant("iconInput");
    nodecg.Replicant("bestOf");
}

