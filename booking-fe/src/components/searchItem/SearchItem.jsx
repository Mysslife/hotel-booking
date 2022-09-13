import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={
          item.photos[0] ||
          "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        }
        alt=""
        className="searchItemImg"
      />
      <div className="searchItemDesc">
        <h1 className="searchItemTitle">{item.name}</h1>
        <span className="searchItemDistance">{item.distance}m from center</span>
        <span className="searchItemTaxi">Free airport taxi</span>
        <span className="searchItemSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="searchItemFeatures">{item.desc}</span>
        <span className="searchItemCancel">Free cancellation</span>
        <span className="searchItemCancelSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="searchItemDetails">
        <div className="searchItemDetailsRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>
        <div className="searchItemDetailsText">
          <span className="searchItemDetailsPrice">${item.cheapestPrice}</span>
          <span className="searchItemDetailsTax">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="searchItemDetailButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
