"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runJsonTest = void 0;
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const setup_1 = require("../../setup");
const bigNumberify = (arr) => {
    return arr.map((el) => {
        if (typeof el === 'number') {
            return ethers_1.BigNumber.from(el);
        }
        else if (typeof el === 'string' && /^\d+n$/gm.test(el)) {
            return ethers_1.BigNumber.from(el.slice(0, el.length - 1));
        }
        else if (typeof el === 'string' && el.length > 2 && el.startsWith('0x')) {
            return ethers_1.BigNumber.from(el.toLowerCase());
        }
        else if (Array.isArray(el)) {
            return bigNumberify(el);
        }
        else {
            return el;
        }
    });
};
const runJsonTest = (contractName, json) => {
    let contract;
    before(async () => {
        contract = await (await hardhat_1.ethers.getContractFactory(contractName)).deploy();
    });
    for (const [functionName, functionTests] of Object.entries(json)) {
        describe(functionName, () => {
            for (const [key, test] of Object.entries(functionTests)) {
                it(`should run test: ${key}`, async () => {
                    if (test.revert) {
                        await (0, setup_1.expect)(contract.functions[functionName](...test.in)).to.be
                            .reverted;
                    }
                    else {
                        (0, setup_1.expect)(bigNumberify(await contract.functions[functionName](...test.in))).to.deep.equal(bigNumberify(test.out));
                    }
                });
            }
        });
    }
};
exports.runJsonTest = runJsonTest;
//# sourceMappingURL=json-test-runner.js.map