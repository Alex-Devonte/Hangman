<?php
  require_once("db_connect.php");
  if (isset($_POST['sub_category']))
  {
    $sub_category = $_POST['sub_category'];
  }

  $wordList = getWordList($connection, $sub_category);
  $randomWord =  getRandomWord($wordList);


  echo (json_encode(array("sub_category" => $sub_category, "word" => $randomWord)));
  /*
   *  getWordList($connection, $topic)
   *  return array of all words from given topic
   * 
   */
  function getWordList($connection, $sub_category)
  {
    $wordList = array();
    $query = $connection->prepare("SELECT word FROM words INNER JOIN sub_categories on words.sub_category_id = sub_categories.sub_category_id WHERE sub_category = :sub_category");
    $query->execute(array("sub_category" => $sub_category));

    foreach ($query as $row)
    {
      //echo $row['word'];
      array_push($wordList, $row['word']);
    }

    return $wordList;
}

/*
 *  getRandomWord($wordList)
 *  select random word from array
 * 
 */
function getRandomWord($wordList)
{
  $randomWord = array_rand($wordList, 1);
  return $wordList[$randomWord];
}
?>

