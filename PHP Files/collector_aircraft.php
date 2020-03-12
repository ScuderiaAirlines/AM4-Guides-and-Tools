<?php
if(isset($_POST['input-min-range'])) $minRange = $_POST['input-min-range'];
if(isset($_POST['input-max-range'])) $maxRange = $_POST['input-max-range'];
if(isset($_POST['input-min-capacity'])) $minCap = $_POST['input-min-capacity'];
if(isset($_POST['input-max-capacity'])) $maxCap = $_POST['input-max-capacity'];
if(isset($_POST['input-max-price'])) $maxPrice = $_POST['input-max-price'];

session_start();

$_SESSION['minRange'] = $minRange;
$_SESSION['maxRange'] = $maxRange;
$_SESSION['minCap'] = $minCap;
$_SESSION['maxCap'] = $maxCap;
$_SESSION['maxPrice'] = $maxPrice;

header('Location: aircraft.php');
?>