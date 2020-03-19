let demandY, demandJ, demandF, seatsTotal, totalDemand, dailyFlights;
let seatsY, seatsJ, seatsF, flightRange, airSpeed, fuel, co2, reput;
let ticketPriceY, ticketPriceJ, ticketPriceF;





let seatsForY = function() {
    return Math.round((demandY / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + 2 * demandJ / totalDemand * seatsTotal + 3 * demandF / totalDemand * seatsTotal)));
};
let seatsForJ = function() {
    return Math.round((demandJ / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + 2 * demandJ / totalDemand * seatsTotal + 3 * demandF / totalDemand * seatsTotal)));
};
let seatsForF = function() {
    return Math.round((demandF / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + demandJ / totalDemand * seatsTotal * 2 + demandF / totalDemand * seatsTotal * 3)));
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
        ticketPriceY = (Math.floor((((((0.000948283724581252 * flightRange) + 0.862045432642377000) - 0.01) * 1.10)) * 100) / 100);
        ticketPriceJ = (Math.floor((((((0.000689663577640275 * flightRange) + 0.292981124272893000) - 0.01) * 1.08)) * 100) / 100);
    } else if (mode == "Realism") {
        ticketPriceY = (Math.floor((((((0.000776321822039374 * flightRange) + 0.860567600367807000) - 0.01) * 1.10)) * 100) / 100);
        ticketPriceJ = (Math.floor((((((0.000517742799409248 * flightRange) + 0.256369915396414000) - 0.01) * 1.08)) * 100) / 100);
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

function calcProfit() {
	let ticketPriceY, ticketPriceJ, ticketPriceF;
    let labels = document.getElementsByClassName('lb');
    let out_result = document.getElementsByClassName('out');
    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.remove('show');
    }

    seatsY = document.getElementById('seatsY').value;
    seatsJ = document.getElementById('seatsJ').value;
    seatsF = document.getElementById('seatsF').value;
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

