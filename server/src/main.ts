import * as  bodyParser from 'body-parser';
import express from 'express';
import * as _ from 'lodash';
import { generateNextBlock, generateRawNextBlock, generatenextBlockWithTransaction, getAccountBalance, getBlockchain, getUnspentTxOuts, sendTransaction } from './service/block_service';
import { getSockets, connectToPeers, initP2PServer } from './websocket/p2p';
import { Block } from './model/block';
import { initWallet, getAllWallets, deleteWallet } from './service/wallet_service';
import { UnspentTxOut } from './model/transaction';

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort: number = parseInt(process.env.P2P_PORT) || 6001;

const initHttpServer = (myHttpPort: number) => {
    const app = express();

    var cors = require('cors');
    app.use(cors());

    app.use(bodyParser.json());

    app.use((err, req, res, next) => {
        if (err) {
            res.status(400).send(err.message);
        }
    });

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });
    app.post('/mineRawBlock', (req, res) => {
        if (req.body.data == null) {
            res.send('data parameter is missing');
            return;
        }
        const newBlock: Block = generateRawNextBlock(req.body.data);
        if (newBlock === null) {
            res.status(400).send('could not generate block');
        } else {
            res.send(newBlock);
        }
    });

    app.post('/mineBlock/:ownerPublicAddress', (req, res) => {
        const newBlock: Block = generateNextBlock(req.params.ownerPublicAddress);
        if (newBlock === null) {
            res.status(400).send('could not generate block');
        } else {
            res.send(newBlock);
        }
    });

    app.get('/balance/:address', (req, res) => {
        const address = req.params.address;
        const balance: number = getAccountBalance(address);
        res.send({'balance': balance});
    });

    app.get('/wallets', (req, res) => {
        res.send(getAllWallets());
    });

    app.post('/wallet', (req, res) => {
        initWallet();
        res.send(getAllWallets());
    });

    app.post('/mineTransaction', (req, res) => {
        const address = req.body.address;
        const amount = req.body.amount;
        const ownerPublicAddress = req.body.ownerPublicAddress;
        try {
            const resp = generatenextBlockWithTransaction(address, amount, ownerPublicAddress);
            res.send(resp);
        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    });

    app.get('/peers', (req, res) => {
        res.send(getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPeers(req.body.peer);
        res.send();
    });

    app.get('/block/:hash', (req, res) => {
        const block = _.find(getBlockchain(), {'hash' : req.params.hash});
        res.send(block);
    }); 

    app.post('/sendTransaction', (req, res) => {
        try {
            const address = req.body.address;
            const amount = req.body.amount;
            const ownerPublicAddress = req.body.ownerPublicAddress;

            if (address === undefined || amount === undefined) {
                throw Error('invalid address or amount');
            }
            const resp = sendTransaction(address, amount, ownerPublicAddress);
            res.send(resp);
        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    });
    
    app.get('/transaction/:id', (req, res) => {
        const tx = _._(getBlockchain())
            .map((blocks) => blocks.data)
            .flatten()
            .find({'id': req.params.id});
        res.send(tx);
    });

    app.get('/address/:address', (req, res) => {
        const unspentTxOuts: UnspentTxOut[] =
            _.filter(getUnspentTxOuts(), (uTxO) => uTxO.address === req.params.address)
        res.send({'unspentTxOuts': unspentTxOuts});
    });

    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);
initP2PServer(p2pPort);
deleteWallet();
initWallet();