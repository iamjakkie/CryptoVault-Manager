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
            vault = await Vault.deploy(60, 40);
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
            console.log(supply);
            expect(await vault.PEPESupply(), 'PEPE contract has been set').to.not.equal(0);
        });
    });

    describe('Success Swap', () => {
        let vault, deployer, investor1, investor2, transaction;

        beforeEach(async () => {
            const Vault = await ethers.getContractFactory('Vault');
            vault = await Vault.deploy(60, 40);

            [deployer, investor1, investor2, _] = await ethers.getSigners();
            console.log(investor1.address);
        });

        it('Init', async () => {

        });

        it('PEPE contract can be used', async () => {
            const pepe = await vault.PEPE();
            console.log(pepe);
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

            let pepe_balance = await pepe.balanceOf(investor1.address);
            console.log(pepe_balance);

            const amount = ethers.parseEther('10');
            transaction = await vault.connect(investor1).deposit({ value: amount });
            await transaction.wait();

            // Get transaction receipt with logs
            const txHash = transaction.hash;
            const txReceipt = ethers.provider.getTransactionReceipt(txHash);
            

            



            pepe_balance = await pepe.balanceOf(investor1.address);
            console.log(pepe_balance);

            pepe_balance = await pepe.balanceOf(vault.target);
            console.log(pepe_balance);

        })
    });
});