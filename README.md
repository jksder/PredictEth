# Setup Instructions

1. run npm install

2. run npm start

# App Goals

The purpose of the EthBets web application will be to allow users to engage in gambling with other users utilizing their Ethereum tokens. The gambles will include simple random number gambling, betting on economic or political events and user-defined events as well

As the betting will be done using Ethereum tokens, there is no real need to keep a separate balance or record of user transactions. The blockchain itself will keep the balance of users as the sum of their unspent transactions and will record every transaction in a block. A Smart Contract, which can be thought of as like a server file that exists on the chain, will manage the placement of all the bets. The handling of the transactions themselves will be done through a browser extension called Metamask. The Web3 library will allow for the interaction between the Ethereum network and the rest of the application.

# App Structure

- The Front End

The frontend will be built using a ReactJS framework. This will allow the seamless integration of the Web3 library through its NodeJS module into the frontend itself. However, the provider for the web3 instance used (which is a communication layer between the network and the JavaScript code) will be given by the Metamask extension. This is so that the application can piggyback off Metamask’ s inbuilt features, such as account selection, transaction handling, account imports, hardware wallet use etc., while also giving the user much more visibility and access to their Eth tokens.

* Web3 Setup

New Metamask updates means that the provider is no longer injected into the browser with the browser from Metamask and requires an asynchronous metamask function to get to it. Therefore web3 and contract instances are created on each page on startup. 

* Hashing function

The hash of the event title is done at the front end because contract functionality should be limited as much as possible in order to limit gas costs.

* Event Type Contracts

Each event type will be given its own contract. They are all identical for now because true randomization is not possible in the ethereum smart contract. As such the control of who is the winner is done on the frontend. This is a bad security practice however and should be resolved by some means at a future date. 

- The Back End

Since this is a distributed application with a public test chain as the backend, the currency handling requires no middleman or intermediate server. Instead, there is direct communication between the blockchain and the frontend. This would be a security concern if done entirely through the application, but security will be handled by the Metamask extension here which safely handles user accounts and ensures a secure connection to Ethereum testnet through an Infura node connected to the network. The blockchain portion of the backend will only handle the currency exchanges and not be used for data storage at all. This is since data storage on test networks is very costly in terms of gas used for transactions. As such, extraneous data such as usernames, event details, event management indexes etc. will be stored in a more traditional database such as MongoDB or MySQL.

- Checks involved

Checks in functionality should be doubled up: done in both the backend and the frontend. 

# Current Work in Progress

- Better user feedback for errors
- styling the home and random number page
- streamlining the event->chain data flow

# Features to be added

- traditional database integration to store non-sensitive data
- Smart Contract for every event
- user defined events
- current events
