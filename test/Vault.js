const { expect } = require('chai');
const { ethers } = require('hardhat');
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
        let vault, deployer, investor1, investor2;

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
    });
});