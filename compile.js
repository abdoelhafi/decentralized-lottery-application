
const fs = require('fs');
const solc = require('solc');
const path = require('path')

const contractPath = path.resolve(__dirname,'contracts','Lottery.sol');
const source = fs.readFileSync(contractPath,'utf-8');
var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
const lotteryContract = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol']['Lottery'];
// console.log(lotteryContract.evm.bytecode.object);
module.exports = lotteryContract;
