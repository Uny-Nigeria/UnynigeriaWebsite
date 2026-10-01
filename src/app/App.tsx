import { useEffect, useRef, useState } from "react"
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  CreditCard,
  GraduationCap,
  Heart,
  House,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Ticket,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react"
import QRCode from "qrcode"
import { supabase } from "../lib/supabase"

const campuses = [
  {
    name: "FUNAAB",
    city: "Abeokuta",
    full: "Federal University of Agriculture, Abeokuta",
    gate: "FUNAAB Gate",
  },
  {
    name: "UNILAG",
    city: "Akoka",
    full: "University of Lagos",
    gate: "Akoka Gate",
  },
  {
    name: "UI",
    city: "Ibadan",
    full: "University of Ibadan",
    gate: "UI Main Gate",
  },
  {
    name: "OAU",
    city: "Ile-Ife",
    full: "Obafemi Awolowo University",
    gate: "OAU Gate",
  },
  {
    name: "UNN",
    city: "Nsukka",
    full: "University of Nigeria, Nsukka",
    gate: "UNN Main Gate",
  },
  {
    name: "FUTO",
    city: "Owerri",
    full: "Federal University of Technology, Owerri",
    gate: "FUTO Gate",
  },
]
const imagePath = `${import.meta.env.BASE_URL}images/`
const apartment = `${imagePath}student-apartment.jpg`
const building = `${imagePath}campus-lodge.jpg`
const concert = `${imagePath}campus-concert.jpg`
const buttonClass =
  "inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-[13px] font-semibold text-primary-foreground transition hover:bg-[#333] active:scale-[0.97]"
const labelClass =
  "font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
type Modal = "download" | "campuses" | "ambassador" | "stays" | "events" | "pay" | "trade" | "info" | null

function BrandMark({
  light = false,
  className = "h-8 w-8",
}: {
  light?: boolean
  className?: string
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={`${imagePath}uny-logo.jpg`}
        alt=""
        className={`absolute top-1/2 left-1/2 h-[160%] w-[160%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain ${
          light ? "mix-blend-screen" : "invert mix-blend-multiply"
        }`}
      />
    </span>
  )
}

function BrandLogo({
  light = false,
  small = false,
}: {
  light?: boolean
  small?: boolean
}) {
  return (
    <span role="img" aria-label="Uny" className="inline-flex items-center">
      <BrandMark light={light} className={small ? "h-7 w-7" : "h-10 w-10"} />
    </span>
  )
}

function PlayMark() {
  return (
    <img
      src={`${imagePath}google-play.svg`}
      alt=""
      aria-hidden="true"
      className="h-6 w-6"
    />
  )
}

function Barcode({ white = false }: { white?: boolean }) {
  return (
    <div aria-hidden="true" className="flex h-7 min-w-0 flex-1 items-stretch gap-px">
      {Array.from({ length: 49 }, (_, index) => (
        <span
          key={index}
          className={`${
            index % 4 === 0
              ? "flex-[3]"
              : index % 3 === 0
                ? "flex-1"
                : "flex-[2]"
          } ${white ? "bg-white" : "bg-black"}`}
        />
      ))}
    </div>
  )
}

function StoreButton({
  store,
  onClick,
}: {
  store: "apple" | "google"
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex min-w-[160px] items-center gap-3 rounded-xl border border-white/25 bg-white/5 px-4 py-3 text-left text-white transition hover:bg-white/15 active:scale-[0.98]"
    >
      {store === "apple" ? (
        <img
          src={`${imagePath}apple.svg`}
          alt=""
          aria-hidden="true"
          className="h-7 w-7"
        />
      ) : (
        <PlayMark />
      )}
      <span>
        <span className="block text-[9px] text-white/70">
          {store === "apple" ? "Download on the" : "GET IT ON"}
        </span>
        <span className="text-[17px] font-semibold">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </button>
  )
}

function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-7">
      <h3 className="text-[15px] font-semibold">{title}</h3>
      <div className="mt-2 space-y-3 text-[12px] leading-[1.75] text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

function PolicyDocument({ policy }: { policy: "terms" | "privacy" }) {
  const isTerms = policy === "terms"

  return (
    <div className="pb-2">
      <p className={`${labelClass} mt-7 text-muted-foreground`}>UNY TECHNOLOGIES LIMITED</p>
      <h2 id="dialog-title" className="mt-3 pr-8 text-[28px] leading-tight font-bold tracking-[-0.03em]">
        {isTerms ? "Terms of Service" : "Privacy Policy"}
      </h2>
      <div className="mt-4 space-y-1 border-y border-border py-3 text-[10px] text-muted-foreground">
        <p>Last Updated: October 1, 2026</p>
        <p>Effective Date: October 1, 2026</p>
        {isTerms ? <p>Jurisdiction: Federal Republic of Nigeria</p> : <><p>Compliance Standard: Nigeria Data Protection Act (NDPA) 2023 / Nigeria Data Protection Regulation (NDPR)</p><p>Supervisory Authority: Nigeria Data Protection Commission (NDPC)</p></>}
      </div>
      {isTerms ? <TermsContent /> : <PrivacyContent />}
    </div>
  )
}

function TermsContent() {
  return (
    <>
      <PolicySection title="1. Introduction & Acceptance of Terms"><p>Welcome to Uny (the "Platform", "App", or "Service"), operated by Uny Technologies Limited ("Uny", "we", "us", or "our"), a company duly incorporated under the laws of the Federal Republic of Nigeria (RC Number pending/assigned).</p><p>By downloading, accessing, browsing, registering for, or using the Uny mobile application, web portal, or any related services, you ("User", "Student", "Organizer", "Vendor", or "You") agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms in their entirety, you must immediately cease using and uninstall the application.</p></PolicySection>
      <PolicySection title="2. Eligibility & Registration"><p>To use Uny, you must:</p><ol className="list-decimal space-y-1 pl-5"><li>Be at least 16 years of age (or the minimum legal age for tertiary education in Nigeria).</li><li>Be enrolled in or affiliated with a recognized Nigerian tertiary institution, or be an authorized merchant operating within a campus ecosystem.</li><li>Possess the legal capacity to enter into a binding contract under Nigerian law.</li><li>Not be barred or suspended from utilizing financial or software services under Nigerian law or applicable international sanctions.</li></ol><p>You must provide accurate, current, and verifiable onboarding information and protect your credentials, password, 4-digit Security PIN, biometric passkeys, and device. Activity initiated using verified credentials is deemed authorized by you. Notify support@unynigeria.xyz immediately if you suspect unauthorized access, device theft, or account compromise.</p></PolicySection>
      <PolicySection title="3. Uny Pay & Campus Wallet Services"><p>The Uny Wallet is a stored-value campus financial account operated in technical partnership with CBN-licensed commercial banks and Payment Service Providers, including Wema Bank Plc, Providus Bank Plc, and Quidax Technologies Limited. Uny is a financial technology platform, not a commercial bank or deposit money institution. Funds are held in pooled or dedicated trust accounts managed by licensed Banking Partners.</p><p>Wallet balances are denominated strictly in Nigerian Naira (₦). Any foreign currency or dollar indicators are informational reference estimates only and do not represent a foreign currency deposit.</p><p>Users may receive a dedicated Virtual NUBAN Account and fund it by NIP transfer from a licensed Nigerian banking application. Deposits credit after verified partner webhooks; Uny may delay or hold deposits flagged for AML, fraudulent source-of-funds, or anomalous velocity.</p><p>Transfers to student payment tags such as user@uny are final and irreversible once authenticated by PIN or biometric authorization. Confirm the recipient tag, display name, and department before authorizing; Uny is not liable for an incorrect tag entered by you.</p><p>Withdrawals may be made to verified Nigerian banks, microfinance banks, or NIBSS-registered mobile money operators. Withdrawals are subject to KYC-tier limits, applicable NIBSS fees, and verification of the source of funds.</p><p>Tier 1 limits are ₦50,000 per transaction, ₦100,000 daily, and ₦300,000 maximum balance. Tier 2 limits are ₦200,000 per transaction and ₦500,000 daily after BVN/NIN verification. Tier 3 is for merchants and organizers with full verification and custom commercial limits.</p></PolicySection>
      <PolicySection title="4. Campus Events & Digital Passes"><p>Digital passes are encrypted, dynamic QR codes tied to your verified account. Passes are non-transferable unless the organizer enables official in-app gifting. Screenshotting, duplicating, or scalping passes is prohibited and may void the pass without refund.</p><p>Pass sales are final and non-refundable, except where an event is canceled in its entirety without a rescheduled date. Confirmed cancellation refunds are credited to the Uny wallet within 5–7 business days. Uny facilitates ticketing and is not responsible for event quality, venue safety, personal property loss, or artist non-appearance.</p></PolicySection>
      <PolicySection title="5. Stays, Lodges & Rent Escrow"><p>Uny provides a curated directory of off-campus student accommodation and lodges. Inspection bookings allow students to inspect properties before long-term commitments.</p><p>Rent payments must use the Uny Rent Escrow Rail. Funds are released to the verified caretaker or landlord after physical inspection and key handover when the student taps Confirm Move-In, or when the 48-hour inspection dispute window lapses. A student must file a dispute within 48 hours for significant departures from advertised specifications; escrow remains frozen pending physical arbitration by the Campus Safety Team.</p></PolicySection>
      <PolicySection title="6. Prohibited Conduct & Acceptable Use"><p>You must not use the Platform for financial crimes, fraud or impersonation, black-market or illicit goods, reverse engineering, scraping, API exploitation, automated ticket or wallet manipulation, harassment, extortion, or defamation.</p></PolicySection>
      <PolicySection title="7. Fees, Charges & Taxes"><p>P2P student transfers cost ₦0.00. Inbound bank transfers are free or subject to a disclosed partner fee. Outbound cash-out uses standard NIP/NIBSS fees disclosed before authorization. Merchants and organizers agree to commission deductions shown during onboarding.</p></PolicySection>
      <PolicySection title="8. Intellectual Property"><p>All Uny software, trademarks, logos, UI designs, code, domain names, and brand assets are the exclusive property of Uny Technologies Limited. Users receive a limited, revocable, non-exclusive, non-transferable license for authorized personal use.</p></PolicySection>
      <PolicySection title="9. Disclaimers & Limitation of Liability"><p>Uny is provided on an "AS IS" and "AS AVAILABLE" basis. We target 99.9% uptime but do not warrant uninterrupted, error-free service or immunity from telecommunications or banking downtime.</p><p>To the maximum extent permitted by Nigerian law, Uny, its directors, employees, and partners are not liable for indirect, incidental, special, punitive, or consequential damages; loss of profits, data, or academic standing; or third-party actions. Aggregate liability is limited to the lesser of ₦50,000 or the fees paid to Uny in the preceding six months.</p></PolicySection>
      <PolicySection title="10. Suspension, Termination & Account Freezing"><p>Uny may suspend, restrict, terminate, or freeze associated wallet funds without prior notice for a Terms breach, suspicious transaction velocity, suspected money mule activity, unauthorized access attempts, or an order from a competent Nigerian court, CBN, EFCC, or Nigerian Police Force.</p></PolicySection>
      <PolicySection title="11. Dispute Resolution & Governing Law"><p>These Terms are governed by the substantive laws of the Federal Republic of Nigeria. Parties must first attempt good-faith amicable settlement by contacting support@unynigeria.xyz within 30 days of notification. Unresolved disputes will be finally resolved by arbitration under Nigeria's Arbitration and Mediation Act 2023, seated in Lagos and conducted in English.</p></PolicySection>
      <PolicySection title="12. Contact & Support"><p>Website: unynigeria.xyz</p><p>Email: support@unynigeria.xyz</p><p>In-App: Profile → Help & Support</p><p>Address: Uny Technologies Limited, Lagos / Ogun State, Nigeria.</p></PolicySection>
    </>
  )
}

