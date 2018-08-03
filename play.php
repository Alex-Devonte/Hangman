<?php
  require_once("db_connect.php");

  if (isset($_POST['topic-name']))
  {
    $topic = $_POST['topic-name'];
  }

  $wordList = getWordList($connection, $topic);
  $randomWord =  getRandomWord($wordList);


  echo (json_encode(array("topic" => $topic, "word" => $randomWord)));
  /*
   *  getWordList($connection, $topic)
   *  return array of all words from given topic
   * 
   */
  function getWordList($connection, $topic)
  {
    $wordList = array();
    $query = $connection->prepare("SELECT word FROM words INNER JOIN topics on words.topic_id = topics.topic_id WHERE topic = :topic");
    $query->execute(array("topic" => $topic));

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