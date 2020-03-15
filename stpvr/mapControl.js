let earth; let viewer;
let successColor = "#2d862d";
let errColor = "#990000";

var gId = function(id) { return document.getElementById(id); };
function toRadians(degrees) { return degrees * Math.PI / 180; };
function dp(str, x) { return parseFloat(str).toFixed(x); };

function removeByIndex(arr, indexes) {
    for (var i = indexes.length -1; i >= 0; i--) {
        arr.splice(indexes[i],1);
    }
    return arr
}

function calcDistance(lat1,lon1,lat2,lon2) {
    return 6371 * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((toRadians(lat2) - toRadians(lat1)) / 2), 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.pow(Math.sin((toRadians(lon2) - toRadians(lon1)) / 2), 2)));
}

function addPoint(lat, lon, name, id) {
    viewer.entities.add({
        id: id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(lat, lon),
        point: {
            pixelSize: 5,
            color: Cesium.Color.WHITE,
        },
        label: {
            text: name,
            font: '12pt AirlineFont',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            showBackground: true,
            fillColor: Cesium.Color.WHITE,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -9)
        }
    });
}

function addLine(lat1, lon1, lat2, lon2) {
    console.log([lat1, lon1, lat2, lon2])
    viewer.entities.add({
        polyline: {
            positions: new Cesium.CallbackProperty(function() {
                return Cesium.Cartesian3.fromDegreesArray([lat1, lon1, lat2, lon2]);
            }, false),
            width: 2,
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE)
            }
        }
    })
}

/*function addRadius(lat, lon, radius, name, id) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lat, lon),
        id: id,
        name: name,
        ellipse: {
            semiMinorAxis: radius,
            semiMajorAxis: radius,
            material: Cesium.Color.RED.withAlpha(0.5),
            height: 0.1
        }
    });
}*/

function editPointById(lat, lon, name, id) {
    var thisEntity = viewer.entities.removeAll();
    // for collapsing
}

function cesiumInit() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NmRiM2E4Ny0zNmFkLTQxZDUtYWM1ZC0wYTIyNjUzNTBkYzAiLCJpZCI6MjE1NzksInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODAwMDA1Mzd9.5LCVhzDxI1znrSID-a5mnkUlXOGmYCc_2PKJl6axAVA';
    viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,
        fullscreenButton: false,
        scene3DOnly: true,
        selectionIndicator: false,
        //homeButton: false,
        infoBox: false,
        timeline: false,
        geocoder: false,
        navigationHelpButton: false,
        baseLayerPicker: false,
        imageryProvider: new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.satellite'
        }),
    });

    document.getElementsByClassName('cesium-credit-logoContainer')[0].style.display = "none";
    document.getElementsByClassName('cesium-credit-textContainer')[0].style.display = "none";
    
    function checkLoadFinished(){
        // cesium finished loading
        var g = viewer.scene.globe._surface
        if ((g._tilesToRender.length !== 0) && (g._tileLoadQueueHigh.length == 0) && (g._tileLoadQueueMedium.length == 0) && (g._tileLoadQueueLow.length == 0)) {
            console.clear();
            console.log('Finished loading map.');
            gId('loader').parentNode.removeChild(gId('loader'));
        } else {
            setTimeout(checkLoadFinished, 125);
        }
    }

    checkLoadFinished();
}

function setHeading(x) {
    earth.setHeading(x);
}

var iata = [], icao = [], placeName = [], mstrAP = []
var mstrAC = [], acName = [];

// getAC and set autocomplete
var getAC = new XMLHttpRequest();
getAC.overrideMimeType("text/plain");
getAC.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var rT = getAC.responseText.split('\r\n');
        for (let r of rT) {
            mstrAC.push(r.split(','));
        }
        for (let i of mstrAC) {
            acName.push(i[0].replace("|", ", "))
        }

        autocomplete(gId('acInput'), acName)
    }
};
getAC.open("GET", "allAC-min.csv", true);
getAC.send();

