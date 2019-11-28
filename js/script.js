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
    return Math.round((((seatsY * ticketPriceY) + (seatsY * ticketPriceY) + (seatsY * ticketPriceY)) * (reput / 100) - fuel - co2Cost()));
};
let co2Cost = function() {
    return Math.round((co2 / 1000) * 0.20);
};

function calcTicketPrice(mode) {
    if (mode == "Realism") {
        ticketPriceY = Math.round(((299 / 998) * flightRange + (75377 / 499)) * 1.10);
        ticketPriceJ = Math.round(((599 / 998) * flightRange + (249486 / 499)) * 1.8);
        ticketPriceF = Math.round(((449 / 499) * flightRange + (499513 / 499)) * 1.6);
    } else if (mode == "Easy") {
        ticketPriceY = Math.round(((97 / 243) * flightRange + (41410 / 243)) * 1.10);
        ticketPriceJ = Math.round(((194 / 243) * flightRange + (136280 / 243)) * 1.8);
        ticketPriceF = Math.round(((97 / 81) * flightRange + (97300 / 81)) * 1.6);
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
        } else if (out_result[index].classList.contains('Easy')) {
            calcTicketPrice('Easy');
            out_result[index].innerHTML = profitPerTrip().toLocaleString('en-us', { style: 'currency', currency: 'USD' });
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