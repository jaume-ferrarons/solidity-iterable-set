const IterableSet = artifacts.require("./IterableSet.sol");

function numbersFromArray(array) {
    return array.map(number => number.toNumber());
}

async function iterateForwardElements(set) {
    const size = (await set.size()).toNumber();
    const first = (await set.first()).toNumber();
    const last = (await set.last()).toNumber();
    const result = [];
    if (size > 0) {
        let value = first;
        while (value != last) {
            result.push(value);
            value = (await set.next(value)).toNumber();
        }
        result.push(value);
    }
    return result;
}

async function iterateBackwardElements(set) {
    const size = (await set.size()).toNumber();
    const first = (await set.first()).toNumber();
    const last = (await set.last()).toNumber();
    const result = [];
    if (size > 0) {
        let value = last;
        while (value != first) {
            result.push(value);
            value = (await set.previous(value)).toNumber();
        }
        result.push(value);
    }
    return result;
}

async function assertSetContent(set, values) {
    values = values.sort();
    assert.deepEqual(numbersFromArray(await set.values()).sort(), values, "Check content set array error");
    assert.deepEqual((await iterateForwardElements(set)).sort(), values, "Check content forward set iteration error");
    assert.deepEqual((await iterateBackwardElements(set)).sort(), values, "Check content backward set iteration error");
}

contract('IterableSet', function (accounts) {
    it("...should add a value and update appropiately", async () => {
        const set = await IterableSet.deployed();
        assert.equal(await set.size(), 0, "Should start empty");
        assert.equal(await set.contains(0), false, "The element should not be there");
        await set.add(0, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Incorrect set size");
        assert.equal(await set.contains(0), true, "The element should be there");
        await assertSetContent(set, [0]);
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
        assert.deepEqual(await iterateForwardElements(set), values, "Iterates all elements");
    });
});

contract('IterableSet', function (accounts) {
    it("...should add, remove and handle duplicate elements", async () => {
        const set = await IterableSet.deployed();
        // Empty
        assert.equal(await set.size(), 0, "Should start empty");
        await assertSetContent(set, []);

        // Add 1
        await set.add(1, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Wrong number of elements");
        await assertSetContent(set, [1]);

        // Add 2
        await set.add(2, { from: accounts[0] });
        assert.equal(await set.size(), 2, "Wrong number of elements");
        await assertSetContent(set, [2, 1]);

        // Add 2 again
        await set.add(2, { from: accounts[0] });
        assert.equal(await set.size(), 2, "Wrong number of elements");
        await assertSetContent(set, [2, 1]);

        // Add 3
        await set.add(3, { from: accounts[0] });
        assert.equal(await set.size(), 3, "Wrong number of elements");
        await assertSetContent(set, [3, 2, 1]);

        // Remove 3
        await set.remove(3, { from: accounts[0] });
        assert.equal(await set.size(), 2, "Wrong number of elements");
        await assertSetContent(set, [2, 1]);

        // Remove 1
        await set.remove(1, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Wrong number of elements");
        await assertSetContent(set, [2]);

        // Remove 1 again
        await set.remove(1, { from: accounts[0] });
        assert.equal(await set.size(), 1, "Wrong number of elements");
        await assertSetContent(set, [2]);

        // Remove 2
        await set.remove(2, { from: accounts[0] });
        assert.equal(await set.size(), 0, "Wrong number of elements");
        await assertSetContent(set, []);
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
        await assertSetContent(set, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
        await set.remove(7, { from: accounts[0] });
        await assertSetContent(set, [9, 8, 6, 5, 4, 3, 2, 1, 0]);
        await set.remove(6, { from: accounts[0] });
        await assertSetContent(set, [9, 8, 5, 4, 3, 2, 1, 0]);
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
            await assertSetContent(set, Array.from(jsSet.values()));
        }
    });
});