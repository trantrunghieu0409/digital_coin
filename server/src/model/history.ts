export class TransactionHistory {
    public receiverAddress: string;
    public sentAddress: string;
    public amount: number;
    public block: string;
    public transactionId: string;

    constructor(receiverAddress: string,
        sentAddress: string,
        amount: number,
        transactionId: string, block: string) {
            this.receiverAddress = receiverAddress;
            this.sentAddress = sentAddress;
            this.amount = amount;
            this.transactionId = transactionId;
            this.block = block
        }
    }
