function sieve(n) {
    "use strict";
    
    var array = [],
      primes = [],
      i,
      j;
    
    // Initialize the array with true values indicating potential primes.
    for (i = 0; i <= n; i++) {
      array.push(true);
    }
  
    // Mark 0 and 1 as non-prime.
    array[0] = false;
    array[1] = false;
  
    // Implement the sieve of Eratosthenes algorithm to find all prime numbers.
    for (i = 2; i <= Math.sqrt(n); i++) {
      if (array[i]) {
        for (j = i * i; j <= n; j += i) {
          array[j] = false;
        }
      }
    }
  
    // Collect the prime numbers.
    for (i = 2; i <= n; i++) {
      if (array[i]) {
        primes.push(i);
      }
    }
  
    return primes;
}

document.getElementById("btn").addEventListener("click", function() {
    var inputNum = parseInt(document.getElementById("num").value);
    var primeNumbers = sieve(inputNum);
    document.getElementById("primes").textContent = primeNumbers.join(', ');
});