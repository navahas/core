"use client"

import type React from "react"

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
} from "lucide-react"
import Link from "next/link";

export default function LandlordContractForm() {
    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        contractDate: "",
        gracePeriod: 7, // Minimum 7 days
        rentAmount: "",
        tenantId: "",
        documentType: "dni",
        documentId: "",
        kycVerified: false,
    })

    // Form validation state
    const [errors, setErrors] = useState<Record<string, string>>({})

    // KYC verification state
    const [kycStatus, setKycStatus] = useState<"idle" | "pending" | "verified" | "failed">("idle")

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        // Special validation for grace period
        if (name === "gracePeriod") {
            const numValue = Number.parseInt(value)
            if (numValue < 7) {
                setErrors({ ...errors, gracePeriod: "Grace period must be at least 7 days" })
            } else {
                const newErrors = { ...errors }
                delete newErrors.gracePeriod
                setErrors(newErrors)
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        })
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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form
        const newErrors: Record<string, string> = {}

        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.address) newErrors.address = "Property address is required"
        if (!formData.contractDate) newErrors.contractDate = "Contract date is required"
        if (!formData.rentAmount) newErrors.rentAmount = "Rent amount is required"
        if (formData.gracePeriod < 7) newErrors.gracePeriod = "Grace period must be at least 7 days"
        if (!formData.tenantId) newErrors.tenantId = "Tenant ID is required"
        if (!formData.documentId) newErrors.documentId = "Document ID is required"
        if (!formData.kycVerified) newErrors.kyc = "Identity verification is required"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Submit form data
        alert(
            "Contract data submitted successfully! In a production environment, this would be registered on the blockchain.",
        )
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
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Smart Rental Contract</h1>
                                <p className="text-gray-400 mt-1">Register a new blockchain-secured rental agreement</p>
                            </div>
                            <div className="mt-2 md:mt-0 px-3 py-1 border border-gray-700 rounded-full flex items-center gap-1 text-sm bg-gray-900/50 backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                <span>Blockchain Secured</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Landlord Information Section */}
                            <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-400" />
                                    Landlord Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-400">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/70 border ${errors.firstName ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                placeholder="Enter your first name"
                                            />
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>

                                    {/* Last Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-400">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/70 border ${errors.lastName ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                placeholder="Enter your last name"
                                            />
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
                                    {/* Tenant ID */}
                                    <div className="space-y-2">
                                        <label htmlFor="tenantId" className="block text-sm font-medium text-gray-400">
                                            Tenant ID
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="tenantId"
                                                name="tenantId"
                                                value={formData.tenantId}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/70 border ${errors.tenantId ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                placeholder="Enter tenant's unique ID"
                                            />
                                            <UserPlus className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                        {errors.tenantId && <p className="text-red-500 text-xs mt-1">{errors.tenantId}</p>}
                                    </div>

                                    {/* Property Address */}
                                    <div className="space-y-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-400">
                                            Property Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-800/70 border ${errors.address ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                placeholder="Enter the property address"
                                            />
                                            <Home className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        </div>
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Contract Date */}
                                        <div className="space-y-2">
                                            <label htmlFor="contractDate" className="block text-sm font-medium text-gray-400">
                                                Contract Date
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    id="contractDate"
                                                    name="contractDate"
                                                    value={formData.contractDate}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-800/70 border ${errors.contractDate ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                />
                                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                            {errors.contractDate && <p className="text-red-500 text-xs mt-1">{errors.contractDate}</p>}
                                        </div>

                                        {/* Grace Period */}
                                        <div className="space-y-2">
                                            <label htmlFor="gracePeriod" className="block text-sm font-medium text-gray-400">
                                                Grace Period (days)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="gracePeriod"
                                                    name="gracePeriod"
                                                    min="7"
                                                    value={formData.gracePeriod}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-800/70 border ${errors.gracePeriod ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                    placeholder="Minimum 7 days"
                                                />
                                                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                            {errors.gracePeriod && <p className="text-red-500 text-xs mt-1">{errors.gracePeriod}</p>}
                                        </div>

                                        {/* Rent Amount */}
                                        <div className="space-y-2">
                                            <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-400">
                                                Monthly Rent (€)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="rentAmount"
                                                    name="rentAmount"
                                                    value={formData.rentAmount}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-800/70 border ${errors.rentAmount ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none backdrop-blur-sm`}
                                                    placeholder="Enter monthly rent"
                                                />
                                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            </div>
                                            {errors.rentAmount && <p className="text-red-500 text-xs mt-1">{errors.rentAmount}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Identity Verification Section */}
                            <div className="border border-gray-800 rounded-xl shadow-lg bg-gray-900/70 backdrop-blur-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-400" />
                                    Identity Verification (KYC)
                                </h2>

                                <div className="space-y-4">
                                    <p className="text-gray-400 text-sm">
                                        We need to verify your identity to ensure the security and validity of the contract. This process is
                                        quick and secure.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {/* Document Type */}
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

                                        {/* Document ID */}
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
                                            <span className="font-medium">Service Fee:</span> In addition to the monthly rent, a service fee
                                            of <span className="text-blue-400 font-medium">€10</span> will be charged by Trust Lease platform.
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            By registering this contract, you agree to the terms and conditions of Trust Lease. The contract
                                            will be securely stored on the blockchain, providing immutable proof of agreement between parties.
                                            Trust Lease charges a €10 monthly service fee for contract management, dispute resolution
                                            services, and blockchain verification. This fee is separate from and in addition to the monthly
                                            rent amount specified above. All personal data is processed in accordance with applicable privacy
                                            laws and our Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Link href="/contract/35256305632">
                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/20 group"
                                >
                                    <FileText className="h-5 w-5 group-hover:animate-pulse" />
                                    <span>Register Blockchain Contract</span>
                                    <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

