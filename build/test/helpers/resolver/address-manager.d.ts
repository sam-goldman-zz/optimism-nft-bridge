import { Contract } from 'ethers';
import { FakeContract } from '@defi-wonderland/smock';
export declare const setProxyTarget: (AddressManager: Contract, name: string, target: FakeContract) => Promise<void>;
export declare const makeAddressManager: () => Promise<Contract>;
