export function code(a, b) {
  return a + b;
}

export const arr = ["diapers", "kleenex", "trash bags", "paper towels", "milk"];

export function capitalize(string) {
  let arr = string.split("");
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
}

export function reverse(string) {
  return string.split("").reverse("").join("");
}

export function calculator() {
  return {
    add(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    },
    divide(a, b) {
      return a / b;
    },
    multiply(a, b) {
      return a * b;
    },
  };
}

export function analyze(arr) {
  let array = arr;
  let average = array.reduce((prev, curr) => prev + curr, 0) / array.length;
  let min = Math.min(...array);
  let max = Math.max(...array);
  let length = array.length;
  return { average, min, max, length };
}

export function cipher(str, shift) {
  let solo = "";
  let string = str;
  let pattern = /[a-zA-Z]/i;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i].toLowerCase() && pattern.test(string[i])) {
      let val = ((string.charCodeAt(i) - 97 + shift) % 26) + 97;
      solo += String.fromCharCode(val);
    } else if (
      string[i] === string[i].toUpperCase() &&
      pattern.test(string[i])
    ) {
      let val = ((string.charCodeAt(i) - 65 + shift) % 26) + 65;
      solo += String.fromCharCode(val);
    } else {
      solo += string[i];
    }
  }
  return solo;
}
console.log(cipher("Hello, World!", 3));
