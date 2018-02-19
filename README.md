# Iterable Set in solidity

This is a `Solidity` contract that offers a **Set** structure for `uint256` **allowing** at the same time to **efficiently list all the elements** in it.

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