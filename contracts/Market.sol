//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./interfaces/IOracle.sol";
import "./Token20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "hardhat/console.sol";

contract Market is ERC1155, AccessControl, ERC1155Burnable, ERC1155Supply {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct purchaseInfo {
        uint256 avgBuyPriceYes;
        uint256 avgBuyPriceNo;
        uint256 amountYes;
        uint256 amountNo;
        uint256 amountPaidYes;
        uint256 amountPaidNo;
        uint256 Totalbuys;
    }

    struct allBuyData {
      uint256 jackpotYes;
      uint256 jackpotNo;
    }

    allBuyData public history;

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

    mapping(address => purchaseInfo) public acctInfo;
    address[] public participants;

    event positionCreated(uint id, uint256 amount);
    event marketResolved(uint256 timestamp, bool resolved);
    bytes32 public constant ADMIN = keccak256("ADMIN");


    constructor(string memory _uri, address _usdc, address _admin ) ERC1155(_uri) {
        _mint(address(this), 1, 1, "");
        _mint(address(this), 2, 1, "");
        usdc = IERC20(_usdc);
        _setupRole(ADMIN, _admin);
    }

        function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getAcctInfo(address user) external view returns (purchaseInfo memory) {
        return acctInfo[user];
    }

    function initialize(
        uint _predictionPrice,
        address _oracleFeed,
        uint256 _closingDate,
        string memory _sku
    ) external {
      require(hasRole(ADMIN, msg.sender), "Not an Admin");
        closingDate = _closingDate;
        oracleFeed = IOracle(_oracleFeed);
        predictionPrice = _predictionPrice;
        sku = _sku;
    }

    function resolveAssetPrice() public {
      require(hasRole(ADMIN, msg.sender), "Not an Admin");
        // require((priceRequested - block.timestamp > 5 minutes), 'Pre-Market Still Open');
        if (predictionPrice > oracleFeed.price()) {
            favored = true;
        } else {
            favored = false;
        }
        resolved = true;
        emit marketResolved(block.timestamp, resolved);
    }

    function getData() public {
      require(hasRole(ADMIN, msg.sender), "Not an Admin");
        oracleFeed.requestPrice();
        fetched = true;
        priceRequested = block.timestamp;
    }

    function cashOut() public {
        require((resolved == true), "Data not fetched yet");
        // require(((initiation - block.timestamp) > 7 days), 'Market still open');
         purchaseInfo memory buyHistory = acctInfo[msg.sender];
          allBuyData storage updateJackpot = history;
        if (favored == true) {
            uint256 positionYes = balanceOf(msg.sender, 1);
            uint256 percentageOwned = positionYes / totalSupply(1);
            _burn(msg.sender, 1, positionYes);
            uint256 amountOwed = (updateJackpot.jackpotNo * percentageOwned) + (buyHistory.avgBuyPriceYes * positionYes);
            usdc.transfer(msg.sender, amountOwed);
        } else {
            uint256 positionNo = balanceOf(msg.sender, 2);
            uint256 percentageOwned = positionNo / totalSupply(2);
            _burn(msg.sender, 2, positionNo);
            uint256 amountOwed = (updateJackpot.jackpotYes * percentageOwned) + (buyHistory.avgBuyPriceNo * positionNo);
            usdc.transfer(msg.sender, amountOwed);
        }
    }

    function setURI(string memory newuri) public  {
      require(hasRole(ADMIN, msg.sender), "Not an Admin");
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
            purchaseInfo storage newPurchaseInfo = acctInfo[msg.sender];
            allBuyData storage updateJackpot = history;
            newPurchaseInfo.Totalbuys += 1;
            newPurchaseInfo.amountYes += amount;
            newPurchaseInfo.amountPaidYes += amountDue;
            updateJackpot.jackpotYes += amountDue;

            newPurchaseInfo.avgBuyPriceYes = (
                (newPurchaseInfo.amountPaidYes).div(newPurchaseInfo.amountYes)
            );
            participants.push(msg.sender);
        } else {
            // require(amount <= usdc.balanceOf(msg.sender), "Balance too low");
            amountDue = priceOfNo.mul(amount);
            usdc.safeTransferFrom(msg.sender, address(this), amountDue);
            _mint(msg.sender, id, amount, "");
            purchaseInfo storage newPurchaseInfo = acctInfo[msg.sender];
            allBuyData storage updateJackpot = history;
            newPurchaseInfo.Totalbuys += 1;
            newPurchaseInfo.amountNo += amount;
            newPurchaseInfo.amountPaidNo += amountDue;
            updateJackpot.jackpotNo += amountDue;

            newPurchaseInfo.avgBuyPriceNo = (
                (newPurchaseInfo.amountPaidNo).div(newPurchaseInfo.amountNo)
            );

            participants.push(msg.sender);

            emit positionCreated(id, amount);
        }
    }

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
