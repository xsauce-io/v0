//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./interfaces/IOracle.sol";
import "./Token20.sol";


contract Market is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {

    // uint public unlockTime;
    address public feeCollector;
    uint public predictionPrice;
    uint256 private priceRequested;
    bool public resolved;
    bool public favored;
    IOracle private oracleFeed;
    uint256 public constant YES = 1;
    uint256 public constant NO = 2;
     bool public fetched = false;
    uint256 private initiation = block.timestamp;
    uint256 public closingDate;
    IERC20 usdc;

    event positionCreated(uint id , uint256 amount);

    constructor(string memory uri_) ERC1155(uri_) {}

    function initialize(uint _predictionPrice, address _oracleFeed, IERC20 _usdc, uint256 _closingDate) external onlyOwner() {
        // require(
        //     block.timestamp < _unlockTime,
        //     "Unlock time should be in the future"
        // );
        closingDate = _closingDate;
        oracleFeed = IOracle(_oracleFeed);
        // unlockTime = _unlockTime;
        predictionPrice = _predictionPrice;
        usdc = _usdc;
    }

    function resolveAssetPrice() public onlyOwner {
      // require((priceRequested - block.timestamp > 5 minutes), 'Pre-Market Still Open');
      if (predictionPrice > oracleFeed.price()) {
        favored = true;
      } else {
        favored = false;
      }
      resolved = true;
    }

    function updateSku(string memory _newSku) public onlyOwner {
      oracleFeed.setSku(_newSku);
    }

    function getData() public onlyOwner {
        oracleFeed.requestPrice();
        fetched = true;
        priceRequested = block.timestamp;
    }


    function cashOut() public {
      require((resolved == true), 'Data not fetched yet');
      // require(((initiation - block.timestamp) > 7 days), 'Market still open');
      if (favored == true) {
      uint256 positionYes = balanceOf(msg.sender, 1);
      _burn(msg.sender, 1, positionYes);
      usdc.transfer(msg.sender, positionYes);
      } else {
      uint256 positionNo = balanceOf(msg.sender, 2);
      _burn(msg.sender, 2, positionNo);
      usdc.transfer(msg.sender, positionNo);
      }

    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address, uint256 id, uint256 amount, bytes memory data) public
    {
        _mint(msg.sender, id, amount, data);
        emit positionCreated(id, amount);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
