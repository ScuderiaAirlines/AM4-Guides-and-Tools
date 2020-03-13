<?php
$host = "www.ryzersoft.com.br";
$db = "ryzersof_am4";
$user = "ryzersof_am4_admin";
$password = "useram4admin";

$mysqli = new mysqli($host,$user,$password,$db);

if($mysqli->connect_errno)
    echo "Connection fail: (".$mysqli->connect_errno.") " .$mysqli->connect_error;
?>