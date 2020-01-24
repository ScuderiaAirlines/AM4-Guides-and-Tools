<?php

error_reporting(1);


$servername = "remotemysql.com";
$username = "FPPPBECgdE";
$password = "E8WUmH96wH";
$my_db = "FPPPBECgdE";

$con = mysqli_connect($servername,$username,$password,$my_db);
     //Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

if(isset($_POST['dep'])) {
    $dep = $_POST['dep'];
}

if(isset($_POST['arr'])) {
    $arr = $_POST['arr'];
}



$result1 = $con->query("SELECT `lat` FROM airportx WHERE '$dep' IN (`icao`,`iata`)");
$row = $result1->fetch_assoc();
$lat1 = $row['lat'];




$result2 = $con->query("SELECT `lng` FROM airportx WHERE '$dep' IN (`icao`,`iata`)");
$row = $result2->fetch_assoc();
$lng1 = $row['lng'];



$result3 = $con->query("SELECT `lat` FROM airportx WHERE '$arr' IN (`icao`,`iata`)");
$row = $result3->fetch_assoc();
$lat2 = $row['lat'];



$result4 = $con->query("SELECT `lng` FROM airportx WHERE '$arr' IN (`icao`,`iata`)");
$row = $result4->fetch_assoc();
$lng2 = $row['lng'];






echo "<br>";

function distance ($lat1, $lng1, $lat2, $lng2) {
    
    $earth_radius = 6371;
 
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lng2 - $lng1);
 
    $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
    $c = 2 * asin(sqrt($a));
    $d = $earth_radius * $c;

    $e = number_format($d);

    return $e;

    echo "Distance: <strong>$f KM</strong> <br> Input this value below.";
 
}

    $f = distance($lat1, $lng1, $lat2, $lng2);

    echo "Distance: <strong>$f KM</strong> <br> Input this value below.";



    //$lat1= deg2rad($lat1);
    //$lng1= deg2rad($lng1);
    //$lat2= deg2rad($lat2);
    //$lng2= deg2rad($lng2);

    //$dlng = $lng2 - $lng1;
    //$Bx = cos($lat2) * cos($dlng);
    //$By = cos($lat2) * sin($dlng);
    //$lat3 = atan2( sin($lat1)+sin($lat2),
    //sqrt((cos($lat1)+$Bx)*(cos($lat1)+$Bx) + $By*$By ));
    //$lng3 = $lng1 + atan2($By, (cos($lat1) + $Bx));
    //$pi = pi();
    //$flat = ($lat3*180)/$pi;
    //$flng = ($lng3*180)/$pi;

    //echo "<br>Midpoint is $flat , $flng";





?>
