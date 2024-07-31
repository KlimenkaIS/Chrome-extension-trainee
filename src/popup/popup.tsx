import React, { useEffect, useState } from "react";
import './popup.css'



const minsk = 'Minsk'
const london = 'London'
const newYork = 'New York'

const Popup = () => {

    const [city, setCity] = useState(minsk)



    function setCurrentCity(event: any) {
        event.preventDefault()
        const newCity = event.target.innerText;
        setCity(newCity)
        chrome.storage.sync.set({ city: newCity }, () => {
            console.log(`City set to ${newCity}`)
        });
        window.close()
    }

    console.log(city)
    useEffect(() => {
        chrome.storage.sync.get(["city"], (res) => {
            if (!res.city) {
                setCity(minsk)
            } else {
                setCity(res.city)
            }
        })
    }, [])
  


    return (
        <div className="popup">
            <button className={city == minsk ? "popup__item popup__item_hover active" : "popup__item popup__item_hover"} onClick={setCurrentCity}>{minsk}</button>
            <button className={city == london ? "popup__item popup__item_hover active" : "popup__item popup__item_hover"} onClick={setCurrentCity}>{london}</button>
            <button className={city == newYork ? "popup__item popup__item_hover active" : "popup__item popup__item_hover"} onClick={setCurrentCity}>{newYork}</button>
        </div>
    )
};

export default Popup;