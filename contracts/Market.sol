//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./interfaces/IOracle.sol";
import "./Token20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "hardhat/console.sol";

contract Market is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

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
    uint256 public priceOfNo;
    uint256 public priceOfYes;
    string public sku;
    IERC20 usdc;

    event positionCreated(uint id, uint256 amount);

    constructor(string memory uri_, address _usdc) ERC1155(uri_) {
        _mint(address(this), 1, 1, "");
        _mint(address(this), 2, 1, "");
        usdc = IERC20(_usdc);

     
    }

    function initialize(
        uint _predictionPrice,
        address _oracleFeed,
        uint256 _closingDate,
        string memory _sku
    ) external onlyOwner {
        // require(
        //     block.timestamp < _unlockTime,
        //     "Unlock time should be in the future"
        // );
        closingDate = _closingDate;
        oracleFeed = IOracle(_oracleFeed);
        // unlockTime = _unlockTime;
        predictionPrice = _predictionPrice;
        sku = _sku;
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

    function getData() public onlyOwner {
        oracleFeed.requestPrice();
        fetched = true;
        priceRequested = block.timestamp;
    }

    function cashOut() public {
        require((resolved == true), "Data not fetched yet");
        // require(((initiation - block.timestamp) > 7 days), 'Market still open');
        if (favored == true) {
            uint256 positionYes = balanceOf(msg.sender, 1);
            uint256 percentageOwned = positionYes / totalSupply(1);
            _burn(msg.sender, 1, positionYes);
            uint256 amountOwed = usdc.balanceOf(address(this)) /
                percentageOwned;
            usdc.transfer(msg.sender, amountOwed);
        } else {
            uint256 positionNo = balanceOf(msg.sender, 2);
            uint256 percentageOwned = positionNo / totalSupply(2);
            _burn(msg.sender, 2, positionNo);
            uint256 amountOwed = usdc.balanceOf(address(this)) /
                percentageOwned;
            usdc.transfer(msg.sender, amountOwed);
        }
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(uint256 id, uint256 amount) public {
     require(id != 0 && id <= 2, "Invalid ID");
        uint256 amountDue;

        priceOfNo = totalSupply(2).mul(1e18).div(
            (totalSupply(1) + totalSupply(2))
        );

     

      priceOfYes = totalSupply(1).mul(1e18).div(
            (totalSupply(1) + totalSupply(2))
        );


        if (id == 1) {
            // require(amount <= usdc.balanceOf(msg.sender), "Balance too low");
            amountDue = priceOfYes.mul(amount);
            usdc.safeTransferFrom(msg.sender, address(this), amountDue);
          _mint(msg.sender, id, amount, "");
          
        } else {
            // require(amount <= usdc.balanceOf(msg.sender), "Balance too low");
            amountDue = priceOfNo.mul(amount);
            usdc.safeTransferFrom(msg.sender, address(this), amountDue);
           _mint(msg.sender, id, amount, "");
        }

        emit positionCreated(id, amount);
    }

    function xchange(uint256 fromId, uint256 amount) public {
        priceOfNo = totalSupply(2).mul(1e18).div(
            (totalSupply(1) + totalSupply(2))
        );


      priceOfYes = totalSupply(1).mul(1e18).div(
            (totalSupply(1) + totalSupply(2))
        );

    
        if (fromId == 1) {
           
            require(amount <= balanceOf(msg.sender, 1), "Balance too low");
            uint256 remainingBalance = (amount.mul(priceOfYes));
            _burn(msg.sender, 1, amount);
            
            uint256 sendBack = (remainingBalance.mul(priceOfNo)).div(1e18);
            uint256 toIdnewBalance = ((remainingBalance.mul(priceOfNo)).div(1e33)).div(100);
            
            require(toIdnewBalance >= 1, "You do not have enough collateral to exchange your position. The minimum exchange is 1 token.");
             usdc.safeTransfer(msg.sender, sendBack);
            _mint(msg.sender, 2, toIdnewBalance, "");
            emit positionCreated(2, toIdnewBalance);
        } else {
            require(amount <= balanceOf(msg.sender, 2), "Balance too low");
            uint256 remainingBalance = amount.mul(priceOfNo);
            _burn(msg.sender, 2, amount);
             uint256 sendBack = (remainingBalance.mul(priceOfYes)).div(1e18);
            uint256 toIdnewBalance = ((remainingBalance.mul(priceOfYes)).div(1e33)).div(100);
            require(toIdnewBalance >= 1, "You do not have enough collateral to exchange your position. The minimum exchange is 1 token.");
            
            usdc.safeTransfer(msg.sender, sendBack);
            _mint(msg.sender, 1, toIdnewBalance, "");
            emit positionCreated(1, toIdnewBalance);
        }
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
