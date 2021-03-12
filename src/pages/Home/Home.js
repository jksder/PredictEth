import React from "react";

//import styling
import "./Home.css";

//import components
import EventTypeCard from "../../components/EventTypeCard/EventTypeCard";

//import data
import EventTypes from "./EventTypes.json";

export default function Home() {
  const rendered_cards = EventTypes.map((item, index) => {
    return (
      <EventTypeCard
        key={index}
        eventTitle={item.eventTitle}
        eventDescription={item.eventDescription}
        eventLocation={item.eventLocation}
      />
    );
  });

  return (
    <div className="home-page">
      <div className="hp-mid">
        <h1>Welcome to PredictEth!</h1>
        <div className="hp-event-cont">{rendered_cards}</div>
      </div>
    </div>
  );
}
