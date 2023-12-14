const left = document.querySelector('#left-drop');
const right = document.querySelector('#right-drop');
const scores = document.querySelector("#scores");

const leftRep = nodecg.Replicant("left");
const rightRep = nodecg.Replicant("right");
const teamRep = nodecg.Replicant("teams");
const historyRep = nodecg.Replicant("history");

window.onload = ()=>{
    NodeCG.waitForReplicants(leftRep, rightRep, teamRep, historyRep).then(() => {
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
    const push = document.createElement("button");
    leftScore.innerHTML = left.value+": 0";
    rightScore.innerHTML = right.value+": 0";
    push.innerHTML = "Push to history";
    scores.append(leftScore);
    scores.append(rightScore);
    scores.append(document.createElement("br"));
    scores.append(push);
    leftScore.onclick = () =>{
        leftScore.innerHTML = left.value+": "+ (++leftRep.value["score"]);
    };
    rightScore.onclick = () =>{
        rightScore.innerHTML = right.value+": "+ (++rightRep.value["score"]);
    };
    push.onclick = () =>{
        historyRep.value.push({
            left:leftRep.value['name'],
            right:rightRep.value['name'],
            score:""+leftRep.value['score']+"-"+rightRep.value['score']
        });
        scores.innerHTML="";
    }
}