const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const x = canvas.width/2;
const y = canvas.height/2;
let rotation;
let num;
let xArr = [];
let yArr = [];

// all of this is just to make the polygon less pixelated
const dpr = (window.devicePixelRatio || 1) ;
canvas.width = 500 * dpr;  
canvas.height = 500 * dpr;
canvas.style.width = "500px";
canvas.style.height = "500px";
ctx.scale(dpr, dpr);

document.getElementById("num").addEventListener("input", drawPolygon);

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    xArr = [];
    yArr = [];
    document.getElementById("name").innerHTML = "";
    document.getElementById("num").value = "";
    document.getElementById("noPolygon").checked = false;
}

function giveName(num){
    const polygonNames = [
        "Triangle", "Quadrilateral", "Pentagon", "Hexagon", "Heptagon", "Octagon", "Nonagon", 
        "Decagon", "Hendecagon", "Dodecagon", "Tridecagon", "Tetradecagon", "Pentadecagon", 
        "Hexadecagon", "Heptadecagon", "Octadecagon", "Enneadecagon", "Icosagon", "Icosihenagon", 
        "Icosidigon", "Icositrigon", "Icositetragon", "Icosipentagon", "Icosihexagon", 
        "Icosiheptagon", "Icosioctagon", "Icosienneagon", "Triacontagon", "Triacontahenagon", 
        "Triacontadigon", "Triacontatrigon", "Triacontatetragon", "Triacontapentagon", 
        "Triacontahexagon", "Triacontaheptagon", "Triacontaoctagon", "Triacontaenneagon", 
        "Tetracontagon", "Tetracontahenagon", "Tetracontadigon", "Tetracontatrigon", 
        "Tetracontatetragon", "Tetracontapentagon", "Tetracontahexagon", "Tetracontaheptagon", 
        "Tetracontaoctagon", "Tetracontaenneagon", "Pentacontagon", "Pentacontahenagon", 
        "Pentacontadigon", "Pentacontatrigon", "Pentacontatetragon", "Pentacontapentagon", 
        "Pentacontahexagon", "Pentacontaheptagon", "Pentacontaoctagon", "Pentacontaenneagon", 
        "Hexacontagon", "Hexacontahenagon", "Hexacontadigon", "Hexacontatrigon", 
        "Hexacontatetragon", "Hexacontapentagon", "Hexacontahexagon", "Hexacontaheptagon", 
        "Hexacontaoctagon", "Hexacontaenneagon", "Heptacontagon", "Heptacontahenagon", 
        "Heptacontadigon", "Heptacontatrigon", "Heptacontatetragon", "Heptacontapentagon", 
        "Heptacontahexagon", "Heptacontaheptagon", "Heptacontaoctagon", "Heptacontaenneagon", 
        "Octacontagon", "Octacontahenagon", "Octacontadigon", "Octacontatrigon", 
        "Octacontatetragon", "Octacontapentagon", "Octacontahexagon", "Octacontaheptagon", 
        "Octacontaoctagon", "Octacontaenneagon", "Enneacontagon", "Enneacontahenagon", 
        "Enneacontadigon", "Enneacontatrigon", "Enneacontatetragon", "Enneacontapentagon", 
        "Enneacontahexagon", "Enneacontaheptagon", "Enneacontaoctagon", "Enneacontaenneagon", 
        "Hectogon", "Hectohenagon", "Hectodigon", "Hectotrigon", "Hectotetragon", 
        "Hectopentagon", "Hectohexagon", "Hectoheptagon", "Hectooctagon", "Hectoenneagon", 
        "Hectodecagon", "Hectoundecagon", "Hectododecagon", "Hectotridecagon", 
        "Hectotetradecagon", "Hectopentadecagon", "Hectohexadecagon", "Hectoheptadecagon", 
        "Hectooctadecagon", "Hectoenneadecagon", "Hectotriacontagon", "Hectotetracontagon", 
        "Hectopentacontagon", "Hectohexacontagon", "Hectoheptacontagon", "Hectooctacontagon", 
        "Hectoenneacontagon", "Dihectogon", "Dihectohenagon", "Dihectodigon", "Dihectotrigon", 
        "Dihectotetragon", "Dihectopentagon", "Dihectohexagon", "Dihectoheptagon", 
        "Dihectooctagon", "Dihectoenneagon", "Dihectodecagon", "Dihectoundecagon", 
        "Dihectododecagon", "Dihectotridecagon", "Dihectotetradecagon", "Dihectopentadecagon", 
        "Dihectohexadecagon", "Dihectoheptadecagon", "Dihectooctadecagon", 
        "Dihectoenneadecagon", "Dihectotriacontagon", "Dihectotetracontagon", 
        "Dihectopentacontagon", "Dihectohexacontagon", "Dihectoheptacontagon", 
        "Dihectooctacontagon", "Dihectoenneacontagon", "Trihectogon", "Trihectohenagon", 
        "Trihectodigon", "Trihectotrigon", "Trihectotetragon", "Trihectopentagon", 
        "Trihectohexagon", "Trihectoheptagon", "Trihectooctagon", "Trihectoenneagon", 
        "Trihectodecagon", "Trihectoundecagon", "Trihectododecagon", "Trihectotridecagon", 
        "Trihectotetradecagon", "Trihectopentadecagon", "Trihectohexadecagon", 
        "Trihectoheptadecagon", "Trihectooctadecagon", "Trihectoenneadecagon", 
        "Trihectotriacontagon", "Trihectotetracontagon", "Trihectopentacontagon", 
        "Trihectohexacontagon", "Trihectaheptacontagon", "Trihectooctacontagon", 
        "Trihectoenneacontagon", "Tetrahectogon", "Tetrahectohenagon", "Tetrahectodigon", 
        "Tetrahectotrigon", "Tetrahectotetragon", "Tetrahectopentagon", "Tetrahectohexagon", 
        "Tetrahectoheptagon", "Tetrahectooctagon", "Tetrahectoenneagon", "Tetrahectodecagon", 
        "Tetrahectoundecagon", "Tetrahectododecagon", "Tetrahectotridecagon", 
        "Tetrahectotetradecagon", "Tetrahectopentadecagon", "Tetrahectohexadecagon", 
        "Tetrahectoheptadecagon", "Tetrahectooctadecagon", "Tetrahectoenneadecagon", 
        "Tetrahectotriacontagon", "Tetrahectotetracontagon", "Tetrahectopentacontagon", 
        "Tetrahectohexacontagon", "Tetrahectoheptacontagon", "Tetrahectooctacontagon", 
        "Tetrahectoenneacontagon", "Pentahectogon", "Pentahectohenagon", "Pentahectodigon", 
        "Pentahectotrigon", "Pentahectotetragon", "Pentahectopentagon", "Pentahectohexagon", 
        "Pentahectoheptagon", "Pentahectooctagon", "Pentahectoenneagon", "Pentahectodecagon", 
        "Pentahectoundecagon", "Pentahectododecagon", "Pentahectotridecagon", 
        "Pentahectotetradecagon", "Pentahectopentadecagon", "Pentahectohexadecagon", 
        "Pentahectoheptadecagon", "Pentahectooctadecagon", "Pentahectoenneadecagon", 
        "Pentahectotriacontagon", "Pentahectotetracontagon", "Pentahectopentacontagon", 
        "Pentahectohexacontagon", "Pentahectoheptacontagon", "Pentahectooctacontagon", 
        "Pentahectoenneacontagon", "Hexahectogon", "Hexahectohenagon", "Hexahectodigon", 
        "Hexahectotrigon", "Hexahectotetragon", "Hexahectopentagon", "Hexahectohexagon", 
        "Hexahectoheptagon", "Hexahectooctagon", "Hexahectoenneagon", "Hexahectodecagon", 
        "Hexahectoundecagon", "Hexahectododecagon", "Hexahectotridecagon", 
        "Hexahectotetradecagon", "Hexahectopentadecagon", "Hexahectohexadecagon", 
        "Hexahectoheptadecagon", "Hexahectooctadecagon", "Hexahectoenneadecagon", 
        "Hexahectotriacontagon", "Hexahectotetracontagon", "Hexahectopentacontagon", 
        "Hexahectohexacontagon", "Hexahectoheptacontagon", "Hexahectooctacontagon", 
        "Hexahectoenneacontagon", "Heptahectogon", "Heptahectohenagon", "Heptahectodigon", 
        "Heptahectotrigon", "Heptahectotetragon", "Heptahectopentagon", "Heptahectohexagon", 
        "Heptahectoheptagon", "Heptahectooctagon", "Heptahectoenneagon", "Heptahectodecagon", 
        "Heptahectoundecagon", "Heptahectododecagon", "Heptahectotridecagon", 
        "Heptahectotetradecagon", "Heptahectopentadecagon", "Heptahectohexadecagon", 
        "Heptahectoheptadecagon", "Heptahectooctadecagon", "Heptahectoenneadecagon", 
        "Heptahectotriacontagon", "Heptahectotetracontagon", "Heptahectopentacontagon", 
        "Heptahectohexacontagon", "Heptahectoheptacontagon", "Heptahectooctacontagon", 
        "Heptahectoenneacontagon", "Octahectogon", "Octahectohenagon", "Octahectodigon", 
        "Octahectotrigon", "Octahectotetragon", "Octahectopentagon", "Octahectohexagon", 
        "Octahectoheptagon", "Octahectooctagon", "Octahectoenneagon", "Octahectodecagon", 
        "Octahectoundecagon", "Octahectododecagon", "Octahectotridecagon", 
        "Octahectotetradecagon", "Octahectopentadecagon", "Octahectohexadecagon", 
        "Octahectoheptadecagon", "Octahectooctadecagon", "Octahectoenneadecagon", 
        "Octahectotriacontagon", "Octahectotetracontagon", "Octahectopentacontagon", 
        "Octahectohexacontagon", "Octahectoheptacontagon", "Octahectooctacontagon", 
        "Octahectoenneacontagon", "Enneahectogon", "Enneahectohenagon", "Enneahectodigon", 
        "Enneahectotrigon", "Enneahectotetragon", "Enneahectopentagon", "Enneahectohexagon", 
        "Enneahectoheptagon", "Enneahectooctagon", "Enneahectoenneagon", "Enneahectodecagon", 
        "Enneahectoundecagon", "Enneahectododecagon", "Enneahectotridecagon", 
        "Enneahectotetradecagon", "Enneahectopentadecagon", "Enneahectohexadecagon", 
        "Enneahectoheptadecagon", "Enneahectooctadecagon", "Enneahectoenneadecagon", 
        "Enneahectotriacontagon", "Enneahectotetracontagon", "Enneahectopentacontagon", 
        "Enneahectohexacontagon", "Enneahectoheptacontagon", "Enneahectooctacontagon", 
        "Enneahectoenneacontagon", "Hectohectogon", "Hectohectohenagon", "Hectohectodigon", 
        "Hectohectotrigon", "Hectohectotetragon", "Hectohectopentagon", "Hectohectohexagon", 
        "Hectohectoheptagon", "Hectohectooctagon", "Hectohectoenneagon", "Hectohectodecagon", 
        "Hectohectoundecagon", "Hectohectododecagon", "Hectohectotridecagon", 
        "Hectohectotetradecagon", "Hectohectopentadecagon", "Hectohectohexadecagon", 
        "Hectohectoheptadecagon"
];

    if(num>2 && num<=360 && (!document.getElementById("num").value == "")){
        // minus 3 because: -2 cause we start at 3 sides, -1 to get to 0 for first element
        document.getElementById("name").innerHTML = polygonNames[num-3];
    }

}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawPolygon(){
    document.getElementById("name").innerHTML = "";
    let num = document.getElementById("num").value;
    giveName(num);
    let rotation = (360/num) * (Math.PI/180);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    xArr = [];
    yArr = [];

    if(num>2 && num<=360 && (!document.getElementById("num").value == "")){
        // base or intial line
        drawLine(x,y,x,y-200);
        xArr.push(x);
        yArr.push(y-200);

        for(let i = 1; i < num; i++){
            // for the math behind this, first you subtract the point you want to rotate by the location of the custom origin.
            // then, number * cos (angle ~ calculated by finding the angle of each inner part and multipling by which next line it is) - number * 
            // sin (angle) which gives you the x coord. same thing is done for y but flipped and then addition instead. lastly, the origin is added back.
            drawLine(x, y, ((((x-x) * Math.cos(rotation*i))-(((y-200)-y)* Math.sin(rotation*i))+x)), ((((x-x) * Math.sin(rotation*i))+(((y-200)-y)* Math.cos(rotation*i))+y)));
            xArr.push((((x-x) * Math.cos(rotation*i))-(((y-200)-y)* Math.sin(rotation*i))+x));
            yArr.push(((((x-x) * Math.sin(rotation*i))+(((y-200)-y)* Math.cos(rotation*i))+y)));
    }

        if(!document.getElementById("noPolygon").checked){
            // uses endpoints from the line to map the polygon shape
            ctx.beginPath();
            ctx.moveTo(xArr[0],yArr[0]);
            for(let i = 1; i < xArr.length;i++){
                ctx.lineTo(xArr[i],yArr[i]);
            }
            ctx.fillStyle = "#00a2df";
            ctx.fill();
        }
    }
}