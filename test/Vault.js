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

        it('LiFi usage', async () => {
            const eth = ethers.parseEther('1');

            const pepeRatio = await vault.pepeRatio();

            console.log(pepeRatio);

            transaction = await vault.connect(investor1).deposit({ value: eth });
            await transaction.wait();

            console.log(await vault.totalShares());

            console.log(await vault.getBalance(investor1.address));

            // const integrator = 'jumper.exchange';
            // const referrer = '0x0000000000000000000000000000000000000000'
            const fromChain = 'ETH';
            const fromToken = 'ETH';
            const toChain = 'ETH';
            const toToken = 'PEPE';
            const fromAmount = eth.toString();
            const fromAddress = vault.target;

            const params = {
                fromChain,
                toChain,
                fromToken,
                toToken,
                fromAmount,
                fromAddress,
            };

            console.log(params);

            const quote = await axios.get('https://li.quest/v1/quote', {
                params: {
                    fromChain,
                    toChain,
                    fromToken,
                    toToken,
                    fromAmount,
                    fromAddress,
                }
            });

            const transactionRequest = quote.data.transactionRequest;
            
            const { to, value, data } = transactionRequest;
            
            try {
                transaction = await vault.connect(investor1).swapETHforPEPE(to, value, data);
                await transaction.wait();
            } catch (error) {
                console.log(error);
            }
            

            // transaction = await vault.connect(investor1).swapETHforPEPE(transactionRequest.data);
        });
    });
});