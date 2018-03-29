
const { Left, match, None, Right, Some, Either } = require('./index');


const eitherL1 = Left.of('Error');
const eitherR1 = Right.of('Success');

console.log('results1 of Left should be "Error".');
const results1 = match({ left: value => value, right: value => value }, eitherL1);
console.assert(results1 === 'Error', 'Result of Left should be "Error".');


console.log('results2 should be "Success".');
const results2 = match({ left: value => value, right: value => value }, eitherR1);
console.assert(results2 === 'Success', 'Result of Right should be "Success".');


const optionS1 = Some.of(1);
const optionN1 = None;

console.log('Result of Some should be 1.');
const result3 = match({ some: val => val, none: () => 0 }, optionS1);
console.assert(result3 === 1, 'Result of Some should be 1.');


console.log('result5 should be 0.');
const result4 = match({ some: val => val, none: () => 0 }, optionN1);
console.assert(result4 === 0, 'Result of None should be 0.');

// -----

console.log('result5 should be 2.');
const result5 = optionS1.map(v => v + 1).join();
console.assert(result5 === 2, 'Result of result5 should be 2.');

// -----
console.log('result6 should be None.');
const result6 = optionN1.map(v => v + 1).join();
console.assert(result6 === None, 'Result of result6 should be None.');


console.log('result7 should be 4.');
const add = (x) => (y) => x + y;
const result7 = Some.of(1).map(add).ap(Some.of(3)).join();
console.assert(result7 === 4, 'result7 should be 4.');

console.log('result8 should be 0.');
const result8 = Some.of(1).map(add).ap(None).getOrElse(0);
console.assert(result8 === 0, 'result7 should be 0.');

console.log('result9 should be 5.');
const result9 = Right.of(2).map(add).ap(Right.of(3)).join();
console.assert(result9 === 5, 'result9 should be 5.');

console.log('result10 should be "No result".');
const result10 = Right.of(2).map(add).ap(Left.of("No result")).join();
console.assert(result10 === "No result", 'result9 should be "No result".');

// -- Either
const user = { name: { first: 'Rolando', last: 'G. T.' } };

const starredFn = (str) => `**${str}**`;

const getValidProp = (user) => user.name.first;
const result11 = Either.try(getValidProp)(user).map(starredFn).join();
console.log('result11 should be "**Rolando**".', result11);
console.assert(result11 === "**Rolando**", 'result11 should be "**Rolando**".');

const getInvalidProp = (user) => user.address.countryCode;
const result12 = Either.try(getInvalidProp)(user).map(starredFn).join();
console.log('result12 should be "No value".', result12.message);
console.assert(result12.message === "Cannot read property 'countryCode' of undefined", 'result12 should be "No value".');
