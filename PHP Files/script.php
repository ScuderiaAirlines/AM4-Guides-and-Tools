<?php

error_reporting(0);
$con= new PDO('mysql:host=remotemysql.com;dbname=FPPPBECgdE', "FPPPBECgdE", "E8WUmH96wH");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//Initial dates in the format DD-MM-YYYY

if(isset($_POST['minRangeIn'])) {
    $minRange = $_POST['minRangeIn'];
}

if(isset($_POST['maxRangeIn'])) {
    $maxRange = $_POST['maxRangeIn'];
}

if(isset($_POST['minCapIn'])) {
    $minCap = $_POST['minCapIn'];
}

if(isset($_POST['maxCapIn'])) {
    $maxCap = $_POST['maxCapIn'];
}

$query = "SELECT * FROM Serial WHERE `Range` BETWEEN '$minRange' AND '$maxRange' AND `Capacity` BETWEEN '$minCap' AND '$maxCap' AND `Cost_\$M` BETWEEN '0' AND '$maxCap';";
print "<table>";
$result = $con->query($query);
//return only the first row (we only need field names)
$row = $result->fetch(PDO::FETCH_ASSOC);
print "<tr>";
foreach ($row as $field => $value){
 print "<th>$field</th>";
} // end foreach
print "</tr>";
//second query gets the data
$data = $con->query($query);
$data->setFetchMode(PDO::FETCH_ASSOC);
foreach($data as $row){
 print "<tr>";
  foreach ($row as $name=>$value){
  print "<td>$value</td>";
  } // end field loop
 print "</tr>";
} // end record loop
print "</table>";
?>
