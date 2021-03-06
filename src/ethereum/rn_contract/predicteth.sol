// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract RandomNumber{
    
    //ATTRIBUTES
    
    //struct that defines event
    struct Event{
        string title;
        address payable[] players; //payable because it is of address types
        uint256 pool;
        bool open;
        uint256 winner;
    }
    
    //mapping that contains list of structs mapped to hash
    mapping(string=>Event) private events;
    
    //array that stores a list of event hashes
    string[] private eventhashes;
    
    
    //FUNCTIONS
    
    //function to create event
    function addEvent (string memory eventHash, string memory title) payable public{
        //the 
        Event memory e;
        e.title=title;
        e.pool+=msg.value; 
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
    function enterEvent(string memory eventHash) payable public { 
        
        //check if player is new to event
        bool isNew = true;
        for(uint i=0;i<events[eventHash].players.length;i++){
            if(events[eventHash].players[i]==msg.sender){
                isNew = false;
            }
        }
        
        //event must be open to add player and player must be new to event
        require(events[eventHash].open && isNew);
        
        events[eventHash].players.push(msg.sender);
        events[eventHash].pool+=msg.value;
        
    }
    
    
    //function to pick winner of the lottery
    function endEvent(string memory eventHash, uint256 randomNumber) public{
        
        //event must be open and caller must be event creator
        require(events[eventHash].open && msg.sender==events[eventHash].players[0]);
        
        events[eventHash].players[randomNumber].transfer(events[eventHash].pool);
        events[eventHash].winner=randomNumber;
        events[eventHash].pool=0;
        events[eventHash].open=false;
    }
    
}