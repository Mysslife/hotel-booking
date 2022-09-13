import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByType?types=hotel,apartment,resort,cabin,villa"
  );

  const types = ["Hotels", "Apartments", "Resorts", "Villas", "Cabins"];
  const photos = [
    {
      id: 1,
      src: "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    },
    {
      id: 2,
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    },
    {
      id: 3,
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    },
    {
      id: 4,
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    },
    {
      id: 5,
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    },
  ];

  return (
    <div className="pList">
      {loading
        ? "Loading... Please wait"
        : types.map((type, index) => (
            <div key={index} className="pListItem">
              <img src={photos[index].src} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{type}</h1>
                <h2>
                  {data && data[index]} {type.toLowerCase()}
                </h2>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PropertyList;
