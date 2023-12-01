
class Player {
    constructor(name, pronouns, classID, imgFile) {
        this.name = name;
        this.pronouns = pronouns;
        this.classID = classID;
        this.imgFile = imgFile;
    }
}

let allMaps = {
    "control": {
        "Busan": "FILE/LOCATION",
    },
    "escort": {
        "Circuit Royal": "FILE/LOCATION",
    },
    "hybrid": {
        "Blizzard World": "FILE/LOCATION",
    },
    "push": {
        "Colosseo": "FILE/LOCATION",
    }
}

// TEAM DEFINITIONS
let teams = {
    "Alpha": [
        new Player("a-alpha", "they/them", "offense", ""),
        new Player("b-alpha", "they/them", "offense", ""),
        new Player("c-alpha", "they/them", "tank", ""),
        new Player("d-alpha", "they/them", "support", ""),
        new Player("e-alpha", "they/them", "support", ""),
    ],
    "Bravo": [
        new Player("a-bravo", "they/them", "offense", ""),
        new Player("b-bravo", "they/them", "offense", ""),
        new Player("c-bravo", "they/them", "tank", ""),
        new Player("d-bravo", "they/them", "support", ""),
        new Player("e-bravo", "they/them", "support", ""),
    ],
    "Charlie": [
        new Player("a-charlie", "they/them", "offense", ""),
        new Player("b-charlie", "they/them", "offense", ""),
        new Player("c-charlie", "they/them", "tank", ""),
        new Player("d-charlie", "they/them", "support", ""),
        new Player("e-charlie", "they/them", "support", ""),
    ],
    "Delta": [
        new Player("a-delta", "they/them", "offense", ""),
        new Player("b-delta", "they/them", "offense", ""),
        new Player("c-delta", "they/them", "tank", ""),
        new Player("d-delta", "they/them", "support", ""),
        new Player("e-delta", "they/them", "support", ""),
    ],
    "Echo": [
        new Player("a-echo", "they/them", "offense", ""),
        new Player("b-echo", "they/them", "offense", ""),
        new Player("c-echo", "they/them", "tank", ""),
        new Player("d-echo", "they/them", "support", ""),
        new Player("e-echo", "they/them", "support", ""),
    ],
    "Foxtrot": [
        new Player("a-foxtrot", "they/them", "offense", ""),
        new Player("b-foxtrot", "they/them", "offense", ""),
        new Player("c-foxtrot", "they/them", "tank", ""),
        new Player("d-foxtrot", "they/them", "support", ""),
        new Player("e-foxtrot", "they/them", "support", ""),
    ],
}

module.exports = function (nodecg) {
    const teamRep = nodecg.Replicant("teams");
    teamRep.value = teams;

    const mapRep = nodecg.Replicant("allMaps");
    mapRep.value = allMaps;

    // OTHER REPLICANT INITIALIZATIONS
    nodecg.Replicant("left");
    nodecg.Replicant("right");
    nodecg.Replicant("currentMaps");
}

