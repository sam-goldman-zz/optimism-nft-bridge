"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeXDomainCalldata = void 0;
const contract_defs_1 = require("../../../src/contract-defs");
const encodeXDomainCalldata = (target, sender, message, messageNonce) => {
    return (0, contract_defs_1.getContractInterface)('L2CrossDomainMessenger').encodeFunctionData('relayMessage', [target, sender, message, messageNonce]);
};
exports.encodeXDomainCalldata = encodeXDomainCalldata;
//# sourceMappingURL=bridge.js.map