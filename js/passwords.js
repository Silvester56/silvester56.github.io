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
  let assembleOrder = [lowercaseletters, uppercaseLetters, digits, specials].sort(() => 0.5 - Math.random());
  let passwordLength = document.querySelector("#length").value;
  let lowercaselettersAllowed = document.querySelector("#lowercaseletters").checked;
  let uppercaseLettersAllowed = document.querySelector("#uppercaseLetters").checked;
  let digitsAllowed = document.querySelector("#digits").checked;
  let specialsAllowed = document.querySelector("#specials").checked;
  let exclude = document.querySelector("#exclude").value.split("");
  let result = [];
  while (result.length < passwordLength && (lowercaselettersAllowed || uppercaseLettersAllowed || digitsAllowed || specialsAllowed))  {
    result = result.concat(randomElement(lowercaseletters.split("").filter(c => !exclude.includes(c)), lowercaselettersAllowed));
    result = result.concat(randomElement(uppercaseLetters.split("").filter(c => !exclude.includes(c)), uppercaseLettersAllowed));
    result = result.concat(randomElement(digits.split("").filter(c => !exclude.includes(c)), digitsAllowed));
    result = result.concat(randomElement(specials.split("").filter(c => !exclude.includes(c)), specialsAllowed));
  }
  if (document.querySelector("#assemble").checked) {
    result = result.sort((a, b) => assembleOrder.findIndex(t => t.includes(a)) - assembleOrder.findIndex(t => t.includes(b)));
  } else {
    result = result.sort(() => 0.5 - Math.random());
  }
  document.querySelector("#password").value = result.slice(0, passwordLength).join("");
  document.querySelector("#copy").innerHTML = "Copy";
};

const copyPassword = () => {
  navigator.clipboard.writeText(document.querySelector("#password").value).then(() => document.querySelector("#copy").innerHTML = "Copied!");
};
