<!DOCTYPE html>
<html lang="en" >
<?php
include("../connection/connect.php");
error_reporting(0);
session_start();
if(isset($_POST['reg']))
{
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $_POST['password'];
  $pass= md5($password);
	
	if(!empty($_POST["reg"])&&!empty($_POST["username"])&&!empty($_POST["email"])) 
     {
	$regquery ="INSERT INTO admin (username, email, password, rs) VALUES ('$username', '$email', '$pass', 0)";
	$result=mysqli_query($db, $regquery);
	


  header("location:index.php");
	 }
   
	
}
?>

<head>
  <meta charset="UTF-8">
  <title>Admin Registration</title>
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">

  <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900'>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Montserrat:400,700'>
<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>

      <link rel="stylesheet" href="css/login.css">

  
</head>

<body>

  
<div class="container">
  <div class="info">
    <h1>Admin Registration Panel </h1>
  </div>
</div>
<div class="form">
  <div class="thumbnail"><img src="images/manager.png"/></div>
  <span style="color:red;"><?php echo $message; ?></span>
  <span style="color:green;"><?php echo $success; ?></span>
  <form class="login-form" action="registration.php" method="post">
    <input type="text" placeholder="Username" name="username" required/>
    <input type="email" placeholder="Email" name="email" required/>
    <input type="password" placeholder="Password" name="password" required/>
    <input type="submit"  name="reg" value="Register" />
    <a href="index.php">Go to Login</a>
  </form>
  
</div>
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script src='js/index.js'></script>
</body>

</html>
