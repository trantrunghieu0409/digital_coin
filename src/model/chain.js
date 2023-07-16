class Chain {
    static instance = new Chain();

    getPreviousBlockHash() {
        // sending the entire block itself
        return this.chain[this.chain.length - 1].getHash();
    }

    insertBlock(transaction, senderPublicKey, sig) {
        // create verifier
        const verify = crypto.createVerify("SHA256");
        // add the transaction JSON
        verify.update(transaction.toString());
        // Verify it with the sender's public key
        const isValid = verify.verify(senderPublicKey, sig);
        if (isValid) {
          const block = new Block(this.getPreviousBlockHash(), transaction);
          console.log("Block added", block.toString());
          this.chain.push(block);
        }
    }
}