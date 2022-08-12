// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Minter is ERC1155, Ownable {

    uint256 public constant YES = 0;
    uint256 public constant NO = 1;

    constructor() ERC1155(''){}
    uint256 public price = 0.05 ether;
    uint256[] supplies = [500, 500];
    uint256[] minted = [0,0];
    
    function setURI(string memory newuri) public onlyOwner {
      _setURI(newuri);
    }

    function mint(uint256 id, uint256 amount) 
      payable
      public
      {
    require(msg.value >= (amount * price), "Insufficiant Funds");
    require(id <= supplies.legth, "Token doesn't exist");
    require(id > 0, "Token doesn't exist");
    require(minted[id - 1] + amount <= supplies[id - 1],"Sold Out");

        _mint(msg.sender, id, amount, "");
     
    }
}



Minter address: 0xb16a791282B604120E28e703C56D9Cb6E3C776b1