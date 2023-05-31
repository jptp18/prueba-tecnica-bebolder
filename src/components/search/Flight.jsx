import {useState } from "react";
import Form from "./Form";

const Flight = (props) => {

    const {
        from_city,
        from_country,
        to_city,
        to_country,
        passenger,
        check_in,
        check_out,
        isCheckedOw,
        flightNumber,
        flightNumber2
    } = props.dataTravel;

    const [showForm, setShowForm] = useState(false);

    function formActive(){
        setShowForm(true);
    }

    let checkInIso = check_in ? check_in.toISOString().split("T")[0] : "";
    let checkOutIso = check_out ? check_out.toISOString().split("T")[0] : "";
    const randomInt = Math.floor(Math.random() * 100);;
    const randomInt2 = Math.floor(Math.random() * 100);

  return (
    <>
        {showForm&&
            <Form info={props.dataTravel}/>
        }
        <h1 className="titleFlight">Flights</h1>

        <div className="sectionContainer">

            <div className="infoFlight">

                <p><strong>Flight Number: </strong>{`${flightNumber}`}</p>
                <p><strong>From: </strong>{`${from_city}, ${from_country}`}</p>
                <p><strong>To: </strong>{`${to_city}, ${to_country}`}</p>
                <p><strong>Check-in: </strong>{`${checkInIso ? checkInIso : ""}`}</p>
                {!isCheckedOw&&
                    <p><strong>Check-out: </strong>{`${checkOutIso ? checkOutIso : ""}`}</p>
                    
                }
                <p><strong>Passengers: </strong>{`${passenger}`}</p>
                <p><strong>Price per passenger: </strong>{`$${randomInt2} USD`}</p>
                <p><strong>Total: </strong>{` $${randomInt2*passenger} USD`}</p>
                <button className="btn" onClick={formActive}>Continue</button>

            </div>
        </div>

        <div className="sectionContainer">

            <div className="infoFlight">

               <p><strong>Flight Number: </strong>{`${flightNumber2}`}</p>
                <p><strong>From: </strong>{`${from_city}, ${from_country}`}</p>
                <p><strong>To: </strong>{`${to_city}, ${to_country}`}</p>
                <p><strong>Check-in: </strong>{`${checkInIso ? checkInIso : ""}`}</p>

                {!isCheckedOw&&
                    <p><strong>Check-out: </strong>{`${checkOutIso ? checkOutIso : ""}`}</p>
                    
                }

                <p><strong>Passengers: </strong>{`${passenger}`}</p>
                <p><strong>Price per passenger: </strong>{`$${randomInt} USD`}</p>
                <p><strong>Total: </strong>{` $${randomInt*passenger} USD`}</p>
                <button className="btn" onClick={formActive}>Continue</button>

            </div>
        </div>

       
    </>
  )
}

export default Flight