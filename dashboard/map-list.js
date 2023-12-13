const best = document.querySelector('#best-drop');
const mapDrops = document.querySelector('#map-selections');
const currentMapDiv = document.querySelector('#current-map');

const mapRep = nodecg.Replicant("allMaps");
const currentMapRep = nodecg.Replicant("currentMaps");

let drops;

update.onclick = ()=>{
    NodeCG.waitForReplicants(mapRep, currentMapRep).then(() => {
        mapDrops.innerHTML = "";
        currentMapDiv.innerHTML = "";
        let numBest = best ? parseInt(best.value) : 3;

        drops = document.createElement("div");
        for(let i =0; i < numBest; i++) {
            const select = document.createElement("select");
            select.setAttribute("id", "map"+String(i));

            for (let type in mapRep.value) {
                    for (let map in mapRep.value[type]) {
                    const option = document.createElement("option");
                    option.setAttribute("value", map);
                    option.innerHTML=type.toUpperCase()+": "+map;
                    select.append(option);
                }
            }
            drops.append(select);
            drops.append(document.createElement("br"));
        }
        mapDrops.append(drops);
        const submit = document.createElement("button");
        submit.setAttribute("id", "submitButton");
        submit.innerHTML="Update Maps";
        mapDrops.append(submit);
        submit.onclick=submitAction;
    });
};

function submitAction() {
    let currentMaps=[];
    let selectChildren = drops.children;
    for (let i =0; i < selectChildren.length; i=i+2) {
        currentMaps.push(selectChildren[i].value);
    }
    currentMapRep.value = {maps: currentMaps, index: 0};
    
    mapDrops.innerHTML="";
    currentMapDiv.innerHTML = ""; //resets content

    const select = document.createElement("select");
    for(let i = 0; i < currentMaps.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML=i+1+": "+currentMaps[i];
        select.append(option);
    }
    select.onchange=() => {
        currentMapRep.value["index"] = select.value;
    };
    currentMapDiv.append(select);
    

}