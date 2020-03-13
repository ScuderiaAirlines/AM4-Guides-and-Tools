<?php
if(isset($_POST['input-departure'])) $air_departure = $_POST['input-departure'];
if(isset($_POST['input-arrival'])) $air_arrival = $_POST['input-arrival'];

session_start();

$_SESSION['air_departure'] = $air_departure;
$_SESSION['air_arrival'] = $air_arrival;

header('Location: ticket.php');
?>