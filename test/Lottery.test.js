const ganache = require ('ganache-cli');
const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {evm:{bytecode} , abi} = require('../compile');

let accounts, lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy
  // the contract
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
});

describe("Lottery", () => {
  // assert that the contract is successfully deployed
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  // assert that the user can enter the lottery 
  it('enters the current user to the lottery', () => {
    assert.ok(lottery.methods.enterLottery().send({from: accounts[0], value: 1000000000000000000}))
  });

    // assert that the user can't enter the lottery if the value of ether send is not enough
    it('can not enter the lottery if the value of ether send is not enough', async () => {
      try {
        await lottery.methods.enterLottery().send({from: accounts[0], value: 100})
        // if the above line does not throw an errror then the test fail
        assert(false)
      } catch (error) {
        // if an error is throwen , the test is successfull
        assert.ok(error)
      }
      
   
    });

  // assert that the manager can choose a winner
  it('pick a winner', async () => {
    // console.log("🚀 ~ file: Lottery.test.js ~ line 36 ~ it ~ accounts[0]", accounts)
    // console.log( "before : manager account",await web3.eth.getBalance(accounts[0]))

    // console.log( "before",await web3.eth.getBalance(accounts[4]))
    // console.log( "before",await web3.eth.getBalance(accounts[2]))

    // console.log( "before",await web3.eth.getBalance(accounts[1]))

    assert.ok(lottery.methods.enterLottery().send({from: accounts[4], value: 1000000000000000000}))
    assert.ok(lottery.methods.enterLottery().send({from: accounts[2], value: 1000000000000000000}))
    assert.ok(lottery.methods.enterLottery().send({from: accounts[1], value: 1000000000000000000}))
    const transaction = await lottery.methods.chooseRandomWinner().send({from: accounts[0]});
    assert.strictEqual(transaction.status, true);
    // console.log("🚀 ~ file: Lottery.test.js ~ line 35 ~ it ~ transaction", transaction);
    // console.log( "after : manager account",await web3.eth.getBalance(accounts[0]))

    // console.log( "after",await web3.eth.getBalance(accounts[4]))
    // console.log( "after",await web3.eth.getBalance(accounts[2]))
    // console.log( "after",await web3.eth.getBalance(accounts[1]))

  });
});