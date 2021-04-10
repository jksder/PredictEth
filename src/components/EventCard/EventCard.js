import React, { useState, useEffect } from "react";

//import styling
import "./EventCard.css";
import { Badge } from "react-bootstrap";

export default function EventCard({
  hash,
  players,
  pool,
  enterEvent,
  endEvent,
  open,
  winner,
  user,
  title,
  web3,
  setSelectedEvent,
  type,
}) {
  //STATIC ACTIONS
  if (open) {
    winner = "Undecided";
  }

  //STATE
  const [Newplayers, setNewPlayers] = useState([]);

  //HELPERS

  //LIFECYCLE
  useEffect(() => {
    const getBalances = async (isActive) => {
      var local_players = [];
      for (var address of players) {
        const balance = await web3.eth.getBalance(address);
        const player_profile = {
          address: address,
          balance: web3.utils.fromWei(balance),
        };
        local_players.push(player_profile);
      }
      if (isActive) {
        setNewPlayers(local_players);
      }
    };

    let isActive = true;
    getBalances(isActive);
    return () => {
      isActive = false; //so that state data doesn't get set after unmount
    };
  }, [players, web3]);

  //EVENT HANDLERS
  const enter = () => {
    //check that the player is not already in there
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
    if (type === "news" || type === "userEv") {
      setSelectedEvent({ title, hash });
    }
    endEvent(hash, match);
  };

  //RENDERED ELEMNTS
  const rendred_players = Newplayers.map((item, index) => {
    return (
      <div key={index} className="playercard">
        <label>{item.address}</label>
        <h5>
          <Badge variant="primary">{`Balance: ${item.balance}`}</Badge>
        </h5>
      </div>
    );
  });
  return (
    <div className="rn-event-container">
      <Badge variant="primary" style={{ width: "100%", marginBottom: "1em" }}>
        <h4>{title}</h4>
      </Badge>
      <h6>Event Hash</h6>
      <label>{`${hash}`}</label>
      <h6>Event Manager</h6>
      <label>{type === "news" ? "App Administrator" : `${players[0]}`}</label>
      <div className="rn-event">
        <div className="rn-event-left">
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
            style={{ marginRight: "2em" }}
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
    </div>
  );
}
