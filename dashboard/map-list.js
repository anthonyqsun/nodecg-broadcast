const best = document.querySelector('#best-drop');
const mapDrops = document.querySelector('#map-selections');

const mapRep = nodecg.Replicant("allMaps");
const currentMapRep = nodecg.Replicant("currentMaps");

update.onclick = ()=>{
    NodeCG.waitForReplicants(mapRep, currentMapRep).then(() => {
        mapDrops.innerHTML = "";
        let numBest = best ? parseInt(best.value) : 3;
        console.log(numBest);
        for(let i =0; i < numBest; i++) {
            const select = document.createElement("select");
            select.setAttribute("id", "map"+String(i));

            for (let type in mapRep.value) {
                    console.log(type);
                    for (let map in mapRep.value[type]) {
                    const option = document.createElement("option");
                    option.setAttribute("value", map);
                    option.innerHTML=type.toUpperCase()+": "+map;
                    select.append(option);
                }
            }

            mapDrops.append(select);
            mapDrops.append(document.createElement("br"));
        }
        const submit = document.createElement("button");
        submit.setAttribute("id", "submitButton");
        submit.innerHTML="Update Maps";
        mapDrops.append(submit);
        submit.onclick=submitAction;
    });
};

function submitAction() {
    currentMapRep.value = "";
    console.log("yay");
}