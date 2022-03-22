"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextBlockNumber = exports.increaseEthTime = exports.setEthTime = exports.getEthTime = void 0;
const getEthTime = async (provider) => {
    return (await provider.getBlock('latest')).timestamp;
};
exports.getEthTime = getEthTime;
const setEthTime = async (provider, time) => {
    await provider.send('evm_setNextBlockTimestamp', [time]);
};
exports.setEthTime = setEthTime;
const increaseEthTime = async (provider, amount) => {
    await (0, exports.setEthTime)(provider, (await (0, exports.getEthTime)(provider)) + amount);
    await mineBlock(provider);
};
exports.increaseEthTime = increaseEthTime;
const mineBlock = async (provider, timestamp) => {
    await provider.send('evm_mine', timestamp ? [timestamp] : []);
};
const getNextBlockNumber = async (provider) => {
    return (await provider.getBlock('latest')).number + 1;
};
exports.getNextBlockNumber = getNextBlockNumber;
//# sourceMappingURL=eth-time.js.map