function PrivacyContent() {
  return (
    <>
      <PolicySection title="1. Overview & Scope"><p>Uny Technologies Limited ("Uny", "we", "us", or "our") respects the privacy of students, merchants, event organizers, and platform users. This Privacy Policy explains how we collect, process, store, protect, and share personal data when you use the Uny mobile application, websites, APIs, and associated services across Nigerian campuses.</p></PolicySection>
      <PolicySection title="2. Data Controller & Contact Details"><p>Uny Technologies Limited is the Data Controller. Website: unynigeria.xyz. Registered Office: Lagos / Abeokuta, Nigeria. Data Protection and General Inquiries: support@unynigeria.xyz.</p></PolicySection>
      <PolicySection title="3. Information We Collect"><p><strong>Account and profile data:</strong> Full legal name, username or payment tag, email, telephone number, campus, faculty, department, level, and avatar.</p><p><strong>Identity and KYC data:</strong> NIN, BVN, student ID, admission or matriculation evidence, and merchant or organizer business, endorsement, and lodge documentation.</p><p><strong>Biometric and security data:</strong> Facial selfie and liveness images processed by Smile ID, encrypted password hashes, a 4-digit Security PIN, and device-bound passkey tokens. Device biometric data does not leave the device Secure Enclave.</p><p><strong>Automatically collected data:</strong> Device model, operating system, UUID, IP address, network operator, push token, transaction and ledger metadata, bank destination, approximate campus location, and precise GPS coordinates where you grant permission.</p></PolicySection>
      <PolicySection title="4. Legal Basis for Processing (NDPA Section 25)"><ol className="list-decimal space-y-1 pl-5"><li><strong>Performance of a contract:</strong> Account creation, wallet management, transfers, event passes, and rent escrow.</li><li><strong>Legal and regulatory obligations:</strong> AML, CFT, KYC, CBN directives, and NFIU reporting.</li><li><strong>Legitimate interests:</strong> Fraud detection, risk scoring, device security, maintenance, and abuse prevention.</li><li><strong>Consent:</strong> Optional geolocation, marketing notifications, and promotional partner deals, which you may withdraw in App Settings.</li></ol></PolicySection>
      <PolicySection title="5. How We Use Your Information"><p>We use data to provision virtual NUBAN accounts; authenticate transactions; generate cryptographically signed, rotating QR codes; protect lodge inspections and rent escrow; prevent fraud, account takeover, SIM-swap attacks, and money laundering; and send transactional alerts, receipts, event reminders, and critical security notices.</p></PolicySection>
      <PolicySection title="6. Data Sharing & Third-Party Disclosures"><p>Uny does not sell, lease, or monetize personal data to advertisers. We share required data only with trusted service partners: CBN-licensed banking and liquidity partners such as Wema Bank Plc, Providus Bank Plc, and Quidax Technologies Limited; Smile ID for identity and liveness verification; secure cloud and database providers such as Supabase or AWS; and law enforcement or regulators where compelled by valid legal process, court order, or statutory directive.</p></PolicySection>
      <PolicySection title="7. Data Security Measures"><p>We use TLS 1.3 in transit, AES-256-GCM for sensitive database columns, PostgreSQL Row-Level Security for tenant isolation, device-only biometric processing, and salted PIN hashes using secure key derivation functions such as Argon2id or PBKDF2.</p></PolicySection>
      <PolicySection title="8. Data Retention & Storage Duration"><p>Active-account data is retained while your account remains active. Financial, ledger, and KYC records are retained for at least five years after account closure where required by Nigerian banking and AML/CFT laws. Inspection photos, chat media, and support attachments are archived or purged after the relevant event or dispute is resolved.</p></PolicySection>
      <PolicySection title="9. Your Legal Rights Under the NDPA"><p>You may request access, rectification, erasure subject to statutory retention, restriction of processing, and data portability in CSV or JSON. You may also lodge a complaint with the Nigeria Data Protection Commission (NDPC). To exercise these rights, contact support@unynigeria.xyz.</p></PolicySection>
      <PolicySection title="10. Children & Minors"><p>Uny is intended for people enrolled in higher education or at least 16 years of age. We do not knowingly collect or solicit personal data from children under 16 without parental or guardian consent.</p></PolicySection>
      <PolicySection title="11. Changes to This Privacy Policy"><p>We may update this policy to reflect legal, regulatory, or platform changes. We will notify you through an in-app banner or email and update the Last Updated date.</p></PolicySection>
      <PolicySection title="12. Contact Us"><p>Website: unynigeria.xyz</p><p>Email: support@unynigeria.xyz</p><p>Postal Address: Uny Technologies Limited, Data Privacy Office, Lagos, Nigeria.</p></PolicySection>
    </>
  )
}

function SafetyCharterDocument() {
  return (
    <div className="pb-2">
      <p className={`${labelClass} mt-7 text-muted-foreground`}>UNY TECHNOLOGIES LIMITED</p>
      <h2 id="dialog-title" className="mt-3 pr-8 text-[28px] leading-tight font-bold tracking-[-0.03em]">Student Safety Charter</h2>
      <div className="mt-4 space-y-1 border-y border-border py-3 text-[10px] text-muted-foreground">
        <p>Version: 1.0.0</p>
        <p>Effective Date: October 1, 2026</p>
        <p>Applicability: All Uny Users, Campus Organizers, Accommodation Caretakers & Vendors</p>
        <p>Domain: unynigeria.xyz</p>
      </div>
      <PolicySection title="1. Our Pledge to Nigerian Students">
        <p>At Uny, student safety, dignity, and financial security are non-negotiable. Tertiary institutions in Nigeria present immense opportunities, but students frequently navigate off-campus extortion, fraudulent caretakers, unsafe event venues, and predatory scams.</p>
        <p>The Uny Student Safety Charter is our binding commitment to creating an exploitative-free campus digital ecosystem across all affiliated universities and polytechnics.</p>
      </PolicySection>
      <PolicySection title="2. The Five Pillars of Student Safety">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Zero Extortion & Transparent Rent</li>
          <li>Physical Lodge Inspection Guarantee (48-Hour Hold)</li>
          <li>Vetted Organizers & Stampede-Free Events</li>
          <li>Identity Trust & Verified Campus Badges</li>
          <li>Rapid Dispute Arbitration & Campus Safety Hotline</li>
        </ol>
      </PolicySection>
      <PolicySection title="3. Pillar I: Zero Extortion & Accommodation Security">
        <h4 className="font-semibold text-foreground">3.1 The 48-Hour Rent Escrow Safety Lock</h4>
        <p>No student should ever pay a year's rent to a stranger and arrive to find a locked gate or a dilapidated room.</p>
        <ul className="list-disc space-y-1 pl-5"><li>Every accommodation payment on Uny is held in Rent Escrow.</li><li>Landlords and caretakers cannot touch rent funds until the student physically inspects the room, collects keys, and taps Confirm Move-In, or 48 hours lapse without a reported dispute.</li></ul>
        <h4 className="pt-2 font-semibold text-foreground">3.2 Ban on Bogus Inspection & Agreement Fees</h4>
        <ul className="list-disc space-y-1 pl-5"><li>Uny prohibits exorbitant or recurring form fees and unauthorized inspection markups.</li><li>Listing prices, prepaid electricity meter terms, and water provisions must be stated truthfully in writing on the lodge card.</li></ul>
      </PolicySection>
      <PolicySection title="4. Pillar II: Safe Events & Social Spaces">
        <h4 className="font-semibold text-foreground">4.1 Verified Organizers Only</h4>
        <p>Event creators must be verified through institutional accreditation, Student Union Government endorsement, or NIN KYC via Smile ID. Unregistered or anonymous creators cannot publish paid passes on Uny.</p>
        <h4 className="pt-2 font-semibold text-foreground">4.2 Overcrowding & Stampede Prevention</h4>
        <p>Ticket sales lock automatically when verified venue capacity is reached. Event passes use dynamic, rotating QR codes that scan in under 0.5 seconds to reduce congested bottlenecks.</p>
        <h4 className="pt-2 font-semibold text-foreground">4.3 Women & Vulnerable Student Protection</h4>
        <p>We have zero tolerance for harassment, assault, non-consensual photography, or predatory behavior at any Uny-listed event. Organizers without designated security personnel or emergency first-aid contacts are permanently banned from hosting on Uny.</p>
      </PolicySection>
      <PolicySection title="5. Pillar III: Trusted Identity & Zero Impersonation">
        <h4 className="font-semibold text-foreground">5.1 The Uny Verified Badge</h4>
        <p>Every merchant, caretaker, and promoter displays a standardized trust badge:</p>
        <ul className="list-disc space-y-1 pl-5"><li><strong>Verified Student:</strong> Confirmed institutional email or matriculation data.</li><li><strong>Verified Agent:</strong> Identity vetted against NIMC/BVN databases with physical lodge compound inspection.</li><li><strong>Official Campus Brand:</strong> Verified institutional partner or SUG executive.</li></ul>
        <h4 className="pt-2 font-semibold text-foreground">5.2 Anti-Cultism & Anti-Violence Standard</h4>
        <p>Uny bans individuals, associations, or vendors associated with campus cultism, violent extortion, illegal intimidation, or academic malpractice. Violating accounts are terminated immediately and dossiers may be forwarded to campus security and law enforcement.</p>
      </PolicySection>
      <PolicySection title="6. Pillar IV: Financial Safety & Anti-Scam">
        <ul className="list-disc space-y-1 pl-5"><li><strong>Zero-Fee Peer Transfers:</strong> Campus peer transfers remain free (₦0.00) so students are not gouged on everyday meals, books, or shuttle fares.</li><li><strong>No Direct Wire to Personal Accounts:</strong> We alert students when someone requests payment outside protected Uny escrow rails.</li><li><strong>Anti-Mule Protection:</strong> Automated velocity detection and cooling buffers help protect students targeted by cybercrime syndicates.</li></ul>
      </PolicySection>
      <PolicySection title="7. Pillar V: Dispute Escalation & Safety Hotline">
        <p>If you feel unsafe, face extortion, or discover a fraudulent listing:</p>
        <ol className="list-decimal space-y-1 pl-5"><li><strong>In-App Panic / Report:</strong> Tap the Help (?) button on any screen to open an instant high-priority safety ticket.</li><li><strong>Safety Email:</strong> support@unynigeria.xyz</li><li><strong>Escalation SLA:</strong> Safety and accommodation disputes are reviewed by the Campus Safety Team within 2 to 24 hours.</li></ol>
        <p className="pt-2 font-medium text-foreground">Uny Technologies Limited - Protecting the Student Journey.</p>
      </PolicySection>
    </div>
  )
}

