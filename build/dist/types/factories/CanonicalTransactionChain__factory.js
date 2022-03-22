"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonicalTransactionChain__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_libAddressManager",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_maxTransactionGasLimit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_l2GasDiscountDivisor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_enqueueGasCost",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "l2GasDiscountDivisor",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "enqueueGasCost",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "enqueueL2GasPrepaid",
                type: "uint256",
            },
        ],
        name: "L2GasParamsUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_startingQueueIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_numQueueElements",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_totalElements",
                type: "uint256",
            },
        ],
        name: "QueueBatchAppended",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_startingQueueIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_numQueueElements",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_totalElements",
                type: "uint256",
            },
        ],
        name: "SequencerBatchAppended",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "_batchIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "_batchRoot",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_batchSize",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_prevTotalElements",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "_extraData",
                type: "bytes",
            },
        ],
        name: "TransactionBatchAppended",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_l1TxOrigin",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_gasLimit",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "_queueIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_timestamp",
                type: "uint256",
            },
        ],
        name: "TransactionEnqueued",
        type: "event",
    },
    {
        inputs: [],
        name: "MAX_ROLLUP_TX_SIZE",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MIN_ROLLUP_TX_GAS",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "appendSequencerBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "batches",
        outputs: [
            {
                internalType: "contract IChainStorageContainer",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_gasLimit",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "enqueue",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "enqueueGasCost",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "enqueueL2GasPrepaid",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLastBlockNumber",
        outputs: [
            {
                internalType: "uint40",
                name: "",
                type: "uint40",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getLastTimestamp",
        outputs: [
            {
                internalType: "uint40",
                name: "",
                type: "uint40",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNextQueueIndex",
        outputs: [
            {
                internalType: "uint40",
                name: "",
                type: "uint40",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNumPendingQueueElements",
        outputs: [
            {
                internalType: "uint40",
                name: "",
                type: "uint40",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
        ],
        name: "getQueueElement",
        outputs: [
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "transactionHash",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint40",
                        name: "timestamp",
                        type: "uint40",
                    },
                    {
                        internalType: "uint40",
                        name: "blockNumber",
                        type: "uint40",
                    },
                ],
                internalType: "struct Lib_OVMCodec.QueueElement",
                name: "_element",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getQueueLength",
        outputs: [
            {
                internalType: "uint40",
                name: "",
                type: "uint40",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTotalBatches",
        outputs: [
            {
                internalType: "uint256",
                name: "_totalBatches",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTotalElements",
        outputs: [
            {
                internalType: "uint256",
                name: "_totalElements",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "l2GasDiscountDivisor",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "libAddressManager",
        outputs: [
            {
                internalType: "contract Lib_AddressManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxTransactionGasLimit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
        ],
        name: "resolve",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_l2GasDiscountDivisor",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_enqueueGasCost",
                type: "uint256",
            },
        ],
        name: "setGasParams",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060405162001a9838038062001a9883398101604081905261003191610072565b600080546001600160a01b0319166001600160a01b03861617905560048390556002829055600181905561006581836100bd565b600355506100ea92505050565b6000806000806080858703121561008857600080fd5b84516001600160a01b038116811461009f57600080fd5b60208601516040870151606090970151919890975090945092505050565b60008160001904831182151516156100e557634e487b7160e01b600052601160045260246000fd5b500290565b61199e80620000fa6000396000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c8063876ed5cb116100cd578063d0f8934411610081578063e654b1fb11610066578063e654b1fb146102c0578063edcc4a45146102c9578063f722b41a146102dc57600080fd5b8063d0f89344146102b0578063e561dddc146102b857600080fd5b8063b8f77005116100b2578063b8f7700514610297578063ccf987c81461029f578063cfdf677e146102a857600080fd5b8063876ed5cb146102855780638d38c6c11461028e57600080fd5b80635ae6256d1161012457806378f4b2f21161010957806378f4b2f2146102645780637a167a8a1461026e5780637aa63a861461027d57600080fd5b80635ae6256d146102475780636fee07e01461024f57600080fd5b80632a7f18be116101555780632a7f18be146101d25780633789977014610216578063461a44781461023457600080fd5b80630b3dfa9714610171578063299ca4781461018d575b600080fd5b61017a60035481565b6040519081526020015b60405180910390f35b6000546101ad9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610184565b6101e56101e03660046113e5565b6102e4565b604080518251815260208084015164ffffffffff908116918301919091529282015190921690820152606001610184565b61021e610362565b60405164ffffffffff9091168152602001610184565b6101ad6102423660046114c1565b610376565b61021e610423565b61026261025d366004611537565b610437565b005b61017a620186a081565b60055464ffffffffff1661021e565b61017a610899565b61017a61c35081565b61017a60045481565b60065461021e565b61017a60025481565b6101ad6108b4565b6102626108dc565b61017a610df8565b61017a60015481565b6102626102d73660046115a4565b610e7f565b61021e611016565b604080516060810182526000808252602082018190529181019190915260068281548110610314576103146115c6565b6000918252602091829020604080516060810182526002909302909101805483526001015464ffffffffff808216948401949094526501000000000090049092169181019190915292915050565b60008061036d611032565b50949350505050565b600080546040517fbf40fac100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063bf40fac1906103cd908590600401611660565b60206040518083038186803b1580156103e557600080fd5b505afa1580156103f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041d919061167a565b92915050565b60008061042e611032565b95945050505050565b61c350815111156104cf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f5472616e73616374696f6e20646174612073697a652065786365656473206d6160448201527f78696d756d20666f7220726f6c6c7570207472616e73616374696f6e2e00000060648201526084015b60405180910390fd5b600454821115610561576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f5472616e73616374696f6e20676173206c696d69742065786365656473206d6160448201527f78696d756d20666f7220726f6c6c7570207472616e73616374696f6e2e00000060648201526084016104c6565b620186a08210156105f4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f5472616e73616374696f6e20676173206c696d697420746f6f206c6f7720746f60448201527f20656e71756575652e000000000000000000000000000000000000000000000060648201526084016104c6565b6003548211156106dc5760006002546003548461061191906116c6565b61061b91906116dd565b905060005a90508181116106b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e73756666696369656e742067617320666f72204c322072617465206c696d60448201527f6974696e67206275726e2e00000000000000000000000000000000000000000060648201526084016104c6565b60005b825a6106c090846116c6565b10156106d857806106d081611718565b9150506106b4565b5050505b6000333214156106ed575033610706565b5033731111000000000000000000000000000000001111015b60008185858560405160200161071f9493929190611751565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152828252805160209182012060608401835280845264ffffffffff42811692850192835243811693850193845260068054600181810183556000838152975160029092027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019290925594517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4090910180549651841665010000000000027fffffffffffffffffffffffffffffffffffffffffffff0000000000000000000090971691909316179490941790559154919350610825916116c6565b9050808673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f4b388aecf9fa6cc92253704e5975a6129a4f735bdbd99567df4ed0094ee4ceb58888426040516108899392919061179a565b60405180910390a4505050505050565b6000806108a4611032565b50505064ffffffffff1692915050565b60006108d760405180606001604052806021815260200161194860219139610376565b905090565b60043560d81c60093560e890811c90600c35901c6108f8610899565b8364ffffffffff161461098d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f41637475616c20626174636820737461727420696e64657820646f6573206e6f60448201527f74206d6174636820657870656374656420737461727420696e6465782e00000060648201526084016104c6565b6109cb6040518060400160405280600d81526020017f4f564d5f53657175656e63657200000000000000000000000000000000000000815250610376565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a85576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f46756e6374696f6e2063616e206f6e6c792062652063616c6c6564206279207460448201527f68652053657175656e6365722e0000000000000000000000000000000000000060648201526084016104c6565b6000610a9762ffffff831660106117c3565b610aa290600f611800565b905064ffffffffff8116361015610b3b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f4e6f7420656e6f756768204261746368436f6e74657874732070726f7669646560448201527f642e00000000000000000000000000000000000000000000000000000000000060648201526084016104c6565b6005546040805160808101825260008082526020820181905291810182905260608101829052909164ffffffffff169060005b8562ffffff168163ffffffff161015610bcc576000610b928263ffffffff166110ed565b8051909350839150610ba49086611818565b9450826020015184610bb69190611840565b9350508080610bc490611860565b915050610b6e565b5060065464ffffffffff83161115610c8c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604260248201527f417474656d7074656420746f20617070656e64206d6f726520656c656d656e7460448201527f73207468616e2061726520617661696c61626c6520696e20746865207175657560648201527f652e000000000000000000000000000000000000000000000000000000000000608482015260a4016104c6565b6000610c9d8462ffffff8916611884565b63ffffffff169050600080836020015160001415610cc657505060408201516060830151610d37565b60006006610cd56001886118a9565b64ffffffffff1681548110610cec57610cec6115c6565b6000918252602091829020604080516060810182526002909302909101805483526001015464ffffffffff808216948401859052650100000000009091041691018190529093509150505b610d5b610d456001436116c6565b408a62ffffff168564ffffffffff168585611174565b7f602f1aeac0ca2e7a13e281a9ef0ad7838542712ce16780fa2ecffd351f05f899610d8684876118a9565b84610d8f610899565b6040805164ffffffffff94851681529390921660208401529082015260600160405180910390a15050600580547fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000001664ffffffffff949094169390931790925550505050505050565b6000610e026108b4565b73ffffffffffffffffffffffffffffffffffffffff16631f7b6d326040518163ffffffff1660e01b815260040160206040518083038186803b158015610e4757600080fd5b505afa158015610e5b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d791906118c7565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610ee557600080fd5b505afa158015610ef9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1d919061167a565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610fb1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f6e6c792063616c6c61626c6520627920746865204275726e2041646d696e2e60448201526064016104c6565b60018190556002829055610fc581836117c3565b60038190556002546001546040805192835260208301919091528101919091527fc6ed75e96b8b18b71edc1a6e82a9d677f8268c774a262c624eeb2cf0a8b3e07e9060600160405180910390a15050565b6005546006546000916108d79164ffffffffff909116906118a9565b60008060008060006110426108b4565b73ffffffffffffffffffffffffffffffffffffffff1663ccf8f9696040518163ffffffff1660e01b815260040160206040518083038186803b15801561108757600080fd5b505afa15801561109b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110bf91906118e0565b64ffffffffff602882901c811697605083901c82169750607883901c8216965060a09290921c169350915050565b6111186040518060800160405280600081526020016000815260200160008152602001600081525090565b60006111256010846117c3565b61113090600f611800565b60408051608081018252823560e890811c82526003840135901c6020820152600683013560d890811c92820192909252600b90920135901c60608201529392505050565b600061117e6108b4565b905060008061118b611032565b50509150915060006040518060a001604052808573ffffffffffffffffffffffffffffffffffffffff16631f7b6d326040518163ffffffff1660e01b815260040160206040518083038186803b1580156111e457600080fd5b505afa1580156111f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121c91906118c7565b81526020018a81526020018981526020018464ffffffffff16815260200160405180602001604052806000815250815250905080600001517f127186556e7be68c7e31263195225b4de02820707889540969f62c05cf73525e82602001518360400151846060015185608001516040516112999493929190611922565b60405180910390a260006112ac8261139f565b905060006112e78360400151866112c39190611840565b6112cd8b87611840565b602890811b9190911760508b901b1760788a901b17901b90565b6040517f2015276c000000000000000000000000000000000000000000000000000000008152600481018490527fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000008216602482015290915073ffffffffffffffffffffffffffffffffffffffff871690632015276c90604401600060405180830381600087803b15801561137a57600080fd5b505af115801561138e573d6000803e3d6000fd5b505050505050505050505050505050565b600081602001518260400151836060015184608001516040516020016113c89493929190611922565b604051602081830303815290604052805190602001209050919050565b6000602082840312156113f757600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff80841115611448576114486113fe565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190828211818310171561148e5761148e6113fe565b816040528093508581528686860111156114a757600080fd5b858560208301376000602087830101525050509392505050565b6000602082840312156114d357600080fd5b813567ffffffffffffffff8111156114ea57600080fd5b8201601f810184136114fb57600080fd5b61150a8482356020840161142d565b949350505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461153457600080fd5b50565b60008060006060848603121561154c57600080fd5b833561155781611512565b925060208401359150604084013567ffffffffffffffff81111561157a57600080fd5b8401601f8101861361158b57600080fd5b61159a8682356020840161142d565b9150509250925092565b600080604083850312156115b757600080fd5b50508035926020909101359150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000815180845260005b8181101561161b576020818501810151868301820152016115ff565b8181111561162d576000602083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061167360208301846115f5565b9392505050565b60006020828403121561168c57600080fd5b815161167381611512565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828210156116d8576116d8611697565b500390565b600082611713577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561174a5761174a611697565b5060010190565b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261179060808301846115f5565b9695505050505050565b8381526060602082015260006117b360608301856115f5565b9050826040830152949350505050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156117fb576117fb611697565b500290565b6000821982111561181357611813611697565b500190565b600063ffffffff80831681851680830382111561183757611837611697565b01949350505050565b600064ffffffffff80831681851680830382111561183757611837611697565b600063ffffffff8083168181141561187a5761187a611697565b6001019392505050565b600063ffffffff838116908316818110156118a1576118a1611697565b039392505050565b600064ffffffffff838116908316818110156118a1576118a1611697565b6000602082840312156118d957600080fd5b5051919050565b6000602082840312156118f257600080fd5b81517fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000008116811461167357600080fd5b84815283602082015282604082015260806060820152600061179060808301846115f556fe436861696e53746f72616765436f6e7461696e65722d4354432d62617463686573a2646970667358221220c8d6d671bb1ae3bd0434364664f960f2eb1e1515f336e3260e4ce79fceb2110764736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class CanonicalTransactionChain__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_libAddressManager, _maxTransactionGasLimit, _l2GasDiscountDivisor, _enqueueGasCost, overrides) {
        return super.deploy(_libAddressManager, _maxTransactionGasLimit, _l2GasDiscountDivisor, _enqueueGasCost, overrides || {});
    }
    getDeployTransaction(_libAddressManager, _maxTransactionGasLimit, _l2GasDiscountDivisor, _enqueueGasCost, overrides) {
        return super.getDeployTransaction(_libAddressManager, _maxTransactionGasLimit, _l2GasDiscountDivisor, _enqueueGasCost, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.CanonicalTransactionChain__factory = CanonicalTransactionChain__factory;
CanonicalTransactionChain__factory.bytecode = _bytecode;
CanonicalTransactionChain__factory.abi = _abi;
//# sourceMappingURL=CanonicalTransactionChain__factory.js.map