// getAP and set autocomplete
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("text/plain");
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var rT = xhr.responseText.split('\r\n');
        for (let r of rT) {
            mstrAP.push(r.split(','))
        }
        for (let i of mstrAP) {
            if (i[2] !== undefined) {iata.push(i[2])}
            if (i[3] !== undefined) {icao.push(i[3])}
            if ((i[0] !== undefined) && (i[1] !== undefined)) {placeName.push(i[0] + ", " + i[1])}
        }

        function changeFormat(id) {
            // if (e.target.tagName !== "INPUT") return;
            var dict = {
                'icaoC': icao,
                'iataC': iata,
                'cityRC': placeName
            }

            autocomplete(gId("orig"), dict[id]);
            autocomplete(gId("dest"), dict[id]);
        }

        function start() {
            var ids = ['icaoC', 'iataC', 'cityRC']
            for (let id of ids) {
                gId(id).addEventListener('click', function(e){
                    if (e.target.tagName == "INPUT") {
                        changeFormat(id);
                    }
                }, false);
            };
        };

        start();
        changeFormat('icaoC');
    }
};
xhr.open("GET", "allAP-min.csv", true);
xhr.send();


// process input data.

function createDivFromStr(htmlString) {
    var div = document.createElement('tr');
    div.innerHTML = htmlString;
    return div.firstChild;
}

function stringToCoor(apRaw, method) { //bear with me: I know this much is unnecessary.
    function parseICAO(apRaw) {
        for (let ap of mstrAP) {
            if (ap[3] == apRaw) {
                return ap;
            }
        }
    }

    function parseIATA(apRaw) {
        for (let ap of mstrAP) {
            if (ap[2] == apRaw) {
                return ap;
            }
        }
    }

    function parseCityRegion(apRaw) {
        for (let ap of mstrAP) {
            if (String(ap[0]+", "+ap[1]) == apRaw) {
                return ap;
            }
        }
    }

    var coors;

    if (method == 'icao') {
        coors = parseICAO(apRaw);
        if (coors === undefined) (coors = parseIATA(apRaw))
        if (coors === undefined) (coors = parseCityRegion(apRaw))
    } else if (method == 'iata') {
        coors = parseIATA(apRaw);
        if (coors === undefined) (coors = parseICAO(apRaw))
        if (coors === undefined) (coors = parseCityRegion(apRaw))
    } else if (method == 'cityRegion') {
        coors = parseCityRegion(apRaw);
        if (coors === undefined) (coors = parseICAO(apRaw))
        if (coors === undefined) (coors = parseIATA(apRaw))
    } else { coors = null }
    (coors === undefined) && (coors = null)
    return coors
}

function getACdetail(acString) {
    for (let ac of mstrAC) {
        if (ac[0] == acString) {
            return [Number(ac[1]), Number(ac[2]), Number(ac[3])]
        }
    }
    return null
}

function calcPaxTicketPrice(distance, isRealism) {
    let yP = 0, jP = 0, fP = 0;
    let d = Math.floor(distance)
    if (isRealism) {
        yP = Math.floor(((((0.3 * d) + 150) * 1.10)) / 10) * 10;
        jP = Math.floor(((((0.6 * d) + 500) * 1.08)) / 10) * 10;
        fP = Math.floor(((((0.9 * d) + 1000) * 1.06)) / 10) * 10;
    } else {
        yP = Math.floor(((((0.4 * d) + 170) * 1.10)) / 10) * 10;
        jP = Math.floor(((((0.8 * d) + 560) * 1.08)) / 10) * 10;
        fP = Math.floor(((((1.2 * d) + 1200) * 1.06)) / 10) * 10;
    }
    return [yP, jP, fP]
}; //modified from Scuderia Airline's Ticket Price Calculator.

