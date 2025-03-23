
import { NextResponse } from 'next/server';


const QUBICIP = "https://c95a-185-84-224-94.ngrok-free.app"

export async function GET(req) {


    const smartcontractResponse = await fetch(QUBICIP + "/get-score", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const smartcontract = await smartcontractResponse.json()


    return NextResponse.json(smartcontract);
}
