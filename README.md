# Iterable Set in solidity

This is a `Solidity` contract that offers a **Set** structure for `uint256` **allowing** at the same time to **efficiently list all the elements** in it.

## Address

You can find this contact in the following networks:
* Main: [0x2C292e7151543014638e45a4E4903B974959c412](https://etherscan.io/address/0x2c292e7151543014638e45a4e4903b974959c412)
* Ropsten: [0x00bE89BAFC475ECBDbf0A9F4b516AE263e927ad4](https://ropsten.etherscan.io/address/0x00bE89BAFC475ECBDbf0A9F4b516AE263e927ad4).


## Available methods

### Add
Adds the provided value to the set.
```js
function add(uint256 value) public
```

### Remove
Removes the provided value from the set if present.
```js
function remove(uint256 value) public
```

### Contains
Returns true if and only if the contains the value.
```js
function contains(uint256 value) public view returns (bool)
```

### Values
Returns an array containing all the values present in the set.

Don't call it from a smart contract code. The gas requirement of this function may be **high** and returns a dynamic array which is not supported in contract-to-contract calls.
```js
function values() public view returns (uint256[])
```

### Size
Is the number of elements in the set.
```js
uint256 public size
```

## Internals

It has been implemented using the `mapping` type from `Solidity` and linking the elements in a double linked list.


## Testing

This contract has been developed using the [Truffle Framework](http://truffleframework.com/). You need to install it first before running the tests:

```bash
$ npm install -g truffle
```

Then you've just to execute:
```bash
truffle test
```

## License

IterableSet is [MIT licensed](./LICENSE).