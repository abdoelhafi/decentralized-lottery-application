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

  // assert that the manager can choose a winner
  it('pick a winner', async () => {
    console.log("🚀 ~ file: Lottery.test.js ~ line 36 ~ it ~ accounts[0]", accounts)
    console.log( "before : manager account",await web3.eth.getBalance(accounts[0]))

    console.log( "before",await web3.eth.getBalance(accounts[4]))
    console.log( "before",await web3.eth.getBalance(accounts[2]))

    console.log( "before",await web3.eth.getBalance(accounts[1]))

    assert.ok(lottery.methods.enterLottery().send({from: accounts[4], value: 1000000000000000000}))
    assert.ok(lottery.methods.enterLottery().send({from: accounts[2], value: 1000000000000000000}))
    assert.ok(lottery.methods.enterLottery().send({from: accounts[1], value: 1000000000000000000}))

    const winnerAddr = await lottery.methods.chooseRandomWinner().send({from: accounts[0]});
    console.log("🚀 ~ file: Lottery.test.js ~ line 35 ~ it ~ winnerAddr", winnerAddr)
    console.log( "after : manager account",await web3.eth.getBalance(accounts[0]))

    console.log( "after",await web3.eth.getBalance(accounts[4]))
    console.log( "after",await web3.eth.getBalance(accounts[2]))
    console.log( "after",await web3.eth.getBalance(accounts[1]))

  });

  // assert that the setter methode change the  value of the instance variable
  // it('setter methode change the  value of the instance variable',async () => {
  //   await inbox.methods.setMessage('New Message').send({from:accounts[0]});
  //   const message = await inbox.methods.message().call();
  //   assert.strictEqual(message,'New Message');
  // });
});