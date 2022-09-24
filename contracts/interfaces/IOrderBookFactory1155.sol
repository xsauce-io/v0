// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.16;

interface IOrderBookFactory1155 {

    function createBook(
        address Token1155,
        uint256 Token1155id,
        address Token20,
        uint256 fee
    ) external returns (address book);

    function getBook(
        address Token1155,
        uint256 Token1155id,
        address Token20,
        uint256 fee
    ) external view returns (address book);
}