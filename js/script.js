let demandY, demandJ, demandF, seatsTotal, totalDemand;
let seatsY, seatsJ, seatsF, flightRange, airSpeed, fuel, co2, reput;
let ticketPriceY, ticketPriceJ, ticketPriceF;


let seatsForY = function() {
    return eval(Math.round((demandY / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + 2 * demandJ / totalDemand * seatsTotal + 3 * demandF / totalDemand * seatsTotal))));
};
let seatsForJ = function() {
    return Math.round((demandJ / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + 2 * demandJ / totalDemand * seatsTotal + 3 * demandF / totalDemand * seatsTotal)));
};
let seatsForF = function() {
    return Math.round((demandF / totalDemand * seatsTotal) * (seatsTotal / (demandY / totalDemand * seatsTotal + demandJ / totalDemand * seatsTotal * 2 + demandF / totalDemand * seatsTotal * 3)));
};
let profitPerTrip = function() {
    return Math.round(((((seatsY * ticketPriceY) + (seatsJ * ticketPriceJ) + (seatsF * ticketPriceF)) * (reput / 100) - fuelCost() - co2Cost())/1.2));
};

let nPax = function() {
    return Math.round((+seatsY + +seatsJ + +seatsF));
};

let co2Cost = function() {
    return Math.round(co2 * nPax() * flightRange * 0.14 * (reput/100));
};

let fuelCost = function() {
    return Math.round((fuel * flightRange * 0.85));
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
        ticketPriceY = Math.floor((((0.4 * flightRange) + 170) * 1.10) - 5);
        ticketPriceJ = Math.floor((((0.8 * flightRange) + 560) * 1.08) - 5);
        ticketPriceF = Math.floor((((1.2 * flightRange) + 1200) * 1.06) - 5);
    } else if (mode == "Realism") {
        ticketPriceY = Math.floor((((0.3 * flightRange) + 150) * 1.10) - 5);
        ticketPriceJ = Math.floor((((0.6 * flightRange) + 500) * 1.08) - 5);
        ticketPriceF = Math.floor((((0.9 * flightRange) + 1000) * 1.06) - 5);
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
    totalDemand = demandY + demandJ + demandF;

    if (demandY == "" || demandJ == "" || demandF == "" || seatsTotal == "") {
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
        }
    }

    for (let index = 0; index < labels.length; index++) {
        labels[index].classList.add('show');
    }
};

function calcProfit() {
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
}
