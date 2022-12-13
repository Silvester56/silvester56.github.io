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
  let passwordLength = new domNode("#length").val();
  let lettersAllowed = new domNode("#letters").prop("checked");
  let uppercaseLettersAllowed = new domNode("#uppercaseLetters").prop("checked");
  let digitsAllowed = new domNode("#digits").prop("checked");
  let specialsAllowed = new domNode("#specials").prop("checked");
  let exclude = new domNode("#exclude").val().split("");
  let result = [];
  while (result.length < passwordLength) {
    result = result.concat(randomElements(letters.split("").filter(c => !exclude.includes(c)), passwordLength / 4, lettersAllowed));
    result = result.concat(randomElements(uppercaseLetters.split("").filter(c => !exclude.includes(c)), passwordLength / 4, uppercaseLettersAllowed));
    result = result.concat(randomElements(digits.split("").filter(c => !exclude.includes(c)), passwordLength / 4, digitsAllowed));
    result = result.concat(randomElements(specials.split("").filter(c => !exclude.includes(c)), passwordLength / 4, specialsAllowed));
  }
  if (!(new domNode("#assemble").prop("checked"))) {
    result = result.sort(() => 0.5 - Math.random());
  }
  new domNode("#password").val(result.slice(0, passwordLength).join(""));
  navigator.clipboard.writeText(new domNode("#password").val()).then(() => new domNode("#copy").html("Copy"));
};

const copyPassword = () => {
  navigator.clipboard.writeText(new domNode("#password").val()).then(() => new domNode("#copy").html("Copied!"));
};
