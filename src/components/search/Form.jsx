const Form = (props) => {

    const {
        from_city,
        from_country,
        to_city,
        to_country,
        passenger,
        check_in,
        check_out,
    } = props.info;

    let checkInIso = check_in ? check_in.toISOString().split("T")[0] : "";
    let checkOutIso = check_out ? check_out.toISOString().split("T")[0] : "";

  return (
    <div className="sectionContainer form">
        <div className="sectionContainer">
            <h5>Resume</h5>
            <p>{`From: ${from_city}, ${from_country}`}</p>
            <p>{`To: ${to_city}, ${to_country}`}</p>
            <p>Passengers: {`${passenger}`}</p>
            <p>Check-in: {`${checkInIso}`}</p>
            <p>Check-out: {`${checkOutIso}`}</p>
        </div>

        <div className="sectionContainer">
            <h5>Passenger Info</h5>
            <form className="grid">
                <label>Name: <input type="text" /></label>
                <label>Last Name: <input type="text" /></label>
                <label>ID Number: <input type="text" /></label>
                <label>Phone Number: <input type="text" /></label>
                <label>E-mail: <input type="text" /></label>
                <label>Age: <input type="text" /></label>
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
        

        
    </div>
  )
}

export default Form