function LodgePartnerDocument() {
  return (
    <div className="pb-2">
      <p className={`${labelClass} mt-7 text-muted-foreground`}>UNY ACCOMMODATION PARTNERS</p>
      <h2 id="dialog-title" className="mt-3 pr-8 text-[28px] leading-tight font-bold tracking-[-0.03em]">List Your Lodge</h2>
      <div className="mt-4 space-y-1 border-y border-border py-3 text-[10px] text-muted-foreground">
        <p>Target Audience: Off-Campus Lodge Caretakers, Private Landlords & Accredited Student Housing Agents</p>
        <p>Platform: Uny Stays Directory</p>
        <p>Portal: unynigeria.xyz/partners/lodge</p>
      </div>
      <PolicySection title="1. Why List Your Lodge on Uny?">
        <p>Uny Stays connects legitimate landlords and accredited caretakers directly with verified students in university towns such as Abeokuta, Ile-Ife, Ibadan, and Akoka.</p>
        <ul className="list-disc space-y-1 pl-5"><li><strong>100% Guaranteed Rent:</strong> Rent is paid and locked in escrow before students receive keys.</li><li><strong>Zero Listing Fees:</strong> Listing your lodge, room availability, and photo tours is free.</li><li><strong>Verified Student Profiles:</strong> Every student tenant is verified with institutional credentials.</li><li><strong>Automated Inspection Scheduling:</strong> Students book physical inspections directly into your available calendar slots.</li></ul>
      </PolicySection>
      <PolicySection title="2. The 4-Step Onboarding Process">
        <ol className="list-decimal space-y-1 pl-5"><li>Create Account</li><li>Submit Caretaker KYC</li><li>Upload Compound Evidence</li><li>Go Live & Receive Bookings</li></ol>
        <h4 className="pt-2 font-semibold text-foreground">Step 1: Create Caretaker Profile</h4>
        <p>Register as an Accommodation Partner and provide your legal name, WhatsApp inspection contact, and lodge or hostel name.</p>
        <h4 className="pt-2 font-semibold text-foreground">Step 2: Identity & Vetting (Smile ID)</h4>
        <p>Submit your NIN or BVN, complete a 5-second facial liveness scan via Smile ID, and upload a caretaker authorization letter or property ownership proof.</p>
        <h4 className="pt-2 font-semibold text-foreground">Step 3: Compound Specifications & Amenities</h4>
        <p>Describe room types, utilities such as borehole water, prepaid meters, fencing, and generator backup, plus clear annual pricing and caution fees with no hidden charges.</p>
        <h4 className="pt-2 font-semibold text-foreground">Step 4: Verification & Publication</h4>
        <p>Our Campus Field Team verifies the compound location. Approved lodges receive the Verified Lodge shield and go live for students searching in that campus zone.</p>
      </PolicySection>
      <PolicySection title="3. How the Escrow Payout Works">
        <ol className="list-decimal space-y-1 pl-5"><li><strong>Student Books & Locks Rent:</strong> Session rent is securely locked in the Uny Rent Escrow Rail.</li><li><strong>Move-In & Key Handover:</strong> You meet the student, hand over keys, and inspect fixtures together.</li><li><strong>Instant Payout Release:</strong> The student taps Confirm Move-In, or 48 hours pass after handover without dispute.</li><li><strong>Direct Bank Deposit:</strong> The full rent balance is sent by NIP to your nominated Nigerian commercial bank account.</li></ol>
      </PolicySection>
      <PolicySection title="4. Partner Standards & Zero-Tolerance Rules">
        <ul className="list-disc space-y-1 pl-5"><li><strong>No Extortion:</strong> Unauthorized cash form fees on inspection day result in permanent delisting.</li><li><strong>Accurate Photos:</strong> Misrepresenting facilities triggers automated tenant refunds.</li><li><strong>Safety First:</strong> Compound gates and security locks must be functional.</li></ul>
      </PolicySection>
      <PolicySection title="5. Get Started">
        <p>Apply online at unynigeria.xyz or open the Uny App and choose Profile → Become a Verified Agent.</p>
      </PolicySection>
    </div>
  )
}

function PartnerDocument({
  kind,
}: {
  kind: "event" | "vendor" | "institutional"
}) {
  const event = kind === "event"
  const vendor = kind === "vendor"

  return (
    <div className="pb-2">
      <p className={`${labelClass} mt-7 text-muted-foreground`}>
        {event
          ? "UNY ORGANIZER PORTAL"
          : vendor
            ? "UNY MERCHANT NETWORK"
            : "INSTITUTIONAL & BRAND COLLABORATIONS"}
      </p>
      <h2 id="dialog-title" className="mt-3 pr-8 text-[28px] leading-tight font-bold tracking-[-0.03em]">
        {event ? "Host an Event" : vendor ? "Become a Verified Vendor" : "Partner with Uny"}
      </h2>
      <div className="mt-4 space-y-1 border-y border-border py-3 text-[10px] text-muted-foreground">
        <p>
          Target Audience: {event
            ? "Campus Promoters, Departmental Executives, SUG Committees & Independent Event Organizers"
            : vendor
              ? "Campus Food Vendors, Cafeteria Stalls, Laundry Providers, Print Hubs, Gadget Technicians & Student Entrepreneurs"
              : "University Administrations, Student Union Governments (SUG), Corporate Brands, Telcos & Fintech Partners"}
        </p>
        <p>Platform: {event ? "Uny Events & Ticketing" : vendor ? "Uny Campus Marketplace & Merchant Pay" : "Uny Institutional Partnership Network"}</p>
        <p>Portal: unynigeria.xyz/partners/{event ? "events" : vendor ? "vendor" : "institutional"}</p>
      </div>
      {event ? <EventPartnerContent /> : vendor ? <VendorPartnerContent /> : <InstitutionalPartnerContent />}
    </div>
  )
}

function EventPartnerContent() {
  return (
    <>
      <PolicySection title="1. The Campus Event Powerhouse">
        <p>Whether you are organizing a 5,000-capacity Freshers Rave, a departmental dinner, an acoustic comedy night, or a tech hackathon, Uny Events provides reliable campus ticketing and discovery infrastructure in Nigeria.</p>
        <ul className="list-disc space-y-1 pl-5"><li><strong>Zero-Drop Gate Entry:</strong> A 0.3-second dynamic QR scanner helps prevent gate congestion, stampedes, and network blackouts.</li><li><strong>Anti-Screenshot & Anti-Scalping:</strong> Rotating TOTP tokens make duplicated ticket screenshots unusable.</li><li><strong>Instant Student Wallet Checkout:</strong> Students buy passes in two taps using Uny Pay or direct bank transfer.</li><li><strong>Next-Day Ticket Settlements:</strong> Receive proceeds in your commercial bank account with a transparent commission breakdown.</li><li><strong>Real-Time Analytics:</strong> Track ticket velocity, tier conversions, and live attendance from your phone.</li></ul>
      </PolicySection>
      <PolicySection title="2. How to Become a Verified Organizer">
        <ol className="list-decimal space-y-1 pl-5"><li>Verification Application</li><li>Campus Endorsement</li><li>Create Event</li><li>Scan & Settle</li></ol>
        <h4 className="pt-2 font-semibold text-foreground">Step 1: Identity & KYC Check</h4><p>Verify your legal name and student or promoter affiliation through Smile ID using NIN or BVN, and provide official social handles and past event portfolios.</p>
        <h4 className="pt-2 font-semibold text-foreground">Step 2: Campus Endorsement</h4><p>On-campus bodies should upload association registration, SUG endorsement, or Dean of Student Affairs approval. Independent promoters should upload valid venue reservation confirmation or a booking slip.</p>
        <h4 className="pt-2 font-semibold text-foreground">Step 3: Event Setup & Ticket Tiers</h4><p>Build an event page with artwork, venue, schedule, and performers. Configure Free RSVP, Early Bird, Standard Regular, VIP, Backstage, or Table packages and set a maximum capacity.</p>
        <h4 className="pt-2 font-semibold text-foreground">Step 4: Gate Check-in App</h4><p>Give the mobile gate scanner to bouncers and ushers. It works offline in airplane mode and gives immediate visual and haptic feedback: green for valid and red for void or already scanned.</p>
      </PolicySection>
      <PolicySection title="3. Fees & Settlement Terms">
        <div className="overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[440px] text-left text-[11px]"><thead className="bg-card text-foreground"><tr><th className="p-3">Event Type</th><th className="p-3">Platform Processing Fee</th><th className="p-3">Settlement Schedule</th></tr></thead><tbody><tr className="border-t border-border"><td className="p-3">Free / Community Events</td><td className="p-3">₦0.00 (100% free)</td><td className="p-3">Instant RSVP pass generation</td></tr><tr className="border-t border-border"><td className="p-3">Paid Campus Events</td><td className="p-3">3.5% + ₦50 per ticket, capped at ₦500</td><td className="p-3">80% event morning / 20% post-event</td></tr></tbody></table></div>
        <p>Official SUGs and registered academic faculties may qualify for custom subsidized non-profit rates.</p>
      </PolicySection>
      <PolicySection title="4. Organizer Obligations & Safety Rules"><ol className="list-decimal space-y-1 pl-5"><li>Provide adequate campus security or private guards appropriate to venue capacity.</li><li>Maintain basic emergency medical supplies and unobstructed emergency exits.</li><li>Do not promote hate speech, violence, or dangerous conduct. Such events will be pulled immediately and tickets refunded in full.</li></ol></PolicySection>
      <PolicySection title="5. Ready to Sell Out Your Next Event?"><p>Submit an event proposal at unynigeria.xyz, email support@unynigeria.xyz, or open the Uny App and choose Profile → Host an Event.</p></PolicySection>
    </>
  )
}

