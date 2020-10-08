<?php
 require_once("db_connect.php");
 if (isset($_POST['sub_category']))
 {
   $sub_category = $_POST['sub_category'];
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
    <canvas id="hangman" width="180" height="250"></canvas>
    <div id="lives">
      <p><span id="life-counter">10</span> lives remaining</p> 
    </div>
    <div id="hidden-word"></div>
    <h1 id="sub_category"><?php echo $sub_category; ?></h1>
    <div id="message"></div>
    <div id="letters"></div>
  </div>
</body>
<script src="hangman.js"></script>
</html>