// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;


import './Market.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IOracle.sol";
import "./Token20.sol";


contract MarketFactory is Ownable {

 mapping(bytes32 => address) public markets;
 address[] public allMarkets;
 event marketCreated(string sku, uint _predictionPrice, uint256 closingDate);

 constructor() {}

 function createNewMarket(string memory uri, uint _predictionPrice, address _oracleFeed, uint256 _closingDate, IERC20 _usdc) public onlyOwner {
   Market newMarket = new Market(uri);
   newMarket.initialize(_predictionPrice, _oracleFeed, _usdc, _closingDate);
   string memory sku = IOracle(_oracleFeed).sku();
   bytes32 marketKey = keccak256(abi.encodePacked(sku, _predictionPrice, _closingDate));
   markets[marketKey] = address(newMarket);
   allMarkets.push(address(newMarket));
   emit marketCreated(sku, _predictionPrice, _closingDate);
 }

function getMarket(string memory sku, uint256 _predictionPrice, uint256 closingDate ) external view returns (address) {
    bytes32 marketKey = keccak256(abi.encodePacked(sku, _predictionPrice, closingDate));
    return markets[marketKey];
}




}