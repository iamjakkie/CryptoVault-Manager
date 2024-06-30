const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Vault', () => {
    beforeEach(async () => {
        const current_block = await ethers.provider.getBlockNumber();
        console.log(`Current block: ${current_block}`);
    });
    describe('Deployment', () => {
        it('Test deployment', async () => {
        });
    });
});