import CryptoJS from "crypto-js";

let dirty = 'xss.php/"><svg onload=alert(2)';
let secretkey = "abc123";

let ciphertext = CryptoJS.AES.encrypt(dirty, secretkey).toString();

console.log(ciphertext); // U2FsdGVkX1+akDzujnYxOuTzcFud5Yud06EjBvV37gcDRG3CJxmwQtppaK9nmbwk

let cleanBytes = CryptoJS.AES.decrypt(ciphertext, secretkey);
let clean = cleanBytes.toString(CryptoJS.enc.Utf8);

console.log(clean); // xss.php/"><svg onload=alert(2)
