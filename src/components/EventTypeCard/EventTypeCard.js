import React from "react";

//import styling
import "./EventTypeCard.css";

export default function EventTypeCard({
  eventTitle,
  eventDescription,
  eventLocation,
  src,
}) {
  return (
    <a href={eventLocation} className="event-type-card">
      <figure>
        <img alt="event_type" src={src} />
      </figure>
      <div>
        <h3>{eventTitle}</h3>
        <p>{eventDescription}</p>
      </div>
    </a>
  );
}
