const HdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3')
require('dotenv').config()
const {evm:{bytecode} , abi} = require('./compile');

const mnemonic = process.env.MNEMONIC;
const infuraUrl = process.env.INFURA_URL;
const provider = new HdWalletProvider(mnemonic, infuraUrl)
const web3 = new Web3(provider);
let accounts

async function deploy(){
    // retreive accounts 
    accounts = await web3.eth.getAccounts();

    // creat and deploy a new contract to the network
    // console.log('start')
    try {
        console.log('start')
        const contract = await new web3.eth.Contract(abi)
        .deploy({data: bytecode.object, arguments:['Hi there!']})
        .send({ from: accounts[0], gas: '0xF4240', gasPrice: '0x4A817C800'})
        console.log(contract)
    } catch (error) {
        console.log(error)
    }
   

}
deploy();