const { expect } = require('chai');
const { ethers } = require('hardhat');
/* tests:
    - Vault contract has been deployed successfully
    - Ratios have been successfully set
    - PEPE contract can be used (successfully forked mainnet)
    - PEPE contract has been successfully set
*/
describe('Vault', () => {
    beforeEach(async () => {
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
    });
});