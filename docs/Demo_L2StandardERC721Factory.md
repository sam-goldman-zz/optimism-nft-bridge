# Demo_L2StandardERC721Factory



> Demo L2StandardERC721Factory



*Demo L2StandardERC721FactoryFactory for the ERC721 Bridge tutorial. This contract is the exact same as L2StandardERC721Factory with one difference: here, we pass the L2ERC721Bridge address into the constructor, instead of using  Lib_PredeployAddresses.L2_ERC721_BRIDGE. This allows us to run the tutorial locally.*

## Methods

### createStandardL2ERC721

```solidity
function createStandardL2ERC721(address _l1Token, string _name, string _symbol, string _baseTokenURI) external nonpayable
```



*Creates an instance of the standard ERC721 token on L2.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token | address | Address of the corresponding L1 token.
| _name | string | ERC721 name.
| _symbol | string | undefined
| _baseTokenURI | string | Base token URI of the L2 token.

### isStandardERC721

```solidity
function isStandardERC721(address) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined



## Events

### StandardL2ERC721Created

```solidity
event StandardL2ERC721Created(address indexed _l1Token, address indexed _l2Token)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |



