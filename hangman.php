<?php
 require_once("db_connect.php");

 if (isset($_POST['topic']))
 {
   $topic = $_POST['topic'];
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
  <h1 id="topic-name"><?php echo $topic; ?></h1>
  <div id="game-wrapper">
    <div id="lives">
      <p><span id="life-counter">10</span> lives remaining</p> 
    </div>
    <div id="hidden-word"></div>
    <div id="message"></div>
    <div id="letters"></div>
  </div>
</body>
<script src="hangman.js"></script>
</html>