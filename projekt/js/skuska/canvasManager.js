var unloadingOriginX = 420;
var unloadingOriginY = 30;
var unloadingRightBorder = 780;

var canvas = new fabric.Canvas('canv', {
    backgroundColor: 'white',
    selection: false,
    preserveObjectStacking: true
});

var lorryImgEl = document.getElementById('lorry');

var cargo = []

var lorryBorder = new fabric.Rect({
    left: 0,
    top: 0,
    width: 395,
    height: 595,
    fill: 'white',
    strokeWidth: 5,
    stroke: 'black'
});

var lorry = new fabric.Image(lorryImgEl, {
    left: 90,
    top: 50,
    angle: 0,
    opacity: 1,
    scaleX: 2.5,
    scaleY: 2.5
});

var korba = new fabric.Rect({
    left: 106,
    top: 191,
    width: 173,
    height: 337,
    fill: 'red',
});

canvas.add(lorryBorder, lorry);

function createCargo(c_width, c_height) {
    var newCargo = new fabric.Rect({
        left: 420,
        top: 30,
        width: parseInt(c_width),
        height: parseInt(c_height),
        fill: "#" + Math.random().toString(16).slice(2,8)
    });
    
    cargo.push(newCargo);
    canvas.add(newCargo);
    canvas.requestRenderAll();
}

function sortCargoByHeight() {
    return cargo.sort(function(a,b){return b.get("height") - a.get("height")});
}

function unloadCargo() {
    var targetX = unloadingOriginX;
    var targetY = unloadingOriginY;
    var nextTargetY = targetY + cargo[0].get("height") + 10;

    sortCargoByHeight();
    for(let i = 0; i < cargo.length; i+=1) {
        if(targetX + cargo[i].get("width") > unloadingRightBorder) {
            targetX = unloadingOriginX;
            targetY = nextTargetY;
            nextTargetY = targetY + cargo[i].get("height") + 10;
        }

        cargo[i].set({top: targetY, left: targetX});
        targetX = targetX + cargo[i].get("width") + 10;
    }
    
    canvas.requestRenderAll();
}

function loadSimple() {
    sortCargoByHeight();
    var targetX = korba.get("left");
    var targetY = korba.get("top");
    var nextTargetY = targetY + cargo[0].get("height");

    for(let i = 0; i < cargo.length; i+=1) {
        if(targetX + cargo[i].get("width") > korba.get("left") + korba.get("width")) {
            targetX = korba.get("left");
            targetY = nextTargetY;
            nextTargetY = targetY + cargo[i].get("height");
        }

        if(targetY + cargo[i].get("height") <= korba.get("top") + korba.get("height")) {
            if(targetX == korba.get("left") && nextTargetY != targetY + cargo[i].get("height")) {
                nextTargetY = targetY + cargo[i].get("height");
            }

            cargo[i].set({top: targetY, left: targetX});
            targetX = targetX + cargo[i].get("width");
        }
    }
    
    canvas.requestRenderAll();
}
