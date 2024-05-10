import 'mocha';
import 'assert';
import 'chai/register-expect.js'


import NumbersValidator from '../../app/numbers_validator.js'
let validator = '';

describe(`execute and validate all the numbers_validator.js function`,function(){
    let evenNumber = 2;
    let oddNumber = 3;
    let notNumber = "a";
    const typeOfVariable = typeof notNumber;
    let errorMessageEvenNumber = `[${notNumber}] is not of type "Number" it is of type "${typeOfVariable}"`;

    let arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];
    let result = arrayOfNumbers.map((number)=>{if(number%2 == 0){return number}}).filter((number)=>{return number != undefined});
    let notArrayOfNumbers = [1,2,3,"a","b"];
    let errorMessageArrayNumbers = `[${notArrayOfNumbers}] is not an array of "Numbers"`;

    let arrayOfNumbersAllNumbers = [1,2,3,4,5,6,7,8,9,10];
    let arrayOfEverything = [1,2,3,"a","b"];
    let notArray = 2;
    let errorMessageAllNumbers = `[${notArray}] is not an array`;

    let integerValue = 10;
    let notInteger = 1.4;
    let notNumberIsInteger = "a";
    let errorMessageIsInteger = `[${notNumberIsInteger}] is not a number`;


    beforeEach(function () {
        validator = new NumbersValidator();
    })

    describe('isEven Number',function(){
            
        
        it(`Should return true when passed an even number ${evenNumber}`,function(){
            expect(validator.isNumberEven(evenNumber)).to.be.equal(true);
        })
    
        it(`Should return false when passed an odd number ${oddNumber}`,function(){
            expect(validator.isNumberEven(oddNumber)).to.be.equal(false);
        })

        it(`Should return error message when passed ${notNumber}, not number`,function(){
            expect(function(){validator.isNumberEven(notNumber)}).to.throw(`${errorMessageEvenNumber}`);
        })
    })
    
    describe('getEvenNumbersFromArray',function(){
        it(`Should return array with even numbers ${result} when passed an array of numbers ${arrayOfNumbers}`,function(){
            expect(validator.getEvenNumbersFromArray(arrayOfNumbers)).to.eql(result);
        })
    
        it(`Should return an error message when passed an array with not numbers`,function(){
            expect(function(){validator.getEvenNumbersFromArray(notArrayOfNumbers)}).to.throw(`${errorMessageArrayNumbers}`);
        })
    })
    
    describe('is All Numbers',function(){
    
        it(`Should return true when passed an array of numbers ${arrayOfNumbersAllNumbers}`,function(){
            expect(validator.isAllNumbers(arrayOfNumbersAllNumbers)).to.be.equal(true);
        })
    
        it(`Should return false when passed an array containing numbers and letters ${arrayOfEverything}`,function(){
            expect(validator.isAllNumbers(arrayOfEverything)).to.be.equal(false);
        })
    
        it(`Should return an error message when not passed an array`,function(){
            expect(function(){validator.isAllNumbers(notArray)}).to.throw(`${errorMessageAllNumbers}`);
        })
    })
    
    describe('IsInteger',function(){
        it(`Should return true when passed an integerValue ${integerValue}`,function(){
            expect(validator.isInteger(integerValue)).to.be.equal(true);
        })
    
        it(`Should return false when passed a not integerValue ${notInteger}`,function(){
            expect(validator.isInteger(notInteger)).to.be.equal(false);
        })
    
        it(`Should return an error message when passed something that is no number ${notNumberIsInteger}`,function(){
            expect(function(){validator.isInteger(notNumberIsInteger)}).to.throw(`${errorMessageIsInteger}`);
        })
    })

    afterEach(function(){
        validator = null;
    })
})