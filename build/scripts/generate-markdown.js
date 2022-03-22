"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const directory_tree_1 = __importDefault(require("directory-tree"));
const src_1 = require("../src");
const PUBLIC_DEPLOYMENTS = [
    {
        folder: 'mainnet',
        name: 'Optimism (mainnet)',
        chainid: 10,
        rpc: 'https://mainnet.optimism.io',
        l1Explorer: 'https://etherscan.io',
        l2Explorer: 'https://optimistic.etherscan.io',
    },
    {
        folder: 'kovan',
        name: 'Optimism Kovan (public testnet)',
        chainid: 69,
        rpc: 'https://kovan.optimism.io',
        l1Explorer: 'https://kovan.etherscan.io',
        l2Explorer: 'https://kovan-optimistic.etherscan.io',
    },
    {
        folder: 'goerli',
        name: 'Optimism Goerli (internal devnet)',
        chainid: 420,
        notice: `Optimism Goerli is an internal Optimism development network. You're probably looking for [Optimism Kovan](../kovan#readme), the public Optimism testnet.`,
        l1Explorer: 'https://goerli.etherscan.io',
    },
];
const HIDDEN_CONTRACTS = [
    'L1StandardBridge_for_verification_only',
    'OVM_L1CrossDomainMessenger',
    'AddressDictator',
    'ChugSplashDictator',
];
const getDeploymentFolderPath = (name) => {
    return path_1.default.resolve(__dirname, `../deployments/${name}`);
};
const addline = (str, line) => {
    return str + line + '\n';
};
const buildContractsTable = (contracts, explorer) => {
    let table = ``;
    table = addline(table, '<table>');
    table = addline(table, '<tr>');
    table = addline(table, '<th>');
    table = addline(table, '<img width="506px" height="0px" />');
    table = addline(table, '<p><small>Contract</small></p>');
    table = addline(table, '</th>');
    table = addline(table, '<th>');
    table = addline(table, '<img width="506px" height="0px" />');
    table = addline(table, '<p><small>Address</small></p>');
    table = addline(table, '</th>');
    table = addline(table, '</tr>');
    for (const contract of contracts) {
        if (HIDDEN_CONTRACTS.includes(contract.name)) {
            continue;
        }
        table = addline(table, '<tr>');
        table = addline(table, '<td>');
        table = addline(table, contract.name);
        table = addline(table, '</td>');
        table = addline(table, '<td align="center">');
        if (explorer) {
            table = addline(table, `<a href="${explorer}/address/${contract.address}">`);
            table = addline(table, `<code>${contract.address}</code>`);
            table = addline(table, '</a>');
        }
        else {
            table = addline(table, `<code>${contract.address}</code>`);
        }
        table = addline(table, '</td>');
        table = addline(table, '</tr>');
    }
    table = addline(table, '</table>');
    return table;
};
const getL1Contracts = (deployment) => {
    const l1ContractsFolder = getDeploymentFolderPath(deployment);
    return (0, directory_tree_1.default)(l1ContractsFolder)
        .children.filter((child) => {
        return child.extension === '.json';
    })
        .map((child) => {
        return {
            name: child.name.replace('.json', ''),
            address: require(path_1.default.join(l1ContractsFolder, child.name)).address,
        };
    });
};
const getL2Contracts = (deployment) => {
    return Object.entries(src_1.predeploys).map(([name, address]) => {
        return {
            name,
            address,
        };
    });
};
const main = async () => {
    for (const deployment of PUBLIC_DEPLOYMENTS) {
        let md = ``;
        md = addline(md, `# ${deployment.name}`);
        if (deployment.notice) {
            md = addline(md, `## Notice`);
            md = addline(md, deployment.notice);
        }
        md = addline(md, `## Network Info`);
        md = addline(md, `- **Chain ID**: ${deployment.chainid}`);
        if (deployment.rpc) {
            md = addline(md, `- **Public RPC**: ${deployment.rpc}`);
        }
        if (deployment.l2Explorer) {
            md = addline(md, `- **Block Explorer**: ${deployment.l2Explorer}`);
        }
        md = addline(md, `## Layer 1 Contracts`);
        md = addline(md, buildContractsTable(getL1Contracts(deployment.folder), deployment.l1Explorer));
        md = addline(md, `## Layer 2 Contracts`);
        md = addline(md, buildContractsTable(getL2Contracts(deployment.folder), deployment.l2Explorer));
        fs_1.default.writeFileSync(path_1.default.join(getDeploymentFolderPath(deployment.folder), 'README.md'), md);
    }
    let primary = ``;
    primary = addline(primary, `# Optimism Deployments`);
    for (const deployment of PUBLIC_DEPLOYMENTS) {
        primary = addline(primary, `- [${deployment.name}](./${deployment.folder}#readme)`);
    }
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, '../deployments/README.md'), primary);
};
main();
//# sourceMappingURL=generate-markdown.js.map