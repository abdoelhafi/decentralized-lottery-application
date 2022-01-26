import React, {useEffect, Fragment} from 'react'
import web3 from '../web3.config'
import contract from '../lottery'

export default function Landing() {
    console.log("accounts ar : ", web3.version);
    console.log("contract : ",contract.methods);
    let userAccount;
    useEffect(()=>{
        const loadAccount = ()=>{
            userAccount = web3.eth.getAccounts().then(console.log);
        }
        loadAccount();
        console.log(userAccount);

    },[])
    
    
    console.log(userAccount);
    const handlClick = ()=>{
        // contract.methods.enterLottery.send({from: accounts[0], value: 1000000000000000000})
    }
    return (
        <Fragment>
            <div className = "container text-center m-10" >
               <h1 className="text-red-600">Welcom to the lottery ! try your chance And gain Now.</h1> 
                <div>
                   <h3>This lottery is manager by {"0x8978985"}</h3>
                   <h3> {"10"} players are conrently entring the contract competing to {"total"} ether </h3> 
                </div>
                <div>
                    <h2>Try Now</h2>
                    <p>Enter the lottery by the amount </p>
                    <button  className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enter the lottery now</button>
                </div>

            </div>

        </Fragment>
    )
}
