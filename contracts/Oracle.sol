// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;


import "./interfaces/IOracle.sol";
import './interfaces/IOracle.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

contract Oracle is IOracle, Ownable {

    using Chainlink for Chainlink.Request;

    constructor(string memory _sku) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = 'ca98366cc7314957b8c012c72f05aeeb';
        fee = (1 * LINK_DIVISIBILITY) / 10; 
        sku = _sku;
    }
 function setSku(string memory _newSku) public onlyOwner {
        sku = _newSku;
    }

    function requestPrice() external override returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        string memory base = string.concat('https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=',sku);

        req.add('get', base);
        req.add('path', 'results.0.estimatedMarketValue'); // Chainlink nodes 1.0.0 and later support this format

      
        int256 timesAmount = 1;
        req.addInt('times', timesAmount);

        // Sends the request
        return sendChainlinkRequest(req, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId) {
        emit RequestPrice(_requestId, _price);
        price = _price;
    }


    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }
}
