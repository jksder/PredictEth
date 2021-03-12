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
  user,
}) {
  const rendred_players = players.map((item, index) => {
    return <label key={index}>{item}</label>;
  });

  const enter = () => {
    var unique = true;
    for (var p of players) {
      if (p.toLowerCase() === user) {
        unique = false;
      }
    }

    console.log(unique);
    enterEvent(hash, unique);
  };

  const end = () => {
    var match = true;
    if (user !== players[0].toLowerCase()) {
      match = false;
    }
    endEvent(hash, match);
  };

  if (open) {
    winner = "Undecided";
  }
  return (
    <div className="rn-event">
      <div className="rn-event-left">
        <h4>{`Event hash: ${hash}`}</h4>
        <label className="rn-balance">{`${pool} ETH`}</label>
        <h6>Players</h6>
        {rendred_players}
        <h6>{`Winner: ${winner}`}</h6>
      </div>

      <div className="rn-event-right">
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
