<?php
// Use the connection page
include("connection.php");
/* Variable that will receive the value of the entire calculation,
and that will be passed on to JS and presented as a result to the user. */
$rangeGlobal;

// Receives the value of the variables in session. Session originated from collector_ticket.
session_start();
if(isset($_SESSION['air_departure'])) $air_departure = $_SESSION['air_departure'];
if(isset($_SESSION['air_arrival'])) $air_arrival = $_SESSION['air_arrival'];
session_unset();


if(isset($air_departure) && isset($air_arrival)){
    // A query list
    $query = [
        "depLat"=>"SELECT `lat` FROM airportx WHERE '$air_departure' IN (`icao`,`iata`)",
        "depLong"=>"SELECT `lng` FROM airportx WHERE '$air_departure' IN (`icao`,`iata`)",
        "arrLat"=>"SELECT `lat` FROM airportx WHERE '$air_arrival' IN (`icao`,`iata`)",
        "arrLong"=>"SELECT `lng` FROM airportx WHERE '$air_arrival' IN (`icao`,`iata`)"
    ];
    
    // List of SQL search results
    $result = [];
    
    for($i = 0; $i <= count($query) - 1;$i++){
        $con = $mysqli->query($query[$i]) or die($mysqli->error);
        $row = $con->fetch_assoc();
        array_push($result, $row[0]);
    }
    
    function distance ($depLat, $depLong, $arrLat, $arrLong) {
        
        $earth_radius = 6371;
     
        $dLat = deg2rad($arrLat - $depLat);
        $dLon = deg2rad($arrLong - $depLong);
     
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($depLat)) * cos(deg2rad($arrLat)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * asin(sqrt($a));
        $d = $earth_radius * $c;
    
        $e = number_format($d);
        echo $e;
    };
    
    $rangeGlobal = distance($result[0],$result[1],$result[2],$result[3]);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-153514321-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-153514321-1');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/design.css">
    <title>AM4 Calculator - Seats Configuration</title>
</head>

<body id="ticket-page">
    <div id="backover"></div>
    <div class="result-box" style="position: absolute;">
        <button class="result-close"></button>
        <div class="result-content">
            <h5>Results</h5>
            <span>Recommended prices</span>
            <hr>
            <span>Realism:</span>
            <div class="label-item">Class Y: <span class="label-result result-realism-class-y"></span></div>
            <div class="label-item">Class J: <span class="label-result result-realism-class-j"></span></div>
            <div class="label-item">Class F: <span class="label-result result-realism-class-f"></span></div>
            <hr>
            <span>Easy:</span>
            <div class="label-item">Class Y: <span class="label-result result-easy-class-y"></span></div>
            <div class="label-item">Class J: <span class="label-result result-easy-class-j"></span></div>
            <div class="label-item">Class F: <span class="label-result result-easy-class-f"></span></div>

        </div>
    </div>
    <a href="../index.html"><button class="model-button back-button">Back</button></a>
    <section>
        <div class="container">
            <div class="content-all">
                <div class="content-box">
                    <h2>Tickets Calculator</h2>
                    <div class="mode-form">
                        <button class="model-button btn-simple-mode active">Simple</button>
                        <button class="model-button btn-find-mode">Distance finder</button>
                    </div>
                    <form id="ticket-calculator-form" action="collector_ticket.php" method="POST">
                        <input type="text" name="input-departure" placeholder="Departure (IATA/ICAO Code)" style="display: none;">
                        <input type="text" name="input-arrival" placeholder="Arrival (IATA/ICAO Code)" style="display: none;">
                        <input type="text" name="input-flight-range" placeholder="Route (km)" style="display: block;">
                        <button class="model-button">Calculate</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <script src="../js/library/popper.js"></script>
    <script src="../js/library/jquery.js"></script>
    <script src="../js/library/bootstrap.js"></script>
    <script src="../js/utils/Format.js "></script>
    <script src="../js/control/main.js "></script>
    <script src="../js/app.js "></script>
    <script>
        app.centralize(app.el.ticketPage.querySelector('section'));

        app.el.ticketPage.querySelector('.mode-form .btn-simple-mode').on('click', (e) => {
            app.el.ticketPage.querySelector('.mode-form .btn-simple-mode').modeForm(app.el.ticketCalculatorForm, 'ticket-page');
        });
        app.el.ticketPage.querySelector('.mode-form .btn-find-mode').on('click', (e) => {
            app.el.ticketPage.querySelector('.mode-form .btn-find-mode').modeForm(app.el.ticketCalculatorForm, 'ticket-page');
        });

        app.el.ticketCalculatorForm.on('submit', (e) => {

            e.preventDefault();

            let modeForm = () => {
                return (app.el.ticketCalculatorForm.querySelector('input[name=input-departure]').style.display == 'none') ? 'simple-mode' : 'find-mode';
            };

            if (modeForm() == 'simple-mode') {
                let input = app.el.ticketCalculatorForm.querySelectorAll('input');
                let views = document.querySelectorAll('.result-box .result-content .label-item .label-result');
                let isValid = true;
                let values = {
                    flightRange: 0
                };

                [...input].forEach((element) => {
                    if (!isValid) return;
                    if (element.style.display != 'none') {
                        if (!element.value) {
                            isValid = false;
                            return;
                        } else if (element.value < 0) {
                            isValid = false;
                            return;
                        }
                        switch (element.name) {
                            case 'input-flight-range':
                                values.flightRange = element.value;
                                break;
                        }
                    }
                });
                if (!isValid) {
                    alert('Please fill in all fields for the calculation to be done correctly! ;)');
                    return;
                };

                let result = app.ticket(values.flightRange);

                [...views].forEach((label) => {
                    if (label.classList.contains('result-realism-class-y')) label.innerText = result.realismPriceY;
                    if (label.classList.contains('result-realism-class-j')) label.innerText = result.realismPriceJ;
                    if (label.classList.contains('result-realism-class-f')) label.innerText = result.realismPriceF;
                    if (label.classList.contains('result-easy-class-y')) label.innerText = result.easyPriceY;
                    if (label.classList.contains('result-easy-class-j')) label.innerText = result.easyPriceJ;
                    if (label.classList.contains('result-easy-class-f')) label.innerText = result.easyPriceF;
                });
            } else {
                let input = app.el.ticketCalculatorForm.querySelectorAll('input');
                let views = document.querySelectorAll('.result-box .result-content .label-item .label-result');
                let isValid = true;
                let values = {
                    departure: null,
                    arrival: null
                };

                [...input].forEach((element) => {
                    if (!isValid) return;
                    if (element.style.display != 'none') {
                        if (!element.value) {
                            isValid = false;
                            return;
                        } else if (element.value < 0) {
                            isValid = false;
                            return;
                        }
                        switch (element.name) {
                            case 'input-departure':
                                values.departure = element.value;
                                break;
                            case 'input-arrival':
                                values.arrival = element.value;
                                break;
                        }
                    }
                });
                if (!isValid) {
                    alert('Please fill in all fields for the calculation to be done correctly! ;)');
                    return;
                };

                let result = app.ticket("<?php echo $rangeGlobal ?>");

                [...views].forEach((label) => {
                    if (label.classList.contains('result-realism-class-y')) label.innerText = result.realismPriceY;
                    if (label.classList.contains('result-realism-class-j')) label.innerText = result.realismPriceJ;
                    if (label.classList.contains('result-realism-class-f')) label.innerText = result.realismPriceF;
                    if (label.classList.contains('result-easy-class-y')) label.innerText = result.easyPriceY;
                    if (label.classList.contains('result-easy-class-j')) label.innerText = result.easyPriceJ;
                    if (label.classList.contains('result-easy-class-f')) label.innerText = result.easyPriceF;
                });
            }
            app.centralize(app.el.ticketPage.querySelector('.result-box'));
            toggleOver([app.el.ticketPage.querySelector('.result-box')], ['click']);
        });

        app.el.ticketPage.querySelector('.result-box .result-close').on('click', (e) => {
            toggleOver(null, null);
        });
    </script>
</body>

</html>