function VendorPartnerContent() {
  return (
    <>
      <PolicySection title="1. Scale Your Campus Business with Uny"><p>Uny connects food, print, laundry, gadget, apparel, and other campus businesses with verified students across Nigerian university towns.</p><ul className="list-disc space-y-1 pl-5"><li><strong>Verified Trust Badge:</strong> The Uny Verified Merchant badge proves accreditation and safety.</li><li><strong>Countertop Scan-to-Pay QR:</strong> Students scan and pay at your stall or store counter.</li><li><strong>Zero Fake-Alert Risk:</strong> Atomic instant notifications confirm transactions.</li><li><strong>Campus Directory Listing:</strong> Appear in Explore under Food, Shops, and Services.</li><li><strong>Instant Bank Cash Out:</strong> Move daily sales to a Nigerian bank account at zero or minimal cost.</li></ul></PolicySection>
      <PolicySection title="2. Eligible Vendor Categories"><ol className="list-decimal space-y-1 pl-5"><li><strong>Food & Refreshments:</strong> Cafeterias, shawarma and grills, snack bars, smoothies, and meal delivery.</li><li><strong>Academic & Print Services:</strong> Project printing, photocopying, binding, stationery, and design.</li><li><strong>Apparel & Personal Care:</strong> Thrift shops, laundry, dry cleaning, and hair styling.</li><li><strong>Tech & Gadget Support:</strong> Phone and laptop repairs, screens, gadgets, and accessories.</li><li><strong>Logistics & Campus Delivery:</strong> Accredited shuttle riders and dispatch runners.</li></ol></PolicySection>
      <PolicySection title="3. How the Verification Process Works"><ol className="list-decimal space-y-1 pl-5"><li>Apply in-app or on the web</li><li>Biometric KYC via Smile ID</li><li>Submit store proof</li><li>Receive the QR merchant kit</li></ol><h4 className="pt-2 font-semibold text-foreground">Step 1: Merchant Profile Setup</h4><p>Provide your trade or brand name, campus zone, WhatsApp Business line, and store catalogue.</p><h4 className="pt-2 font-semibold text-foreground">Step 2: KYC & Liveness Check</h4><p>Enter NIN or BVN, complete a 5-second Smile ID facial liveness scan, and optionally provide a CAC RC or BN number.</p><h4 className="pt-2 font-semibold text-foreground">Step 3: Hygiene & Quality Standard Declaration</h4><p>Food vendors confirm hygiene standards. All vendors agree to fair pricing, transparent return policies, and zero extortion.</p><h4 className="pt-2 font-semibold text-foreground">Step 4: Approval & Merchant Kit</h4><p>Approvals are processed within 12 to 24 hours. Verified vendors receive a downloadable Uny Scan-to-Pay counter plaque and digital store profile.</p></PolicySection>
      <PolicySection title="4. Merchant Pricing & Transaction Fees"><ul className="list-disc space-y-1 pl-5"><li>Account registration: ₦0.00 (100% free).</li><li>In-store QR Scan-to-Pay: 0% processing fee for student micro-transactions.</li><li>Online Marketplace Order Fee: 1.5% capped at ₦100 per order.</li></ul></PolicySection>
      <PolicySection title="5. Vendor Code of Conduct"><p>Verified merchants must honor confirmed orders promptly, never charge hidden payment or card-transfer surcharges, and respect student privacy by keeping contact numbers confidential.</p></PolicySection>
      <PolicySection title="6. Ready to Join the Uny Merchant Network?"><p>Register at unynigeria.xyz, open the Uny App and choose Profile → Become a Verified Vendor, or email support@unynigeria.xyz.</p></PolicySection>
    </>
  )
}

function InstitutionalPartnerContent() {
  return (
    <>
      <PolicySection title="1. The Gen-Z Campus Super-Highway"><p>Uny connects universities, student governments, and forward-thinking corporate brands with verified Nigerian students through one trusted ecosystem.</p><ul className="list-disc space-y-1 pl-5"><li><strong>100% Verified Campus Penetration:</strong> Reach students segmented by institution, faculty, department, and academic level.</li><li><strong>Trusted Financial Plumbing:</strong> Use digital ticketing, bursary and grant distributions, and cashless campus marketplaces.</li><li><strong>Deep Cultural Affinity:</strong> Engage students across freshers orientations, campus events, and convocation week.</li></ul></PolicySection>
      <PolicySection title="2. Partnership Tracks"><h4 className="font-semibold text-foreground">Track A: SUGs & Faculties</h4><ul className="list-disc space-y-1 pl-5"><li>Official digital noticeboard for certified memos and safety updates.</li><li>Subsidized ticketing with 0% commission on union dues, festivals, and faculty dinners.</li><li>Campus welfare and escrow collaboration for hostel safety audits and disputes.</li></ul><h4 className="pt-2 font-semibold text-foreground">Track B: Corporate Brands & FMCG</h4><ul className="list-disc space-y-1 pl-5"><li>Targeted campus activations with guaranteed attendee check-ins.</li><li>Exclusive student discounts for data, meals, and tech accessories.</li><li>Real-time, verified feedback from student cohorts.</li></ul><h4 className="pt-2 font-semibold text-foreground">Track C: Telcos, Banks & PSPs</h4><ul className="list-disc space-y-1 pl-5"><li>Zero-rated data bundles for academic and wallet functionality.</li><li>Co-branded savings clubs, youth debit cards, and scholarship rails.</li><li>Liquidity and treasury rails for virtual accounts and NIP payouts.</li></ul></PolicySection>
      <PolicySection title="3. Impact by the Numbers"><ul className="list-disc space-y-1 pl-5"><li><strong>Campuses in Active Launch:</strong> FUNAAB, UNILAG, UI, and OAU.</li><li><strong>Core User Demographic:</strong> Tertiary education students aged 16–25.</li><li><strong>Average Daily Engagement:</strong> 4.2 sessions per active student across events, wallet, and campus navigation.</li></ul></PolicySection>
      <PolicySection title="4. Initiate a Partnership"><p>Build the future of African campus life with Uny. Contact support@unynigeria.xyz, visit unynigeria.xyz, or write to Uny Technologies Limited, Lagos / Abeokuta, Nigeria.</p></PolicySection>
    </>
  )
}

