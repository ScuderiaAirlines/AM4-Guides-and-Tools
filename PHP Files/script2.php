<?php

error_reporting(1);
$con= new PDO('mysql:host=remotemysql.com;dbname=FPPPBECgdE', "FPPPBECgdE", "E8WUmH96wH");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//Initial dates in the format DD-MM-YYYY

if(isset($_POST['input-min-range'])) {
    $minRange = $_POST['input-min-range'];
}

if(isset($_POST['input-max-range'])) {
    $maxRange = $_POST['input-max-range'];
}

if(isset($_POST['input-min-capacity'])) {
    $minCap = $_POST['input-min-capacity'];
}

if(isset($_POST['input-max-capacity'])) {
    $maxCap = $_POST['input-max-capacity'];
}

if(isset($_POST['input-max-price'])) {
    $maxPrice = $_POST['input-max-price'];
}

if(isset($_GET['sort'])){
    $sort=$_GET['sort'];
    $_GET['sort']=''; }
else { 
    $sort="`Cost_$M`"; }



$query = "SELECT `Model`, `Cost_\$M`, `Range`, `CO2_Emissions`, `Fuel_Efficiency`, `Speed`, `Capacity` FROM Serial WHERE `Range` BETWEEN '$minRange' AND '$maxRange' AND `Capacity` BETWEEN '$minCap' AND '$maxCap' AND `Cost_\$M` BETWEEN '0' AND '$maxPrice' ORDER BY '$sort'";



$result = $con->query($query);
//return only the first row (we only need field names)
$row = $result->fetch(PDO::FETCH_ASSOC);

$data = $con->query($query);
$data->setFetchMode(PDO::FETCH_ASSOC);

foreach($data as $row){
echo '<div class="label-modal">';
echo '<tr role="row">';
 foreach($row as $key => $val){
 		echo '<td role="cell">';
 		  echo $val;
 		echo '</td>';
 		//echo '<div id="parent">';
 		//echo '<div id="left">';
    	//echo $key; 
    	//echo '</div>'; 
    	//echo '<div id="right">';
    	//echo $val;
    	//echo '</div>'; 
    	//echo '</div>';
   
}
echo '</tr>';
echo '</thead>';
}

?>
