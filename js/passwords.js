const letters = "azertyuiopqsdfghjklmwxcvbn";
const uppercaseLetters = letters.toUpperCase();
const digits = "0123456789";
const specials = "-!#$%&()*,./:;?@[]^_{|}~+<=>";

const randomElement = (characterArray) => {
  return characterArray[Math.floor(Math.random() * characterArray.length)];
};

const generatePassword = () => {
  let passwordLength = document.getElementById("length").value;
  let allowedCharacters = "";
  allowedCharacters = allowedCharacters + (document.getElementById("letters").checked ? letters : "");
  allowedCharacters = allowedCharacters + (document.getElementById("uppercaseLetters").checked ? uppercaseLetters : "");
  allowedCharacters = allowedCharacters + (document.getElementById("digits").checked ? digits : "");
  allowedCharacters = allowedCharacters + (document.getElementById("specials").checked ? specials : "");
  let result = Array.from({length: passwordLength}, value => randomElement(allowedCharacters.split("")));
  document.getElementById("password").value = result.join("");
};
