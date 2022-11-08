//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.16;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token20 is ERC20, Ownable{
    uint8 _decimals;
    mapping(address => uint) public lockTime;
    IERC20 usdc;
    uint public amountAllowed = 1000000000000000000000;


    constructor(
        string memory Sauce,
        string memory $,
        uint8 decimals_
        
    ) ERC20(Sauce, $) {
        _decimals = decimals_;
        _mint(msg.sender, 1000000000000 * 10**decimals());
    }


    function decimals() public view override returns (uint8) {
        return _decimals;
    }


    function sendSauce(address _requestor) external {
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");

        //if the balance of this contract is greater then the requested amount send funds
       _mint(_requestor, amountAllowed);        
 
        //updates locktime 1 day from now
        lockTime[msg.sender] = block.timestamp + 1 days;


}
}
