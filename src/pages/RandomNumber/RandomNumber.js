import React, { useEffect, useState } from "react";

//import styling
import "./RandomNumber.css";
import Alert from "react-bootstrap/Alert";

//import components
import EventCard from "../../components/EventCard/EventCard";

//import contract information
import { address, ABI } from "../../ethereum/contract";

//import web3 modules
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export default function RandomNumber() {
  //ethereum info
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  //event information
  const [events, setEvents] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(null);

  const startup = async (isActive) => {
    try {
      const provider = await detectEthereumProvider();
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const web3 = await new Web3(provider);
      const contract = await new web3.eth.Contract(ABI, address);

      if (isActive) {
        setAccounts(accounts);
        setContract(contract);
        setWeb3(web3);
      }

      var eventhashes;
      if (contract) {
        eventhashes = await contract.methods.viewAllEvHashes().call();

        var local_events = [];
        for (var hash of eventhashes) {
          var event = await contract.methods.viewEvent(hash).call();
          local_events.push(event);
        }
        setEvents(local_events);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isActive = true;
    startup(isActive);
    return () => {
      isActive = false; //so that state data doesn't get set after unmount
    };
  }, []);

  //event handlers
  const addEvent = async () => {
    setStatus("pending");
    //for now the hash is the same as the title
    try {
      var txn = await contract.methods.addEvent(title, title).send({
        from: accounts[0],
        value: web3.utils.toWei("0.02"),
      });

      console.log(txn);
      setStatus("success");
      startup();
    } catch (err) {
      setStatus("failure");
      console.log(err);
    }
  };

  const enterEvent = async (evhash) => {
    setStatus("pending");
    try {
      var txn = await contract.methods.enterEvent(evhash).send({
        from: accounts[0],
        value: web3.utils.toWei("0.02"),
      });
      setStatus("success");
      console.log(txn);
      startup();
    } catch (err) {
      setStatus("failure");
      console.log(err);
    }
  };

  const endEvent = async (evhash) => {
    setStatus("pending");

    try {
      var random = Math.floor(Math.random() * 2);
      var txn = await contract.methods.endEvent(evhash, random).send({
        from: accounts[0],
      });
      setStatus("success");
      console.log(txn);
      startup();
    } catch (err) {
      setStatus("failure");
      console.log(err);
    }
  };

  //rendered components
  let rendered_events;
  if (events) {
    rendered_events = events.map((item, index) => {
      return (
        <EventCard
          key={index}
          hash={item.title}
          players={item.players}
          pool={web3.utils.fromWei(item.pool, "ether")}
          enterEvent={enterEvent}
          endEvent={endEvent}
          open={item.open}
          winner={item.players[item.winner]}
        />
      );
    });
  }

  return (
    <div className="random-number-page">
      <div className="rn-add">
        <h1>Random Number Bets</h1>
        <div className="bet-form">
          <input
            type="text"
            placeholder="Insert Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addEvent}>Add Bet</button>
        </div>
      </div>
      <div className="rn-events">
        <Alert
          variant={
            status === "pending"
              ? "warning"
              : status === "success"
              ? "success"
              : status === "failure"
              ? "danger"
              : null
          }
        >
          {status === "pending"
            ? "Transaction being mined..."
            : status === "success"
            ? "Transaction mined!"
            : status === "failure"
            ? "Transaction failed!"
            : null}
        </Alert>
        {rendered_events}
      </div>
    </div>
  );
}