function calcCargoTicketPrice(distance, isRealism) {
    // beta!!!
    let lP = 0, hP = 0
    let d = Math.floor(distance)
    if (isRealism) {
        lP = Math.floor((Math.floor((((0.000776321822039374 * d) + 0.860567600367807) - 0.01) * 100) / 100) * 1.1 * 100) / 100
        hP = Math.floor((Math.floor((((0.000517742799409248 * d) + 0.256369915396414) - 0.01) * 100) / 100) * 1.08 * 100) / 100
    } else {
        lP = Math.floor((Math.floor((((0.000948283724581252 * d) + 0.862045432642377) - 0.01) * 100) / 100) * 1.1 * 100) / 100
        hP = Math.floor((Math.floor((((0.000689663577640275 * d) + 0.292981124272893) - 0.01) * 100) / 100) * 1.08 * 100) / 100
    }
    return [lP, hP]
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

let mstrCalc, stopDet = ""; //it is here to be debuggable.

function run() {
    let allOutputs = [gId('origName'), gId('stopName'), gId('destName'),
    gId('leg1d'), gId('leg2d'), gId('diff')]
    try {
        allOutputs.concat([gId('yP'), gId('jP'), gId('fP')])
    } catch (e) {
        allOutputs.concat([gId('lP'), gId('hP')])
    }

    allOutputs.forEach(function(i){
        i.style.backgroundColor = null;
    });
    gId('stopoverDisplay').style.backgroundColor = null;
    try {
        viewer.entities.removeAll()
        var apMode = document.querySelector('input[name=apMode]:checked').value;
        var isRealism = gId('isRealism').checked;
        var acInput = gId('acInput').value;
        var acDet = getACdetail(acInput);
        if (acDet === null) throw "noAC";

        // check origin value and fill in necessary information
        var origDet = stringToCoor(gId('orig').value, apMode);
        if (origDet === null) throw "noO";
        gId('origName').innerHTML = origDet[1]+" - "+origDet[0];

        // check destination value and fill in necessary information
        var destDet = stringToCoor(gId('dest').value, apMode);
        if (destDet === null) throw "noD";
        gId('destName').innerHTML = destDet[1]+" - "+destDet[0];

        let act = calcDistance(origDet[5], origDet[6], destDet[5], destDet[6]);
        gId('diff').innerHTML = dp(act,2)+' km';

        if (acDet[2] == 1) { // isCargo?
            // selected aircraft is now cargo.
            document.getElementById('ticketPriceHeader').innerHTML = 'Cargo Ticket $ (Beta)';
            document.getElementById("ticketPriceHeader").style.color = '#fca9a9';
            
            try { // try removing the pax <td>s and change it to the cargo format
                // the fields previously were pax prices, so change the format into cargo prices.
                gId('yP').parentNode.removeChild(gId('yP')); //compatibility instead of .remove()
                gId('jP').parentNode.removeChild(gId('jP'));
                gId('fP').parentNode.removeChild(gId('fP'));

                lPelem = createDivFromStr('<td class="padLR right" rowspan="2" id="lP">---</td>');
                hPelem = createDivFromStr('<td class="padLR right" rowspan="2" id="hP">---</td>');

                insertAfter(lPelem, document.getElementById('origName'));
                insertBefore(hPelem, document.getElementById('leg2d'));
            } catch(e) { // if not, 
                // the previous format was already in cargo prices, so do nothing to the format.
            } finally {
                // regardless of the previous format, change the values.
                let prices = calcCargoTicketPrice(act, isRealism);
                gId('lP').innerHTML = '<img src="img/l.png">' + prices[0];
                gId('hP').innerHTML = '<img src="img/h.png">' + prices[1];
            }
        } else {
            // selected aircraft is now pax.
            document.getElementById('ticketPriceHeader').innerHTML = 'Pax Ticket $';
            document.getElementById("ticketPriceHeader").style.color = '#FFFFFF';
            try { // try editing the cargo format into pax format
                gId('lP').parentNode.removeChild(gId('lP'));
                gId('hP').parentNode.removeChild(gId('hP'));

                yPelem = createDivFromStr('<td class="padLR right" id="yP">---</td>');
                jPelem = createDivFromStr('<td class="padLR right" id="jP" rowspan="2">---</td>');
                fPelem = createDivFromStr('<td class="padLR right" id="fP">---</td>');

                insertBefore(yPelem, document.getElementById('leg1d'));
                insertAfter(jPelem, document.getElementById('stopName'));
                insertAfter(fPelem, document.getElementById('destName'));
            } catch(e) {
                // if it is already pax, then do nothing to the format.
            } finally {
                let prices = calcPaxTicketPrice(act, isRealism);
                gId('yP').innerHTML = '<img src="img/yS.png">' + prices[0];
                gId('jP').innerHTML = '<img src="img/jS.png">' + prices[1];
                gId('fP').innerHTML = '<img src="img/fS.png">' + prices[2];
            }
        }

        let acRwyReq = (isRealism ? acDet[0] : 0);
        let acRange = acDet[1]

        mstrCalc = []
        for (let ap of mstrAP) {
            var toO = calcDistance(ap[5], ap[6], origDet[5], origDet[6]);
            var toD = calcDistance(ap[5], ap[6], destDet[5], destDet[6]);

            if ((isRealism) && (acRwyReq > Number(ap[4]))) { toO = Infinity; toD = Infinity; }
            if (toO > acRange) { toO = Infinity; }
            if (toD > acRange) { toD = Infinity; }

            if ((toO < 100) && (toO > 0)) { toO = Infinity; }
            if ((toD < 100) && (toD > 0)) { toD = Infinity; }
            
            if (toO === null) { toO = Infinity };
            if (toD === null) { toD = Infinity };

            mstrCalc.push(ap.concat([toO, toD, toO+toD]))
        }
        mstrCalc.filter(function (e){
            if ((e[9] > 0) && (e[9] !== Infinity)) {
                return true
            } else {
                return false
            }
        }) // remove unreachable and o/d airports
        mstrCalc.sort(function(a,b) {
            return a[9] - b[9]
        }) //sort such that best is first

        stopDet = mstrCalc[0];
        var stopDisplay = "", origDisplay = "", destDisplay = "";

        if ((stopDet[7] == Infinity) || (stopDet[8] == Infinity)) throw "no"

        origDisplay = apMode == 'icao' ? origDet[3] : apMode == 'iata' ? origDet[2] : (origDet[0] + ", " + origDet[1])
        destDisplay = apMode == 'icao' ? destDet[3] : apMode == 'iata' ? destDet[2] : (destDet[0] + ", " + destDet[1])
        
        addPoint(origDet[6], origDet[5], origDisplay, 'origin')
        addPoint(destDet[6], destDet[5], destDisplay, 'destination')

        if ((stopDet[7] == 0) || (stopDet[8] == 0)) {
            addLine(origDet[6], origDet[5], destDet[6], destDet[5]);
            viewer.flyTo(viewer.entities)
            throw "direct" // flying direct is the best way.
        } else {    
            stopDisplay = apMode == 'icao' ? stopDet[3] : apMode == 'iata' ? stopDet[2] : stopDet[0] + ", " + stopDet[1] //fallback if input method is wrong
            addPoint(stopDet[6], stopDet[5], stopDisplay, 'stopover')
            addLine(origDet[6], origDet[5], stopDet[6], stopDet[5]);
            addLine(stopDet[6], stopDet[5], destDet[6], destDet[5]);

            console.log(stopDet); console.log(origDet); console.log(destDet);

            gId('stopName').innerHTML = stopDet[1]+" - "+stopDet[0];
            
            gId('leg1d').innerHTML = dp(stopDet[7],2);
            gId('leg2d').innerHTML = dp(stopDet[8],2);
            gId('diff').innerHTML += '<br><span class="grey">Δ = +'+dp((stopDet[7] + stopDet[8]) - act,6)+' km</span>';
            gId('stopoverDisplay').innerHTML = stopDisplay;

            // addRadius(origDet[6], origDet[5], acRange*1000, 'originRange', 'originRange'); addRadius(destDet[6], destDet[5], acRange*1000, 'destinationRange', 'destinationRange')
            viewer.flyTo(viewer.entities);
        }
    } catch (e) {
        console.error(e)
        let message = "Unknown Error.";
        let color = errColor;

        // reduce all error outputs until the desired areas.
        if (e == "noAC") {
            message = "No such aircraft."
            //do nothing: all outputs
        } else if (e == "noO") {
            message = "No such origin airport."
        } else if (e == "noD") {
            message = "No such destination airport."
            allOutputs = removeByIndex(allOutputs, [0])
        } else if (e == "no") {
            message = "Unreachable."
            allOutputs = removeByIndex(allOutputs, [0, 2])
        } else if (e == "direct") {
            message = "✈ DIRECT ✈";
            allOutputs = removeByIndex(allOutputs, [0, 2, 3, 4, 5, 8])
            color = successColor; // since it isn't actually an error
        }
        allOutputs.forEach(function(i){
            i.style.backgroundColor = color;
            i.innerHTML = "---"
        });
        gId('stopoverDisplay').innerHTML = message;
        gId('stopoverDisplay').style.backgroundColor = color;
    } //error
} //main code

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        run();
    }
}); //onEnter
