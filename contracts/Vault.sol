// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Vault is Ownable{
    address private constant LIFI = 0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE;
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
        // swapETHforPEPE(ethAmount*pepeRatio);

        totalShares = totalShares+=_shares;
        shares[msg.sender] += _shares;
        emit Deposit(msg.sender, ethAmount);
    }

    function swapETHforPEPE(address target, uint256 value, bytes memory data) public {
        // todo: send transactionRequest to LIFI
        (bool success, bytes memory result) = LIFI.call{value: value}(data);
        require(success, string(abi.encodePacked("ETH to PEPE swap failed: ", _getRevertMsg(result))));
    }

    function _getRevertMsg(bytes memory _returnData) private pure returns (string memory) {
        if (_returnData.length < 68) return 'Transaction reverted silently';
        assembly {
            _returnData := add(_returnData, 0x04)
        }
        return abi.decode(_returnData, (string));
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

    function PEPESupply() external view returns (uint256){
        return PEPE.totalSupply();
    }
}