function AntiFraudRailDocument() {
  return (
    <div className="pb-2">
      <p className={`${labelClass} mt-7 text-muted-foreground`}>UNY SECURITY & RISK ENGINEERING</p>
      <h2 id="dialog-title" className="mt-3 pr-8 text-[28px] leading-tight font-bold tracking-[-0.03em]">Anti-Fraud & Risk Management Rail</h2>
      <div className="mt-4 space-y-1 border-y border-border py-3 text-[10px] text-muted-foreground">
        <p>Version: AFR-V1 / 1.0.0</p>
        <p>Classification: Internal Technical Architecture & Compliance Specification</p>
        <p>Owner: Uny Security & Risk Engineering</p>
        <p>Applicability: Uny Pay, Stays, Events, and Marketplace</p>
      </div>
      <PolicySection title="1. Threat Landscape on Nigerian Campuses">
        <div className="overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[620px] text-left text-[11px]"><thead className="bg-card text-foreground"><tr><th className="p-3">Threat Vector</th><th className="p-3">Modus Operandi</th><th className="p-3">Uny Countermeasure</th></tr></thead><tbody><tr className="border-t border-border"><td className="p-3">Money Mule Accounts</td><td className="p-3">Students are recruited to receive stolen funds through virtual NUBANs.</td><td className="p-3">Pass-through velocity detection, Tier 1 caps, and AML graph analysis.</td></tr><tr className="border-t border-border"><td className="p-3">Fake Hostel Caretaker Scams</td><td className="p-3">Rogue agents collect rent and vanish before move-in.</td><td className="p-3">Mandatory 48-hour escrow, NIN/Smile ID vetting, and move-in sign-off.</td></tr><tr className="border-t border-border"><td className="p-3">Account Takeover</td><td className="p-3">Credential stuffing, SIM swaps, or shared hostel devices compromise accounts.</td><td className="p-3">Device fingerprinting, salted PINs, and biometric challenges on new devices.</td></tr><tr className="border-t border-border"><td className="p-3">Ticket Replay & Scalping</td><td className="p-3">Static QR screenshots are duplicated or passes are mass-bought for resale.</td><td className="p-3">Rotating TOTP QR codes, atomic invalidation, and pass limits.</td></tr><tr className="border-t border-border"><td className="p-3">Reversal & Fake Alerts</td><td className="p-3">Fabricated receipts are presented as proof of payment.</td><td className="p-3">Webhook-first ledger credits only from signed NIP webhooks.</td></tr></tbody></table></div>
      </PolicySection>
      <PolicySection title="2. Multi-Layered Risk Architecture">
        <p>The Anti-Fraud Rail operates across four sequential protection boundaries:</p>
        <ol className="list-decimal space-y-1 pl-5"><li><strong>Ingress & Device Boundary:</strong> Rate limits, TLS, and device fingerprinting.</li><li><strong>Identity & KYC Gateway:</strong> Smile ID, NIN/BVN matching, and customer tiers.</li><li><strong>Real-Time Transaction Risk Engine:</strong> Velocity rules, deterministic controls, and risk models.</li><li><strong>Settlement & Escrow Buffer:</strong> 48-hour rent holds and NIP cooldowns.</li></ol>
      </PolicySection>
      <PolicySection title="3. KYC Tiers & Transaction Limits">
        <ul className="list-disc space-y-1 pl-5"><li><strong>Tier 0 - Guest / Anonymous:</strong> Device install only; browse events and lodges, with no wallet creation.</li><li><strong>Tier 1 - Verified Student:</strong> Institutional .edu.ng email or confirmed student phone and campus selection. Single limit ₦50,000; daily limit ₦100,000; maximum balance ₦300,000.</li><li><strong>Tier 2 - High-Capacity Student / Verified Promoter:</strong> Tier 1 plus BVN or NIN matched through Smile ID and biometric liveness. Single limit ₦200,000; daily limit ₦500,000; maximum balance ₦2,000,000.</li><li><strong>Tier 3 - Verified Merchant / Organizer / Caretaker:</strong> Tier 2 plus SUG or Dean endorsement, verified business registration, or property ownership and caretaker proof. Enterprise limits are customized and paid through NIP commercial rails.</li></ul>
      </PolicySection>
      <PolicySection title="4. Real-Time Velocity Rules & Risk Matrix">
        <p>Every transaction is evaluated against deterministic heuristics before execution.</p>
        <div className="overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[720px] text-left text-[11px]"><thead className="bg-card text-foreground"><tr><th className="p-3">Rule</th><th className="p-3">Threshold</th><th className="p-3">Automated Action</th></tr></thead><tbody><tr className="border-t border-border"><td className="p-3">AFR-R01 Rapid P2P Outflow</td><td className="p-3">More than 5 transfers in 10 minutes</td><td className="p-3">Block, require PIN re-entry, and start a 15-minute cooldown.</td></tr><tr className="border-t border-border"><td className="p-3">AFR-R02 Mule Pass-Through</td><td className="p-3">More than 90% withdrawn within 5 minutes of inbound deposit</td><td className="p-3">Hold outbound NIP transfer for 30 minutes of review.</td></tr><tr className="border-t border-border"><td className="p-3">AFR-R03 New Device Outflow</td><td className="p-3">Withdrawal within 2 hours on an unrecognized device</td><td className="p-3">Require Face ID or Smile ID challenge.</td></tr><tr className="border-t border-border"><td className="p-3">AFR-R04 Failed PIN Brute Force</td><td className="p-3">Three consecutive invalid PIN entries</td><td className="p-3">Lock transactions for one hour and send a security alert.</td></tr><tr className="border-t border-border"><td className="p-3">AFR-R05 Circular P2P Churn</td><td className="p-3">Two or three accounts transfer cyclically within one hour</td><td className="p-3">Flag accounts for AML review and freeze suspect balances.</td></tr><tr className="border-t border-border"><td className="p-3">AFR-R06 Midnight Spike</td><td className="p-3">Outbound transfer above ₦100,000 from 01:00 to 05:00</td><td className="p-3">Require step-up biometric authentication.</td></tr></tbody></table></div>
        <ul className="list-disc space-y-1 pl-5"><li><strong>0-29 Low Risk:</strong> Instant atomic execution.</li><li><strong>30-69 Medium Risk:</strong> PIN or biometric re-verification.</li><li><strong>70-89 High Risk:</strong> 30-minute hold and Risk Queue notification.</li><li><strong>90-100 Critical Risk:</strong> Reject transaction, freeze account, and alert Security Operations.</li></ul>
      </PolicySection>
      <PolicySection title="5. Specialized Domain Safety Rails">
        <h4 className="font-semibold text-foreground">5.1 Stays & Lodges: Rent Escrow Rail</h4><ol className="list-decimal space-y-1 pl-5"><li>Students must not wire rent directly to personal accounts of unverified agents.</li><li>Rent is locked in an immutable escrow sub-ledger until Confirm Move-In, or 48 hours elapse without a dispute.</li><li>Filing a dispute freezes escrow. Campus Safety Officers inspect within 24 hours and confirmed fraud or severe misrepresentation results in a full refund to the Uny wallet.</li></ol>
        <h4 className="pt-3 font-semibold text-foreground">5.2 Events & Ticketing: Dynamic QR & Anti-Scalping</h4><ol className="list-decimal space-y-1 pl-5"><li>QR codes contain time-based rotating HMAC-SHA256 tokens. Screenshots expire within 30-60 seconds.</li><li>Gate scanners atomically set tickets to checked-in. Reuse returns a REPLAY_ATTACK_DETECTED warning.</li><li>Students may purchase a maximum of four tickets per transaction.</li></ol>
      </PolicySection>
      <PolicySection title="6. Banking Partner Webhook Integrity">
        <ol className="list-decimal space-y-1 pl-5"><li>Every webhook must include an x-quidax-signature or bank signature header.</li><li>The raw body is validated with HMAC-SHA512 against the secret webhook key.</li><li>Signatures are compared with crypto.timingSafeEqual and strict buffer-length guards.</li><li>event_id or transaction references are idempotently logged; duplicates receive 200 OK but never re-credit a wallet.</li></ol>
      </PolicySection>
      <PolicySection title="7. Blacklisting & Suspicious Activity Reporting">
        <p>Confirmed fraud or identity theft may add device fingerprints, NIN, BVN, matriculation numbers, NUBANs, and phone numbers to the Global Platform Blacklist.</p>
        <p>Transactions meeting high-risk thresholds, including structuring, repeated rapid drains, or unlicensed FX arbitrage, are compiled into Suspicious Activity Reports and filed with the NFIU and SCUML where required under the Money Laundering (Prevention and Prohibition) Act 2022.</p>
      </PolicySection>
      <PolicySection title="8. Disputes & Appeals Workflow">
        <ol className="list-decimal space-y-1 pl-5"><li>Go to Profile → Security → Account Standing.</li><li>Tap Submit Verification Appeal.</li><li>Upload valid student identity proof and submit a live biometric facial scan through Smile ID.</li><li>Uny Risk Operations reviews and resolves appeals within 24 hours.</li></ol>
      </PolicySection>
    </div>
  )
}

