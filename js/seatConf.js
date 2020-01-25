let demandY, demandJ, demandF, seatsTotal, totalDemand, dailyFlights;
let seatsY, seatsJ, seatsF, flightRange, airSpeed, fuel, co2, reput;
let ticketPriceY, ticketPriceJ, ticketPriceF;

let seatsForY = function() {
    return eval(Math.floor(seatsTotal - (seatsForJ() * 2) - (seatsForF() * 3)));
};

let seatsForJ = function() {
    return eval(Math.floor((seatsTotal - (seatsForF() * 3))));
};

let seatsForF = function() {
    return eval(Math.floor((demandF/dailyFlights)/posAC);
};

let posAC = function() {
    return Math.floor(((demandY/dailyFlights) + (demandJ/dailyFlights*2) + (demandF/dailyFlights*3))/seatsTotal);
};

function calcSeats() {
    let labels = document.getElementsByClassName('lb');
    let out_result = document.getElementsByClassName('out');
    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('show');
    }

    demandY = eval(document.getElementById('demandY').value);
    demandJ = eval(document.getElementById('demandJ').value);
    demandF = eval(document.getElementById('demandF').value);
    seatsTotal = document.getElementById('totalSeats').value;
    dailyFlights = document.getElementById('dailyFlights').value;
    totalDemand = demandY + demandJ + demandF;

    if (demandY == "" || demandJ == "" || demandF == "" || seatsTotal == "" || dailyFlights == "") {
        alert('Please fill in all fields for the calculation to be done correctly! ;)');
        return;
    }

    for (let index = 0; index < out_result.length; index++) {
        switch (out_result[index]) {
            case document.getElementById('ySeats'):
                out_result[index].innerHTML = seatsForY();
                break;
            case document.getElementById('jSeats'):
                out_result[index].innerHTML = seatsForJ();
                break;
            case document.getElementById('fSeats'):
                out_result[index].innerHTML = seatsForF();
                break;
            case document.getElementById('possibleAC'):
                out_result[index].innerHTML = posAC();
                break;
        }
    }

    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.add('show');
    }
};