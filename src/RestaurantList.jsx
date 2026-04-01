import { faAnchor, faArrowUp, faCartFlatbed, faLocation, faRankingStar, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style/restaurant.css';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RestaurantList() {

    const navigate = useNavigate();


    const restaurants = [
        { id: 1, name: "Paradise Biryani", cuisine: "Biryani", rating: 4.5, costForTwo: 700, location: "Secunderabad" },
        { id: 2, name: "Bawarchi", cuisine: "Biryani", rating: 4.2, costForTwo: 600, location: "RTC X Roads" },
        { id: 3, name: "Chutneys", cuisine: "South Indian", rating: 4.3, costForTwo: 500, location: "Banjara Hills" },
        { id: 4, name: "Ohri's Jiva", cuisine: "North Indian", rating: 4.1, costForTwo: 800, location: "Somajiguda" },
        { id: 5, name: "Shah Ghouse", cuisine: "Biryani", rating: 4.4, costForTwo: 650, location: "Tolichowki" },
        { id: 6, name: "Gufaa", cuisine: "Multi-cuisine", rating: 4.0, costForTwo: 750, location: "Banjara Hills" },
        { id: 7, name: "The Fisherman's Wharf", cuisine: "Seafood", rating: 4.2, costForTwo: 1200, location: "Hitech City" },
        { id: 8, name: "Eat India Company", cuisine: "North Indian", rating: 4.1, costForTwo: 650, location: "Kukatpally" },
        { id: 9, name: "KFC", cuisine: "Fast Food", rating: 4.0, costForTwo: 400, location: "Secunderabad" },
        { id: 10, name: "Cafe Bahar", cuisine: "Biryani", rating: 4.3, costForTwo: 550, location: "Barkatpura" },
        { id: 11, name: "Minerva Coffee Shop", cuisine: "South Indian", rating: 4.2, costForTwo: 450, location: "Ameerpet" },
        { id: 12, name: "Barbeque Nation", cuisine: "Multi-cuisine", rating: 4.4, costForTwo: 1000, location: "Hitech City" },
        { id: 13, name: "Sahib Sindh Sultan", cuisine: "Mughlai", rating: 4.0, costForTwo: 900, location: "Banjara Hills" },
        { id: 14, name: "TGI Fridays", cuisine: "Continental", rating: 4.1, costForTwo: 1100, location: "Gachibowli" },
        { id: 15, name: "Pizza Hut", cuisine: "Fast Food", rating: 4.0, costForTwo: 500, location: "Hitech City" },
        { id: 16, name: "KFC", cuisine: "Fast Food", rating: 4.2, costForTwo: 600, location: "Hitech City" }
    ];


    const handlelocation = () => {
        const place = restaurants.location;

        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`, "_blank");
    };
    return (
        <>
            <div className="restaurant-grid">
                {restaurants.map((r) => (
                    <div key={r.id} className="restaurant-card">
                        <h2 className="restaurant-title">{r.id}. {r.name}</h2>
                        <div className="restaurant-info">
                            <FontAwesomeIcon icon={faUtensils} />{r.cuisine}
                            {/* <span className="price">₹{r.costForTwo}</span> */}
                        </div>
                        <div className="restaurant-meta">
                            <span className="rating"><FontAwesomeIcon icon={faRankingStar} /> {r.rating}</span>
                            <span className="location" onClick={() => {
                                const place = r.location;

                                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`, "_blank");
                            }
                            }><FontAwesomeIcon icon={faLocation} /> {r.location}</span>
                        </div>
                        <button className="book-btn" onClick={() => {
                            toast.success("Restaurant Selected successfully.. ")
                            navigate("/BookingTable");
                        }
                        }>Book Now</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default RestaurantList;