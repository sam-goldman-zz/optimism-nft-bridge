import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { L2StandardERC20, L2StandardERC20Interface } from "../L2StandardERC20";
declare type L2StandardERC20ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class L2StandardERC20__factory extends ContractFactory {
    constructor(...args: L2StandardERC20ConstructorParams);
    deploy(_l2Bridge: string, _l1Token: string, _name: string, _symbol: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<L2StandardERC20>;
    getDeployTransaction(_l2Bridge: string, _l1Token: string, _name: string, _symbol: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): L2StandardERC20;
    connect(signer: Signer): L2StandardERC20__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b50604051620013d7380380620013d783398101604081905262000034916200022f565b8151829082906200004d9060039060208501906200009f565b508051620000639060049060208401906200009f565b5050600580546001600160a01b039586166001600160a01b031991821617909155600680549690951695169490941790925550620002fc915050565b828054620000ad90620002bf565b90600052602060002090601f016020900481019282620000d157600085556200011c565b82601f10620000ec57805160ff19168380011785556200011c565b828001600101855582156200011c579182015b828111156200011c578251825591602001919060010190620000ff565b506200012a9291506200012e565b5090565b5b808211156200012a57600081556001016200012f565b80516001600160a01b03811681146200015d57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200018a57600080fd5b81516001600160401b0380821115620001a757620001a762000162565b604051601f8301601f19908116603f01168101908282118183101715620001d257620001d262000162565b81604052838152602092508683858801011115620001ef57600080fd5b600091505b83821015620002135785820183015181830184015290820190620001f4565b83821115620002255760008385830101525b9695505050505050565b600080600080608085870312156200024657600080fd5b620002518562000145565b9350620002616020860162000145565b60408601519093506001600160401b03808211156200027f57600080fd5b6200028d8883890162000178565b93506060870151915080821115620002a457600080fd5b50620002b38782880162000178565b91505092959194509250565b600181811c90821680620002d457607f821691505b60208210811415620002f657634e487b7160e01b600052602260045260246000fd5b50919050565b6110cb806200030c6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a9059cbb11610066578063a9059cbb14610215578063ae1f6aaf14610228578063c01e1bd61461026d578063dd62ed3e1461028d57600080fd5b806370a08231146101b157806395d89b41146101e75780639dc29fac146101ef578063a457c2d71461020257600080fd5b806323b872dd116100d357806323b872dd14610167578063313ce5671461017a578063395093511461018957806340c10f191461019c57600080fd5b806301ffc9a71461010557806306fdde031461012d578063095ea7b31461014257806318160ddd14610155575b600080fd5b610118610113366004610e4a565b6102d3565b60405190151581526020015b60405180910390f35b610135610393565b6040516101249190610e93565b610118610150366004610f2f565b610425565b6002545b604051908152602001610124565b610118610175366004610f59565b61043b565b60405160128152602001610124565b610118610197366004610f2f565b61050c565b6101af6101aa366004610f2f565b610555565b005b6101596101bf366004610f95565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b61013561061a565b6101af6101fd366004610f2f565b610629565b610118610210366004610f2f565b6106e2565b610118610223366004610f2f565b6107a0565b6006546102489073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610124565b6005546102489073ffffffffffffffffffffffffffffffffffffffff1681565b61015961029b366004610fb0565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b60007f01ffc9a7a5cef8baa21ed3c5c0d7e23accb804b619e9333b597f47a0d84076e27f1d1d8b63000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000084167f01ffc9a700000000000000000000000000000000000000000000000000000000148061038b57507fffffffff00000000000000000000000000000000000000000000000000000000848116908216145b949350505050565b6060600380546103a290610fe3565b80601f01602080910402602001604051908101604052809291908181526020018280546103ce90610fe3565b801561041b5780601f106103f05761010080835404028352916020019161041b565b820191906000526020600020905b8154815290600101906020018083116103fe57829003601f168201915b5050505050905090565b60006104323384846107ad565b50600192915050565b600061044884848461092d565b73ffffffffffffffffffffffffffffffffffffffff84166000908152600160209081526040808320338452909152902054828110156104f45760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61050185338584036107ad565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff871684529091528120549091610432918590610550908690611066565b6107ad565b60065473ffffffffffffffffffffffffffffffffffffffff1633146105bc5760405162461bcd60e51b815260206004820181905260248201527f4f6e6c79204c32204272696467652063616e206d696e7420616e64206275726e60448201526064016104eb565b6105c68282610b93565b8173ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d41213968858260405161060e91815260200190565b60405180910390a25050565b6060600480546103a290610fe3565b60065473ffffffffffffffffffffffffffffffffffffffff1633146106905760405162461bcd60e51b815260206004820181905260248201527f4f6e6c79204c32204272696467652063616e206d696e7420616e64206275726e60448201526064016104eb565b61069a8282610c99565b8173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca58260405161060e91815260200190565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152812054828110156107895760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084016104eb565b61079633858584036107ad565b5060019392505050565b600061043233848461092d565b73ffffffffffffffffffffffffffffffffffffffff83166108355760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff82166108be5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff83166109b65760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff8216610a3f5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610adb5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290610b1f908490611066565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b8591815260200190565b60405180910390a350505050565b73ffffffffffffffffffffffffffffffffffffffff8216610bf65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104eb565b8060026000828254610c089190611066565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604081208054839290610c42908490611066565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216610d225760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f730000000000000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604090205481811015610dbe5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f636500000000000000000000000000000000000000000000000000000000000060648201526084016104eb565b73ffffffffffffffffffffffffffffffffffffffff83166000908152602081905260408120838303905560028054849290610dfa90849061107e565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610920565b600060208284031215610e5c57600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610e8c57600080fd5b9392505050565b600060208083528351808285015260005b81811015610ec057858101830151858201604001528201610ea4565b81811115610ed2576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610f2a57600080fd5b919050565b60008060408385031215610f4257600080fd5b610f4b83610f06565b946020939093013593505050565b600080600060608486031215610f6e57600080fd5b610f7784610f06565b9250610f8560208501610f06565b9150604084013590509250925092565b600060208284031215610fa757600080fd5b610e8c82610f06565b60008060408385031215610fc357600080fd5b610fcc83610f06565b9150610fda60208401610f06565b90509250929050565b600181811c90821680610ff757607f821691505b60208210811415611031577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561107957611079611037565b500190565b60008282101561109057611090611037565b50039056fea2646970667358221220dc9364e5d22b1e974e09697523448de24acb4913a27468139b8d93ecdc04437564736f6c63430008090033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): L2StandardERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): L2StandardERC20;
}
export {};