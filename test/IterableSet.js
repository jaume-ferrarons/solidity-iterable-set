const IterableSet = artifacts.require("./IterableSet.sol");

function numbersFromArray(array) {
    return array.map(number => number.toNumber());
}

contract('IterableSet', function (accounts) {
    it("...should add a value and update appropiately", async () => {
        const set = await IterableSet.deployed();
        assert.equal(await set.size(), 0, "Should start empty");
        assert.equal(await set.contains(0), false, "The element should not be there");
        await set.add(0, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Incorrect set size");
        assert.equal(await set.contains(0), true, "The element should be there");
        assert.deepEqual(numbersFromArray(await set.values()), [0], "Wrong elements there");
    });
});

contract('IterableSet', function (accounts) {
    it("...should add a three values and update appropiately", async () => {
        const values = [125, 8764, 54654564321];
        const set = await IterableSet.deployed();
        assert.equal(await set.size(), 0, "Should start empty");
        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            assert.equal(await set.contains(value), false, `${value} should not be there`);
            await set.add(value, { from: accounts[0] });
            assert.equal(await set.size(), index + 1, "Incorrect set size");
        }
        assert.deepEqual(numbersFromArray(await set.values()), values.reverse(), "Wrong elements there");
    });
});

contract('IterableSet', function (accounts) {
    it("...should add, remove and handle duplicate elements", async () => {
        const set = await IterableSet.deployed();
        // Empty
        assert.equal(await set.size(), 0, "Should start empty");
        assert.deepEqual(numbersFromArray(await set.values()), [], "Wrong elements there");

        // Add 1
        await set.add(1, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [1], "Wrong elements there");

        // Add 2
        await set.add(2, { from: accounts[0] });
        assert.equal(await set.size(), 2, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [2, 1], "Wrong elements there");

        // Add 2 again
        await set.add(2, { from: accounts[0] });
        assert.equal(await set.size(), 2, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [2, 1], "Wrong elements there");

        // Add 3
        await set.add(3, { from: accounts[0] });
        assert.equal(await set.size(), 3, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [3, 2, 1], "Wrong elements there");

        // Remove 3
        await set.remove(3, { from: accounts[0] });
        assert.equal(await set.size(), 2, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [2, 1], "Wrong elements there");

        // Remove 1
        await set.remove(1, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [2], "Wrong elements there");

        // Remove 1 again
        await set.remove(1, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [2], "Wrong elements there");

        // Remove 2
        await set.remove(2, { from: accounts[0] });
        assert.equal(await set.size(), 0, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [], "Wrong elements there");
    });
});

contract('IterableSet', function (accounts) {
    it("...should remove central elements", async () => {
        const set = await IterableSet.deployed();
        // Add 10 elements
        for (let i = 0; i < 10; i++) {
            await set.add(i, { from: accounts[0] });
        }
        assert.equal(await set.size(), 10, "Wrong number of elements");
        assert.deepEqual(numbersFromArray(await set.values()), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], "Wrong elements there");
        await set.remove(7, { from: accounts[0] });
        assert.deepEqual(numbersFromArray(await set.values()), [9, 8, 6, 5, 4, 3, 2, 1, 0], "Wrong elements there");
        await set.remove(6, { from: accounts[0] });
        assert.deepEqual(numbersFromArray(await set.values()), [9, 8, 5, 4, 3, 2, 1, 0], "Wrong elements there");
    });
});

contract('IterableSet', function (accounts) {
    it("...should pass comparisson with JS Set", async () => {
        const set = await IterableSet.deployed();
        const jsSet = new Set([]);
        const maxTestNumber = 10;
        for (let i = 0; i < 100; i++) {
            const number = Math.floor(maxTestNumber * Math.random());
            // Action
            if (Math.random() < 0.5) {
                await set.add(number, { from: accounts[0] });
                jsSet.add(number);
            } else {
                await set.remove(number, { from: accounts[0] });
                jsSet.delete(number);
            }
            assert.equal(await set.size(), jsSet.size, "Wrong number of elements");
            for (let j = 0; j < maxTestNumber; j++) {
                assert.equal(await set.contains(j), jsSet.has(j), `Element presence mismatch: ${j}`);
            }
            assert.deepEqual(
                Array.from(new Set(numbersFromArray(await set.values()))).sort(),
                Array.from(jsSet.values()).sort(),
                "Wrong elements there");
        }
    });
});