const centerTextInput = document.querySelector('#centerTextInput');
    
const leftInput = document.querySelector('#leftInput');
const leftColorInput = document.querySelector('#leftColorInput');
const leftTeamScoreInput = document.querySelector('#leftTeamScoreInput');
const leftIconInput = document.querySelector('#leftIconInput');

const rightInput = document.querySelector('#rightInput');
const rightColorInput = document.querySelector('#rightColorInput');
const rightTeamScoreInput = document.querySelector('#rightTeamScoreInput');
const rightIconInput = document.querySelector('#rightIconInput');

const centerRep = nodecg.Replicant("centerInput");
// all tuples
const topInputRep = nodecg.Replicant("topInput");
const colorInputRep = nodecg.Replicant("colorInput");
const teamScoreInputRep = nodecg.Replicant("teamScoreInput");
const iconInputRep = nodecg.Replicant("iconInput");


submitButton.onclick = () => {
    centerRep.value = centerTextInput.value;
    topInputRep.value = [leftInput.value, rightInput.value];
    colorInputRep.value = [leftColorInput.value, rightColorInput.value];
    teamScoreInputRep.value = [leftTeamScoreInput.value, rightTeamScoreInput.value];
    iconInputRep.value = [leftIconInput.value, rightIconInput.value];
}