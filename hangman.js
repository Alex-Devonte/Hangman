$(function() {
  var sub_category = $("#sub_category").html();
  var lives = $("#life-counter");
  var livesCount = 10;
  var hiddenWordContainer = $("#hidden-word");
  var lettersContainer = $("#letters");

  $.ajax({
    type: "POST",
    url: "play.php",
    data: { "sub_category": sub_category },
    dataType: "json",
    success: function(data) {
      var word = data.word.toUpperCase();
      //Replace all spaces in the word
      var wordLength = word.replace(/ /g,'').length;
      var guesses = [];
      var wonGame = false;
      
      displayDashes(word, hiddenWordContainer);
      displayLetters(lettersContainer);

      var letters = $(".letter");

      lettersContainer.on("click", ".letter", function() {
        if (!$(this).hasClass("used"))
        {
          var guess = $(this).text();

          // if guessed letter isn't in word
          if (word.indexOf(guess) == -1)
          {
            livesCount--;
            lives.text(livesCount);

            if (livesCount == 0)
            {
              endGame(letters, wonGame);
              //Display the hidden word
              hiddenWordContainer.text(word);
            }
          }
          else
          {
            for (var i = 0; i < word.length; i++)
            {
              if (guess == word.charAt(i))
              {
                //Replace dash with the correct letter at the corresponding index
                $('.dash').eq(i).text(guess).addClass('correct-guess');
                guesses.push(guess);
              }
            }

            if (guesses.length == wordLength)
            {
              wonGame = true;
              endGame(letters, wonGame);
            }
          }
          $(this).addClass("used");
        } 
      });
    }
  });
});

function displayDashes(word, div)
{
  for (var i = 0; i < word.length; i++)
  {
    var spacer = $("<p class='dash spacer'>&nbsp;</p>");
    var dash = $("<p>-</p>");

    if (word[i] == " ")
    {
      spacer.appendTo(div);
    }
    else
    {
      dash.appendTo(div).addClass("dash");
    }
  }
}

function displayLetters(lettersContainer)
{
  var firstLetter = "A";
  var lastLetter = "Z";
  
  for (var i = firstLetter.charCodeAt(0); i <= lastLetter.charCodeAt(0); i++)
  {
    var letter = $("<p>" + String.fromCharCode(i) + "</p>");
    letter.appendTo(lettersContainer).addClass("letter");
  }

  for (var i = 0; i < 10; i++)
  {
    var letter = $("<p>" + i + "</p>")
    letter.appendTo(lettersContainer).addClass("letter");
  }
}

function disableLetters(letters)
{
  letters.addClass("used");
}

function endGame(letters, wonGame)
{
  disableLetters(letters);
  var message = $("#message");
  message.show();
  if (wonGame)
  {
    message.append("YOU WON!<br>");
  }
  else
  {
    message.append("YOU LOST!<br>");
  }

  message.append("<a href='index.php'>Click here to play again.</a>");
}