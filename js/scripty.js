var demandY, demandJ, seatsTotal, rat, rat1;
let seatsY, seatsJ, seatsF, flightRange, airSpeed, fuel, co2, reput;
let ticketPriceY, ticketPriceJ, ticketPriceF;


    
rat = demandY/demandJ;       

rat1 = rat + 1; 


let seatsForY = function() {
    return Math.round(100/rat1);
};

let seatsForJ = function() {
    return Math.round(100 - seatsForY());
};

let profitPerTrip = function() {
    return Math.round(((((nPaxY() * ticketPriceY) + (nPaxJ() * ticketPriceJ) + (nPaxF() * ticketPriceF)) * (reput / 100)) - fuelCost() - co2Cost())/1.1);
};

let posAC = function() {
    return Math.floor(((demandY/dailyFlights) + (demandJ/dailyFlights*2) + (demandF/dailyFlights*3))/seatsTotal);
};

let nPax = function() {
    return Math.round((+seatsY + +seatsJ + +seatsF));
};

let co2Cost = function() {
    return Math.round(+co2 * nPax() * flightRange * 0.13);
};

let fuelCost = function() {
    return Math.round((+fuel * flightRange * 0.85));
};

let flightsDayR = function() {
    return Math.abs(24/(flightRange / airSpeed));
};

let flightsDayE = function() {
    return Math.abs(24/(flightRange / (airSpeed * 1.5)));
};

let profitDayR = function() {
    return Math.round(profitPerTrip() * flightsDayR());
};

let profitDayE = function() {
    return Math.round(profitPerTrip() * flightsDayE());
};


function calcTicketPrice(mode) {
    if (mode == "Easy") {
        ticketPriceY = (Math.floor(((((0.4 * flightRange) + 170) * 1.10)) / 10) * 10);
        ticketPriceJ = (Math.floor(((((0.8 * flightRange) + 560) * 1.08)) / 10) * 10);
        ticketPriceF = (Math.floor(((((1.2 * flightRange) + 1200) * 1.06)) / 10) * 10);
    } else if (mode == "Realism") {
        ticketPriceY = (Math.floor(((((0.3 * flightRange) + 150) * 1.10)) / 10) * 10);
        ticketPriceJ = (Math.floor(((((0.6 * flightRange) + 500) * 1.08)) / 10) * 10);
        ticketPriceF = (Math.floor(((((0.9 * flightRange) + 1000) * 1.06)) / 10) * 10);
    }
};

function calcSeats() {
    let labels = document.getElementsByClassName('lb');
    let out_result = document.getElementsByClassName('out');
    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('show');
    }

    demandY = eval(document.getElementById('demandY').value);
    demandJ = eval(document.getElementById('demandJ').value);
    seatsTotal = document.getElementById('totalSeats').value;
    totalDemand = demandY + demandJ;

    if (demandY == "" || demandJ == "" || seatsTotal == "") {
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
        }
    }

    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.add('show');
    }
};

function calcProfit() {
    let ticketPriceY, ticketPriceJ, ticketPriceF;
    let labels = document.getElementsByClassName('lb');
    let out_result = document.getElementsByClassName('out');
    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('show');
    }

    seatsY = document.getElementById('seatsY').value;
    seatsJ = document.getElementById('seatsJ').value;
    flightRange = document.getElementById('flightRange').value;
    airSpeed = document.getElementById('airSpeed').value;
    fuel = document.getElementById('fuel').value;
    co2 = document.getElementById('co2').value;
    reput = document.getElementById('reput').value;

    if (seatsY == "" || seatsJ == "" || seatsF == "" || flightRange == "" || airSpeed == "" || fuel == "" || co2 == "" || reput == "") {
        alert('Please fill in all fields for the calculation to be done correctly! ;)');
        return;
    }
    for (let index = 0; index < out_result.length; index++) {
        if (out_result[index].classList.contains('Realism')) {
            calcTicketPrice('Realism');
            out_result[index].innerHTML = profitPerTrip().toLocaleString('en-us', { style: 'currency', currency: 'USD' });
        } 

        else if (out_result[index].classList.contains('Easy')) {
            calcTicketPrice('Easy');
            out_result[index].innerHTML = profitPerTrip().toLocaleString('en-us', { style: 'currency', currency: 'USD' });
        }

        else if (out_result[index].classList.contains('EasyD')) {
            calcTicketPrice('Easy');
            out_result[index].innerHTML = profitDayE().toLocaleString('en-us', { style: 'currency', currency: 'USD' });
        }

        else if (out_result[index].classList.contains('RealismD')) {
            calcTicketPrice('Realism');
            out_result[index].innerHTML = profitDayR().toLocaleString('en-us', { style: 'currency', currency: 'USD' });
        }

    }

    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.add('show');
    }
};



function calcTicket() {
    let labels = document.getElementsByClassName('lb');
    let out_result = document.getElementsByClassName('out');
    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('show');
    }
    flightRange = document.getElementById('flightRange').value;


    if (flightRange == "") {
        alert('Please fill in all fields for the calculation to be done correctly! ;)');
        return;
    }

    for (let index = 0; index < out_result.length; index++) {
        if (out_result[index].classList.contains('Realism')) {
            calcTicketPrice('Realism');
            switch (out_result[index]) {
                case document.getElementById('ySeatsR'):
                    out_result[index].innerHTML = ticketPriceY.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
                    break;
                case document.getElementById('jSeatsR'):
                    out_result[index].innerHTML = ticketPriceJ.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
                    break;
                case document.getElementById('fSeatsR'):
                    out_result[index].innerHTML = ticketPriceF.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
                    break;
            }
        } else if (out_result[index].classList.contains('Easy')) {
            calcTicketPrice('Easy');
            switch (out_result[index]) {
                case document.getElementById('ySeatsE'):
                    out_result[index].innerHTML = ticketPriceY.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
                    break;
                case document.getElementById('jSeatsE'):
                    out_result[index].innerHTML = ticketPriceJ.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
                    break;
                case document.getElementById('fSeatsE'):
                    out_result[index].innerHTML = ticketPriceF.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
                    break;
            }
        }
    }

    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.add('show');
    }
};

