import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import spg from '../Icons/spg.png';
import { Nav, Navbar, Table, Col} from "react-bootstrap";
import { showTime } from './clock.js'
import Notifications from "../Notifications/Notifications";
import 'bootstrap-icons/font/bootstrap-icons.css';

var hourMultiplier = 0;
var dayMultiplier = 0;
var minutesMultiplier = 0;
var monthMultiplier = 0;
var yearMultiplier = 0;
window.setInterval(showTime, 1000) // per mostrare il passare dei secondi nell'orologio
function NavBar(props) {

  const chooseNavbar = (accessType) => {
    if (accessType === 1) {
      return <ManagerNavbar />;
    }
    if (accessType === 2) {
      return <EmployeeNavbar />;
    }
    if (accessType === 3) {
      return <ClientNavbar />;
    }
    if (accessType === 4) {
      return <FarmerNavbar />;
    }
    if (accessType === 5) {
      return <DelivererNavbar />;
    }
    return <></>;
  }

  return (

      <Navbar bg="primary" variant="dark" expand="lg">
        <Col>
          <Navbar.Brand href="/" className="col-md-2">
            <img
              src={spg}
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="SPG"
            /> <h3>SPG</h3>
          </Navbar.Brand>

        </Col>

        <Col xs="7">

          <ShowClock className="me-auto timer" />


        </Col>
        <Col xs="3">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto " />
            {props.loggedIn && props.user !== undefined && chooseNavbar(props.user.accessType)}
            <Nav className="log">
              {props.loggedIn ?
                <Nav.Link onClick={() => { window.location.href = 'http://localhost:3000/'; props.userLogoutCallback() }}>Logout</Nav.Link> :
                <Nav.Link href='/login'>Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Navbar>


  );
}

//Wallet could be integrated in account info
function ClientNavbar() {
  return (
    <Nav>
      <Nav.Link href='/products'>Browse Shop</Nav.Link>
      <Nav.Link href='/myOrders'>My Orders</Nav.Link>
      <Nav.Link>My Wallet</Nav.Link>
      <Notifications placement={'end'}  ></Notifications>
    </Nav>
  );
}

//Separate nav.link for wallet top up or in clients ?
function EmployeeNavbar() {
  return (
    <Nav>
      <Nav.Link href='/products'>Browse Shop</Nav.Link>
      <Nav.Link href='/clients'>Clients</Nav.Link>
      <Nav.Link href='/orders'>Orders</Nav.Link>
    </Nav>
  );
}

//TO DO:
function ManagerNavbar() {
  return (
    <Nav className="navMan">
      <Nav.Link href='/products'>Browse Shop</Nav.Link>
      <Nav.Link className="navMan"href='/clients'>Clients</Nav.Link>
      <Nav.Link href='/orders'>Orders</Nav.Link>
      <Nav.Link href='/WareHouseHome'>WareHouse</Nav.Link>

    </Nav>
  );
}

//TO DO:
function FarmerNavbar() {
  return (
    <Nav>
      <Nav.Link>Clients</Nav.Link>
      <Nav.Link>Orders</Nav.Link>
      <Nav.Link href='/FarmerHome'>FarmerHome</Nav.Link>
    </Nav>
  );
}

//TO DO:
function DelivererNavbar() {
  return (
    <Nav>
      <Nav.Link>Clients</Nav.Link>
      <Nav.Link>Orders</Nav.Link>
    </Nav>
  );
}

function ShowClock() {
  /* FUNZIONI PER POTER MODIFICARE ORARIO */
  const setHourPlus = () => {
    if (localStorage.getItem('hourMultiplier') === null)
      hourMultiplier = 0;
    else
      hourMultiplier = parseInt(localStorage.getItem('hourMultiplier'));
    hourMultiplier += 1;
    localStorage.setItem('hourMultiplier', hourMultiplier.toString());
    showTime()
  }
  const setHourMinus = () => {
    if (localStorage.getItem("hourMultiplier") === null)
      hourMultiplier = 0;
    else {
      hourMultiplier = parseInt(localStorage.getItem("hourMultiplier"));
      hourMultiplier -= 1;
    }
    localStorage.setItem("hourMultiplier", hourMultiplier.toString());
    showTime()
  }
  const setDayPlus = () => {
    if (localStorage.getItem('dayMultiplier') === null)
      dayMultiplier = 0;
    else {
      dayMultiplier = parseInt(localStorage.getItem('dayMultiplier'));
      dayMultiplier += 1;
    }
    localStorage.setItem('dayMultiplier', dayMultiplier.toString());
    showTime()
  }
  const setDayMinus = () => {
    if (localStorage.getItem("dayMultiplier") === null)
      dayMultiplier = 0;
    else {
      dayMultiplier = parseInt(localStorage.getItem("dayMultiplier"));
      dayMultiplier -= 1;
    }
    localStorage.setItem("dayMultiplier", dayMultiplier.toString());
    showTime()
  }
  const setMinutesPlus = () => {
    if (localStorage.getItem('minutesMultiplier') === null)
      minutesMultiplier = 0;
    else {
      minutesMultiplier = parseInt(localStorage.getItem('minutesMultiplier'));
      minutesMultiplier += 1;
    }
    localStorage.setItem('minutesMultiplier', minutesMultiplier.toString());
    showTime()
  }
  const setMinutesMinus = () => {
    if (localStorage.getItem("minutesMultiplier") === null)
      minutesMultiplier = 0;
    else {
      minutesMultiplier = parseInt(localStorage.getItem("minutesMultiplier"));
      minutesMultiplier -= 1;
    }
    localStorage.setItem("minutesMultiplier", minutesMultiplier.toString());
    showTime()
  }

  const resetTime = () => {
    localStorage.setItem('hourMultiplier', '0');
    localStorage.setItem('dayMultiplier', '0');
    localStorage.setItem('monthMultiplier', '0');
    localStorage.setItem('yearMultiplier', '0');
    localStorage.setItem('minutesMultiplier', '0');
  }

  const handleHoursChange = (value) => {
    let str=value.toString()
    if(str.length===0)
      localStorage.setItem('hourMultiplier', '0');
    else {
      let vD = new Date();
      let hours = value - vD.getHours();
      console.log(hours);
      localStorage.setItem('hourMultiplier', hours);
    }
  }

  const handleMinutesChange = (value) => {
    let str=value.toString()
    if(str.length===0)
      localStorage.setItem('minutesMultiplier', '0');
    else {
      let vD = new Date();
      let minutes = value - vD.getMinutes();
      console.log(minutes);
      localStorage.setItem('minutesMultiplier', minutes);
    }
  }

  const handleDayChange = (value) => {
    let str=value.toString()

      let vD = new Date();
      let day = value - vD.getDate();
      localStorage.setItem('dayMultiplier', day);

  }

  const handleMonthChange = (value) => {
    let str=value.toString()

    let vD = new Date();
    let month = value - vD.getMonth()-1;
    localStorage.setItem('monthMultiplier', month);

  }

  const handleYearChange = (value) => {
    let str=value.toString()

    let vD = new Date();
    let year = value - vD.getFullYear();
    console.log(vD.getFullYear());
    localStorage.setItem('yearMultiplier', year);

  }


  return (

       <div className="center">
         <span id='incrementHour' className="buttonArrowH" onClick={setHourPlus}>▲</span>
         <span id='incrementMinutes' className="buttonArrowM" onClick={setMinutesPlus}>▲</span>

         <span className="flex">
           <span id="dayName" className="dayName"/>&nbsp;

           <span id='decrementDay' className="DateArrow" onClick={setDayMinus}>〈</span>
           <input id="day" className="inputD" onFocus={e => e.target.select()} onChange={e=>handleDayChange(e.target.value)}/>
           <span className="slash">/</span>
           <input id="month" className="inputM" onFocus={e => e.target.select()} onChange={e=>handleMonthChange(e.target.value)}/>
           <span className="slash">/</span>
           <input id="year" className="inputY" onFocus={e => e.target.select()} onChange={e=>handleYearChange(e.target.value)}/>
           <span id='incrementDay' className="DateArrowRight" onClick={setDayPlus}>〉</span>

           <input id="hours" className="inputC" onFocus={e => e.target.select()} onChange={e=>handleHoursChange(e.target.value)}/>
           <span className="slash">:</span>
           <input id="minutes" className="inputC" onFocus={e => e.target.select()} onChange={e=>handleMinutesChange(e.target.value)}/>
           <span className="slash">:</span>
           <span id="seconds" className="seconds"/>

           <button id='resetTime' className="modifyButton" onClick={resetTime}>resetTime</button>
         </span>

         <span id='decrementHour' className="buttonArrowH" onClick={setHourMinus}>▼</span>
         <span id='decrementMinutes' className="buttonArrowM" onClick={setMinutesMinus}>▼</span>

      </div>
  );
}

export default NavBar;
