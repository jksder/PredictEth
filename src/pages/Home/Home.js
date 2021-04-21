import React, { useEffect, useState } from "react";

//import styling
import "./Home.css";
import { Modal, Alert, Button } from "react-bootstrap";

//import components
import EventTypeCard from "../../components/EventTypeCard/EventTypeCard";

//import web3 modules
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

//import data
import EventTypes from "./EventTypes.json";

export default function Home() {
  const [network, setNetwork] = useState(null);

  const startup = async () => {
    try {
      const provider = await detectEthereumProvider();
      const web3 = await new Web3(provider);
      const network = await web3.eth.net.getNetworkType();
      setNetwork(network);
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

  const rendered_cards = EventTypes.map((item, index) => {
    return (
      <EventTypeCard
        key={index}
        eventTitle={item.eventTitle}
        eventDescription={item.eventDescription}
        eventLocation={item.eventLocation}
        src={item.src}
      />
    );
  });

  console.log(network);

  if (network === "rinkeby") {
    return (
      <div className="home-page">
        <div className="hp-mid">
          <h1>Welcome to PredictEth!</h1>
          <h4>A betting application for the Ethereum Network</h4>

          <figure>
            <img alt="welcome" src="./event_types/welcome.png" />
          </figure>
          <div className="hp-event-cont">{rendered_cards}</div>
        </div>
      </div>
    );
  } else if (network) {
    return (
      <Modal show={true}>
        <Alert variant="warning" style={{ margin: "1em" }}>
          <Alert.Heading>Please Switch to Rinkeby</Alert.Heading>
          <p>
            Congratulations! You have given a proper provider to this
            application. However we currently only have smart contracts on the
            Rinkeby Network so please switch to that network.
          </p>
          <hr />
          <p className="mb-0">
            <a href="https://support.airswap.io/en/articles/2831385-what-is-rinkeby">
              Learn more about Rinkeby
            </a>
            <Button
              style={{ display: "block", marginTop: "1em", width: "100%" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Reload Page
            </Button>
          </p>
        </Alert>
        <figure>
          <img alt="welcome" src="./event_types/network.png" />
        </figure>
      </Modal>
    );
  } else {
    return (
      <Modal show={true}>
        <Alert variant="warning" style={{ margin: "1em" }}>
          <Alert.Heading>No Blockchain Provider Detected</Alert.Heading>
          <p>
            Failed to detect any kind of blockchain provider. Please install and
            enable the Browser Metamask extension to use this application.
          </p>
          <hr />
          <p className="mb-0">
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
              Metamask Chrome Web Store Location
            </a>
            <Button
              style={{ display: "block", marginTop: "1em", width: "100%" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Reload Page
            </Button>
          </p>
        </Alert>
        <figure>
          <img alt="broken" src="./event_types/broken.png" />
        </figure>
      </Modal>
    );
  }
}
