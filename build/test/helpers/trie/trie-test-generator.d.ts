import { SecureTrie, BaseTrie } from 'merkle-patricia-tree';
interface TrieNode {
    key: string;
    val: string;
}
interface InclusionProofTest {
    key: string;
    val: string;
    proof: string;
    root: string;
}
interface NodeUpdateTest extends InclusionProofTest {
    newRoot: string;
}
interface EthereumAccount {
    address?: string;
    nonce: number;
    balance: number;
    codeHash: string;
    storageRoot?: string;
    storage?: TrieNode[];
}
interface AccountProofTest {
    address: string;
    account: EthereumAccount;
    accountTrieWitness: string;
    accountTrieRoot: string;
}
interface AccountUpdateTest extends AccountProofTest {
    newAccountTrieRoot: string;
}
export declare class TrieTestGenerator {
    _TrieClass: any;
    _trie: SecureTrie | BaseTrie;
    _nodes: TrieNode[];
    _subGenerators?: TrieTestGenerator[];
    constructor(_TrieClass: any, _trie: SecureTrie | BaseTrie, _nodes: TrieNode[], _subGenerators?: TrieTestGenerator[]);
    static fromNodes(opts: {
        nodes: TrieNode[];
        secure?: boolean;
    }): Promise<TrieTestGenerator>;
    static fromRandom(opts: {
        seed: string;
        nodeCount: number;
        secure?: boolean;
        keySize?: number;
        valSize?: number;
    }): Promise<TrieTestGenerator>;
    static fromAccounts(opts: {
        accounts: EthereumAccount[];
        secure?: boolean;
    }): Promise<TrieTestGenerator>;
    makeInclusionProofTest(key: string | number): Promise<InclusionProofTest>;
    makeAllInclusionProofTests(): Promise<InclusionProofTest[]>;
    makeNodeUpdateTest(key: string | number, val: string): Promise<NodeUpdateTest>;
    makeAccountProofTest(address: string | number): Promise<AccountProofTest>;
    makeAccountUpdateTest(address: string | number, account: EthereumAccount): Promise<AccountUpdateTest>;
    private prove;
}
export {};
