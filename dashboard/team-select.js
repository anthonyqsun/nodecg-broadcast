const left = document.querySelector('#left-drop');
const right = document.querySelector('#right-drop');

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
    leftRep.value = left.value;
    rightRep.value = right.value;
}