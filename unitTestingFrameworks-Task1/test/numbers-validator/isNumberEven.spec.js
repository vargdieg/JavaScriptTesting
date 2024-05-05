import 'mocha';
import 'assert';
import 'chai/register-expect.js'


import NumbersValidator from '../../app/numbers_validator.js'
let validator = '';

describe('isEven Number',function(){
    let evenNumber = 2;
    let oddNumber = 3;
    let notNumber = "a";
    const typeOfVariable = typeof notNumber;
    let errorMessage = `[${notNumber}] is not of type "Number" it is of type "${typeOfVariable}"`;

    beforeEach(function () {
        validator = new NumbersValidator();
      })

    
    it(`Should return true when passed an even number ${evenNumber}`,function(){
        expect(validator.isNumberEven(2)).to.be.equal(true);
    })

    it(`Should return false when passed an odd number ${oddNumber}`,function(){
        expect(validator.isNumberEven(3)).to.be.equal(false);
    })


    it(`Should return error message when passed ${notNumber}, not number`,function(){
        expect(function(){validator.isNumberEven(notNumber)}).to.throw(`${errorMessage}`);
    })

    afterEach(function(){
        validator = null;
    })
})

describe('getEvenNumbersFromArray',function(){
    let arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];
    let result = arrayOfNumbers.map((number)=>{if(number%2 == 0){return number}}).filter((number)=>{return number != undefined});

    let notArrayOfNumbers = [1,2,3,"a","b"];
    let errorMessage = `[${notArrayOfNumbers}] is not an array of "Numbers"`;

    beforeEach(function () {
        validator = new NumbersValidator();
      })

    it(`Should return array with even numbers ${result} when passed an array of numbers ${arrayOfNumbers}`,function(){
        expect(validator.getEvenNumbersFromArray(arrayOfNumbers)).to.eql(result);
    })

    it(`Should return an error message when passed an array with not numbers`,function(){
        expect(function(){validator.getEvenNumbersFromArray(notArrayOfNumbers)}).to.throw(`${errorMessage}`);
    })

    afterEach(function(){
        validator = null;
    })
})

describe('is All Numbers',function(){
    let arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];
    let arrayOfEverything = [1,2,3,"a","b"];

    let notArray = 2;
    let errorMessage = `[${notArray}] is not an array`;

    beforeEach(function () {
        validator = new NumbersValidator();
      })

    it(`Should return true when passed an array of numbers ${arrayOfNumbers}`,function(){
        expect(validator.isAllNumbers(arrayOfNumbers)).to.be.equal(true);
    })

    it(`Should return false when passed an array containing numbers and letters ${arrayOfEverything}`,function(){
        expect(validator.isAllNumbers(arrayOfEverything)).to.be.equal(false);
    })

    it(`Should return an error message when not passed an array`,function(){
        expect(function(){validator.isAllNumbers(notArray)}).to.throw(`${errorMessage}`);
    })

    afterEach(function(){
        validator = null;
    })
})

describe('IsInteger',function(){
    let integerValue = 10;
    let notInteger = 1.4;
    let notNumber = "a";
    let errorMessage = `[${notNumber}] is not a number`;

    beforeEach(function () {
        validator = new NumbersValidator();
      })

    it(`Should return true when passed an integerValue ${integerValue}`,function(){
        expect(validator.isInteger(integerValue)).to.be.equal(true);
    })

    it(`Should return false when passed a not integerValue ${notInteger}`,function(){
        expect(validator.isInteger(notInteger)).to.be.equal(false);
    })

    it(`Should return an error message when passed something that is no number ${notNumber}`,function(){
        expect(function(){validator.isInteger(notNumber)}).to.throw(`${errorMessage}`);
    })

      afterEach(function(){
        validator = null;
    })

})