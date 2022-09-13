import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import "./reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpenModal, hotelId }) => {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((roomId) => roomId !== value)
    );
  };

  // RESERVE CLICK:
  const { date } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    // console.log("start: ", start);
    const end = new Date(endDate);

    const dateFromContext = new Date(start.getTime());
    // console.log("1st dateFromContext: ", dateFromContext);

    let dates = [];

    while (dateFromContext <= end) {
      dates.push(new Date(dateFromContext).getTime());
      dateFromContext.setDate(dateFromContext.getDate() + 1);
      //   console.log("dateFromContext + 1: ", dateFromContext);
    }

    return dates;
  };

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoom.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: allDates,
            }
          );
          return res.date;
        })
      );
      setOpenModal(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserveClose"
          onClick={() => setOpenModal(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item, index) => (
          <div key={index} className="reserveItem">
            <div className="reserveItemInfo">
              <div className="reserveTitle">{item.title}</div>
              <div className="reserveDesc">{item.desc}</div>
              <div className="reserveMaxPeople">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="reservePrice">${item.price}</div>
            </div>
            <div className="reserveSelectRoom">
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={(e) => handleSelect(e)}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="reserveButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
