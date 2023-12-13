const name1 = document.querySelector('#name1');
const twitter1 = document.querySelector('#twitter1');
const name2 = document.querySelector('#name2');
const twitter2 = document.querySelector('#twitter2');

const caster1 = nodecg.Replicant("caster1");
const caster2 = nodecg.Replicant("caster2");

submitButton.onclick = () => {
    NodeCG.waitForReplicants(caster1, caster2).then(() => {
        caster1.value = {name: name1.value, twitter: twitter1.value};
        caster2.value = {name: name2.value, twitter: twitter2.value};
    });
};