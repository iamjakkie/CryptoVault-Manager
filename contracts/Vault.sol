// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

interface IWETH {
    function deposit() external payable;
}

contract Vault is Ownable{
    address private constant WETHAdd = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private constant PEPEAdd = 0x6982508145454Ce325dDbE47a25d4ec3d2311933;
    ISwapRouter private constant ROUTER = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
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

    function swapExactInputSingleHop(
        address tokenIn,
        address tokenOut,
        uint24 poolFee,
        uint256 amountIn,
        address recipient
    )
        public
        returns (uint256 amountOut)
    {
        // IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(address(ROUTER), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: poolFee,
            recipient: recipient,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        amountOut = ROUTER.exactInputSingle(params);
    }

    function deposit() external payable {
        uint256 ethAmount = msg.value;
        require(ethAmount > 0, "Deposit must be greater than 0 ETH");
        uint256 _shares = ethAmount; // compressor algorithm
        
        // wrap ETH to WETH
        uint256 WETHAmount = pepeRatio * ethAmount / 100;
        IWETH(WETHAdd).deposit{value: WETHAmount}();
        uint256 PEPEAmount = swapExactInputSingleHop(WETHAdd, PEPEAdd, 3000, WETHAmount, address(this));

        totalShares = totalShares+=_shares;
        shares[msg.sender] += _shares;


        emit Deposit(msg.sender, PEPEAmount);
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

    function PEPESupply() external view returns (uint256){
        return PEPE.totalSupply();
    }
}