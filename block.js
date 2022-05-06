const crypto = require('crypto');
class Block {
    constructor(prevHash, transactions) {
        this.previousHash = prevHash;
        this.timestamp = new Date();
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    /**
     * @returns {string}
     */
    calculateHash() {
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    }

    mine() {
        while (!this.hash.startsWith('0000')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }
}


// const block = new Block('',
//     [
//         {
//             tx0: 'Hello'
//         },
//         {
//             tx1: 'Kitty'
//         },
//     ]
// );

// console.log(block);

module.exports.Block = Block;