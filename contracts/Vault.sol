// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Vault is Ownable{
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETHAdd = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private constant PEPEAdd = 0x6982508145454Ce325dDbE47a25d4ec3d2311933;
    using SafeERC20 for IERC20;

    IERC20 public PEPE;
    uint256 public ethRatio;
    uint256 public pepeRatio;

    uint256 public totalShares;
    mapping(address => uint256) public shares;
    mapping(address => bool) public whitelist;

    
    event Deposit(address indexed user, uint256 value);
    event Withdraw(address indexed user, uint256 value);
    event RewardsDistributed(uint256 totalRewards);

    constructor(uint256 _ethRatio, uint256 _pepeRatio) Ownable(msg.sender) {
        PEPE = IERC20(PEPEAdd);
        ethRatio = _ethRatio;
        pepeRatio = _pepeRatio;
        require(ethRatio + pepeRatio == 100, "Ratios must add up to 1");
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted");
        _;
    }

    function addToWhitelist(address _user) external onlyOwner {
        whitelist[_user] = true;
    }

    function removeFromWhitelist(address _user) external onlyOwner {
        whitelist[_user] = false;
    }

    function deposit() external payable {
        uint256 ethAmount = msg.value;
        require(ethAmount > 0, "Deposit must be greater than 0 ETH");
        uint256 _shares = ethAmount; // compressor algorithm
        // routing finds the best path to swap ETH for PEPE
        swapETHforPEPE(ethAmount*pepeRatio);

        totalShares = totalShares+=_shares;
        shares[msg.sender] += _shares;
        emit Deposit(msg.sender, ethAmount);
    }

    function swapETHforPEPE(uint256 _ETHToSwap) internal returns (uint256) {
        uint256 ETHToSwapAmount = _ETHToSwap;
        // to add aggregator for trading
        IUniswapV2Router02 router = IUniswapV2Router02(UNISWAP_V2_ROUTER);

        address[] memory path = new address[](2);
        path[0] = WETHAdd;
        path[1] = PEPEAdd;

        uint256 amountOut;
        try router.getAmountsOut(ETHToSwapAmount, path) returns (uint[] memory amounts) {
            amountOut = amounts[amounts.length - 1];
        } catch {
            return 0;
        }

        router.swapETHForExactTokens(amountOut, path, msg.sender, block.timestamp);

        return ETHToSwapAmount;
    }

    function swapPEPEforETH(uint256 _PEPEToSwap) internal returns (uint256) {
        uint256 PEPEToSwapAmount = _PEPEToSwap;
        // to add aggregator for trading
        return PEPEToSwapAmount;
    }

    function getBalance(address _owner) external view returns (uint256) {
        return shares[_owner];
    }

    function withdraw() external {
        uint256 _shares = shares[msg.sender];
        require(_shares > 0, "No shares to withdraw");

        // calculate ETH to withdraw by transfering back ETH and selling PEPE


        totalShares = totalShares-=_shares;
        shares[msg.sender] = 0;

        emit Withdraw(msg.sender, _shares);
    }

    function distributeRewards(uint256 _totalRewards) external onlyOwner {
        // distribute rewards to all users
        emit RewardsDistributed(_totalRewards);
    }
}