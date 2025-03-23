'use client'
import Link from 'next/link'
import { ArrowRight, CircuitBoard, Cpu, Database, Globe, Lock, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Login from '@/components/Login'

export default function Home() {
  const handleBalance = async () => {
    const response = await fetch('/api/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        {/* HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-2 items-center text-xl font-bold">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-black" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
              <span className="text-lg">Trust Leas</span>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-4">
                <Link
                    href="#features"
                    className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  App Purpose
                </Link>
                <Link
                    href="#how-it-works"
                    className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Journey
                </Link>
                <Link
                    href="#benefits"
                    className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Why Qubic
                </Link>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
                >
                  Get Started
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <section
              id="trust-lease"
              className="w-full py-12 border-b border-white/10"
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <img
                    src="/hero.jpg"
                    alt="hero"
                    className="mt-4 mx-auto rounded-lg max-w-full h-auto max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]"
                />
                <div className="flex flex-col justify-center space-y-6">
                  <h1 className="text-5xl font-bold tracking-tighter">
                    Trust Lease
                  </h1>
                  <p className="text-zinc-400 md:text-xl">
                    A next-generation leasing platform that combines blockchain security,
                    transparent scoring, and easy deposit management—so both landlords and
                    tenants can feel confident about every rental agreement.
                  </p>
                  <div className="flex items-center justify-center">
                    <Login/>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* 2) SECOND SECTION: THE POWER OF QUBIC & VOTTUN */}
          <section
              id="qubic-vottun"
              className="w-full py-20 border-b border-white/10"
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Left column: Logos & Explanation */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    {/* Row for logos */}
                    <div className="flex items-center gap-8 mb-6">
                      {/* Replace these src paths with your actual logo files */}
                      <img
                          src="/qubic.png"
                          alt="Qubic Logo"
                          className="h-20 w-auto"
                      />
                      <img
                          src="/vottun.png"
                          alt="Vottun Logo"
                          className="h-20 w-auto mt-[-30px]"
                      />
                    </div>

                    <h2 className="mt-20 text-3xl font-bold tracking-tighter">
                      The Power of Qubic & Vottun
                    </h2>
                    <p className="text-zinc-400 md:text-xl">
                      Tackle global challenges through technological innovation. By combining
                      Qubic’s quorum-based computing platform with Vottun’s expertise in data
                      traceability, we create scalable and secure solutions that address issues
                      such as data fraud, supply chain inefficiencies, and the need for transparent
                      certification processes.
                    </p>

                    {/* Example button (or remove if not needed) */}
                    <Button
                        className="border border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
                        onClick={handleBalance}
                    >
                      Balance Cuenta
                    </Button>
                  </div>
                </div>

                {/* Network visualization */}
                <div className=" flex justify-center">
                  <div className="relative h-[400px] w-[400px]">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 blur-3xl"
                    />
                    {/* Central node */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-24 w-24 rounded-full bg-zinc-900 flex items-center justify-center">
                        <CircuitBoard className="h-12 w-12 text-white"/>
                      </div>
                    </div>
                    {/* Circular orbit */}
                    <div
                        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                    />
                    {/* Orbit icons */}
                    {[0, 90, 180, 270].map((angle, i) => {
                      const icons = [
                        <Lock key="lock" className="h-5 w-5"/>,
                        <Cpu key="cpu" className="h-5 w-5"/>,
                        <Database key="database" className="h-5 w-5"/>,
                        <Globe key="globe" className="h-5 w-5"/>
                      ]
                      const icon = icons[i]
                      const rad = (angle * Math.PI) / 180
                      const x = Math.cos(rad) * 150
                      const y = Math.sin(rad) * 150

                      return (
                          <div
                              key={angle}
                              className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                              style={{
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                              }}
                          >
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              {icon}
                            </div>
                          </div>
                      )
                    })}
                  </div>
                </div>


              </div>

            </div>
          </section>

          {/* SECTION 2: "APP PURPOSE & INSPIRATION" */}
          <section id="features" className="w-full py-20 border-b border-white/10">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
                    App Purpose & Inspiration
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl pt-6">
                    A Simple & Accessible Rental Solution
                  </h2>
                  <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Providing an easy-to-use platform for rental agreements and a trusted scoring
                    system for tenants—empowering transparency and security.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-3">
                <div
                    className="flex flex-col items-center space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                  >
                    <CircuitBoard className="h-8 w-8 text-white"/>
                  </div>
                  <h3 className="text-xl font-bold">Ease of Use</h3>
                  <p className="text-center text-zinc-400">
                    A straightforward platform for creating and managing rental agreements,
                    accessible to landlords and tenants alike.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                  >
                    <Cpu className="h-8 w-8 text-white"/>
                  </div>
                  <h3 className="text-xl font-bold">Trusted Scoring</h3>
                  <p className="text-center text-zinc-400">
                    A transparent tenant scoring system (fianza) that helps both parties
                    assess credibility and trustworthiness.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                  >
                    <Zap className="h-8 w-8 text-white"/>
                  </div>
                  <h3 className="text-xl font-bold">Tokenization of Rooms</h3>
                  <p className="text-center text-zinc-400">
                    Secure rental agreements through tokenization of individual rooms,
                    streamlining deposits and ownership.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: "CUSTOMER JOURNEY" */}
          <section
              id="how-it-works"
              className="w-full py-20 border-b border-white/10 bg-[#131313]"
          >
            <div className="container mx-auto px-4">
              {/* Flex contenedor para dos columnas en pantallas grandes */}
              <div className="flex flex-col lg:flex-row items-start gap-12">
                {/* COLUMNA IZQUIERDA */}
                <div className="flex-1">
                  {/* Encabezado centrado */}
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <div className="inline-block rounded-lg bg-zinc-900 px-3 py-1 text-sm text-zinc-100">
                        Customer Journey
                      </div>
                      <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl pt-6">
                        From Rental Confirmation to Secure Deposit
                      </h2>
                      <p className="max-w-[900px] mx-auto text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Follow the steps that guide landlords and tenants through a seamless rental
                        experience backed by blockchain.
                      </p>
                    </div>
                  </div>

                  {/* Contenedor de pasos, alineados a la izquierda */}
                  <div className="mx-auto max-w-3xl space-y-8 py-12 text-left">
                    {/* Paso 1 */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                         bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-bold text-white"
                      >
                        1
                      </div>
                      <div
                          className="border-l-2 border-dashed border-zinc-800 pl-8
                         md:border-l-0 md:border-t-2 md:pl-0 md:pt-8"
                      >
                        <h3 className="text-xl font-bold">Rental Confirmation</h3>
                        <p className="text-zinc-400">
                          The journey begins once the Landlord and Tenant confirm a rental. The Tenant
                          receives an NFT representing the “TrueLease” smart deposit, and the Landlord
                          secures the deposit for the duration.
                        </p>
                      </div>
                    </div>

                    {/* Paso 2 */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                         bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-bold text-white"
                      >
                        2
                      </div>
                      <div
                          className="border-l-2 border-dashed border-zinc-800 pl-8
                         md:border-l-0 md:border-t-2 md:pl-0 md:pt-8"
                      >
                        <h3 className="text-xl font-bold">Deposit & Payment</h3>
                        <p className="text-zinc-400">
                          “TrusKees” (the system) handles deposit transfers to the Landlord—either partially
                          or in full. Tenant can reclaim the deposit upon contract completion. Stripe
                          payment integration ensures a smooth, automated flow.
                        </p>
                      </div>
                    </div>

                    {/* Paso 3 */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                         bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-bold text-white"
                      >
                        3
                      </div>
                      <div
                          className="border-l-2 border-dashed border-zinc-800 pl-8
                         md:border-l-0 md:border-t-2 md:pl-0 md:pt-8"
                      >
                        <h3 className="text-xl font-bold">Tenant Scoring & Visibility</h3>
                        <p className="text-zinc-400">
                          Tenants can view transactions and invite others. The built-in tenant scoring
                          system helps landlords evaluate new tenants, reducing risk and promoting trust.
                        </p>
                      </div>
                    </div>

                    {/* Paso 4 */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                         bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-bold text-white"
                      >
                        4
                      </div>
                      <div
                          className="border-l-2 border-dashed border-zinc-800 pl-8
                         md:border-l-0 md:border-t-2 md:pl-0 md:pt-8"
                      >
                        <h3 className="text-xl font-bold">Insurance & Contract Completion</h3>
                        <p className="text-zinc-400">
                          Optionally add insurance for extra coverage on the deposit or property. Upon
                          contract completion, the deposit is released back to the tenant, closing the loop
                          securely.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA: Imagen */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                      src="/deparment.jpg"
                      alt="hero"
                      className="rounded-lg max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>


          {/* SECTION 4: "WHY QUBIC IS THE BEST FIT & WHY IT IS DIFFERENTIAL" */}
          <section id="benefits" className="w-full py-20 border-b border-white/10 flex">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
                    Why Qubic?
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl pt-6">
                    Best Fit & Key Differentiators
                  </h2>
                  <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Discover how Qubic’s unique features make it ideal for secure, scalable
                    rental agreements.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Native Time Management</h3>
                  <p className="text-center text-zinc-400">
                    Qubic uses epochs (time cycles) to maintain ephemeral randomization,
                    ensuring fairness and security in contract execution.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">High Performance & Scalability</h3>
                  <p className="text-center text-zinc-400">
                    Qubic’s Proof of Useful Work architecture (with AI integration) processes
                    massive volumes of transactions per second.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Built-in Oracles & Feeless Transactions</h3>
                  <p className="text-center text-zinc-400">
                    Oracles connect real-world data to smart contracts, enabling instant,
                    cost-effective (feeless) operations.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Security & Trust in Code</h3>
                  <p className="text-center text-zinc-400">
                    Governed updates and consensus-driven changes ensure that the platform
                    maintains reliability without compromising on trust.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* SECTION 5: "BENEFITS VS. A TRADITIONAL WEB2" (reusing the Architecture section layout) */}
          <section id="architecture" className="w-full py-12 md:py-24 lg:py-32 border-b border-white/10">
          <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
                    Comparison
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl pt-6">
                    Benefits vs. a Traditional Web2
                  </h2>
                  <p className="max-w-[900px] text-zinc-400 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    See how decentralized solutions outperform conventional approaches in key areas.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Transparency & Immutability</h3>
                  <p className="text-center text-zinc-400">
                    Every transaction is recorded on a tamper-proof ledger,
                    eliminating hidden edits or unauthorized changes.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Decentralized Reputation</h3>
                  <p className="text-center text-zinc-400">
                    Tenant scores and user data are verifiable and resistant to manipulation,
                    promoting fairness.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Less Fraud & More Trust</h3>
                  <p className="text-center text-zinc-400">
                    Cryptographic security and distributed consensus reduce fraud
                    while boosting confidence in transactions.
                  </p>
                </div>
                <div
                    className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="text-xl font-bold">Secure Payments & Automation</h3>
                  <p className="text-center text-zinc-400">
                    Automatic escrows, compliance automation, and faster settlements
                    save time and operational overhead.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CALL TO ACTION */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black to-zinc-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                    Start Your Digital Transformation Today
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                    Join the forward-thinking organizations already leveraging secure, transparent
                    rental agreements with blockchain technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-white text-black hover:bg-zinc-200" size="lg">
                    Request a Demo
                  </Button>
                  <Button
                      size="lg"
                      variant="outline"
                      className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/10 py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-zinc-400 md:text-left">
              © 2025 Nexus. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <Link href="#" className="underline underline-offset-4 hover:text-white">
                Terms
              </Link>
              <Link href="#" className="underline underline-offset-4 hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="underline underline-offset-4 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
  )
}
