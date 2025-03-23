import QubicLib from '@qubic-lib/qubic-ts-library';
import { NextResponse } from 'next/server';

// List of IDs to request balances for
const ids = ["XDBPPLBWINJFWEDNAOISWTDWCKIBWNKMFFXSPFRZUFSOGQYSBNMLEWOGJZEF"];

// Address of the peer to connect to
const peerAddress = "185.84.224.94";
let receivedBalances = 0;
let totalValue = 0;
let start = new Date();

// Create a new QubicConnector instance
// @ts-ignore
const connector = new QubicLib.QubicConnector();

// Event handler for receiving balance information
connector.onBalance = (b) => {
    if (b && b.entity && b.entity.incomingAmount && b.entity.outgoingAmount) {
        totalValue += b.entity.getBalance();
    }
    receivedBalances++;
    if (receivedBalances >= ids.length) {
        connector.destroy();
    }
};

// Event handler for when a peer is connected
connector.onPeerConnected = () => {
    console.log("connected");
    ids.forEach(id => {
        connector.requestBalance(new QubicLib.PublicKey(id));
    });
};

// Event handler for receiving a package
connector.onPackageReceived = (p) => {
    if (p.header.type === QubicLib.QubicPackageType.RESPOND_ENTITY) {
        const entityResponse = new QubicLib.QubicEntityResponse().parse(p.payLoad);
        console.log("BALANCE", entityResponse.entity.getBalance());
    }
};

// Event handler for when a peer is disconnected
connector.onPeerDisconnected = () => {
    const duration = new Date() - start;
    console.log(`Received ${receivedBalances} of ${ids.length} balances with total value of ${totalValue} $QUBICS in ${duration} milliseconds`);
    console.log("disconnected");
};

connector.onReady = (p) => {
    console.log("ready", p);
};

connector.onTick = (p) => {
    console.log("tick received", p);
};

// Connect to the peer address
connector.connect(peerAddress);

// todo: timeout

export async function POST(req) {

    /*
    API Endpoints (https://5837-185-84-224-94.ngrok-free.app)
	•	/ – Test route, returns “Hello world”
	•	/getcurrenttick – Returns current tick data
	•	/increment?seed=… – Sends a custom tx (needs your seed)
	•	/buy-qusd?amount=...&receiver=…– Mints and sends qUSD
	•	/get-score – Fetches smart contract score
     */


    return NextResponse.json({ message: 'Hello from the API!' });
}
