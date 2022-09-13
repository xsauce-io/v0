// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

abstract contract IOracle is ChainlinkClient {
    uint256 public price;
    bytes32 public jobId;
    uint256 public fee;
    string  public sku;

    function requestPrice() external virtual returns (bytes32);

    event RequestPrice(bytes32 indexed requestId, uint256 price);

}