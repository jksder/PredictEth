import React from "react";

//import styling
import "./EventCard.css";

export default function EventCard({
  hash,
  players,
  pool,
  enterEvent,
  endEvent,
  open,
  winner,
}) {
  const rendred_players = players.map((item, index) => {
    return <label key={index}>{item}</label>;
  });

  const enter = () => {
    enterEvent(hash);
  };

  const end = () => {
    endEvent(hash);
  };

  if (open) {
    winner = "Undecided";
  }
  return (
    <div className="rn-event">
      <div className="rn-event-left">
        <h4>{`Event hash: ${hash}`}</h4>
        <h6>Players</h6>
        {rendred_players}
        <h6>{`Winner: ${winner}`}</h6>
      </div>

      <div className="rn-event-right">
        <label>{`${pool} ETH`}</label>
        <button
          className={open ? "rng-active" : "rng-inactive"}
          disabled={!open}
          onClick={enter}
        >
          Enter Event
        </button>
        <button
          className={open ? "rng-active" : "rng-inactive"}
          disabled={!open}
          onClick={end}
        >
          End Event
        </button>
      </div>
    </div>
  );
}
