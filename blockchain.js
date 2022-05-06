const crypto = require('crypto');
const { Block } = require('./block');

class Blockchain {
    constructor() {
        const genesisBlock = new Block('0x0000000000000000000000000000000000000', { isGenesis: true });
        genesisBlock.mine();
        this.chain = [genesisBlock];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash, data);
        newBlock.mine();
        this.chain.push(newBlock);
    }

    isValid() {
        //let i;
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const lastBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash != lastBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const nhutChain = new Blockchain();
console.log(nhutChain.chain[0]);
nhutChain.addBlock({
    from: "Ha",
    to: "Nhut",
    value: 100
});
console.log(nhutChain.chain[1]);

nhutChain.addBlock({
    from: "Doan",
    to: "Cuong",
    value: 200
});
console.log(nhutChain.chain[2]);

nhutChain.addBlock(
    [
        {
            from: "Doan",
            to: "Cuong",
            value: 300
        }
    ]
);
console.log(nhutChain.chain[3]);
nhutChain.addBlock(
    [
        {
            from: "Tin",
            to: "Linh",
            value: 400
        }
    ]
);
console.log(nhutChain.chain[4]);

// nhutChain.chain[1].transactions = {
//     from: "Nhut",
//     to: "Ha",
//     value: 100
// }
//nhutChain.chain[1].hash = nhutChain.chain[1].calculateHash();

// nhutChain.chain[2].previousHash = nhutChain.chain[1].hash;
// nhutChain.chain[2].hash = nhutChain.chain[2].calculateHash();
// ... 
console.log("chain valid?: " + nhutChain.isValid());