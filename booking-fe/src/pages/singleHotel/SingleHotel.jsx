import "./singleHotel.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const SingleHotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];

  // BE:
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/find/${hotelId}`
  );

  // SEARCH CONTEXT:
  const { destination, date, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const diffDays = dayDifference(date[0]?.endDate, date[0]?.startDate);

  // HANDLE SLIDE:
  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  // HANDLE MOVE:
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 0 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 5 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  // HANDLE CLICK RESERVE BOOKING && USER CONTEXT:
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();

    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="listHotel" />
      {loading ? (
        "Loading... Please wait..."
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                onClick={() => setOpen(false)}
                className="close"
                icon={faCircleXmark}
              />
              <FontAwesomeIcon
                onClick={() => handleMove("left")}
                className="arrow"
                icon={faCircleArrowLeft}
              />
              <div className="sliderWrapper">
                <img
                  src={data?.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                onClick={() => handleMove("right")}
                className="arrow"
                icon={faCircleArrowRight}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div key={index} className="hotelImageWrapper">
                  <img
                    onClick={() => handleOpen(index)}
                    className="hotelImg"
                    src={photo}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {diffDays}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {data.rating}!
                </span>
                <h2>
                  <b>${data.cheapestPrice * diffDays * options.room || 0}</b> (
                  {diffDays || 0} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MailList />
      <Footer />

      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={hotelId} />}
    </div>
  );
};

export default SingleHotel;
