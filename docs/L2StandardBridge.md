# L2StandardBridge



> L2StandardBridge



*The L2 Standard bridge is a contract which works together with the L1 Standard bridge to enable ETH, ERC20, and ERC721 transitions between L1 and L2. This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard bridge. This contract also acts as a burner of the tokens intended for withdrawal, informing the L1 bridge to release L1 funds.*

## Methods

### finalizeDeposit

```solidity
function finalizeDeposit(address _l1Token, address _l2Token, address _from, address _to, uint256 _amount, bytes _data) external nonpayable
```



*DEPRECATED: This is a legacy method. Use finalizeERC20Deposit instead.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token | address | Address for the l1 token this is called with
| _l2Token | address | Address for the l2 token this is called with
| _from | address | Account to pull the deposit from on L2.
| _to | address | Address to receive the withdrawal at
| _amount | uint256 | Amount of the token to withdraw
| _data | bytes | Data provider by the sender on L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### finalizeERC20Deposit

```solidity
function finalizeERC20Deposit(address _l1Token, address _l2Token, address _from, address _to, uint256 _amount, bytes _data) external nonpayable
```



*Complete a deposit from L1 to L2, and credits funds to the recipient&#39;s balance of this L2 token. This call will fail if it did not originate from a corresponding deposit in L1StandardTokenBridge.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token | address | Address for the l1 token this is called with
| _l2Token | address | Address for the l2 token this is called with
| _from | address | Account to pull the deposit from on L2.
| _to | address | Address to receive the withdrawal at
| _amount | uint256 | Amount of the token to withdraw
| _data | bytes | Data provider by the sender on L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### finalizeERC721Deposit

```solidity
function finalizeERC721Deposit(address _l1Token, address _l2Token, address _from, address _to, uint256 _tokenId, bytes _data) external nonpayable
```



*Complete a deposit from L1 to L2, and send ERC721 token to the recipient on L2. This call will fail if it did not originate from a corresponding deposit in L1ERC721Bridge.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token | address | Address for the l1 token this is called with
| _l2Token | address | Address for the l2 token this is called with
| _from | address | Account to pull the deposit from on L2.
| _to | address | Address to receive the withdrawal at
| _tokenId | uint256 | Token ID to withdraw
| _data | bytes | Data provider by the sender on L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### l1TokenBridge

```solidity
function l1TokenBridge() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

### messenger

```solidity
function messenger() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

### withdraw

```solidity
function withdraw(address _l2Token, uint256 _amount, uint32 _l1Gas, bytes _data) external nonpayable
```



*DEPRECATED: This is a legacy method. Use withdrawERC20 instead.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l2Token | address | Address of L2 token where withdrawal was initiated.
| _amount | uint256 | Amount of the token to withdraw.
| _l1Gas | uint32 | Unused, but included for potential forward compatibility considerations.
| _data | bytes | Optional data to forward to L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### withdrawERC20

```solidity
function withdrawERC20(address _l2Token, uint256 _amount, uint32 _l1Gas, bytes _data) external nonpayable
```



*initiate a withdraw of some tokens to the caller&#39;s account on L1*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l2Token | address | Address of L2 token where withdrawal was initiated.
| _amount | uint256 | Amount of the token to withdraw.
| _l1Gas | uint32 | Unused, but included for potential forward compatibility considerations.
| _data | bytes | Optional data to forward to L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### withdrawERC20To

```solidity
function withdrawERC20To(address _l2Token, address _to, uint256 _amount, uint32 _l1Gas, bytes _data) external nonpayable
```



*initiate a withdraw of some tokens to the recipient&#39;s account on L1*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l2Token | address | Address of L2 token where withdrawal is initiated.
| _to | address | L1 adress to credit the withdrawal to.
| _amount | uint256 | Amount of the token to withdraw.
| _l1Gas | uint32 | Unused, but included for potential forward compatibility considerations.
| _data | bytes | Optional data to forward to L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### withdrawERC721

