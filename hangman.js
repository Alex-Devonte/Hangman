$(function() {
  var sub_category = $("#sub_category").html();
  var lives = $("#life-counter");
  var livesCount = 7;
  var hiddenWordContainer = $("#hidden-word");
  var lettersContainer = $("#letters");

  var canvas = $("#hangman")[0];
  context = canvas.getContext("2d");
  context.strokeStyle = "#000";
  context.lineWidth = 4;
  
 /* var canvasOffset = $("#hangman").offset();
  var offsetX = canvasOffset.left;
  var offsetY = canvasOffset.top;

  $("#hangman").mousemove(function(e){
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    console.log("Move: " + mouseX + " / " + mouseY);
  });*/
  
  function drawGallows() {
    //Base
    context.moveTo(200, 280);
    context.lineTo(10, 280);
    context.stroke();
    
    //Pilar
    context.moveTo(30, 280);
    context.lineTo(30, 110);
    context.stroke();

    //Top
    context.moveTo(30, 110);
    context.lineTo(130, 110);
    context.stroke();

    //Hang
    context.moveTo(130, 110);
    context.lineTo(130, 150);
    context.stroke();
  }

  function drawHead() {
    context.beginPath();
    context.arc(130, 165, 15, 0, 2 * Math.PI);
    context.stroke();
  }
  
  function drawBody() {
    context.moveTo(130, 180);
    context.lineTo(130, 230);
    context.stroke();
  }

  function drawLeftArm() {
    context.moveTo(100, 185);
    context.lineTo(130, 200);
    context.stroke();
  }

  function drawRightArm() {
    context.moveTo(160, 185);
    context.lineTo(130, 200);
    context.stroke();
  }

  function drawLeftLeg() {
    context.moveTo(105, 250);
    context.lineTo(130, 225);
    context.stroke();
  }

  function drawRightLeg() {
    context.moveTo(150, 250);
    context.lineTo(130, 225);
    context.stroke();
  }

  function draw(lives) {
    switch(lives) {
      case 6:
        drawGallows();
        break;

      case 5:
        drawHead();
        break;

      case 4:
        drawBody();
        break;

      case 3:
        drawLeftArm();
        break;

      case 2:
        drawRightArm();
        break;

      case 1:
        drawLeftLeg();
        break;

      case 0:
      drawRightLeg();
      break;
    }
  }

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

            //Draw hangman figure depending on lives count
            draw(livesCount);

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