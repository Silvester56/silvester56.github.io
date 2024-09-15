const lowercaseletters = "azertyuiopqsdfghjklmwxcvbn";
const uppercaseLetters = lowercaseletters.toUpperCase();
const digits = "0123456789";
const specials = "-!#$%&()*,./:;?@[]^_{|}~+<=>";

const randomElement = (characterArray, allowed) => {
  if (!allowed) {
    return [];
  }
  return [characterArray[Math.floor(Math.random() * characterArray.length)]];
};

const generatePassword = () => {
  let passwordLength = new domNode("#length").val();
  let lowercaselettersAllowed = new domNode("#lowercaseletters").prop("checked");
  let uppercaseLettersAllowed = new domNode("#uppercaseLetters").prop("checked");
  let digitsAllowed = new domNode("#digits").prop("checked");
  let specialsAllowed = new domNode("#specials").prop("checked");
  let exclude = new domNode("#exclude").val().split("");
  let result = [];
  while (result.length < passwordLength && (lowercaselettersAllowed || uppercaseLettersAllowed || digitsAllowed || specialsAllowed))  {
    result = result.concat(randomElement(lowercaseletters.split("").filter(c => !exclude.includes(c)), lowercaselettersAllowed));
    result = result.concat(randomElement(uppercaseLetters.split("").filter(c => !exclude.includes(c)), uppercaseLettersAllowed));
    result = result.concat(randomElement(digits.split("").filter(c => !exclude.includes(c)), digitsAllowed));
    result = result.concat(randomElement(specials.split("").filter(c => !exclude.includes(c)), specialsAllowed));
  }
  if (new domNode("#assemble").prop("checked")) {
    result = result.sort((a, b) => (lowercaseletters + uppercaseLetters + digits + specials).split("").indexOf(a) - (lowercaseletters + uppercaseLetters + digits + specials).split("").indexOf(b));
  } else {
    result = result.sort(() => 0.5 - Math.random());
  }
  new domNode("#password").val(result.slice(0, passwordLength).join(""));
  new domNode("#copy").html("Copy");
};

const copyPassword = () => {
  navigator.clipboard.writeText(new domNode("#password").val()).then(() => new domNode("#copy").html("Copied!"));
};
