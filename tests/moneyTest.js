import {formatCurrency} from '../scripts/utils/money.js';
//Test suite
console.log('Test suite: formatCurrency');
console.log('converts cents into dollars');

//Basic test cases
if(formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with 0');


//Edge test cases
if(formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds up to the nearest cent');

//Edge test cases
if(formatCurrency(2000.4) === '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}

