const left = document.querySelector('#left-drop');
const right = document.querySelector('#right-drop');
const scores = document.querySelector("#scores");

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

submitButton.onclick = () => {
    leftRep.value = {name: left.value, score:0};
    rightRep.value = {name: right.value, score:0};

    scores.innerHTML="";
    const leftScore = document.createElement("button");
    const rightScore = document.createElement("button");
    leftScore.innerHTML = left.value+": 0";
    rightScore.innerHTML = right.value+": 0";
    scores.append(leftScore);
    scores.append(rightScore);
    NodeCG.waitForReplicants(leftRep, rightRep).then(() => {
        leftScore.onclick = () =>{
            leftScore.innerHTML = left.value+": "+ (++leftRep.value["score"]);
        };
        rightScore.onclick = () =>{
            rightScore.innerHTML = right.value+": "+ (++rightRep.value["score"]);
        };

    });


}