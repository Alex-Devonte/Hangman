<?php
 require_once("db_connect.php");
 if (isset($_POST['sub_category']))
 {
   if (isset($_POST['random-category-btn']))
   {
    $sub_category = $_POST['random-category-btn'];
   } else {
    $sub_category = $_POST['sub_category'];
   }
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Hangman</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="hangman.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
  <div id="game-wrapper">
    <canvas id="hangman" width="500" height="300"></canvas>
    <div id="hidden-word"></div>
    <h1 id="sub_category"><?php echo $sub_category; ?></h1>
    <div id="message"></div>
    <div id="letters"></div>
  </div>
</body>
<script src="hangman.js"></script>
</html>