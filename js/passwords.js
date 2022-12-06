const letters = "azertyuiopqsdfghjklmwxcvbn";
const uppercaseLetters = letters.toUpperCase();
const digits = "0123456789";
const specials = "-!#$%&()*,./:;?@[]^_{|}~+<=>";

const randomElements = (characterArray, segmentLength, allowed) => {
  if (!allowed) {
    return "";
  }
  return Array.from({length: segmentLength}, () => characterArray[Math.floor(Math.random() * characterArray.length)]);
};

const generatePassword = () => {
  let passwordLength = new domNode("#length").getValue();
  let lettersAllowed = new domNode("#letters").isChecked();
  let uppercaseLettersAllowed = new domNode("#uppercaseLetters").isChecked();
  let digitsAllowed = new domNode("#digits").isChecked();
  let specialsAllowed = new domNode("#specials").isChecked();
  let result = [];
  while (result.length < passwordLength) {
    result = result.concat(randomElements(letters.split(""), passwordLength / 4, lettersAllowed));
    result = result.concat(randomElements(uppercaseLetters.split(""), passwordLength / 4, uppercaseLettersAllowed));
    result = result.concat(randomElements(digits.split(""), passwordLength / 4, digitsAllowed));
    result = result.concat(randomElements(specials.split(""), passwordLength / 4, specialsAllowed));
  }
  if (!(new domNode("#assemble").isChecked())) {
    result = result.sort(() => 0.5 - Math.random());
  }
  new domNode("#password").setValue(result.slice(0, passwordLength).join(""));
};
