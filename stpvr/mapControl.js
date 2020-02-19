var earth;

function toRadians(degrees) { return degrees * Math.PI / 180; }

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
            font: '12pt Roboto',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            showBackground: true,
            fillColor: Cesium.Color.WHITE,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -9)
        }
    });
}

function addLine(lat1, lon1, lat2, lon2, name, id) {
    viewer.entities.add({
        id: id,
        name: name,
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([lat1, lon1, lat2, lon2]),
            width: 2,
            material: Cesium.Color.WHITE,
            height: 0.2
        }
    });
}

// function addRadius(lat, lon, radius, name, id) {
//     viewer.entities.add({
//         position: Cesium.Cartesian3.fromDegrees(lat, lon),
//         id: id,
//         name: name,
//         ellipse: {
//             semiMinorAxis: radius,
//             semiMajorAxis: radius,
//             material: Cesium.Color.RED.withAlpha(0.5),
//             height: 0.1
//         }
//     });
// }

function editPointById(lat, lon, name, id) {
    var thisEntity = viewer.entities.removeAll()
}

var viewer;
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
        })
    });

    document.getElementsByClassName('cesium-credit-logoContainer')[0].style.display = "none";
    document.getElementsByClassName('cesium-credit-textContainer')[0].style.display = "none";

    function checkLoadFinished(){
        // cesium finished loading
        var g = viewer.scene.globe._surface
        if ((g._tilesToRender.length !== 0) && (g._tileLoadQueueHigh.length == 0) && (g._tileLoadQueueMedium.length == 0) && (g._tileLoadQueueLow.length == 0)) {
            console.log('Finished loading map.')
            document.getElementById('loader').parentNode.removeChild(document.getElementById('loader'));
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

// getAP

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

            autocomplete(document.getElementById("orig"), dict[id]);
            autocomplete(document.getElementById("dest"), dict[id]);
        }

        function start() {
            var ids = ['icaoC', 'iataC', 'cityRC']
            for (let id of ids) {
                document.getElementById(id).addEventListener('click', function(e){
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

// getAC

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

        autocomplete(document.getElementById('acInput'), acName)
    }
};
getAC.open("GET", "allAC-min.csv", true);
getAC.send();

// process data.

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
            return [Number(ac[1]), Number(ac[2])]
        }
    }
    return null
}

var mstrCalc = [], bestStop = "";

function run() {
    var apMode = document.querySelector('input[name=apMode]:checked').value
    var isRealism = document.getElementById('isRealism').checked
    var isManual = document.getElementById('isManual').checked
    var acInput = document.getElementById('acInput').value

    var origDet = stringToCoor(document.getElementById('orig').value, apMode)
    var destDet = stringToCoor(document.getElementById('dest').value, apMode)
    
    var acDet = getACdetail(acInput);
    try {
        if (acDet === null) throw "No such aircraft."
        if (origDet === null) throw "No such origin airport."
        if (destDet === null) throw "No such destination airport."

        var acRwyReq = (isRealism ? acDet[0] : 0);
        var acRange = acDet[1]

        mstrCalc = []
        for (let ap of mstrAP) {
            var toO = calcDistance(ap[5], ap[6], origDet[5], origDet[6])
            var toD = calcDistance(ap[5], ap[6], destDet[5], destDet[6])
            var error = ""
            if ((isRealism) && (acRwyReq > Number(ap[4]))) { toO = Infinity; toD = Infinity; error += "RWY too short. "}

            if ((toO < 100) && (toO > 0)) { toO = Infinity; error += "Distance to origin is <100km. "}
            if ((toD < 100) && (toD > 0)) { toD = Infinity; error += "Distance to destination is <100km. "}

            if (toO > acRange) { toO = Infinity; error += "Distance to origin is greater than A/C range. "}
            if (toD > acRange) { toD = Infinity; error += "Distance to destination is greater than A/C range. "}
            
            if (toO === null) { toO = Infinity };
            if (toD === null) { toD = Infinity };

            mstrCalc.push(ap.concat([toO, toD, toO+toD, error]))
        }
        mstrCalc.filter(function (e){
            if ((e[9] > 0) && (e[9] !== Infinity)) {
                return true
            } else {
                return false
            }
        })
        mstrCalc.sort(function(a,b) {
            return a[9] - b[9]
        })

        bestStop = mstrCalc[0]
        var stopDisplay = "", origDisplay = "", destDisplay = "";

        if ((bestStop[7] == Infinity) || (bestStop[8] == Infinity)) throw "Unreachable!"

        // at this stage, all unwanted points are removed.

        origDisplay = apMode == 'icao' ? origDet[3] : apMode == 'iata' ? origDet[2] : (origDet[0] + ", " + origDet[1])
        destDisplay = apMode == 'icao' ? destDet[3] : apMode == 'iata' ? destDet[2] : (destDet[0] + ", " + destDet[1])
        viewer.entities.removeAll()

        if ((bestStop[7] == 0) || (bestStop[8] == 0)) {
            addLine(origDet[6], origDet[5], destDet[6], destDet[5], 'originDestination', 'originDestination')
            stopDisplay = '<div class="success"><div style="display: table-cell; vertical-align: middle;" class="padLR">✈ DIRECT ✈</div></div>'
        } else {
            stopDisplay = apMode == 'icao' ? bestStop[3] : apMode == 'iata' ? bestStop[2] : bestStop[0] + ", " + bestStop[1]
            addPoint(bestStop[6], bestStop[5], stopDisplay, 'stopover')
            addLine(origDet[6], origDet[5], bestStop[6], bestStop[5], 'originStopover', 'originStopover')
            addLine(bestStop[6], bestStop[5], destDet[6], destDet[5], 'stopoverDestination', 'stopoverDestination')
            stopDisplay = '<div class="padLR">'+stopDisplay+'</div>'
        }

        addPoint(origDet[6], origDet[5], origDisplay, 'origin')
        addPoint(destDet[6], destDet[5], destDisplay, 'destination')

        console.log(bestStop);
        console.log(origDet);
        console.log(destDet);

        document.getElementById('origName').innerHTML = origDet[0]+", "+origDet[1]
        document.getElementById('stopName').innerHTML = bestStop[0]+", "+bestStop[1]
        document.getElementById('destName').innerHTML = destDet[0]+", "+destDet[1]

        // addRadius(origDet[6], origDet[5], acRange*1000, 'originRange', 'originRange')
        // addRadius(destDet[6], destDet[5], acRange*1000, 'destinationRange', 'destinationRange')

        viewer.flyTo(viewer.entities)

        document.getElementById('stopoverDisplay').innerHTML = stopDisplay;
    } catch (e) {
        viewer.entities.removeAll()
        document.getElementById('stopoverDisplay').innerHTML = '<div class="error"><div style="display: table-cell; vertical-align: middle;" class="padLR">'+e+'</div></div>';
    }
} //main code

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        run();
    }
}); //onEnter
