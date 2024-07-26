const { expect } = require('chai');
const { ethers } = require('hardhat');
const axios = require('axios');
/* tests:
    - Vault contract has been deployed successfully
    - Ratios have been successfully set
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

    describe('Success Swap', () => {
        let vault, deployer, investor1, investor2, transaction;

        beforeEach(async () => {
            const Vault = await ethers.getContractFactory('Vault');
            vault = await Vault.deploy(60, 40, 3600, false);

            [deployer, investor1, investor2, _] = await ethers.getSigners();
        });

        it('Init', async () => {

        });

        it('PEPE contract can be used', async () => {
            const pepe = await vault.PEPE();
            expect(pepe).to.not.equal(0);
            // TODO:
            // check pepe supply
            // check pepe symbol
            // check pepe name
        });

        it('Wrap ETH', async () => {

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

            const pepe_ratio = await vault.pepeRatio();

            const eth_balance = await ethers.provider.getBalance(vault.target);
            const expected_eth_balance = ((amount*(100n-pepe_ratio))/100n).toString();

            expect(eth_balance).to.equal(expected_eth_balance);
        })
    });
});