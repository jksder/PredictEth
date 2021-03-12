import React from "react";

//import styling
import "./EventTypeCard.css";

export default function EventTypeCard({
  eventTitle,
  eventDescription,
  eventLocation,
}) {
  return (
    <a href={eventLocation} className="event-type-card">
      <h3>{eventTitle}</h3>
      <p>{eventDescription}</p>
    </a>
  );
}
