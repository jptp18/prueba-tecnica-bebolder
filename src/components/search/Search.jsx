import { useEffect, useRef, useState } from 'react';
//Menú de opciones
import Select from 'react-select';
//Componentes
import Passengers from './Passengers';
//Librería para las fechas
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Iconos
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { RxCalendar } from 'react-icons/rx';
import Flight from './Flight';




const Search = () => {

  //Mostrar los vuelos
  const [flightResult, setFlightResult] = useState(false);
  function showFlights() {
    setFlightResult(true);
  }

  //Lógica para visualizar los pasajeros
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  function handleClick() {
    setIsFocused(true);
  }

  function onClose() {
    setIsFocused(false);
  }

  //Check-In
  const [selectedDateCheckIn, setSelectedDateCheckIn] = useState();
  const handleDateChangeCheckIn = (date) => {
    setSelectedDateCheckIn(date);
  }
  //Check-Out
  const [selectedDateCheckOut, setSelectedDateCheckOut] = useState();
  const handleDateChangeCheckOut = (date) => {
    if (selectedDateCheckIn > date) {
      alert('Select a correct date');
      setSelectedDateCheckOut();
    } else {
      setSelectedDateCheckOut(date);
    }
  }

  //Total
  const [total, setTotal] = useState(0);

  function handleTotalChange(newTotal) {
    setTotal(newTotal);
  }

  //Menu de ciudades
  const [cityOptions, setCityOptions] = useState([]);
  const [travel, setTravel] = useState({
    from: "",
    to: ""
  })

  const [isCheckedRt, setIsCheckedRt] = useState(true);
  const [isCheckedOw, setIsCheckedOw] = useState(false);

  const [dataTravel, setDataTravel] = useState({})

  //Cambio de estado para RT
  const handleCheckboxChangeRt = (event) => {
    setIsCheckedRt(event.target.checked);
    setIsCheckedOw(false);
  };

  //Cambio de estado para RT
  const handleCheckboxChangeOw = (event) => {
    setIsCheckedOw(event.target.checked);
    setIsCheckedRt(false);
  };

  const getDataLocality = async () => {
    let request = await fetch(`http://localhost:5173/src/CountryData.json`);
    let response = await request.json();
    return response;
  }

  /* Numeros de vuelos*/
  let flightNumber = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
  let flightNumber2 = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

  /*Funcion para buscar vuelos*/

  const searchTravel = async () => {
    let dataLocality = await getDataLocality();
    let [to_city, to_country] = travel.to.split(",");
    let [from_city, from_country] = travel.from.split(",");
    if (dataLocality.find(x => x.country.includes(to_country.trim()))) {
      if (dataLocality.find(x => x.city.includes(to_city.trim()))) {
        setDataTravel({
          from_city,
          from_country,
          to_city,
          to_country,
          passenger: total,
          check_in: selectedDateCheckIn,
          check_out: selectedDateCheckOut,
          isCheckedOw,
          flightNumber,
          flightNumber2
        });

      } else {
        console.log("No hay vuelos para ciudad selecionada, puedes probar con otra")
      }
    } else {
      console.log("No hay vuelos disponibles para el pais iongresado")
    }
  }
    




  //Fetch a la API
  useEffect(() => {
    // Utilicé la API REST Countries para obtener la lista de países y sus ciudades
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // Obtener la lista de ciudades de cada país
        const cityOptions = data.flatMap(country =>
          country.capital ? { value: country.capital, label: `${country.capital}, ${country.name.common}` } : []
        );
        setCityOptions(cityOptions);
      })
      .catch(error => {
        console.log('Error al obtener la lista de ciudades:', error);
      });
  }, []);







  return (
    <div className='search container section'>
      <div className="sectionContainer grid">

        <div className="btns flex">

          <div className={`singleBtn ${isCheckedRt ? 'active-check' : ''}`}>

            <label htmlFor="roundTrip-checkbox">
              <span> <input
                type="checkbox"
                id='roundTrip-checkbox'
                checked={isCheckedRt}
                onChange={handleCheckboxChangeRt}
              />Round-trip</span>
            </label>

          </div>

          <div className={`singleBtn ${isCheckedOw ? 'active-check' : ''}`}>

            <label htmlFor="oneWay-checkbox">
              <span> <input type="checkbox" id='oneWay-checkbox' checked={isCheckedOw} onChange={handleCheckboxChangeOw} />One-way</span>
            </label>

          </div>


        </div>

        <div className="searchInputs flex">

          {/*Single Input*/}
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className='icon' />
            </div>
            <div className="texts">
              <h4>Where are you flying?</h4>
              <Select
                className='select-option'
                options={cityOptions}
                onChange={(e) => setTravel({ ...travel, from: e.label })}
                placeholder="From"
              />
              <Select
                className='select-option'
                options={cityOptions}
                onChange={(e) => setTravel({ ...travel, to: e.label })}
                placeholder="To"
              />
            </div>
          </div>

          {/*Single Input*/}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className='icon' />
            </div>
            <div className="texts">
              <h4>Who is traveling?</h4>
              <input type="text" placeholder='Add guests' className='inputPassengers' ref={inputRef} onClick={handleClick} value={total} onChange={handleTotalChange} />

              {isFocused &&
                <div className="sectionContainer passengers">
                  <Passengers onTotalChange={handleTotalChange} />
                  <button className="btn" onClick={onClose}>Continue</button>
                </div>
              }

            </div>
          </div>

          {/*Single Input*/}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className='icon' />
            </div>
            <div className="texts">
              <h4>Check In</h4>
              <DatePicker placeholderText='Add date' selected={selectedDateCheckIn} onChange={handleDateChangeCheckIn} />
            </div>
          </div>

          {/*Verifico si está seleccionado One Way para que no se despliegue el div de la fecha de regreso*/}
          {!isCheckedOw && <div className={`singleInput flex`}>
            <div className="iconDiv">
              <RxCalendar className='icon' />
            </div>
            <div className="texts">
              <h4>Check Out</h4>
              <DatePicker placeholderText='Add date' selected={selectedDateCheckOut} onChange={handleDateChangeCheckOut} />
            </div>
          </div>}


          <button className='btn btnBlock flex'
            onClick={() => (searchTravel(), showFlights())}
          >Search Flight</button>

        </div>


      </div>

      {flightResult &&
        <div className="sectionContainer flight">
          <Flight dataTravel={dataTravel}/>
        </div>
      }

    </div>
  )
}

export default Search