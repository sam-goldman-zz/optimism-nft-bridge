# IL2StandardERC721Factory



> IL2StandardERC721Factory





## Methods

### createStandardL2ERC721

```solidity
function createStandardL2ERC721(address _l1Token, string _name, string _symbol) external nonpayable
```



*Creates an instance of the standard ERC721 token on L2.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token | address | Address of the corresponding L1 token.
| _name | string | ERC721 name.
| _symbol | string | ERC721 symbol.

### isStandardERC721

```solidity
function isStandardERC721(address _account) external view returns (bool)
```



*Maps an L2 ERC721 token address to a boolean that returns true if the token was created with the L2StandardERC721Factory.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _account | address | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined

### standardERC721Mapping

```solidity
function standardERC721Mapping(address _account) external view returns (address)
```



*Maps an L1 ERC721 token address to an L2 Standard ERC721 token address. This mapping can only be updated once per L1 ERC721 token.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _account | address | undefined

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined



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



