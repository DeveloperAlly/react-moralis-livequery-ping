// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MoralisPing {
    address public contractAddress;
    address public manager;
  
    uint256 public count;
    uint256 public chain_id;
    address public latestPingFromAddress; 
    

    event ChainPinged(address indexed sender, uint256 chain_id, uint256 current_count);
    
    constructor() {
        count = 0;
        manager = msg.sender;
        contractAddress = address(this);
        chain_id = block.chainid;
    }

    // When pinged, msg.sender should be emitted and ping count incremented - lets also send the chainID
    function ping() public {
        count = count + 1;
        latestPingFromAddress = msg.sender;
        emit ChainPinged(msg.sender, chain_id, count);
    }
}

// really could use a self destruct feature