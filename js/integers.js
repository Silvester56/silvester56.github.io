window.onload = () => {

  const decompose = (number, potentialDividor) => {
    if (number < 2) {
      return [];
    }
    if (number % potentialDividor === 0) {
      return [potentialDividor].concat(decompose(number / potentialDividor, potentialDividor));
    }
    return decompose(number, potentialDividor + 1);
  };

  const start = () => {
    let number = parseInt(document.querySelector('#number').value);
    let results = "";
    let primeFactors = decompose(number, 2);

    results = `${results}${number} is ${number % 2 === 0 ? 'even' : 'odd'}.<br>`;
    if (primeFactors.length === 0) {
      results = `${results}${number} doesn't have prime factors.<br>`;
    } else if (primeFactors.length === 1) {
      results = `${results}${number} is prime.<br>`;
      if (number === 2) {
        results = `${results}${number} is prime. It's the only natural number which is both even and prime.<br>`;
      }
    } else {
      results = `${results}${number} is equal to ${decompose(number, 2).join(' x ')}.<br>`;
    }
    document.querySelector('#results').innerHTML = results;
  };

  document.querySelector('#start').onclick = start;
}