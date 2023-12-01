const left = document.querySelector('#left-drop');
const right = document.querySelector('#right-drop');

const leftRep = nodecg.Replicant("left");
const rightRep = nodecg.Replicant("right");
const teamRep = nodecg.Replicant("teams"); // doesnt load in time when placed in window.onload either

window.onload = ()=>{
    for (let team in teamRep.value) { // code works
        const option = document.createElement("option");
        option.setAttribute("value", team);
        option.innerHTML=team.toUpperCase();
        left.append(option);
        right.append(option.cloneNode(true));
    }
};

submitButton.onclick= ()=>{
    leftRep.value = left.value;
    rightRep.value = right.value;
}