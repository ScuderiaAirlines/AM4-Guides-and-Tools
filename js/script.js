let advMode;
let calcMode, demandY, demandB, demandF, seatsTotal, distanceRoute, speedAirCraft;

document.querySelector('#alterMode').addEventListener('click', e => {
    let this_button = document.getElementById('alterMode');
    let elements = document.getElementsByClassName('sc-input');
    let element = document.getElementsByClassName('lb');

    for (let index = 0; index < elements.length; index++) {
        elements[index].classList.remove('show');
    }
    elements = document.getElementsByClassName('sc-input');

    if (this_button.innerHTML != "Basic") {
        this_button.innerHTML = "Basic";
    } else {
        this_button.innerHTML = "Advanced";
    }

    for (let index = 0; index < elements.length; index++) {
        if (!elements[index].classList.contains('Adv')) {
            elements[index].classList.add('show')
        }
        if (this_button.innerText == "Basic") {
            if (elements[index].classList.contains('Adv')) {
                elements[index].classList.add('show');
                elements[index].value = "";
            }
        }
    }

    for (let index = 0; index < element.length; index++) {
        element[index].classList.remove('show');
    }
});

document.querySelector('#btnCalcSC').addEventListener('click', e => {
    let element = document.getElementsByClassName('lb');
    let e_result = document.getElementsByClassName('out');
    for (let index = 0; index < element.length; index++) {
        element[index].classList.remove('show');
    }

    demandY = eval(document.getElementById('demandY').value);
    demandB = eval(document.getElementById('demandB').value);
    demandF = eval(document.getElementById('demandF').value);
    seatsTotal = document.getElementById('totalSeats').value;
    distanceRoute = eval(document.getElementById('distanceRoute').value);
    speedAirCraft = eval(document.getElementById('speedAirCraft').value);
    totalDemand = demandY + demandB + demandF;

    if (demandY == "" || demandB == "" || demandF == "" || seatsTotal == "") {
        alert('Please fill in all fields for the calculation to be done correctly! ;)');
        return;
    }
    if (document.getElementById('alterMode').innerText == "Basic") {
        if (distanceRoute == "" || speedAirCraft == "") {
            alert('Please fill in all fields for the calculation to be done correctly! ;)');
            return;
        }
    }

    let result_demandY = Math.round((demandY / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + 2 * demandB / totalDemand * seatsTotal + 3 * demandF / totalDemand * seatsTotal)));
    let result_demandB = Math.round((demandB / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + 2 * demandB / totalDemand * seatsTotal + 3 * demandF / totalDemand * seatsTotal)));
    let result_demandF = Math.round((demandF / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + demandB / totalDemand * seatsTotal * 2 + demandF / totalDemand * seatsTotal * 3)));
    for (let index = 0; index < e_result.length; index++) {
        switch (e_result[index]) {
            case document.getElementById('ySeats'):
                e_result[index].innerHTML = result_demandY;
                break;
            case document.getElementById('bSeats'):
                e_result[index].innerHTML = result_demandB;
                break;
            case document.getElementById('fSeats'):
                e_result[index].innerHTML = result_demandF;
                break;
        }
    }

    if (document.getElementById('alterMode').innerText == "Basic") {
        let result_travelDay = Math.trunc(demandF / result_demandF);
        let result_maxAircraftRouteEasy = Math.trunc(result_travelDay / (24 / (distanceRoute / speedAirCraft)));
        let result_maxAircraftRouteRealism = Math.trunc(result_travelDay / (24 / (distanceRoute / (speedAirCraft * 1.5))));

        for (let index = 0; index < e_result.length; index++) {
            switch (e_result[index]) {
                case document.getElementById('travelDay'):
                    e_result[index].innerHTML = result_travelDay;
                    break;
                case document.getElementById('emAircraftRoute'):
                    e_result[index].innerHTML = result_maxAircraftRouteEasy;
                    break;
                case document.getElementById('rmAircraftRoute'):
                    e_result[index].innerHTML = result_maxAircraftRouteRealism;
                    break;
            }
        }

        for (let index = 0; index < element.length; index++) {
            if (element[index].classList.contains('lb')) {
                element[index].classList.add('show');
            }
        }
    } else {
        for (let index = 0; index < element.length; index++) {
            if (element[index].classList.contains('basic')) {
                element[index].classList.add('show');
            }
        }
    }
});