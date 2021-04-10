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
        address payable winner;
    }
    
    //mapping that contains list of structs mapped to hash
    mapping(string=>Event) private events;
    
    //array that stores a list of event hashes
    string[] private eventhashes;
    

    
    //INTERNAL FUNCTIONS
    
    //check if player is new to event
    function isNew(address player, string memory eventHash) internal view returns (bool){
        bool isNotFound = true;
        for(uint i=0;i<events[eventHash].players.length;i++){
            if(events[eventHash].players[i]==player){
                isNotFound = false;
            }
        }
        return isNotFound;
    }
    
    //MODIFIERS
    

    //modifier that enforces player presence in event
    modifier playerFound(string memory eventHash, address payable winner){
        require(isNew(winner, eventHash)==false, "Player must exist in event");
        _;
    }
    
    //modifier that enforces caller presence is not in event
    modifier playerNew(string memory eventHash){
        require(isNew(msg.sender, eventHash), "Player must be new to event");
        _;
    }
    
    
    //EXTERNAL FUNCTIONS
    
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
    function enterEvent(string memory eventHash) payable public  playerNew(eventHash){ 
        
        
        //event must be open to add player and player must be new to event
        require(events[eventHash].open,"Event is closed or doesn't exist");

        events[eventHash].players.push(msg.sender);
        events[eventHash].pool+=msg.value;
        
    }
    
    
    //function to pick winner of the lottery
    function endEvent(string memory eventHash, address payable winner) public playerFound(eventHash, winner){
        
        require(msg.sender==events[eventHash].players[0],"Admin must be first player");
        
        //event must be open
        require(events[eventHash].open,"Event is closed or doesn't exist");
        
        winner.transfer(events[eventHash].pool);
        events[eventHash].winner=winner;
        events[eventHash].pool=0;
        events[eventHash].open=false;
    }
    
}