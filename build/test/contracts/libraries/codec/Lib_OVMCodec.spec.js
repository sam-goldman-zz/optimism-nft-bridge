"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
describe('Lib_OVMCodec', () => {
    let Lib_OVMCodec;
    before(async () => {
        Lib_OVMCodec = await (await hardhat_1.ethers.getContractFactory('TestLib_OVMCodec')).deploy();
    });
    describe('hashTransaction', () => {
        let QueueOrigin;
        (function (QueueOrigin) {
            QueueOrigin[QueueOrigin["SEQUENCER_QUEUE"] = 0] = "SEQUENCER_QUEUE";
            QueueOrigin[QueueOrigin["L1TOL2_QUEUE"] = 1] = "L1TOL2_QUEUE";
        })(QueueOrigin || (QueueOrigin = {}));
        it('should return the hash of a transaction', async () => {
            const tx = {
                timestamp: 121212,
                blockNumber: 10,
                l1QueueOrigin: QueueOrigin.SEQUENCER_QUEUE,
                l1TxOrigin: helpers_1.NON_ZERO_ADDRESS,
                entrypoint: helpers_1.NON_ZERO_ADDRESS,
                gasLimit: 100,
                data: '0x1234',
            };
            (0, setup_1.expect)(await Lib_OVMCodec.hashTransaction(tx)).to.be.equal('0xf07818e2db63d0140e55c9e68cfaa030f9a2d0962f671d6b339edb2207633ebd');
        });
    });
});
//# sourceMappingURL=Lib_OVMCodec.spec.js.map