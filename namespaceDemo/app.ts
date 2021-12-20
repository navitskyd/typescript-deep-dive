/// <reference path="utility-functions.ts" />
const number1 = Utility.maxBookAllowed(20);
console.log(number1);

import fees = Utility.Fees;

const result2 = Utility.Fees.calculateLateFee(100);
const result3 = fees.calculateLateFee(90);
console.log(result2);
