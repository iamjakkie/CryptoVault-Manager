const { expect } = require('chai');
const { ethers } = require('hardhat');
// import { time } from "@nomicfoundation/hardhat-network-helpers";
const axios = require('axios');
/* tests:
    - Vault contract has been deployed successfully - ok
    - Ratios have been successfully set - ok
    - PEPE contract is already deployed (successfully forked mainnet)
    - PEPE contract has been successfully set
*/
describe('Vault', () => {
    before(async () => {
        const current_block = await ethers.provider.getBlockNumber();
        console.log(`Current block: ${current_block}`);
    });
    describe('Success Deployment', () => {
        let vault;

        beforeEach(async () => {
            const Vault = await ethers.getContractFactory('Vault');
            vault = await Vault.deploy(60, 40, 3600, false);
        });
        it('Successful deployment', async () => {
            expect(vault.address).to.not.equal(0);
        });

        it('Ratios have been successfully set', async () => {
            expect(await vault.ethRatio()).to.equal(60);
            expect(await vault.pepeRatio()).to.equal(40);

        });
        it('PEPE contract can be used', async () => {
            const supply = await vault.PEPESupply();
            expect(await vault.PEPESupply(), 'PEPE contract has been set').to.not.equal(0);
        });
    });

    describe('Success Deposit', () => {
        let vault, deployer, investor1, investor2, transaction;

        beforeEach(async () => {
            const Vault = await ethers.getContractFactory('Vault');
            vault = await Vault.deploy(60, 40, 3600, false);

            [deployer, investor1, investor2, _] = await ethers.getSigners();
        });

        it('Init', async () => {

        });

        it('PEPE contract can be used', async () => {
            const pepe_address = await vault.PEPE();
            expect(pepe_address).to.not.equal(0);
            // TODO:
            const pepe = new ethers.Contract(
                pepe_address,
                '["function name() external view returns (string memory)", "function symbol() external view returns (string memory)", "function totalSupply() external view returns (uint256)"]',
                ethers.provider
            )
            
            const name = await pepe.name();
            const symbol = await pepe.symbol();
            const supply = await pepe.totalSupply();

            expect(name).to.equal('Pepe');
            expect(symbol).to.equal('PEPE');
            expect(supply).to.be.greaterThan(0);

        });

        it('Deposit changed ETH value', async () => {
            let eth = await ethers.provider.getBalance(vault.target);
            expect(eth).to.equal(0n);
            const amount = ethers.parseEther('10');
            transaction = await vault.connect(investor1).deposit({ value: amount });
            await transaction.wait();
            const eth_ratio = await vault.ethRatio();
            eth = await ethers.provider.getBalance(vault.target)
            expect(eth).to.equal((amount*eth_ratio)/100n);
        })

        it('Deposit changed shares value', async () => {
            let totalShares = await vault.totalShares();
            expect(totalShares).to.equal(0);
            const amount = ethers.parseEther('10');
            transaction = await vault.connect(investor1).deposit({ value: amount });
            await transaction.wait();
            totalShares = await vault.totalShares();
            expect(totalShares).to.equal(amount);
            const userShares = await vault.shares(investor1.address);
            expect(userShares).to.equal(amount);
        })

        it('Deposit converted ETH to Pepe', async () => {

            const pepe_address = await vault.PEPE();
            const pepe = new ethers.Contract(
                pepe_address,
                '["function balanceOf(address) view returns (uint256)"]',
                ethers.provider
            )

            let pepe_balance = await pepe.balanceOf(vault.target);
            expect(pepe_balance).to.equal(0);

            const amount = ethers.parseEther('10');
            transaction = await vault.connect(investor1).deposit({ value: amount });
            await transaction.wait();

            pepe_balance = await pepe.balanceOf(vault.target);
            expect(pepe_balance).to.be.greaterThan(0);
        })
    });
});