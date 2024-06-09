// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

// Define the origin
let original = "NEGIE1";

// Define the string
let letr = original.match(/[a-zA-Z]+/g);

// Reverse the string
let reversed = letr[0].split('').reverse().join('');

// Define the number
let num = original.match(/\d+/g);

// Print the string and the number
console.log(reversed+num);