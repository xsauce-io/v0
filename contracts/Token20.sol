//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Token20 is ERC20, ERC20Burnable {

    uint8 _decimals;

    constructor(
        string memory testToken,
        string memory Test,
        uint8 decimals_
    ) ERC20(testToken, Test) {
        _decimals = decimals_;
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}