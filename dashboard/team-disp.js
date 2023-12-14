const drop = document.querySelector('#drop');

const teamRep = nodecg.Replicant("teams");
const teamDisplayRep = nodecg.Replicant("teamDisplay");

window.onload = ()=>{
    NodeCG.waitForReplicants(teamRep, teamDisplayRep).then(() => {
        for (let team in teamRep.value) { // code works
            const option = document.createElement("option");
            option.setAttribute("value", team);
            option.innerHTML=team;
            drop.append(option);
        }
    });
};

drop.addEventListener("change", (event) =>{
    teamDisplayRep.value = [event.target.value, teamRep.value[event.target.value]];
});