var options = document.getElementById('sub_category').options;
var subCategories = [];
var randomBtn = document.getElementById("random-category-btn");

//Populate array with the options from the select element
for (i = 0; i < options.length; i++) {
  subCategories[i] = options[i].innerHTML;
}

//Select random option and assign it to the button's value 
randomBtn.addEventListener("click", function() {
  var random = subCategories[Math.floor(Math.random() * subCategories.length)];
  randomBtn.setAttribute("value", random);
});