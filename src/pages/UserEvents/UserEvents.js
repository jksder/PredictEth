import React, { useEffect, useState } from "react";

//import styling
import "./UserEvents.css";
import { Alert, Modal, Button, InputGroup, FormControl } from "react-bootstrap";

//import components
import EventCard from "../../components/EventCard/EventCard";

//import contract information
import { address, ABI } from "../../ethereum/users_contract/contract";

//import web3 modules
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

//randomization function
import sha256 from "sha256";

export default function RandomNumber() {
  //winner selection window
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [winner, setWinner] = useState(null);

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

          //event is returned as array with k/v pairs. Transform into object
          var objectified_event = {
            hash,
          };
          for (var key in event) {
            objectified_event[key] = event[key];
          }

          local_events.push(objectified_event);
        }
        setEvents(local_events);

        window.ethereum.on("accountsChanged", async function (new_accounts) {
          setAccounts(new_accounts);
        });
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

    //create event hash
    const evHash = sha256(title);

    try {
      var txn = await contract.methods.addEvent(evHash, title).send({
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

  const enterEvent = async (evhash, unique) => {
    setStatus("pending");
    try {
      const errMsg = "already in the game";
      if (!unique) throw errMsg;

      console.log(accounts);
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

  const endEvent = () => {
    setStatus("pending");

    setSelectMode(true);
  };

  const selectWinner = async () => {
    setSelectMode(false);

    try {
      var txn = await contract.methods
        .endEvent(selectedEvent.hash, winner)
        .send({
          from: accounts[0],
        });
      console.log(txn);
      setStatus("success");
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
          title={item.title}
          hash={item.hash}
          players={item.players}
          pool={web3.utils.fromWei(item.pool, "ether")}
          enterEvent={enterEvent}
          endEvent={endEvent}
          open={item.open}
          winner={item.winner} //the winner is recorded by the index
          user={accounts[0]}
          web3={web3}
          setSelectedEvent={setSelectedEvent}
          type="userEv"
        />
      );
    });
  }

  if (!selectMode) {
    return (
      <div className="page-cont">
        <Alert variant="primary" style={{ marginTop: "1em" }}>
          <Alert.Heading>
            {" "}
            Avoid entering any personal or identifying data.
          </Alert.Heading>
          <p>
            Please be aware that this application permanently posts data to a
            public blockchain without any means of deleting such data once it
            has been mined. As such it is best to avoid entering any sort of
            sensitive information.
          </p>
        </Alert>
        <div className="ue-add">
          <h1>User Events</h1>

          <div className="bet-form">
            <input
              type="text"
              placeholder="Insert Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={addEvent}>Add Event</button>
          </div>
        </div>

        <div className="ue-events">
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
          <div className="ue-events-list">
            {rendered_events ? rendered_events.reverse() : null}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Modal
        style={{ marginTop: "20em" }}
        show={selectMode}
        onHide={() => {
          setStatus(null);
          setSelectMode(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Winner Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Event Title: {selectedEvent.title}</label>
          </div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Address"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={selectWinner}
          >
            Pick Winner
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
