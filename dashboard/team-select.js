const left = document.querySelector('#left-drop');
const right = document.querySelector('#right-drop');
const left_score = document.querySelector("#left_score");
const right_score = document.querySelector("#right_score");
const swap = document.querySelector("#swapButton");

const leftRep = nodecg.Replicant("left");
const rightRep = nodecg.Replicant("right");
const teamRep = nodecg.Replicant("teams");

window.onload = ()=>{
    NodeCG.waitForReplicants(leftRep, rightRep, teamRep).then(() => {
        for (let team in teamRep.value) { // code works
            const option = document.createElement("option");
            option.setAttribute("value", team);
            option.innerHTML=team;
            left.append(option);
            right.append(option.cloneNode(true));
        }
    });
};

swap.onclick = () => {
    let tempValue = leftRep.value;
    leftRep.value = rightRep.value;
    rightRep.value = tempValue;

    let tempScore = left_score.value;
    left_score.value = right_score.value;
    right_score.value = tempScore;

    let tempTeam = left.value;
    left.value = right.value;
    right.value = tempTeam;
}



submitButton.onclick = () => {
    leftRep.value = {name: left.value, score:left_score.value};
    rightRep.value = {name: right.value, score:right_score.value};
    swap.setAttribute("style", "display:inline-block");
}