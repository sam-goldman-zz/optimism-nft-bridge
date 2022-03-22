"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@defi-wonderland/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const utils_1 = require("ethers/lib/utils");
const setup_1 = require("../../../setup");
const constants_1 = require("../../../helpers/constants");
const ELEMENT_TEST_SIZES = [1, 2, 4, 8, 16];
const callPredeploy = async (Helper_PredeployCaller, predeploy, functionName, functionParams) => {
    return Helper_PredeployCaller.callPredeploy(predeploy.address, predeploy.interface.encodeFunctionData(functionName, functionParams || []));
};
describe.skip('OVM_L2ToL1MessagePasser', () => {
    let Fake__OVM_ExecutionManager;
    before(async () => {
        Fake__OVM_ExecutionManager = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
    });
    let Helper_PredeployCaller;
    before(async () => {
        Helper_PredeployCaller = await (await hardhat_1.ethers.getContractFactory('Helper_PredeployCaller')).deploy();
        Helper_PredeployCaller.setTarget(Fake__OVM_ExecutionManager.address);
    });
    let Factory__OVM_L2ToL1MessagePasser;
    before(async () => {
        Factory__OVM_L2ToL1MessagePasser = await hardhat_1.ethers.getContractFactory('OVM_L2ToL1MessagePasser');
    });
    let OVM_L2ToL1MessagePasser;
    beforeEach(async () => {
        OVM_L2ToL1MessagePasser = await Factory__OVM_L2ToL1MessagePasser.deploy();
    });
    describe('passMessageToL1', () => {
        before(async () => {
            Fake__OVM_ExecutionManager.ovmCALLER.returns(constants_1.NON_ZERO_ADDRESS);
        });
        for (const size of ELEMENT_TEST_SIZES) {
            it(`should be able to pass ${size} messages`, async () => {
                for (let i = 0; i < size; i++) {
                    const message = '0x' + '12' + '34'.repeat(i);
                    await callPredeploy(Helper_PredeployCaller, OVM_L2ToL1MessagePasser, 'passMessageToL1', [message]);
                    (0, setup_1.expect)(await OVM_L2ToL1MessagePasser.sentMessages((0, utils_1.keccak256)(message + (0, core_utils_1.remove0x)(Helper_PredeployCaller.address)))).to.equal(true);
                }
            });
        }
    });
});
//# sourceMappingURL=OVM_L2ToL1MessagePasser.spec.js.map