```solidity
function withdrawERC721(address _l2Token, uint256 _tokenId, uint32 _l1Gas, bytes _data) external nonpayable
```



*initiate a withdrawal of an NFT to the caller&#39;s account on L1*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l2Token | address | Address of L2 token where withdrawal was initiated.
| _tokenId | uint256 | Token ID to withdraw.
| _l1Gas | uint32 | Unused, but included for potential forward compatibility considerations.
| _data | bytes | Optional data to forward to L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### withdrawERC721To

```solidity
function withdrawERC721To(address _l2Token, address _to, uint256 _tokenId, uint32 _l1Gas, bytes _data) external nonpayable
```



*initiate a withdrawal of an NFT to a recipient&#39;s account on L1.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l2Token | address | Address of L2 token where withdrawal is initiated.
| _to | address | L1 adress to send the withdrawal to.
| _tokenId | uint256 | Token ID to withdraw.
| _l1Gas | uint32 | Unused, but included for potential forward compatibility considerations.
| _data | bytes | Optional data to forward to L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.

### withdrawTo

```solidity
function withdrawTo(address _l2Token, address _to, uint256 _amount, uint32 _l1Gas, bytes _data) external nonpayable
```



*DEPRECATED: This is a legacy method. Use withdrawERC20To instead.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _l2Token | address | Address of L2 token where withdrawal is initiated.
| _to | address | L1 adress to credit the withdrawal to.
| _amount | uint256 | Amount of the token to withdraw.
| _l1Gas | uint32 | Unused, but included for potential forward compatibility considerations.
| _data | bytes | Optional data to forward to L1. This data is provided        solely as a convenience for external contracts. Aside from enforcing a maximum        length, these contracts provide no guarantees about its content.



## Events

### ERC20DepositFailed

```solidity
event ERC20DepositFailed(address indexed _l1Token, address indexed _l2Token, address indexed _from, address _to, uint256 _amount, bytes _data)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |
| _from `indexed` | address | undefined |
| _to  | address | undefined |
| _amount  | uint256 | undefined |
| _data  | bytes | undefined |

### ERC20DepositFinalized

```solidity
event ERC20DepositFinalized(address indexed _l1Token, address indexed _l2Token, address indexed _from, address _to, uint256 _amount, bytes _data)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |
| _from `indexed` | address | undefined |
| _to  | address | undefined |
| _amount  | uint256 | undefined |
| _data  | bytes | undefined |

### ERC20WithdrawalInitiated

```solidity
event ERC20WithdrawalInitiated(address indexed _l1Token, address indexed _l2Token, address indexed _from, address _to, uint256 _amount, bytes _data)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |
| _from `indexed` | address | undefined |
| _to  | address | undefined |
| _amount  | uint256 | undefined |
| _data  | bytes | undefined |

### ERC721DepositFailed

```solidity
event ERC721DepositFailed(address indexed _l1Token, address indexed _l2Token, address indexed _from, address _to, uint256 _tokenId, bytes _data)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |
| _from `indexed` | address | undefined |
| _to  | address | undefined |
| _tokenId  | uint256 | undefined |
| _data  | bytes | undefined |

### ERC721DepositFinalized

```solidity
event ERC721DepositFinalized(address indexed _l1Token, address indexed _l2Token, address indexed _from, address _to, uint256 _tokenId, bytes _data)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |
| _from `indexed` | address | undefined |
| _to  | address | undefined |
| _tokenId  | uint256 | undefined |
| _data  | bytes | undefined |

### ERC721WithdrawalInitiated

```solidity
event ERC721WithdrawalInitiated(address indexed _l1Token, address indexed _l2Token, address indexed _from, address _to, uint256 _tokenId, bytes _data)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _l1Token `indexed` | address | undefined |
| _l2Token `indexed` | address | undefined |
| _from `indexed` | address | undefined |
| _to  | address | undefined |
| _tokenId  | uint256 | undefined |
| _data  | bytes | undefined |



