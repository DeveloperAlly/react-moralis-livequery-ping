// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MoralisPing {
    address public contractAddress;
    address payable public manager;
  
    uint256 public count;
    uint256 public chain_id;

    event ChainPinged(address indexed sender, uint256 chain_id, uint256 current_count);
    
    constructor() {
        count = 0;
        manager = payable(msg.sender);
        contractAddress = address(this);
        chain_id = block.chainid;
    }

    /**
    When pinged, ping count should be incremented and the chainID and msg.sender should be emitted with it
    **/ 
    function ping() public {
        count = count + 1;
        emit ChainPinged(msg.sender, chain_id, count);
    }
    
     /**
    * Restricted to owner only modifier to add to functions
    */    
    modifier ownerOnly() {
        require(msg.sender == manager);
        _;
    }
    
     /**
    * Include a selfdestruct function to remove this contract from testnet when you're done playing with it!
    * Careful with this feature - it will send any contract funds to the contract owner and can be used maliciously
    * (since we have no funds involved here- we're all good!)
    */    
    function close() public ownerOnly{ 
        selfdestruct(manager); 
    }
    
}