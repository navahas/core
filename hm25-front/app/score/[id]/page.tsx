"use client"

import { useEffect, useState } from "react"
import { CalendarDays, ArrowUpRight, Database, Shield, Activity, Download, FileText } from "lucide-react"
import { useParams } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const QUBICIP = "https://c95a-185-84-224-94.ngrok-free.app"

export default function BlockchainScoreDashboard() {
    const params = useParams()
    const supabase = useSupabaseClient()
    // Example data - replace with real data
    const [userData, setUserData] = useState({
        name: "Marcos Laina",
        score: 9.2,
        transactions: 137,
        lastTransaction: "2025-03-22T23:30:00",
        country: "Spain",
    })
    const userId = params.id as string

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const smartcontractResponse = await fetch("/api/score", {
                    method: "GET"
                })
                const smartcontract = await smartcontractResponse.json()

                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", userId)
                    .single()

                if (error) {
                    console.error("Error fetching user data:", error)
                    return
                }



                console.log("smartcontract", smartcontract)
                setUserData({
                    name: data.name || "",
                    score: smartcontract.score || 0,
                    transactions: smartcontract.transactions || 0,
                    lastTransaction: smartcontract.last_transaction || "2025-03-22T23:30:00",
                    country: data.country || "Spain",
                })
            } catch (error) {
                console.error("Error unexpected:", error)
            }
        }

        if (userId) {
            fetchUserData()
        }
    }, [])

    // Función para determinar el gradiente del score
    const getScoreColor = (score: number) => {
        if (score >= 8) return "from-emerald-500 to-green-500"
        if (score >= 6) return "from-amber-500 to-yellow-500"
        return "from-red-500 to-rose-500"
    }

    // Función para determinar el color del Security Level basado en el score
    const getSecurityLevelColor = (score: number) => {
        if (score >= 8) return "text-green-500"
        if (score >= 6) return "text-amber-500"
        return "text-red-500"
    }

    // Formatear la fecha
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    // Función para descargar el certificado
    const handleDownloadCertificate = () => {
        alert(
            "Certificate download initiated. In a production environment, this would generate a blockchain-verified trust certificate."
        )
    }

    return (
        <div className="min-h-screen relative text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/20"></div>
                {/* Blockchain grid pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `
              linear-gradient(to right, #ffffff10 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff10 1px, transparent 1px)
            `,
                            backgroundSize: "40px 40px",
                        }}
                    ></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Qubic Trust Score</h1>
                                <p className="text-gray-400 mt-1">Decentralized activity analysis</p>
                            </div>
                            <div className="mt-2 md:mt-0 px-3 py-1 border border-gray-700 rounded-full flex items-center gap-1 text-sm bg-gray-900/50 backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                <span>Live Data</span>
                            </div>
                        </div>

                        {/* Main card with score */}
                        <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                {/* Score */}
                                <div className="flex-shrink-0">
                                    <div
                                        className={`relative rounded-full h-40 w-40 flex items-center justify-center bg-gradient-to-r ${getScoreColor(
                                            userData.score
                                        )}`}
                                    >
                                        <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
                                            <span className="text-5xl font-bold">{userData.score.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* User information */}
                                <div className="flex-grow space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                                        <p>{userData.country}</p>
                                        <div className="mt-1 flex items-center text-sm text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        Trust score based on blockchain activity
                      </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Total Transactions */}
                                        <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                                            <div className="text-sm text-gray-400">Total Transactions Validated</div>
                                            <div className="mt-1 flex items-center">
                                                <span className="text-2xl font-semibold text-white">{userData.transactions}</span>
                                                <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                                            </div>
                                        </div>

                                        {/* Last Ledger Entry */}
                                        <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                                            <div className="text-sm text-gray-400">Last Ledger Entry</div>
                                            <div className="mt-1 flex items-center">
                                                <CalendarDays className="h-4 w-4 text-gray-400 mr-1" />
                                                <span className="text-white">{formatDate(userData.lastTransaction)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional info cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Security Level */}
                            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-md p-4">
                                <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Security Level
                                </div>
                                <div className={`mt-2 text-xl font-semibold ${getSecurityLevelColor(userData.score)}`}>
                                    {userData.score >= 8 ? "High" : userData.score >= 6 ? "Medium" : "Low"}
                                </div>
                            </div>

                            {/* Current Renting */}
                            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-md p-4">
                                <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Database className="h-4 w-4" />
                                    Current Renting
                                </div>
                                <div className="mt-2 text-xl font-semibold text-white">Madrid, Arganzuela</div>
                            </div>

                            {/* Network Trend */}
                            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-md p-4">
                                <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    Network Trend
                                </div>
                                <div className={`mt-2 text-xl font-semibold ${userData.score < 5 ? "text-red-500" : "text-green-500"}`}>
                                    {userData.score < 5 ? "Negative" : "Positive"}
                                </div>
                            </div>
                        </div>

                        {/* Certificate Download Button */}
                        <button
                            onClick={handleDownloadCertificate}
                            className="w-full py-4 px-6 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-custom to-purple-custom rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/20 group"
                        >
                            <FileText className="h-5 w-5 group-hover:animate-pulse" />
                            <span>Download Blockchain Verified Certificate</span>
                            <Download className="h-5 w-5 ml-1" />
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            <p className="text-gray-500">by</p>
                            <img src="/vottun.png" alt="Vottun Logo" className="w-40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
