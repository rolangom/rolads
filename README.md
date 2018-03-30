# rolads
Monads implementation by @rolangom: Option (Some and None) and Either (Left and Right).


```javascript
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


```

Inspired on 'https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/', https://github.com/origamitower/folktale and others.
