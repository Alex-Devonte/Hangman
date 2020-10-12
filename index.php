<?php
  function populateDropdown()
  {
    require_once("db_connect.php");

    $query = $connection->query("SELECT category, category_id FROM categories");

    foreach ($query as $row)
    {
      echo "<optgroup label=$row[category]>";
      
      foreach ($connection->query("SELECT sub_category FROM sub_categories INNER JOIN categories ON sub_categories.category_id = categories.category_id WHERE sub_categories.category_id = $row[category_id]") as $r)
      {
        
        echo "<option>$r[sub_category]</option>";
      }
      echo "</optgroup>";
    }
  }
  
?>
<!DOCTYPE html>
<html>
<head>
	<title>Hangman</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="index.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
  <div id="form-container">
    <h1>Select a category</h1>
    <form method="post" action="hangman.php">
      <select id="sub_category" name="sub_category">
        <?php
          populateDropdown();
        ?>
        <!--<optgroup label="Sports">
          <option value="NFL Teams">NFL Teams</option>
          <option value="NBA Teams">NBA Teams</option>
        </optgroup>
        <optgroup label="People">
          <option value="Actors">Actors</option>
          <option value="US Presidents">US Presidents</option>
        </optgroup>
        <optgroup label="Brands">
          <option value="Apparel">Apparel</option>
          <option value="Electronics">Electronics</option>
        </optgroup>
        <optgroup label="Miscellanous">
          <option value="Colors">Colors</option>
          <option value="Months">Months</option>
        </optgroup>-->
      </select>
      <div id="button-container">
        <button name="select-category-btn" class="select-btn" value="select">Select Category</button>
        <button id="random-category-btn" name="random-category-btn" class="select-btn" value="random">Random Category</button>
      </div>  
    </form>
  </div>
</body>
<script src="random.js"></script>
</html>