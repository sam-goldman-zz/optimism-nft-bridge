/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestLibMerkleTrie,
  TestLibMerkleTrieInterface,
} from "../TestLibMerkleTrie";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_key",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "get",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_key",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "getSingleNodeRootHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_key",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "update",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_key",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "verifyInclusionProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612eac806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063120c4a221461005157806349fba1931461007b578063cd4a76951461009c578063e8e72100146100af575b600080fd5b61006461005f366004612985565b6100d2565b604051610072929190612a22565b60405180910390f35b61008e610089366004612a7c565b6100ed565b604051908152602001610072565b61008e6100aa366004612ae0565b610102565b6100c26100bd366004612ae0565b61011b565b6040519015158152602001610072565b600060606100e1858585610129565b91509150935093915050565b60006100f98383610209565b90505b92915050565b60006101108585858561022d565b90505b949350505050565b6000610110858585856102e5565b60006060600061013885610322565b9050600080600061014a848a8961041d565b8151929550909350915015808061015e5750815b6101af5760405162461bcd60e51b815260206004820152601a60248201527f50726f76696465642070726f6f6620697320696e76616c69642e00000000000060448201526064015b60405180910390fd5b6000816101cb57604051806020016040528060008152506101f7565b6101f7866101da600188612b9f565b815181106101ea576101ea612bb6565b60200260200101516108b8565b919b919a509098505050505050505050565b600061021d610217846108e2565b83610a65565b5180516020909101209392505050565b60408051808201909152600181527f800000000000000000000000000000000000000000000000000000000000000060209091015260007f56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42182141561029d576102968585610209565b9050610113565b60006102a884610322565b90506000806102b883898761041d565b509150915060006102cc84848b858c610b1f565b90506102d8818a610f8c565b9998505050505050505050565b60008060006102f5878686610129565b9150915081801561031757508051602080830191909120875191880191909120145b979650505050505050565b6060600061032f83611142565b90506000815167ffffffffffffffff81111561034d5761034d6128ab565b60405190808252806020026020018201604052801561039257816020015b604080518082019091526060808252602082015281526020019060019003908161036b5790505b50905060005b82518110156104155760006103c58483815181106103b8576103b8612bb6565b6020026020010151611175565b905060405180604001604052808281526020016103e183611142565b8152508383815181106103f6576103f6612bb6565b602002602001018190525050808061040d90612be5565b915050610398565b509392505050565b6000606081808061042d876108e2565b90506000869050600080610454604051806040016040528060608152602001606081525090565b60005b8c51811015610874578c818151811061047257610472612bb6565b6020026020010151915082846104889190612c00565b9350610495600188612c00565b9650836104f9578151805160209091012085146104f45760405162461bcd60e51b815260206004820152601160248201527f496e76616c696420726f6f74206861736800000000000000000000000000000060448201526064016101a6565b6105b6565b81515160201161055b578151805160209091012085146104f45760405162461bcd60e51b815260206004820152601b60248201527f496e76616c6964206c6172676520696e7465726e616c2068617368000000000060448201526064016101a6565b8461056983600001516111fc565b146105b65760405162461bcd60e51b815260206004820152601a60248201527f496e76616c696420696e7465726e616c206e6f6465206861736800000000000060448201526064016101a6565b6105c260106001612c00565b826020015151141561063b5785518414156105dc57610874565b60008685815181106105f0576105f0612bb6565b602001015160f81c60f81b60f81c9050600083602001518260ff168151811061061b5761061b612bb6565b6020026020010151905061062e81611224565b9650600194505050610862565b6002826020015151141561081a57600061065483611261565b905060008160008151811061066b5761066b612bb6565b016020015160f81c90506000610682600283612c47565b61068d906002612c69565b9050600061069e848360ff16611285565b905060006106ac8b8a611285565b905060006106ba83836112b6565b905060ff8516600214806106d1575060ff85166003145b15610727578083511480156106e65750808251145b156106f8576106f5818b612c00565b99505b507f80000000000000000000000000000000000000000000000000000000000000009950610874945050505050565b60ff8516158061073a575060ff85166001145b156107ac578251811461077657507f80000000000000000000000000000000000000000000000000000000000000009950610874945050505050565b61079d886020015160018151811061079057610790612bb6565b6020026020010151611224565b9a509750610862945050505050565b60405162461bcd60e51b815260206004820152602660248201527f52656365697665642061206e6f6465207769746820616e20756e6b6e6f776e2060448201527f707265666978000000000000000000000000000000000000000000000000000060648201526084016101a6565b60405162461bcd60e51b815260206004820152601d60248201527f526563656976656420616e20756e706172736561626c65206e6f64652e00000060448201526064016101a6565b8061086c81612be5565b915050610457565b507f80000000000000000000000000000000000000000000000000000000000000008414866108a38786611285565b909e909d50909b509950505050505050505050565b602081015180516060916100fc916108d290600190612b9f565b815181106103b8576103b8612bb6565b60606000825160026108f49190612c8c565b67ffffffffffffffff81111561090c5761090c6128ab565b6040519080825280601f01601f191660200182016040528015610936576020820181803683370190505b50905060005b8351811015610a5e57600484828151811061095957610959612bb6565b01602001517fff0000000000000000000000000000000000000000000000000000000000000016901c8261098e836002612c8c565b8151811061099e5761099e612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060108482815181106109e1576109e1612bb6565b01602001516109f3919060f81c612c47565b60f81b82610a02836002612c8c565b610a0d906001612c00565b81518110610a1d57610a1d612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080610a5681612be5565b91505061093c565b5092915050565b604080518082018252606080825260208201819052825160028082529181019093529091600091816020015b6060815260200190600190039081610a915790505090506000610ab5856001611362565b9050610ac8610ac38261145a565b6115ac565b82600081518110610adb57610adb612bb6565b6020026020010181905250610aef846115ac565b82600181518110610b0257610b02612bb6565b6020026020010181905250610b168261161b565b95945050505050565b606082600087610b30600189612b9f565b81518110610b4057610b40612bb6565b602002602001015190506000610b558261165f565b6040805160038082526080820190925291925060009190816020015b6040805180820190915260608082526020820152815260200190600190039081610b715790505090506000806002846002811115610bb157610bb1612cab565b1415610caf578b5160009015610c6a5760005b60018e51610bd29190612b9f565b811015610c68576000610bfd8f8381518110610bf057610bf0612bb6565b602002602001015161165f565b6002811115610c0e57610c0e612cab565b1415610c265781610c1e81612be5565b925050610c56565b610c488e8281518110610c3b57610c3b612bb6565b6020026020010151611749565b51610c539083612c00565b91505b80610c6081612be5565b915050610bc4565b505b610c7386611749565b51610c97610c8088611749565b610c92610c8c8f6108e2565b85611285565b6112b6565b148015610ca357508651155b15610cad57600191505b505b8015610cf657610cc7610cc186611749565b89610a65565b838381518110610cd957610cd9612bb6565b6020908102919091010152610cef600183612c00565b9150610f66565b6000846002811115610d0a57610d0a612cab565b1415610d59578551610d2057610cc7858961175c565b84838381518110610d3357610d33612bb6565b6020908102919091010152610d49600183612c00565b9150610cc7610cc1876001611285565b6000610d6486611749565b90506000610d7282896112b6565b90508015610de0576000610d88836000846117e0565b9050610d9c81610d978d61197f565b6119bf565b868681518110610dae57610dae612bb6565b6020908102919091010152610dc4600186612c00565b9450610dd08383611285565b9250610ddc8983611285565b9850505b6000610dea611a0f565b9050825160001415610e0f57610e0881610e038a6108b8565b61175c565b9050610eb3565b600083600081518110610e2457610e24612bb6565b016020015160f81c9050610e39846001611285565b93506002886002811115610e4f57610e4f612cab565b1415610e8a576000610e6985610e648c6108b8565b610a65565b9050610e828383610e7d846000015161197f565b611b01565b925050610eb1565b835115610ea0576000610e6985610d978c6108b8565b610eae8282610e7d8c6108b8565b91505b505b8851610ef557610ec3818c61175c565b905080868681518110610ed857610ed8612bb6565b6020908102919091010152610eee600186612c00565b9450610f62565b610f00896001611285565b985080868681518110610f1557610f15612bb6565b6020908102919091010152610f2b600186612c00565b9450610f37898c610a65565b868681518110610f4957610f49612bb6565b6020908102919091010152610f5f600186612c00565b94505b5050505b610f7c8c610f7560018e612b9f565b8585611b8b565b9c9b505050505050505050505050565b600080610f98836108e2565b9050610fb7604051806040016040528060608152602001606081525090565b84516000906060905b801561112d5787610fd2600183612b9f565b81518110610fe257610fe2612bb6565b60200260200101519350610ff58461165f565b9250600283600281111561100b5761100b612cab565b141561103f57600061101c85611749565b9050611037866000835189516110329190612b9f565b6117e0565b95505061110e565b600183600281111561105357611053612cab565b141561109757600061106485611749565b905061107a866000835189516110329190612b9f565b8351909650156110915761108e8584611cb9565b94505b5061110e565b60008360028111156110ab576110ab612cab565b141561110e5781511561110e57600085600187516110c99190612b9f565b815181106110d9576110d9612bb6565b602001015160f81c60f81b60f81c90506110fd866000600189516110329190612b9f565b955061110a858285611b01565b9450505b83516111199061197f565b91508061112581612cda565b915050610fc0565b50509051805160209091012095945050505050565b6040805180820182526000808252602091820152815180830190925282518252808301908201526060906100fc90611d7d565b6060600080600061118585611f7c565b9194509250905060008160018111156111a0576111a0612cab565b146111ed5760405162461bcd60e51b815260206004820152601860248201527f496e76616c696420524c502062797465732076616c75652e000000000000000060448201526064016101a6565b610b16856020015184846122cd565b600060208251101561121057506020015190565b818060200190518101906100fc9190612cf1565b600060606020836000015110156112455761123e836123ac565b9050611251565b61124e83611175565b90505b61125a816111fc565b9392505050565b60606100fc61128083602001516000815181106103b8576103b8612bb6565b6108e2565b6060825182106112a457506040805160208101909152600081526100fc565b6100f983838486516110329190612b9f565b6000805b8084511180156112ca5750808351115b801561134b57508281815181106112e3576112e3612bb6565b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191684828151811061132257611322612bb6565b01602001517fff0000000000000000000000000000000000000000000000000000000000000016145b156100f9578061135a81612be5565b9150506112ba565b6060600082611372576000611375565b60025b90506000600285516113879190612d0a565b90506000611396826002612c69565b60ff1667ffffffffffffffff8111156113b1576113b16128ab565b6040519080825280601f01601f1916602001820160405280156113db576020820181803683370190505b5090506113e88284612d1e565b60f81b816000815181106113fe576113fe612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508086604051602001611440929190612d43565b604051602081830303815290604052935050505092915050565b606060006002835161146c9190612d72565b67ffffffffffffffff811115611484576114846128ab565b6040519080825280601f01601f1916602001820160405280156114ae576020820181803683370190505b50905060005b8151811015610a5e57836114c9826002612c8c565b6114d4906001612c00565b815181106114e4576114e4612bb6565b01602001517fff0000000000000000000000000000000000000000000000000000000000000016600485611519846002612c8c565b8151811061152957611529612bb6565b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916901b1782828151811061156b5761156b612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350806115a481612be5565b9150506114b4565b606080825160011480156115da57506080836000815181106115d0576115d0612bb6565b016020015160f81c105b156115e65750816100fc565b6115f2835160806123b7565b83604051602001611604929190612d43565b604051602081830303815290604052905092915050565b6040805180820190915260608082526020820152600061163a836125ae565b9050604051806040016040528082815260200161165683611142565b90529392505050565b600061166d60106001612c00565b826020015151141561168157506000919050565b6002826020015151141561170157600061169a83611261565b90506000816000815181106116b1576116b1612bb6565b016020015160f81c905060028114806116cd575060ff81166003145b156116dc575060029392505050565b60ff811615806116ef575060ff81166001145b156116fe575060019392505050565b50505b60405162461bcd60e51b815260206004820152601160248201527f496e76616c6964206e6f6465207479706500000000000000000000000000000060448201526064016101a6565b60606100fc61175783611261565b6125f2565b6040805180820190915260608082526020820152600061177b836115ac565b604080518082018252600080825260209182015281518083019092528251825280830190820152909150602085015180516117b890600190612b9f565b815181106117c8576117c8612bb6565b60200260200101819052506101138460200151612638565b6060816117ee81601f612c00565b101561183c5760405162461bcd60e51b815260206004820152600e60248201527f736c6963655f6f766572666c6f7700000000000000000000000000000000000060448201526064016101a6565b826118478382612c00565b10156118955760405162461bcd60e51b815260206004820152600e60248201527f736c6963655f6f766572666c6f7700000000000000000000000000000000000060448201526064016101a6565b61189f8284612c00565b845110156118ef5760405162461bcd60e51b815260206004820152601160248201527f736c6963655f6f75744f66426f756e647300000000000000000000000000000060448201526064016101a6565b60608215801561190e5760405191506000825260208201604052611976565b6040519150601f8416801560200281840101858101878315602002848b0101015b8183101561194757805183526020928301920161192f565b5050858452601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016604052505b50949350505050565b606060208251101561198f575090565b81805190602001206040516020016119a991815260200190565b6040516020818303038152906040529050919050565b604080518082018252606080825260208201819052825160028082529181019093529091600091816020015b60608152602001906001900390816119eb5790505090506000610ab5856000611362565b60408051808201909152606080825260208201526000611a3160106001612c00565b67ffffffffffffffff811115611a4957611a496128ab565b604051908082528060200260200182016040528015611a7c57816020015b6060815260200190600190039081611a675790505b50905060005b8151811015611af1576040518060400160405280600181526020017f8000000000000000000000000000000000000000000000000000000000000000815250828281518110611ad357611ad3612bb6565b60200260200101819052508080611ae990612be5565b915050611a82565b50611afb8161161b565b91505090565b604080518082019091526060808252602082015260006020835110611b2e57611b29836115ac565b611b30565b825b60408051808201825260008082526020918201528151808301909252825182528083019082015290915085602001518560ff1681518110611b7357611b73612bb6565b6020026020010181905250610b168560200151612638565b60606000611b998386612c00565b67ffffffffffffffff811115611bb157611bb16128ab565b604051908082528060200260200182016040528015611bf657816020015b6040805180820190915260608082526020820152815260200190600190039081611bcf5790505b50905060005b85811015611c4e57868181518110611c1657611c16612bb6565b6020026020010151828281518110611c3057611c30612bb6565b60200260200101819052508080611c4690612be5565b915050611bfc565b5060005b83811015611caf57848181518110611c6c57611c6c612bb6565b6020026020010151828783611c819190612c00565b81518110611c9157611c91612bb6565b60200260200101819052508080611ca790612be5565b915050611c52565b5095945050505050565b604080518082018252606080825260208201819052825160028082529181019093529091600091816020015b6060815260200190600190039081611ce55790505090506000611d11611d0a86611749565b6000611362565b9050611d1f610ac38261145a565b82600081518110611d3257611d32612bb6565b6020026020010181905250602084511015611d6b578382600181518110611d5b57611d5b612bb6565b6020026020010181905250611d74565b610aef846115ac565b610b168261161b565b6060600080611d8b84611f7c565b91935090915060019050816001811115611da757611da7612cab565b14611df45760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420524c50206c6973742076616c75652e00000000000000000060448201526064016101a6565b6040805160208082526104208201909252600091816020015b6040805180820190915260008082526020820152815260200190600190039081611e0d5790505090506000835b8651811015611f715760208210611eb95760405162461bcd60e51b815260206004820152602a60248201527f50726f766964656420524c50206c6973742065786365656473206d6178206c6960448201527f7374206c656e6774682e0000000000000000000000000000000000000000000060648201526084016101a6565b600080611ef66040518060400160405280858c60000151611eda9190612b9f565b8152602001858c60200151611eef9190612c00565b9052611f7c565b509150915060405180604001604052808383611f129190612c00565b8152602001848b60200151611f279190612c00565b815250858581518110611f3c57611f3c612bb6565b6020908102919091010152611f52600185612c00565b9350611f5e8183612c00565b611f689084612c00565b92505050611e3a565b508152949350505050565b600080600080846000015111611fd45760405162461bcd60e51b815260206004820152601860248201527f524c50206974656d2063616e6e6f74206265206e756c6c2e000000000000000060448201526064016101a6565b6020840151805160001a607f8111611ff95760006001600094509450945050506122c6565b60b7811161207557600061200e608083612b9f565b9050808760000151116120635760405162461bcd60e51b815260206004820152601960248201527f496e76616c696420524c502073686f727420737472696e672e0000000000000060448201526064016101a6565b600195509350600092506122c6915050565b60bf811161216457600061208a60b783612b9f565b9050808760000151116120df5760405162461bcd60e51b815260206004820152601f60248201527f496e76616c696420524c50206c6f6e6720737472696e67206c656e6774682e0060448201526064016101a6565b600183015160208290036101000a90046120f98183612c00565b8851116121485760405162461bcd60e51b815260206004820152601860248201527f496e76616c696420524c50206c6f6e6720737472696e672e000000000000000060448201526064016101a6565b612153826001612c00565b96509450600093506122c692505050565b60f781116121df57600061217960c083612b9f565b9050808760000151116121ce5760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420524c502073686f7274206c6973742e00000000000000000060448201526064016101a6565b6001955093508492506122c6915050565b60006121ec60f783612b9f565b9050808760000151116122415760405162461bcd60e51b815260206004820152601d60248201527f496e76616c696420524c50206c6f6e67206c697374206c656e6774682e00000060448201526064016101a6565b600183015160208290036101000a900461225b8183612c00565b8851116122aa5760405162461bcd60e51b815260206004820152601660248201527f496e76616c696420524c50206c6f6e67206c6973742e0000000000000000000060448201526064016101a6565b6122b5826001612c00565b96509450600193506122c692505050565b9193909250565b606060008267ffffffffffffffff8111156122ea576122ea6128ab565b6040519080825280601f01601f191660200182016040528015612314576020820181803683370190505b50905080516000141561232857905061125a565b60006123348587612c00565b90506020820160005b612348602087612d72565b81101561237f578251825261235e602084612c00565b925061236b602083612c00565b91508061237781612be5565b91505061233d565b5060006001602087066020036101000a039050808251168119845116178252839450505050509392505050565b60606100fc82612706565b606080603884101561243657604080516001808252818301909252906020820181803683370190505090506123ec8385612d1e565b60f81b8160008151811061240257612402612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506100f9565b600060015b6124458187612d72565b1561246b578161245481612be5565b9250612464905061010082612c8c565b905061243b565b612476826001612c00565b67ffffffffffffffff81111561248e5761248e6128ab565b6040519080825280601f01601f1916602001820160405280156124b8576020820181803683370190505b5092506124c58583612d1e565b6124d0906037612d1e565b60f81b836000815181106124e6576124e6612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600190505b8181116125a45761010061252e8284612b9f565b61253a90610100612e6a565b6125449088612d72565b61254e9190612d0a565b60f81b83828151811061256357612563612bb6565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508061259c81612be5565b91505061251a565b5050905092915050565b606060006125bb8361271c565b90506125c9815160c06123b7565b816040516020016125db929190612d43565b604051602081830303815290604052915050919050565b606060028260008151811061260957612609612bb6565b016020015161261b919060f81c612c47565b60ff1661262d576100fc826002611285565b6100fc826001611285565b60408051808201909152606080825260208201526000825167ffffffffffffffff811115612668576126686128ab565b60405190808252806020026020018201604052801561269b57816020015b60608152602001906001900390816126865790505b50905060005b83518110156126fc576126cc8482815181106126bf576126bf612bb6565b60200260200101516123ac565b8282815181106126de576126de612bb6565b602002602001018190525080806126f490612be5565b9150506126a1565b5061125a8161161b565b60606100fc8260200151600084600001516122cd565b606081516000141561273e576040805160008082526020820190925290610a5e565b6000805b83518110156127855783818151811061275d5761275d612bb6565b602002602001015151826127719190612c00565b91508061277d81612be5565b915050612742565b60008267ffffffffffffffff8111156127a0576127a06128ab565b6040519080825280601f01601f1916602001820160405280156127ca576020820181803683370190505b50600092509050602081015b85518310156119765760008684815181106127f3576127f3612bb6565b6020026020010151905060006020820190506128118382845161284e565b87858151811061282357612823612bb6565b602002602001015151836128379190612c00565b92505050828061284690612be5565b9350506127d6565b8282825b6020811061288a5781518352612869602084612c00565b9250612876602083612c00565b9150612883602082612b9f565b9050612852565b905182516020929092036101000a6000190180199091169116179052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f8301126128eb57600080fd5b813567ffffffffffffffff80821115612906576129066128ab565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190828211818310171561294c5761294c6128ab565b8160405283815286602085880101111561296557600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006060848603121561299a57600080fd5b833567ffffffffffffffff808211156129b257600080fd5b6129be878388016128da565b945060208601359150808211156129d457600080fd5b506129e1868287016128da565b925050604084013590509250925092565b60005b83811015612a0d5781810151838201526020016129f5565b83811115612a1c576000848401525b50505050565b82151581526040602082015260008251806040840152612a498160608501602087016129f2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016060019392505050565b60008060408385031215612a8f57600080fd5b823567ffffffffffffffff80821115612aa757600080fd5b612ab3868387016128da565b93506020850135915080821115612ac957600080fd5b50612ad6858286016128da565b9150509250929050565b60008060008060808587031215612af657600080fd5b843567ffffffffffffffff80821115612b0e57600080fd5b612b1a888389016128da565b95506020870135915080821115612b3057600080fd5b612b3c888389016128da565b94506040870135915080821115612b5257600080fd5b50612b5f878288016128da565b949793965093946060013593505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015612bb157612bb1612b70565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000600019821415612bf957612bf9612b70565b5060010190565b60008219821115612c1357612c13612b70565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600060ff831680612c5a57612c5a612c18565b8060ff84160691505092915050565b600060ff821660ff841680821015612c8357612c83612b70565b90039392505050565b6000816000190483118215151615612ca657612ca6612b70565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600081612ce957612ce9612b70565b506000190190565b600060208284031215612d0357600080fd5b5051919050565b600082612d1957612d19612c18565b500690565b600060ff821660ff84168060ff03821115612d3b57612d3b612b70565b019392505050565b60008351612d558184602088016129f2565b835190830190612d698183602088016129f2565b01949350505050565b600082612d8157612d81612c18565b500490565b600181815b80851115612dc1578160001904821115612da757612da7612b70565b80851615612db457918102915b93841c9390800290612d8b565b509250929050565b600082612dd8575060016100fc565b81612de5575060006100fc565b8160018114612dfb5760028114612e0557612e21565b60019150506100fc565b60ff841115612e1657612e16612b70565b50506001821b6100fc565b5060208310610133831016604e8410600b8410161715612e44575081810a6100fc565b612e4e8383612d86565b8060001904821115612e6257612e62612b70565b029392505050565b60006100f98383612dc956fea264697066735822122090f43b23c7dd430df0f01610036ee696897e2e1feadd71f1c703ee1272469a6a64736f6c63430008090033";

type TestLibMerkleTrieConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestLibMerkleTrieConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestLibMerkleTrie__factory extends ContractFactory {
  constructor(...args: TestLibMerkleTrieConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestLibMerkleTrie> {
    return super.deploy(overrides || {}) as Promise<TestLibMerkleTrie>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestLibMerkleTrie {
    return super.attach(address) as TestLibMerkleTrie;
  }
  connect(signer: Signer): TestLibMerkleTrie__factory {
    return super.connect(signer) as TestLibMerkleTrie__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestLibMerkleTrieInterface {
    return new utils.Interface(_abi) as TestLibMerkleTrieInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestLibMerkleTrie {
    return new Contract(address, _abi, signerOrProvider) as TestLibMerkleTrie;
  }
}
