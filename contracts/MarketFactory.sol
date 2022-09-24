// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;


import './Market.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IOracle.sol";
import "./interfaces/IOrderBookFactory1155.sol";
import "./Token20.sol";
import "hardhat/console.sol";


contract MarketFactory is Ownable {


 mapping(bytes32 => address) public markets;
 address[] public allMarkets;
 event marketCreated(string sku, uint _predictionPrice, uint256 closingDate);


 constructor() {}

 function createNewMarket(string memory uri, uint256 _predictionPrice, address _oracleFeed, uint256 _closingDate, address stable , string memory sku) public onlyOwner returns (address marketAdd) {
  Market market = new Market(uri, stable);
  market.initialize(_predictionPrice, _oracleFeed, _closingDate, sku);
   bytes32 marketKey = keccak256(abi.encodePacked(sku, _predictionPrice, _closingDate));
   markets[marketKey] = address(market);
   allMarkets.push(address(market));
  
   emit marketCreated(sku, _predictionPrice, _closingDate);
  
   return address(market);
   

 }

function getMarket(string memory sku, uint256 _predictionPrice, uint256 closingDate ) external view returns (address) {
    bytes32 marketKey = keccak256(abi.encodePacked(sku, _predictionPrice, closingDate));
    return markets[marketKey];
}

function getAllMarkets() external view returns (address[] memory valid) {
    return allMarkets;
}


}