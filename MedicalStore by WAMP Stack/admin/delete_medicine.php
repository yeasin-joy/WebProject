<?php
include("../connection/connect.php");
error_reporting(0);
session_start();

mysqli_query($db,"DELETE FROM medicine WHERE d_id = '".$_GET['menu_del']."'");
header("location:all_medicine.php");  

?>
