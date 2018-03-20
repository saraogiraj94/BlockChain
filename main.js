// Creating my own blockchain
const sha256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        // Block will have its own hash function
        this.hash = this.calculateHash();
    }

    calculateHash() {
        // We will be using sha256 algo input is string
        return sha256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

// Creating our blockchain

class BlockChain {
    constructor() {
        // Intialize the list with the genesis block
        this.chain = [this.genseisBlock()];
    }

    genseisBlock() {
        return new Block(0, "20/03/2018", "Genesis block", 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    verifyBlockChain() {
        for (var i = 1; i < this.chain.length; i++) {
            const previousBlock = this.chain[i - 1];
            const currentBlock = this.chain[i];

            if (currentBlock.hash != currentBlock.calculateHash()) { return false; }
            if (currentBlock.previousHash != previousBlock.hash) { return false; }

        }

        return true;
    }

}

let blockchain = new BlockChain();
blockchain.addBlock(new Block(1, "23/03/2018", { 'amount': 4 }));
blockchain.addBlock(new Block(1, "25/03/2018", { 'amount': 6 }));

console.log(JSON.stringify(blockchain, null, 2));

console.log("added blockchain verify method" + blockchain.verifyBlockChain());