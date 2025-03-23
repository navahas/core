const express = require("express");
const { exec, spawn } = require("child_process");

const app = express();

const NODE_IP = "185.84.224.94";
const NODE_PORT = "31841";
const CONTRACT_ADDRESS = "MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWLWD";

app.get('/', (req, res) => {
    res.json("Hello world");
});

app.get('/get-score', async (req, res) => {
    try {
        // Call the external API
        const response = await fetch('http://185.84.224.94/v1/querySmartContract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contractIndex: 12,
                inputType: 1,
                inputSize: 0,
                requestData: ""
            })
        });

        const data = await response.json();

        const base64Data = data.responseData;
        const buffer = Buffer.from(base64Data, 'base64');
        const score = Number(buffer.readBigUInt64LE(0));

        res.json({ score });
    } catch (error) {
        console.error('Error fetching score:', error);
        res.status(500).json({ error: 'Failed to fetch score' });
    }
});

app.get('/getcurrenttick', (req, res) => {
    const cmd = `qubic-cli -nodeip ${NODE_IP} -nodeport ${NODE_PORT} -getcurrenttick`;

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: "Command execution failed", details: error.message });
        }

        const lines = stdout.trim().split('\n');
        const data = {};
        for (const line of lines) {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value !== undefined) {
                const formattedKey = key
                    .replace(/ /g, '')
                    .replace(/^NumberOf/, '')
                    .replace(/^Initial/, 'initial')
                    .replace(/^Tick$/, 'tick')
                    .replace(/^Epoch$/, 'epoch')
                    .replace(/^AlignedVotes$/, 'alignedVotes')
                    .replace(/^MisalignedVotes$/, 'misalignedVotes');

                data[formattedKey.charAt(0).toLowerCase() + formattedKey.slice(1)] = isNaN(value) ? value : parseInt(value);
            }
        }

        res.json(data);
    });
});

app.get('/increment', (req, res) => {
    const { seed } = req.query;
    if (!seed) {
        return res.status(400).json({ error: "Missing required query param: seed" });
    }

    // Make sure these are defined or provide fallback values
    const nodeIp = NODE_IP || "185.84.224.94";
    const nodePort = NODE_PORT || "31841";
    const contractAddress = CONTRACT_ADDRESS || "MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWLWD";

    // Construct the command as a single string
    const command = `qubic-cli -nodeip ${nodeIp} -nodeport ${nodePort} -seed ${seed} -sendcustomtransaction ${contractAddress} 1 0 0 ""`;

    console.log(`Executing: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error: "Command failed",
                code: error.code,
                details: stderr || error.message
            });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.json({ output: "KO" });
        }

        console.log(`stdout: ${stdout}`);
        return res.json({ output: "OK" });
    });
});

const ASSET_NAME = "QUSD";
const ASSET_TICKER = "USD";
const DECIMALS = "6";
const SEED = "fwqatwliqyszxivzgtyyfllymopjimkyoreolgyflsnfpcytkhagqii";

app.get("/buy-qusd", async (req, res) => {
    const { amount, receiver } = req.query;

    if (!amount || !receiver) {
        return res.status(400).json({ error: "Missing 'amount' or 'receiver' query param" });
    }

    const mintArgs = [
        "-nodeip", NODE_IP,
        "-nodeport", NODE_PORT,
        "-seed", SEED,
        "-qxissueasset", ASSET_NAME, amount, ASSET_TICKER, DECIMALS
    ];

    const mint = spawn("qubic-cli", mintArgs);

    let mintOut = "", mintErr = "";

    mint.stdout.on("data", (data) => mintOut += data.toString());
    mint.stderr.on("data", (data) => mintErr += data.toString());

    mint.on("close", async (code) => {
        if (code !== 0 || mintErr) {
            return res.status(500).json({
                error: "Minting failed",
                code,
                stderr: mintErr.trim()
            });
        }

        console.log("Mint successful, waiting 30 seconds...");

        // Wait 30 seconds
        await new Promise(resolve => setTimeout(resolve, 30000));

        const SENDER_ADDRESS = "UXUFAQMCXZPZBCZVXVDCVLBPSZWAMLZHMAVYMYZBWGZJJKIQPDYBFUFAEPHM";
        // Step 2: Transfer qUSD
        const transferArgs = [
            "-nodeip", NODE_IP,
            "-nodeport", NODE_PORT,
            "-seed", SEED,
            "-qxtransferasset",
            ASSET_NAME,
            SENDER_ADDRESS,
            receiver,
            amount
        ];

        const transfer = spawn("qubic-cli", transferArgs);

        let transferOut = "", transferErr = "";

        transfer.stdout.on("data", (data) => transferOut += data.toString());
        transfer.stderr.on("data", (data) => transferErr += data.toString());

        transfer.on("close", (tCode) => {
            if (tCode !== 0 || transferErr) {
                return res.status(500).json({
                    error: "Transfer failed",
                    code: tCode,
                    stderr: transferErr.trim()
                });
            }

            res.json({
                status: "success",
                mintOutput: mintOut.trim(),
                transferOutput: transferOut.trim()
            });
        });
    });
});

app.listen(5555, () => {
    console.log("Server is running on port 5555");
});

