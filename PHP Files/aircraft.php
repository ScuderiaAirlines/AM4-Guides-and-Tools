<?php
include("connection.php");
$validate = true;

session_start();
if(isset($_SESSION['minRange'])) $minRange = $_SESSION['minRange'];
if(isset($_SESSION['maxRange'])) $maxRange = $_SESSION['maxRange'];
if(isset($_SESSION['minCap'])) $minCap = $_SESSION['minCap'];
if(isset($_SESSION['maxCap'])) $maxCap = $_SESSION['maxCap'];
if(isset($_SESSION['maxPrice'])) $maxPrice = $_SESSION['maxPrice'] * 1000000;
session_unset();
?>

<!DOCTYPE html>
<html lang="en-US">
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

<body id="aircraft-page">
    <div id="backover"></div>
    <div class="result-box" style="position: absolute;">
        <button class="result-close"></button>
        <div class="result-content">
            <h5>Results</h5>
            <span>Aircraft available:</span>
            <hr>
            <div class="label-scrool">
                <?php
                if(!isset($minRange) && !isset($maxRange) && !isset($minCap) && !isset($maxCap) && !isset($maxPrice)) {
                    $validate = false;
                }
                else{
                    $query = "SELECT * FROM aircraft WHERE `air_range` BETWEEN '$minRange' AND '$maxRange' AND `capacity` BETWEEN '$minCap' AND '$maxCap' AND `price` BETWEEN '0' AND '$maxPrice' ORDER BY `manufactory`";
                    $con = $mysqli->query($query) or die($mysqli->error);
                    while($data = $con->fetch_array()){ ?>

                <div class="label-modal">
                    <img class="label-image" src="<?php echo $data["air_image"]; ?>">
                    <div class="label-item">Manufactory: <span class="label-result"><?php echo $data["manufactory"]; ?></span></div>
                    <div class="label-item">Model: <span class="label-result"><?php echo $data["model"]; ?></span></div>
                    <div class="label-item">Speed: <span class="label-result"><?php echo $data["speed"].'/kph'; ?></span></div>
                    <div class="label-item">Capacity: <span class="label-result"><?php echo $data["capacity"].' pax'; ?></span></div>
                    <div class="label-item">Range: <span class="label-result"><?php echo number_format($data["air_range"],0,",","."); ?></span></div>
                    <div class="label-item">Co2: <span class="label-result"><?php echo $data["co2"].'/pax/kph'; ?></span></div>
                    <div class="label-item">Fuel: <span class="label-result"><?php echo $data["fuel"].'/kph'; ?></span></div>
                    <div class="label-item">Price: <span class="label-result"><?php echo '$'.number_format($data["price"],0,",","."); ?></span></div>
                </div>
                
                <?php }} ?>
            </div>
        </div>
    </div>
    <a href="../index.html"><button class="model-button back-button">Back</button></a>
    <section>
        <div class="container">
            <div class="content-all">
                <div class="content-box">
                    <h2>Aircraft Search</h2>
                    <form id="aircraft-search-form" action="collector_aircraft.php" method="POST">
                        <input type="text" name="input-min-range" placeholder="Minimum Range" value="">
                        <input type="text" name="input-max-range" placeholder="Maximum Range">
                        <input type="text" name="input-min-capacity" placeholder="Minimum Capacity">
                        <input type="text" name="input-max-capacity" placeholder="Maximum Capacity">
                        <input type="text" name="input-max-price" placeholder="Maximum Price ($M) (Ex: 1.2)">
                        <button class="model-button">Search</button>
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
        let validate = Boolean("<?php echo $validate ?>");
        if(validate){
            app.centralize(app.el.aircraftPage.querySelector('.result-box'));
            toggleOver([app.el.aircraftPage.querySelector('.result-box')], ['click']);
        }
        app.el.aircraftSearchForm.querySelector('button').on('click', (e)=>{
            let input = app.el.aircraftSearchForm.querySelectorAll('input');
            let isValid = true;

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
                }
            });
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all fields for the calculation to be done correctly! ;)');
                return;
            };
        });
        app.centralize(app.el.aircraftPage.querySelector('section'));
        app.el.aircraftPage.querySelector('.result-box .result-close').on('click', (e) => {
            toggleOver(null, null);
        });
    </script>
</body>

</html>