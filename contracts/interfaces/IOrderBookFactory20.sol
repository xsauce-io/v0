// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.16;

interface IOrderBookFactory20 {

    function createBook(
        address fromToken,
        address destToken,
        uint256 fee
    ) external returns (address book);

    function getBook(
        address fromToken,
        address destToken,
        uint256 fee
    ) external view returns (address book);
}