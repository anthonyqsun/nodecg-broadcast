// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:

const left = document.querySelector('#left-drop');
const right = document.querySelector('#right-drop');

const leftRep = nodecg.Replicant("left");
const rightRep = nodecg.Replicant("right");
const teamRep = nodecg.Replicant("teams");

window.onload = (e)=>{
    console.log(teamRep.value);
};



submitButton.onclick= ()=>{
    leftRep.value = left.value;
    rightRep.value = right.value;
}