export default function App() {
  const [campusIndex, setCampusIndex] = useState(0)
  const [modal, setModal] = useState<Modal>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [platform, setPlatform] = useState("iOS")
  const [infoTitle, setInfoTitle] = useState("")
  const [qr, setQr] = useState("")
  const closeRef = useRef<HTMLButtonElement>(null)
  const campus = campuses[campusIndex]
  const openModal = (next: Modal) => {
    setSubmitted(false)
    setEmail("")
    setSaveError(false)
    setSearch("")
    setMenuOpen(false)
    setModal(next)
  }
  const showInfo = (title: string) => {
    setInfoTitle(title)
    openModal("info")
  }
  useEffect(() => {
    document.title = "Uny — Your Campus. Your Everything."
    QRCode.toDataURL(
      `${window.location.origin}${window.location.pathname}?download=1`,
      { margin: 1, width: 160, color: { dark: "#111111", light: "#ffffff" } },
    )
      .then(setQr)
      .catch(() => setQr(""))
    if (new URLSearchParams(window.location.search).has("download"))
      setModal("download")
  }, [])
  useEffect(() => {
    if (!modal) return
    const previousFocus = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null)
      if (event.key === "Tab") {
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[role="dialog"] button, [role="dialog"] input, [role="dialog"] a',
          ),
        )
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
      previousFocus?.focus()
    }
  }, [modal])
  const navLinks = [
    ["Stays", "stays"],
    ["Events", "events"],
    ["Uny Pay", "uny-pay"],
    ["Marketplace", "marketplace"],
  ]

  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <a
        href="#main-content"
        className="fixed top-3 left-4 z-[60] -translate-y-24 rounded-full bg-black px-5 py-3 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-4 md:px-10 xl:px-20">
          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Uny home"
              className="flex h-11 w-11 items-center justify-center"
            >
              <BrandLogo />
            </a>
            <button
              onClick={() => openModal("campuses")}
              className="hidden min-h-9 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] sm:flex"
            >
              {campus.name}
              <ChevronDown size={11} />
            </button>
          </div>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {navLinks.map(([name, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex min-h-11 items-center text-[13px] font-medium text-[#545454] transition hover:text-black"
              >
                {name}
              </a>
            ))}
            <button
              onClick={() => openModal("campuses")}
              className="min-h-11 text-[13px] font-medium text-[#545454] hover:text-black"
            >
              Campuses
            </button>
          </nav>
          <div className="flex items-center gap-6">
            <button
              onClick={() => openModal("ambassador")}
              className="hidden min-h-11 text-[12px] font-semibold xl:block"
            >
              Campus Ambassador{" "}
              <ArrowUpRight className="ml-1 inline" size={12} />
            </button>
            <button
              onClick={() => openModal("download")}
              className={`${buttonClass} !px-5 !py-3`}
            >
              Get the App <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="flex flex-col gap-2 border-t border-border bg-white px-6 py-4 lg:hidden"
          >
            {navLinks.map(([name, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center text-sm"
              >
                {name}
              </a>
            ))}
            <button
              onClick={() => openModal("campuses")}
              className="min-h-11 text-left text-sm"
            >
              Campuses
            </button>
            <button
              onClick={() => openModal("ambassador")}
              className="min-h-11 text-left text-sm"
            >
              Campus Ambassador ↗
            </button>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="relative mx-auto grid max-w-[1440px] items-center px-4 pb-12 pt-14 md:px-10 lg:min-h-[660px] lg:grid-cols-[1.05fr_1fr] lg:pb-10 lg:pt-10 xl:px-20">
          <div className="relative z-10 pb-7 lg:pb-4">
            <div
              className={`${labelClass} mb-7 flex items-center gap-2 text-[#656565]`}
            >
              CAMPUS LIFE. RE-ENGINEERED.
            </div>
            <h1 className="max-w-[640px] text-[clamp(2.1rem,10.6vw,2.75rem)] leading-[1.075] font-extrabold tracking-[-0.03em] sm:text-[64px] xl:text-[72px]">
              Your campus.
              <br />
              Your people.
              <br />
              Your everything<span className="text-[#9a9a9a]">.</span>
            </h1>
            <div className="mt-7 flex items-center gap-3">
              <p className="text-[13px] font-semibold">
                The operating system for Nigerian students.
              </p>
            </div>
            <p className="mt-4 max-w-[450px] text-[15px] leading-[1.85] text-muted-foreground">
              Find your next lodge. Be at the next rave. Trade with your
              coursemates. Send money, not fees.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={() => openModal("download")}
                className={`${buttonClass} !px-5 !py-4`}
              >
                <Smartphone size={18} />
                <span>Get the App</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => openModal("campuses")}
                className="group flex min-h-11 items-center gap-2 border-b border-black/20 py-2 text-[13px] font-semibold"
              >
                Explore your campus{" "}
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[12px] text-muted-foreground">
              <ShieldCheck size={15} strokeWidth={1.5} />
              <p>Student-only. Free on iOS & Android.</p>
            </div>
          </div>

          <div
            className="relative mx-auto h-[510px] w-full max-w-[610px] sm:h-[550px] lg:translate-x-4"
            aria-label="Preview of the Uny student app"
          >
            <div className="absolute inset-x-3 top-9 bottom-6 rounded-[50%] bg-[#f4f5f3] sm:inset-x-0" />
            <div className="absolute top-[34px] left-1/2 h-[451px] w-[224px] -translate-x-1/2 rotate-[-5deg] rounded-[38px] border-[5px] border-[#262626] bg-white p-[4px] shadow-[16px_25px_45px_-15px_rgba(0,0,0,0.3)] sm:top-8 sm:h-[484px] sm:w-[240px]">
              <div className="relative h-full overflow-hidden rounded-[29px] bg-[#f8f9f7]">
                <div className="flex items-center justify-between px-5 pt-3 text-[8px] font-bold">
                  <span>9:41</span>
                  <div className="absolute top-2 left-1/2 h-[17px] w-[69px] -translate-x-1/2 rounded-full bg-black" />
                  <span className="flex items-center gap-1">
                    <Wifi size={9} />
                    <span className="h-[5px] w-[12px] rounded-[1px] bg-black" />
                  </span>
                </div>
                <div className="px-3.5 pt-6">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-[8px] text-muted-foreground">
                        Good morning, Tobi ☀
                      </span>
                      <h3 className="text-[15px] font-bold tracking-[-0.04em]">
                        Your campus, connected.
                      </h3>
                    </div>
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full border border-border">
                      <Bell size={11} />
                    </span>
                  </div>
                  <button
                    onClick={() => openModal("campuses")}
                    className="mt-3 flex items-center gap-1.5 rounded-full border border-border bg-white px-2 py-1 text-[7px] font-medium"
                  >
                    <MapPin size={8} />
                    {campus.name}, {campus.city}
                    <ChevronDown size={8} />
                  </button>
                  <button
                    onClick={() => openModal("pay")}
                    className="mt-4 block w-full rounded-xl bg-[#171717] p-3 text-left text-white"
                  >
                    <div className="flex justify-between text-[7px] text-white/60">
                      <span>Uny Pay balance</span>
                      <span className="flex items-center gap-1">
                        <BrandMark light className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="mt-2 text-[25px] font-semibold tracking-[-0.04em]">
                      ₦24,500
                      <span className="text-[16px] text-white/50">.00</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[7px] text-black">
                        <Send size={8} /> Send money
                      </span>
                      <span className="text-[7px]">+ Add money</span>
                    </div>
                  </button>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[
                      { icon: House, text: "Stays", modal: "stays" },
                      { icon: Ticket, text: "Events", modal: "events" },
                      { icon: ShoppingBag, text: "Trade", modal: "trade" },
                      { icon: CreditCard, text: "Uny Pay", modal: "pay" },
                    ].map((item) => (
                      <button
                        key={item.text}
                        onClick={() => openModal(item.modal as Modal)}
                        className="flex flex-col items-center gap-1.5 text-[7px]"
                      >
                        <span className="rounded-xl border border-border bg-white p-2.5">
                          <item.icon size={13} strokeWidth={1.5} />
                        </span>
                        {item.text}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-[9px] font-semibold">
                    <span>Spaces near you</span>
                    <span className="text-[7px] font-normal text-muted-foreground">
                      See all ↗
                    </span>
                  </div>
                  <button
                    onClick={() => openModal("stays")}
                    className="mt-2 w-full overflow-hidden rounded-lg border border-border bg-white text-left"
                  >
                    <div className="relative">
                      <img
                        src={apartment}
                        alt="Light-filled student apartment interior"
                        className="h-[75px] w-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 rounded bg-white/95 px-1.5 py-1 text-[6px]">
                        ✓ VERIFIED
                      </span>
                      <Heart
                        className="absolute top-2 right-2 text-white"
                        size={11}
                      />
                    </div>
                    <div className="p-2">
                      <div className="flex justify-between text-[8px] font-semibold">
                        <span>Camp House</span>
                        <span>
                          ₦180k
                          <span className="font-normal text-muted-foreground">
                            {" "}
                            /yr
                          </span>
                        </span>
                      </div>
                      <p className="mt-1 text-[6px] text-muted-foreground">
                        {campus.gate} · 5 min to campus
                      </p>
                    </div>
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-border bg-white py-2.5">
                  {[House, Search, CreditCard, Users].map((Icon, index) => (
                    <Icon
                      key={index}
                      size={12}
                      className={index ? "text-[#909090]" : "text-black"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => openModal("pay")}
              className="absolute top-1 right-0 w-[151px] rotate-[7deg] bg-white p-4 text-left shadow-[0_10px_32px_-10px_rgba(0,0,0,0.18)] transition hover:rotate-[3deg] sm:top-5 sm:right-1 sm:w-[176px]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[13px] font-black tracking-[-0.08em]">
                  <BrandMark className="h-3.5 w-3.5" />
                </span>
                <Check
                  size={14}
                  className="rounded-full bg-[#e9ede8] p-0.5 text-[#3e6848]"
                />
              </div>
              <p className="mt-4 font-mono text-[7px] tracking-wider text-muted-foreground">
                TRANSFER SUCCESSFUL
              </p>
              <p className="mt-2 text-[24px] font-bold tracking-[-0.03em] sm:text-[27px]">
                ₦4,500<span className="text-sm">.00</span>
              </p>
              <div className="my-3 border-t border-dashed border-border" />
              <div className="space-y-2 font-mono text-[7px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span>Ademola O.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rail fee</span>
                  <span>₦0.00</span>
                </div>
              </div>
              <div className="mt-4">
                <Barcode />
              </div>
              <div className="absolute -bottom-2 inset-x-0 h-3 bg-[linear-gradient(135deg,white_25%,transparent_25%),linear-gradient(225deg,white_25%,transparent_25%)] bg-[size:12px_12px]" />
            </button>
            <button
              onClick={() => openModal("stays")}
              className="absolute top-[254px] left-0 w-[162px] rotate-[-8deg] rounded-xl border border-black/5 bg-white p-2 text-left shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)] transition hover:rotate-[-3deg] sm:top-[258px] sm:left-2 sm:w-[182px]"
            >
              <div className="relative">
                <img
                  src={building}
                  alt="Verified off-campus apartment building"
                  className="h-[88px] w-full rounded-lg object-cover"
                />
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[6px] font-semibold">
                  <BadgeCheck size={9} /> VERIFIED LODGE
                </span>
              </div>
              <div className="px-1 py-2">
                <h3 className="text-[11px] font-bold">Camp House</h3>
                <p className="mt-1 text-[7px] text-muted-foreground">
                  {campus.gate} · Verified landlord
                </p>
                <p className="mt-2 text-[12px] font-bold">
                  ₦180,000
                  <span className="text-[7px] font-normal text-muted-foreground">
                    {" "}
                    / year
                  </span>
                </p>
              </div>
            </button>
            <button
              onClick={() => openModal("events")}
              className="absolute right-0 bottom-7 w-[178px] rotate-[7deg] rounded-xl bg-[#202420] px-4 py-3 text-left text-white shadow-xl transition hover:rotate-[2deg] sm:right-0 sm:bottom-5 sm:w-[205px]"
            >
              <div className="flex items-center justify-between font-mono text-[6px] tracking-widest">
                <span>YOUR NEXT CORE MEMORY</span>
                <ArrowUpRight size={12} />
              </div>
              <p className="mt-3 text-[17px] leading-tight font-bold">
                Fresher Welcome
                <br />
                Rave '26
              </p>
              <p className="mt-2 font-mono text-[7px] text-white/60">
                {campus.name} · MAIN BOWL
              </p>
              <div className="my-3 border-t border-dashed border-white/25" />
              <div className="flex items-end justify-between">
                <Barcode white />
                <span className="ml-2 font-mono text-[6px]">
                  ADMIT
                  <br />
                  ONE
                </span>
              </div>
            </button>
          </div>
        </section>

        <section id="campuses" className="border-y border-border bg-[#fafbf9]">
          <div className="mx-auto grid max-w-[1440px] px-4 md:px-10 lg:grid-cols-[180px_1fr] xl:px-20">
            <div className="flex items-center gap-2 py-4 lg:border-r lg:border-border">
              <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-[#555]">
                LIVE ON YOUR CAMPUS
              </span>
            </div>
            <div className="grid grid-cols-3 gap-y-1 pb-3 sm:grid-cols-6 lg:py-0">
              {campuses.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setCampusIndex(index)}
                  aria-pressed={index === campusIndex}
                  className={`group relative flex flex-col items-center justify-center gap-1 border-b-2 px-2 py-4 transition ${
                    index === campusIndex
                      ? "border-black bg-black/[0.025]"
                      : "border-transparent hover:bg-black/[0.025]"
                  }`}
                >
                  <span className="flex items-center gap-2 text-[12px] font-bold">
                    {item.name}
                    <span
                      className={` ${
                        index === campusIndex ? "bg-[#587253]" : "bg-[#abb3a8]"
                      }`}
                    />
                  </span>
                  <span className="font-mono text-[8px] text-muted-foreground">
                    {item.city}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20 lg:py-24 xl:px-20">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className={`${labelClass} mb-4 text-muted-foreground`}>
                01 / THE CAMPUS TOOLKIT
              </p>
              <h2 className="text-[35px] leading-[1.13] font-bold tracking-[-0.035em] md:text-[44px]">
                Less wahala.
                <br />
                More campus life.
              </h2>
            </div>
            <p className="max-w-[310px] text-[13px] leading-[1.8] text-muted-foreground">
              Four things you do every day.
              <br />
              Finally, in one place that gets you.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-12">
            <article
              id="stays"
              className="group relative overflow-hidden rounded-[20px] bg-[#f3f4f1] md:col-span-7"
            >
              <div className="relative z-10 p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className={`${labelClass} flex items-center gap-2`}>
                    <House size={15} /> STAYS & LODGES
                  </span>
                  <button
                    onClick={() => openModal("stays")}
                    aria-label="Explore stays"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>
                <h3 className="text-[29px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[33px]">
                  Your space.
                  <br />
                  Not an agent's hustle.
                </h3>
                <p className="mt-3 max-w-[310px] text-[14px] leading-[1.75] text-muted-foreground">
                  Verified lodges. Real landlords. Zero agent wahala.
                  <br />
                  Find a place that feels like your own.
                </p>
              </div>
              <div className="relative h-[224px] sm:h-[260px]">
                <img
                  src={apartment}
                  alt="Bright, furnished off-campus lodge with spacious living area"
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_60%] transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
                  {[
                    "Verified landlords",
                    "Walkable to campus",
                    "3D room tours",
                  ].map((text) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-[9px] font-medium backdrop-blur-sm"
                    >
                      <BadgeCheck size={11} />
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            <article
              id="uny-pay"
              className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[20px] bg-[#f2f3f5] p-6 md:col-span-5 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className={`${labelClass} flex items-center gap-2`}>
                  <Zap size={15} /> UNY PAY
                </span>
                <button
                  onClick={() => openModal("pay")}
                  aria-label="Explore Uny Pay"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                >
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <h3 className="text-[29px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[33px]">
                Send money.
                <br />
                Keep every naira.
              </h3>
              <p className="mt-3 max-w-[300px] text-[14px] leading-[1.75] text-muted-foreground">
                Matric number. Tap. Done. Instant transfers
                <br className="hidden sm:block" /> with exactly ₦0.00 in rail
                fees.
              </p>
              <button
                onClick={() => openModal("pay")}
                className="relative mt-8 ml-2 w-[85%] max-w-[330px] rotate-[-7deg] rounded-[15px] bg-[#181818] p-5 text-left text-white shadow-[0_20px_25px_-15px_rgba(0,0,0,0.35)] transition hover:rotate-[-3deg]"
              >
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 font-bold tracking-[-0.06em]">
                    <BrandMark light className="h-5 w-5" />
                  </span>
                  <ScanLine size={19} className="text-white/60" />
                </div>
                <p className="mt-6 font-mono text-[8px] tracking-widest text-white/50">
                  YOUR CAMPUS. YOUR CURRENCY.
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-[28px] font-semibold">₦0.00</span>
                  <span className="text-[8px] text-white/60">
                    Transfer fees.
                    <br />
                    Not a typo.
                  </span>
                </div>
                <div className="mt-5 flex justify-between border-t border-white/15 pt-3 font-mono text-[7px] text-white/60">
                  <span>TOBI ADEYEMI</span>
                  <span>{campus.name} / 2026</span>
                </div>
              </button>
              <div className="absolute right-4 bottom-7 flex rotate-[5deg] items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-sm sm:right-6">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf0ea]">
                  <ArrowDownLeft size={15} />
                </span>
                <span className="text-[9px]">
                  Pocket money received
                  <span className="mt-1 block font-mono text-[8px] text-muted-foreground">
                    + ₦15,000.00 · JUST NOW
                  </span>
                </span>
                <Check size={12} className="ml-3" />
              </div>
            </article>
            <article
              id="events"
              className="relative overflow-hidden rounded-[20px] bg-[#f4f2ef] p-6 md:col-span-7 sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className={`${labelClass} flex items-center gap-2`}>
                  <Ticket size={15} /> CAMPUS EVENTS
                </span>
                <button
                  onClick={() => openModal("events")}
                  aria-label="Explore events"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                >
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <div className="flex flex-col gap-7 sm:flex-row">
                <div className="sm:w-1/2">
                  <h3 className="text-[27px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[31px]">
                    Be there.
                    <br />
                    Not just in the
                    <br className="hidden sm:block" /> group chat.
                  </h3>
                  <p className="mt-4 max-w-[270px] text-[14px] leading-[1.75] text-muted-foreground">
                    Faculty dinners. Big raves. Small hangouts.
                    <br />
                    Your ticket to the moments that matter.
                  </p>
                </div>
                <button
                  onClick={() => openModal("events")}
                  className="mx-auto w-[220px] rotate-[7deg] overflow-hidden rounded-xl bg-white text-left shadow-[0_8px_25px_-12px_rgba(0,0,0,0.25)] transition hover:rotate-[3deg]"
                >
                  <div className="relative h-[98px]">
                    <img
                      src={concert}
                      loading="lazy"
                      alt="Students enjoying a live campus concert"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded bg-white px-2 py-1 font-mono text-[7px]">
                      FRI, OCT 16
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-[12px] font-bold">
                      The Freshers Experience
                    </p>
                    <p className="mt-1 text-[8px] text-muted-foreground">
                      Main Bowl · {campus.name}
                    </p>
                    <div className="my-3 border-t border-dashed border-border" />
                    <div className="flex items-end justify-between">
                      <Barcode />
                      <span className="font-mono text-[7px]">₦2,500</span>
                    </div>
                  </div>
                </button>
              </div>
            </article>
            <article
              id="marketplace"
              className="overflow-hidden rounded-[20px] border border-border bg-[#fafafa] p-6 md:col-span-5 sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className={`${labelClass} flex items-center gap-2`}>
                  <ShoppingBag size={15} /> CAMPUS MARKETPLACE
                </span>
                <button
                  onClick={() => openModal("trade")}
                  aria-label="Explore marketplace"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                >
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <h3 className="text-[27px] leading-[1.15] font-bold tracking-[-0.03em] sm:text-[31px]">
                Your next great find?
                <br />
                Two hostels away.
              </h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-muted-foreground">
                Pre-loved textbooks. Tech upgrades. Midnight food.
                <br />
                Buy and sell with students, not strangers.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  {
                    icon: BookOpen,
                    title: "Engineering Mathematics",
                    detail: "Like new · 2 hostels away",
                    price: "₦3,500",
                  },
                  {
                    icon: Smartphone,
                    title: "iPhone 12 · 128GB",
                    detail: "Verified seller · On campus",
                    price: "₦185,000",
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => openModal("trade")}
                    className="flex w-full items-center gap-3 rounded-xl border border-border bg-white p-2.5 text-left transition hover:border-black/25"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#efefec]">
                      <item.icon size={21} strokeWidth={1.2} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[12px] font-semibold">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">
                        {item.detail}
                      </span>
                    </span>
                    <span className="text-[12px] font-semibold">
                      {item.price}
                    </span>
                  </button>
                ))}
              </div>
            </article>
          </div>
          <div className="mt-7 flex items-center justify-center gap-2 text-center text-[12px] text-muted-foreground">
            <LockKeyhole size={12} />
            <span>
              One verified student identity. Your entire campus unlocked.
            </span>
          </div>
        </section>

        <section className="border-y border-border bg-[#fafbf9]">
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20 xl:px-20">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className={`${labelClass} mb-4 text-muted-foreground`}>
                  02 / FROM DOWNLOAD TO DAY ONE
                </p>
                <h2 className="text-[34px] font-bold tracking-[-0.035em] md:text-[42px]">
                  Three steps. You're in.
                </h2>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
              {[
                {
                  title: "Pick your campus.",
                  body: "FUNAAB or UNILAG? UI or OAU? Choose your institution. Your feed, your people, your world.",
                  icon: GraduationCap,
                },
                {
                  title: "Make it official.",
                  body: "Verify with your student ID or matric number. A real student community. No room for imposters.",
                  icon: BadgeCheck,
                },
                {
                  title: "Do your thing.",
                  body: "Find a lodge. Catch a function. Make a trade. Send some money. Campus life, without the friction.",
                  icon: Zap,
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`relative ${
                    index ? "md:border-l md:border-border md:pl-9" : ""
                  } md:pr-9`}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-[13px] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <item.icon size={24} strokeWidth={1.25} />
                  </div>
                  <h3 className="text-[21px] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[300px] text-[14px] leading-[1.8] text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20 xl:px-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className={`${labelClass} mb-4 text-muted-foreground`}>
                03 / TRUST ISN'T AN EXTRA
              </p>
              <h2 className="text-[34px] leading-[1.17] font-bold tracking-[-0.035em] md:text-[42px]">
                Built by students.
                <br />
                Backed by trust.
              </h2>
              <p className="mt-5 max-w-[340px] text-[14px] leading-[1.8] text-muted-foreground">
                Campus should be your safe space. We've built a few things to
                keep it that way. From your first transfer to your first set of
                keys.
              </p>
              <button
                onClick={() => showInfo("Student Safety Charter")}
                className="mt-7 flex min-h-11 items-center gap-2 border-b border-black/20 pb-2 text-[13px] font-semibold"
              >
                Our student safety promise <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="grid gap-4">
              {[
                {
                  icon: BadgeCheck,
                  title: "Real students. Real identities.",
                  body: "100% verified student profiles. Know who you're dealing with.",
                },
                {
                  icon: ShieldCheck,
                  title: "Your rent is in safe hands.",
                  body: "Housing escrow protection. No keys? No payment released.",
                },
                {
                  icon: MessageCircle,
                  title: "A human when you need one.",
                  body: "Quick dispute resolution from people who know campus life.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-xl border border-border p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card">
                    <item.icon size={22} strokeWidth={1.35} />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 grid grid-cols-2 border-y border-border md:grid-cols-4">
            {[
              ["12+", "FEDERAL & STATE CAMPUSES"],
              ["40,000+", "VERIFIED NIGERIAN STUDENTS"],
              ["₦0.00", "TRANSACTION & TRANSFER FEES"],
              ["1,200+", "OFF-CAMPUS LODGES"],
            ].map(([value, label], index) => (
              <div
                key={value}
                className={`px-3 py-8 text-center ${
                  index % 2 ? "border-l border-border" : ""
                } ${index >= 2 ? "border-t border-border md:border-t-0" : ""} ${
                  index === 2 ? "md:border-l" : ""
                }`}
              >
                <p className="text-[32px] font-semibold tracking-[-0.045em] sm:text-[42px]">
                  {value}
                </p>
                <p className="mt-3 font-mono text-[10px] leading-[1.6] tracking-[0.05em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="download"
          className="mx-auto max-w-[1440px] px-4 pb-14 md:px-10 md:pb-20 xl:px-20"
        >
          <div className="relative overflow-hidden rounded-[20px] bg-[#141614] px-7 py-12 text-white sm:p-12 lg:p-14">
            <div className="absolute -top-32 -right-12 h-[500px] w-[500px] rounded-full border border-white/[0.07]" />
            <div className="absolute -top-20 -right-1 h-[410px] w-[410px] rounded-full border border-white/[0.05]" />
            <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
              <div>
                <p className={`${labelClass} mb-5 text-white/70`}>
                  YOUR CAMPUS. NOW POCKET-SIZED.
                </p>
                <h2 className="text-[36px] leading-[1.1] font-bold tracking-[-0.035em] sm:text-[48px]">
                  Carry your entire campus
                  <br className="hidden sm:block" /> in your pocket.
                </h2>
                <p className="mt-5 text-[14px] leading-relaxed text-white/70">
                  All the things you need. None of the stress you don't.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <StoreButton
                    store="apple"
                    onClick={() => {
                      setPlatform("iOS")
                      openModal("download")
                    }}
                  />
                  <StoreButton
                    store="google"
                    onClick={() => {
                      setPlatform("Android")
                      openModal("download")
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => openModal("download")}
                className="flex flex-col items-center gap-4 self-start lg:mr-8 lg:self-center"
              >
                {qr ? (
                  <img
                    src={qr}
                    alt="Scan to open the Uny download page"
                    className="h-[132px] w-[132px] rounded-xl border-[9px] border-white bg-white"
                  />
                ) : (
                  <ScanLine size={110} />
                )}
                <span className="flex items-center gap-2 font-mono text-[10px] text-white/70">
                  SCAN TO GET UNY <ArrowUpRight size={12} />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 pt-14 md:px-10 xl:px-20">
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <BrandLogo />
              <p className="mt-4 max-w-[260px] text-[13px] leading-[1.8] text-muted-foreground">
                Uny connects Nigerian students with homes, events, everyday
                essentials, and zero-fee payments.
              </p>
              <p className="mt-5 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                <MapPin size={11} /> LAGOS / ABEOKUTA, NIGERIA
              </p>
            </div>
            {[
              {
                title: "FOR STUDENTS",
                links: [
                  ["Explore Lodges", "stays"],
                  ["Buy Tickets", "events"],
                  ["Campus Marketplace", "trade"],
                  ["Become an Ambassador", "ambassador"],
                  ["Uny Pay FAQ", "pay"],
                ],
              },
              {
                title: "FOR PARTNERS",
                links: [
                  ["List your Lodge", "info"],
                  ["Host an Event", "info"],
                  ["Become a Verified Vendor", "info"],
                  ["Partner with Uny", "info"],
                ],
              },
              {
                title: "THE IMPORTANT STUFF",
                links: [
                  ["Terms of Service", "info"],
                  ["Privacy Policy", "info"],
                  ["Student Safety Charter", "info"],
                  ["Anti-Fraud Rail", "info"],
                ],
              },
            ].map((column) => (
              <div key={column.title}>
                <h3 className={`${labelClass} mt-3 text-muted-foreground`}>
                  {column.title}
                </h3>
                <div className="mt-5 flex flex-col items-start gap-1">
                  {column.links.map(([name, target]) => (
                    <button
                      key={name}
                      onClick={() =>
                        target === "info"
                          ? showInfo(name)
                          : openModal(target as Modal)
                      }
                      className="min-h-11 text-left text-[13px] text-[#555] transition hover:text-black hover:underline md:min-h-8"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border py-6 sm:flex-row">
            <p className="text-[11px] text-muted-foreground">
              © 2026 Uny Nigeria Technologies Ltd. All rights reserved.
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              BUILT FOR THE NIGERIAN STUDENT COMMUNITY.{" "}
              <span className="ml-1">🇳🇬</span>
            </p>
          </div>
        </div>
      </footer>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onClick={(event) => event.stopPropagation()}
            className={`relative max-h-[85vh] w-full overflow-y-auto rounded-[20px] bg-white p-7 shadow-2xl sm:p-9 ${
              modal === "info" &&
              (infoTitle === "Terms of Service" ||
                infoTitle === "Privacy Policy" ||
                infoTitle === "Student Safety Charter" ||
                infoTitle === "List your Lodge" ||
                infoTitle === "Host an Event" ||
                infoTitle === "Become a Verified Vendor" ||
                infoTitle === "Partner with Uny" ||
                infoTitle === "Anti-Fraud Rail")
                ? "max-w-[760px]"
                : "max-w-[490px]"
            }`}
          >
            <button
              ref={closeRef}
              onClick={() => setModal(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-card"
            >
              <X size={17} />
            </button>
            <BrandLogo small />
            {modal === "campuses" ? (
              <>
                <p className={`${labelClass} mt-7 text-muted-foreground`}>
                  FIND YOUR PEOPLE
                </p>
                <h2
                  id="dialog-title"
                  className="mt-3 text-[29px] font-bold tracking-[-0.03em]"
                >
                  Which campus is yours?
                </h2>
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-border px-3">
                  <Search size={17} />
                  <input
                    aria-label="Search campuses"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search institution or city"
                    className="w-full bg-transparent py-3 text-sm outline-none"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  {campuses
                    .map((item, index) => ({ item, index }))
                    .filter(({ item }) =>
                      `${item.name} ${item.city} ${item.full}`
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                    )
                    .map(({ item, index }) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          setCampusIndex(index)
                          setModal(null)
                          document
                            .getElementById("campuses")
                            ?.scrollIntoView({ block: "center" })
                        }}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition hover:border-black ${
                          index === campusIndex
                            ? "border-black bg-card"
                            : "border-border"
                        }`}
                      >
                        <span>
                          <span className="text-sm font-semibold">
                            {item.name}
                          </span>
                          <span className="mt-1 block text-[10px] text-muted-foreground">
                            {item.full} · {item.city}
                          </span>
                        </span>
                        {index === campusIndex ? (
                          <Check size={16} />
                        ) : (
                          <ArrowUpRight size={15} />
                        )}
                      </button>
                    ))}
                  {!campuses.some((item) =>
                    `${item.name} ${item.city} ${item.full}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  ) && (
                    <p className="py-5 text-sm text-muted-foreground">
                      No matching campus yet. More institutions are on the way.
                    </p>
                  )}
                </div>
              </>
            ) : modal === "info" &&
              (infoTitle === "Terms of Service" ||
                infoTitle === "Privacy Policy" ||
                infoTitle === "Student Safety Charter" ||
                infoTitle === "List your Lodge" ||
                infoTitle === "Host an Event" ||
                infoTitle === "Become a Verified Vendor" ||
                infoTitle === "Partner with Uny" ||
                infoTitle === "Anti-Fraud Rail") ? (
              infoTitle === "Student Safety Charter" ? (
                <SafetyCharterDocument />
              ) : infoTitle === "List your Lodge" ? (
                <LodgePartnerDocument />
              ) : infoTitle === "Host an Event" ? (
                <PartnerDocument kind="event" />
              ) : infoTitle === "Become a Verified Vendor" ? (
                <PartnerDocument kind="vendor" />
              ) : infoTitle === "Partner with Uny" ? (
                <PartnerDocument kind="institutional" />
              ) : infoTitle === "Anti-Fraud Rail" ? (
                <AntiFraudRailDocument />
              ) : (
                <PolicyDocument
                  policy={infoTitle === "Terms of Service" ? "terms" : "privacy"}
                />
              )
            ) : (
              <>
                <p className={`${labelClass} mt-7 text-muted-foreground`}>
                  {modal === "download"
                    ? "YOUR CAMPUS STARTS HERE"
                    : modal === "ambassador"
                      ? "REP YOUR CAMPUS"
                      : `${campus.name} / CAMPUS LIFE`}
                </p>
                <h2
                  id="dialog-title"
                  className="mt-3 pr-2 text-[30px] leading-tight font-bold tracking-[-0.03em]"
                >
                  {modal === "download"
                    ? "Your campus. One app."
                    : modal === "ambassador"
                      ? "Be the face of Uny."
                      : modal === "stays"
                        ? "Find your next home."
                        : modal === "events"
                          ? "Your next core memory."
                          : modal === "pay"
                            ? "Every naira stays yours."
                            : modal === "trade"
                              ? "Buy local. Campus local."
                              : infoTitle}
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">
                  {modal === "download"
                    ? "The public app-store links aren't available in this preview. Save your interest below to get ready for Uny on your campus."
                    : modal === "ambassador"
                      ? "Bring your campus together. Help students discover Uny, host community activations, and build something that matters."
                      : modal === "stays"
                        ? `Explore verified housing around ${campus.gate}. Connect directly with landlords, tour rooms, and keep rent protected until you collect your keys.`
                        : modal === "events"
                          ? `Raves, faculty dinners and departmental games in ${campus.name}. Get a digital pass and breeze through the gate.`
                          : modal === "pay"
                            ? "Send and receive instantly using a verified matric number. Your transfer receipt shows the amount, the recipient, and exactly ₦0.00 in fees."
                            : modal === "trade"
                              ? "Textbooks, tech and food from verified students in your own campus community. Keep the conversation and payment in one place."
                              : "This page is a website preview. Official policies, partner onboarding, and social channels will be provided by Uny before launch. No legal terms or account services are represented as live here."}
                </p>
                {modal === "pay" && (
                  <div className="mt-5 flex justify-between rounded-xl border border-dashed border-border bg-card p-4 font-mono text-xs">
                    <span>TRANSFER FEES</span>
                    <span className="font-semibold">₦0.00</span>
                  </div>
                )}
                {modal !== "info" && (
                  <>
                    {modal === "download" && (
                      <div className="mt-6 flex gap-2">
                        {["iOS", "Android"].map((item) => (
                          <button
                            key={item}
                            onClick={() => setPlatform(item)}
                            aria-pressed={platform === item}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${
                              platform === item
                                ? "border-black bg-black text-white"
                                : "border-border"
                            }`}
                          >
                            {item === "iOS" ? (
                              <img
                                src={`${imagePath}apple.svg`}
                                alt=""
                                aria-hidden="true"
                                className={`h-4 w-4 ${
                                  platform === item ? "" : "invert"
                                }`}
                              />
                            ) : (
                              <span
                                className={platform === item ? "" : "invert"}
                              >
                                <PlayMark />
                              </span>
                            )}
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                    {submitted ? (
                      <div
                        role="status"
                        className="mt-6 rounded-xl border border-border bg-card p-5"
                      >
                        <Check size={23} />
                        <h3 className="mt-3 font-semibold">
                          Your interest is saved.
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          We&apos;ll keep you posted when official registration
                          opens for the {campus.name} community.
                        </p>
                      </div>
                    ) : (
                      <form
                        className="mt-6"
                        onSubmit={async (event) => {
                          event.preventDefault()
                          setSaveError(false)
                          setIsSubmitting(true)
                          try {
                            if (!supabase) {
                              throw new Error("Supabase is not configured")
                            }
                            const { error } = await supabase
                              .from("interest_signups")
                              .insert({
                                email: email.trim().toLowerCase(),
                                campus: campus.name,
                                platform,
                                interest: modal ?? "unknown",
                              })
                            if (error) throw error
                            setSubmitted(true)
                          } catch {
                            setSaveError(true)
                          } finally {
                            setIsSubmitting(false)
                          }
                        }}
                      >
                        <label
                          htmlFor="interest-email"
                          className="text-xs font-medium"
                        >
                          Your email address
                        </label>
                        <input
                          id="interest-email"
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@campus.edu.ng"
                          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`${buttonClass} mt-3 w-full`}
                        >
                          {isSubmitting
                            ? "Saving..."
                            : modal === "ambassador"
                            ? "Save ambassador interest"
                            : "Save my interest"}
                          <ArrowRight size={15} />
                        </button>
                        <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
                          Your email is securely saved so the Uny team can keep
                          you updated.
                        </p>
                        {saveError && (
                          <p role="alert" className="mt-3 text-xs text-red-700">
                            We couldn&apos;t save your interest right now. Please
                            try again in a moment.
                          </p>
                        )}
                      </form>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
