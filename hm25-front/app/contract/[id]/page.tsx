"use client"

import type React from "react"
import { loadStripe } from '@stripe/stripe-js'

import { useState } from "react"
import {
    User,
    Home,
    Calendar,
    Clock,
    DollarSign,
    Shield,
    FileText,
    CheckCircle,
    ArrowRight,
    Upload,
    AlertCircle,
    UserPlus,
    CreditCard,
    Info,
    Check,
    X,
} from "lucide-react"

const priceId = 'price_1R5nTvFMSRXIywTHOQjyCrxh'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function TenantContractView() {
    // Pre-filled data from landlord (would come from API/database in a real app)
    const [contractData] = useState({
        landlord: {
            firstName: "Carlos",
            lastName: "García",
        },
        contract: {
            tenantId: "TEN-78945612",
            address: "Calle Gran Vía 31, 4B, Madrid",
            contractDate: "2025-04-01",
            gracePeriod: 10,
            rentAmount: "1200",
        },
    })

    // Tenant KYC form state
    const [formData, setFormData] = useState({
        documentType: "dni",
        documentId: "",
        kycVerified: false,
        contractAccepted: false,
    })

    // Form validation state
    const [errors, setErrors] = useState<Record<string, string>>({})

    // KYC verification state
    const [kycStatus, setKycStatus] = useState<"idle" | "pending" | "verified" | "failed">("idle")

    // Handle input changes for KYC fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear errors when field is filled
        if (errors[name] && value) {
            const newErrors = { ...errors }
            delete newErrors[name]
            setErrors(newErrors)
        }
    }

    // Handle KYC verification
    const handleKycVerification = () => {
        // Validate document ID first
        if (!formData.documentId) {
            setErrors({ ...errors, documentId: "Document ID is required for verification" })
            return
        }

        setKycStatus("pending")

        // Simulate API call for KYC verification
        setTimeout(() => {
            setKycStatus("verified")
            setFormData({
                ...formData,
                kycVerified: true,
            })

            // Clear any document errors
            const newErrors = { ...errors }
            delete newErrors.documentId
            delete newErrors.documentType
            setErrors(newErrors)
        }, 2000)
    }

    // Handle contract acceptance
    const handleAcceptContract = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form
        const newErrors: Record<string, string> = {}

        if (!formData.documentId) newErrors.documentId = "Document ID is required"
        if (!formData.kycVerified) newErrors.kyc = "Identity verification is required"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Accept contract
        setFormData({
            ...formData,
            contractAccepted: true,
        })

        // Submit form data
        //alert("Contract accepted successfully! In a production environment, this would be registered on the blockchain.")
    }

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date)
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ priceId })
        })
        const session = await response.json()
        if (stripe) {
            await stripe.redirectToCheckout({ sessionId: session.id })
        } else {
            console.error('Stripe.js no se ha cargado correctamente.')
        }
    }

    return (
        <div className="min-h-screen relative text-white overflow-hidden">
            {/* Background with blockchain-inspired elements */}
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
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Review Rental Contract</h1>
                                <p className="text-gray-400 mt-1">Review and sign your blockchain-secured rental agreement</p>
                            </div>
                            <div className="mt-2 md:mt-0 px-3 py-1 border border-gray-700 rounded-full flex items-center gap-1 text-sm bg-gray-900/50 backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                <span>Pending Signature</span>
                            </div>
                        </div>

                        {/* Contract Status Banner */}
                        <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-400" />
                            <p className="text-sm text-blue-100">
                                This contract has been created by{" "}
                                <span className="font-semibold">
                  {contractData.landlord.firstName} {contractData.landlord.lastName}
                </span>{" "}
                                and is waiting for your review and signature.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleAcceptContract} className="space-y-6">
                            {/* Landlord Information Section */}
                            <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-400" />
                                    Landlord Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* First Name - Read Only */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">First Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={contractData.landlord.firstName}
                                                disabled
                                                className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                            />
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>

                                    {/* Last Name - Read Only */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">Last Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={contractData.landlord.lastName}
                                                disabled
                                                className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                            />
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contract Details Section */}
                            <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-400" />
                                    Contract Details
                                </h2>

                                <div className="space-y-4">
                                    {/* Tenant ID - Read Only */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">Your Tenant ID</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={contractData.contract.tenantId}
                                                disabled
                                                className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                            />
                                            <UserPlus className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>

                                    {/* Property Address - Read Only */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">Property Address</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={contractData.contract.address}
                                                disabled
                                                className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                            />
                                            <Home className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Contract Date - Read Only */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Contract Date</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formatDate(contractData.contract.contractDate)}
                                                    disabled
                                                    className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                                />
                                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                        </div>

                                        {/* Grace Period - Read Only */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Grace Period (days)</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={contractData.contract.gracePeriod}
                                                    disabled
                                                    className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                                />
                                                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                        </div>

                                        {/* Rent Amount - Read Only */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Monthly Rent (€)</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={contractData.contract.rentAmount}
                                                    disabled
                                                    className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-2.5 pl-10 text-white opacity-80 cursor-not-allowed"
                                                />
                                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Identity Verification Section - Interactive */}
                            <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-400" />
                                    Identity Verification (KYC)
                                </h2>

                                <div className="space-y-4">
                                    <p className="text-gray-400 text-sm">
                                        We need to verify your identity before you can sign the contract. This process is quick and secure.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {/* Document Type - Interactive */}
                                        <div className="space-y-2">
                                            <label htmlFor="documentType" className="block text-sm font-medium text-gray-400">
                                                Document Type
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="documentType"
                                                    name="documentType"
                                                    value={formData.documentType}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-800/70 border ${errors.documentType ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm appearance-none`}
                                                >
                                                    <option value="dni">DNI/NIE</option>
                                                    <option value="passport">Passport</option>
                                                    <option value="driverLicense">Driver's License</option>
                                                    <option value="other">Other ID</option>
                                                </select>
                                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {errors.documentType && <p className="text-red-500 text-xs mt-1">{errors.documentType}</p>}
                                        </div>

                                        {/* Document ID - Interactive */}
                                        <div className="space-y-2">
                                            <label htmlFor="documentId" className="block text-sm font-medium text-gray-400">
                                                Document ID
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="documentId"
                                                    name="documentId"
                                                    value={formData.documentId}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-800/70 border ${errors.documentId ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                    placeholder="Enter your document number"
                                                />
                                                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                            {errors.documentId && <p className="text-red-500 text-xs mt-1">{errors.documentId}</p>}
                                        </div>
                                    </div>

                                    <div
                                        className={`border ${formData.kycVerified ? "border-green-500 bg-green-900/20" : "border-gray-700"} rounded-lg p-4`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {kycStatus === "verified" ? (
                                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                                ) : kycStatus === "pending" ? (
                                                    <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                                                ) : (
                                                    <Upload className="h-6 w-6 text-blue-400" />
                                                )}
                                                <div>
                                                    <h3 className="font-medium">
                                                        {kycStatus === "verified"
                                                            ? "Identity Verified"
                                                            : kycStatus === "pending"
                                                                ? "Verifying Identity..."
                                                                : "Verify Your Identity"}
                                                    </h3>
                                                    <p className="text-xs text-gray-400">
                                                        {kycStatus === "verified"
                                                            ? "Your identity has been successfully verified"
                                                            : kycStatus === "pending"
                                                                ? "Please wait while we verify your identity"
                                                                : "Click the button to start the verification process"}
                                                    </p>
                                                </div>
                                            </div>

                                            {kycStatus !== "verified" && kycStatus !== "pending" && (
                                                <button
                                                    type="button"
                                                    onClick={handleKycVerification}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Start Verification
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {errors.kyc && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            <p>{errors.kyc}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Disclaimer Section */}
                            <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Service Fee:</span> In addition to the monthly rent of{" "}
                                            <span className="text-white font-medium">€{contractData.contract.rentAmount}</span>, a service fee
                                            of <span className="text-blue-400 font-medium">€10</span> will be charged by Trust Lease platform.
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            By signing this contract, you agree to the terms and conditions of Trust Lease. The contract will
                                            be securely stored on the blockchain, providing immutable proof of agreement between parties.
                                            Trust Lease charges a €10 monthly service fee for contract management, dispute resolution
                                            services, and blockchain verification. This fee is separate from and in addition to the monthly
                                            rent amount specified above. All personal data is processed in accordance with applicable privacy
                                            laws and our Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Reject Button */}
                                <button
                                    type="button"
                                    className="py-4 px-6 flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-all duration-200 border border-gray-700"
                                >
                                    <X className="h-5 w-5 text-red-400" />
                                    <span>Reject Contract</span>
                                </button>

                                {/* Accept Button */}
                                <button
                                    type="submit"
                                    disabled={!formData.kycVerified}
                                    onClick={handleCheckout}
                                    className={`py-4 px-6 flex items-center justify-center gap-3 rounded-xl text-white font-medium transition-all duration-200 shadow-lg ${
                                        formData.kycVerified
                                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/20 group"
                                            : "bg-gray-700 cursor-not-allowed opacity-70"
                                    }`}
                                >
                                    <Check className={`h-5 w-5 ${formData.kycVerified ? "group-hover:animate-pulse" : ""}`} />
                                    <span>Sign & Accept Contract</span>
                                    {formData.kycVerified && (
                                        <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

