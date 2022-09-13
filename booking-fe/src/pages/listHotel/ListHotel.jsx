import "./listHotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const ListHotel = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);

  // SEARCH BE:
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }&limit=4`
  );

  const handleClick = () => {
    reFetch();
  };

  // HANDLE DESTINATION FIRST CHARACTER UPPERCASE:
  const handleDestination = (e) => {
    let value = e.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setDestination(value);
  };

  // HANDLE OPTIONS:
  const handleOptions = (e, name) => {
    const value = e.target.value;
    setOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <Header type="listHotel" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle">Search</h1>
            <div className="listSearchItem">
              <label>Destination</label>
              <input
                onChange={(e) => handleDestination(e)}
                placeholder={destination}
                type="text"
              />
            </div>
            <div className="listSearchItem">
              <label>Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyy"
              )} to ${format(date[0].endDate, "MM/dd/yyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="listSearchItem">
              <label>Options</label>
              <div className="listSearchOptionsContainer">
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    onChange={(e) => setMin(e.target.value)}
                    type="text"
                    className="listSearchOptionInput"
                  />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    onChange={(e) => setMax(e.target.value)}
                    type="text"
                    className="listSearchOptionInput"
                  />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">Adult</span>
                  <input
                    min={1}
                    placeholder={options.adult}
                    type="number"
                    className="listSearchOptionInput"
                    value={options.adult}
                    onChange={(e) => handleOptions(e, "adult")}
                  />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">Children</span>
                  <input
                    min={0}
                    placeholder={options.children}
                    type="number"
                    className="listSearchOptionInput"
                    value={options.children}
                    onChange={(e) => handleOptions(e, "children")}
                  />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">Room</span>
                  <input
                    min={1}
                    placeholder={options.room}
                    type="number"
                    className="listSearchOptionInput"
                    value={options.room}
                    onChange={(e) => handleOptions(e, "room")}
                  />
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
          </div>

          <div className="listResult">
            {loading ? (
              "Loading... Please Wait..."
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHotel;
