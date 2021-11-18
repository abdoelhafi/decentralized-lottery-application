import React, {Fragment} from 'react'

export default function Landing() {
    return (
        <Fragment>
            <div className = "container text-center" >
               <h1 className="text-red-600">Welcom to the lottery ! try your chance And gain Now.</h1> 
                <div>
                   <h3>This lottery is manager by {"0x8978985"}</h3>
                   <h3> {"10"} players are conrently entring the contract competing to {"total"} ether </h3> 
                </div>
                <div>
                    <h2>Try Now</h2>
                    <p>Enter the lottery by the amount </p>
                </div>

            </div>

        </Fragment>
    )
}
