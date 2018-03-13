# Iterable Set in solidity

This is a `Solidity` contract that offers a **Set** structure for `uint256` **allowing** at the same time to **efficiently list all the elements** in it.

## Address

You can find this contact in the following networks:
* Main: [0x7680cd6af65e5f4ca877c11d00f1cfb7f1a2ca9b](https://etherscan.io/address/0x7680cd6af65e5f4ca877c11d00f1cfb7f1a2ca9b).
* Ropsten: [0x95d9036eb852de376597cf09550aed61b9ef6ec6](https://ropsten.etherscan.io/address/0x95d9036eb852de376597cf09550aed61b9ef6ec6).


## Available methods

### Add
Adds the provided value to the set.
```js
function add(uint256 value) public
```
### Contains
Returns true if and only if the contains the value.
```js
function contains(uint256 value) public view returns (bool)
```

### First
Value of the first iterable element in the set.
```js
uint256 public first
```

### Last
Value of the last iterable element in the set.
```js
uint256 public last
```

### Next
Returns the next value in the set.
Fails if the provided value does not belong to the set or it has not next (it is the last one).
```js
function next(uint256 value) public view returns (uint256) 
```

### Previous
Returns the previous value in the set.
Fails if the provided value does not belong to the set or it has not previous (it is the first one)
```js
function next(uint256 value) public view returns (uint256) 
```

### Remove
Removes the provided value from the set if present.
```js
function remove(uint256 value) public
```

### Size
Number of elements in the set.
```js
uint256 public size
```

### Values
Returns an array containing all the values present in the set.

Don't call it from a smart contract code. The gas requirement of this function may be **high** and returns a dynamic array which is not supported in contract-to-contract calls.
```js
function values() public view returns (uint256[])
```

## Internals

It has been implemented using the `mapping` type from `Solidity` and linking the elements as in a double linked list.

## Usage

This contract provides a data structure that allows adding, removing and obtaing keys from it. In order to iterate the elements in it from your contract you need to access them one by one.
Assuming that we have an instance of the `IterableSet` cotract in the variable **set**, we can access and obtain all elements in the following form:

```js
IterableSet set = new IterableSet();

/**
 * .... some operations on the set
 */

uint256[] memory elements = new uint256[](set.size());
uint256 position = set.first();
uint256 i;
for (i = 0; i < size; i++) {
    elements[i] = position;
    position = set.next(position);
}
```

In JS we can similarly do:
```js
const size = (await set.size()).toNumber();
const first = (await set.first()).toNumber();
const last = (await set.last()).toNumber();
const elements = [];
if (size > 0) {
    let value = first;
    while (value != last) {
        elements.push(value);
        value = (await set.next(value)).toNumber();
    }
    elements.push(value);
}
```

or more simply use:

```js
const elements = await set.values()
```

**NOTE**: that the later solution `elements` will contain *BigNumber* objects instead of JS number.

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