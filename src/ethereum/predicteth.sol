// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract RandomNumber{
    
    //struct that defines event
    struct Event{
        string title;
        address payable[] players; //payable because it is of address types
        uint256 pool;
        bool open;
        uint256 winner;
    }
    
    //mapping that contains list of structs
    mapping(string=>Event) private events;
    
    //array that stores a list of event hashes
    string[] eventhashes;
    
    //function to create event
    function addEvent (string memory eventHash, string memory title) payable public{
        
        Event memory e;
        e.title=title;
        e.pool+=msg.value; //contract gets all the eth in pool so it always has enough to pay out
        events[eventHash] = e; //no need to initialize storage arrays!
        events[eventHash].players.push(msg.sender);
        events[eventHash].open=true;
        eventhashes.push(eventHash);
        
    }
    
    //function to view event
    function viewEvent(string memory eventHash) public view returns (Event memory){
        return events[eventHash];
    }
    
    //function to view all event viewAllEvHashes
    function viewAllEvHashes() public view returns (string[] memory){
        return eventhashes;
    }
    
    //function to add player to event
    function enterEvent(string memory eventHash) payable public returns (string memory){ //smart contract gets funds
        
        if(events[eventHash].open){
        events[eventHash].players.push(msg.sender);
        events[eventHash].pool+=msg.value;
        return 'NO_OPEN';
        }
        
        return 'SUCESS';
    }
    
    
    //function to pick winner of the lottery
    function endEvent(string memory eventHash, uint256 randomNumber) public returns (string memory){
        if(msg.sender!=events[eventHash].players[0]){
            return 'NO_MANAGER';
        }
        
        if(events[eventHash].open){
        events[eventHash].players[randomNumber].transfer(events[eventHash].pool);
        events[eventHash].winner=randomNumber;
        events[eventHash].pool=0;
         events[eventHash].open=false;
         return 'NO_OPEN';
         }
        return 'SUCCESS';
    }
    
}