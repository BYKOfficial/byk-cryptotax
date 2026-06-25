import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════
   i18n
════════════════════════════════════════════════════ */
const STRINGS = {
  EN:{
    navCalc:"Calculator",navHow:"How It Works",navFaq:"FAQ",navContact:"Contact",navBtn:"Calculate Tax",
    heroTag:"Crypto Tax Calculator · Section 115BBH · AY 2026-27",
    h1a:"Your Crypto Tax —",h1b:"Calculated in",h1c:"Minutes",
    heroSub:"Enter your buy and sell totals to get your exact Section 115BBH liability — plus a Schedule VDA summary ready for your CA or ITR filing.",
    cta1:"Calculate My Tax →",cta2:"See a Sample Result",
    t1:"🔒 Runs in your browser — nothing uploaded",t2:"📋 Section 115BBH · AY 2026-27",
    t3:"📄 Output formatted for Schedule VDA",t4:"✓ Free — no account needed",
    howEye:"How It Works",howH:"Three Steps. About Two Minutes.",
    howSub:"No account. No upload. Just your numbers and the result.",
    s1h:"Enter Your Numbers",s1b:"Your total purchase value (cost of acquisition) and total sale value. Add TDS already deducted — check your Form 26AS.",
    s2h:"Get Your Breakdown",s2b:"30% tax + 4% cess under Section 115BBH applied automatically. TDS credit deducted to show your actual liability.",
    s3h:"Download or Share",s3b:"Get a Schedule VDA-ready summary — copy it, share to your CA via WhatsApp, or download as PDF.",
    multiNote:"Traded across multiple exchanges? Add up your totals, or use the CSV option below the calculator.",
    sampleEye:"What You'll Get",sampleH:"A Clear, Ready-to-Use Summary",
    sampleSub:"Here's what the output looks like — based on a sample portfolio.",
    sampleCaption:"Same format — PDF, copy-paste text, or WhatsApp to your CA.",
    sampleCTA:"Calculate Yours →",
    calcEye:"Calculator",calcH:"Calculate Your Tax",
    calcSub:"Takes about two minutes. Nothing is saved unless you choose to.",
    lEx:"Exchange",lTx:"No. of Transactions",lFy:"Financial Year",
    lBuy:"Total Purchase Value",lSell:"Total Sale Value",
    lTds:"TDS Already Deducted",lTdsNote:"— from Form 26AS",
    calcBtn:"Show My Breakdown",resetBtn:"Reset",
    copyBtn:"📋 Copy",copiedBtn:"✓ Copied!",waBtn:"💬 WhatsApp",pdfBtn:"🖨 Print / PDF",
    calcNote:"Estimate based on Section 115BBH (AY 2026-27). For DeFi, NFTs, or multiple years — consult a CA.",
    eBuy:"Please enter your total purchase value",eSell:"Please enter your total sale value",
    emptyH:"Your result will appear here",emptySub:"Enter your numbers and click \"Show My Breakdown\"",
    noTax:"✓ No tax payable — gains are zero or negative.",
    keepLabel:"You keep",taxLabel:"Tax payable",
    rGains:"Net VDA Gains",rTax:"Tax @ 30%",rCess:"Cess @ 4%",rGross:"Gross Tax (31.2%)",rTds:"TDS Credit",
    rNet:"Net Tax Payable",rEff:"Effective rate",
    slipTitle:"BYK CryptoTax · Estimate",calcSlipTitle:"Section 115BBH",
    csvH:"Have More Than a Few Transactions?",
    csvSub:"Email your exchange CSV — we'll send back a full Schedule VDA summary, usually within 24 hours.",
    csvBtn:"Email Your CSV →",
    taxEye:"Why It Matters",taxH:"How Crypto Tax Works in India",
    taxSub:"Section 115BBH is strict. Here's what every crypto investor needs to know:",
    taxNote:"↑ The calculator above applies all of this automatically.",
    compEye:"Comparison",compH:"How BYK CryptoTax Compares",compSub:"A quick look at what you're getting.",
    compNote:"We focus on one thing — accurate Section 115BBH numbers, in a format you can actually use.",
    privEye:"Privacy",privH:"Your Data Stays With You",
    privBody:"Calculations run entirely in your browser — your transaction values are never sent to or stored on our servers. If you email a CSV for the bulk-help option, it's used only to prepare your summary and isn't shared with anyone.",
    whyEye:"About BYK CryptoTax",whyH:"Built for First-Time Filers",
    whyQ:"\"Most crypto tax tools are either expensive or assume you already know the rules. We built this to be free, and to explain things the way most of us actually talk about money — a mix of English and Hindi, not dense tax jargon. If it helps you avoid a mistake on your return, it's done its job.\"",
    whyAttr:"— Built in Balangir, Odisha.",
    faqEye:"FAQ",faqH:"Common Questions",
    comEye:"Stay Updated",comH:"Get Tax Updates & Reminders",
    comSub:"Join our WhatsApp community for Q&A, or follow Telegram for crypto tax news and ITR deadline reminders.",
    waGroup:"💬 Join WhatsApp Group",tgFollow:"📡 Follow on Telegram",
    finalH:"Ready to See Your Number?",finalSub:"It takes about two minutes.",finalCTA:"Calculate My Tax →",
    footerDesc:"A free Section 115BBH calculator for Indian crypto investors. Built in Balangir, Odisha.",
    disc:"BYK CryptoTax provides estimates based on Income Tax Act provisions for AY 2026-27 (Section 115BBH), for informational purposes only. This is not tax advice, and we are not a tax advisory firm. Please consult a qualified Chartered Accountant before filing, especially for DeFi, NFTs, foreign exchanges, or high transaction volumes.",
    copy:"© 2026 BYK CryptoTax. Built in Balangir, Odisha.",
    cookieTxt:"We use cookies to improve your experience.",cookieLink:"Privacy Policy",cookieBtn:"Accept",
    toastCopied:"Summary copied to clipboard!",toastNoResult:"Calculate first, then copy.",
  },
  HI:{
    navCalc:"कैलकुलेटर",navHow:"कैसे काम करता है",navFaq:"सवाल-जवाब",navContact:"संपर्क",navBtn:"टैक्स कैलकुलेट करें",
    heroTag:"क्रिप्टो टैक्स कैलकुलेटर · धारा 115BBH · AY 2026-27",
    h1a:"आपका क्रिप्टो टैक्स —",h1b:"कुछ ही",h1c:"मिनटों में",
    heroSub:"अपनी खरीद और बिक्री की कुल राशि डालें और धारा 115BBH के तहत अपनी सटीक देनदारी जानें — Schedule VDA सारांश भी मिलेगा।",
    cta1:"टैक्स कैलकुलेट करें →",cta2:"सैंपल देखें",
    t1:"🔒 सिर्फ आपके ब्राउज़र में — कोई अपलोड नहीं",t2:"📋 धारा 115BBH · AY 2026-27",
    t3:"📄 Schedule VDA के लिए आउटपुट",t4:"✓ मुफ़्त — कोई अकाउंट नहीं",
    howEye:"कैसे काम करता है",howH:"तीन चरण। लगभग दो मिनट।",
    howSub:"कोई अकाउंट नहीं। कोई अपलोड नहीं। बस आपके नंबर और परिणाम।",
    s1h:"अपने नंबर डालें",s1b:"कुल खरीद मूल्य और कुल बिक्री मूल्य डालें। TDS राशि भी डालें — Form 26AS में देखें।",
    s2h:"अपना ब्रेकडाउन पाएं",s2b:"धारा 115BBH के तहत 30% टैक्स + 4% सेस स्वचालित रूप से लागू होता है।",
    s3h:"डाउनलोड या शेयर करें",s3b:"Schedule VDA के लिए तैयार सारांश — PDF डाउनलोड करें, कॉपी करें, या CA को WhatsApp करें।",
    multiNote:"कई एक्सचेंज पर ट्रेड किया? कुल जोड़ें, या नीचे CSV विकल्प का उपयोग करें।",
    sampleEye:"आपको क्या मिलेगा",sampleH:"एक स्पष्ट, उपयोग-योग्य सारांश",
    sampleSub:"यह देखें कि आउटपुट कैसा दिखता है।",
    sampleCaption:"यही फॉर्मेट — PDF, कॉपी-पेस्ट, या CA को WhatsApp।",
    sampleCTA:"अपना कैलकुलेट करें →",
    calcEye:"कैलकुलेटर",calcH:"अपना टैक्स कैलकुलेट करें",
    calcSub:"लगभग दो मिनट लगते हैं।",
    lEx:"एक्सचेंज",lTx:"ट्रांजेक्शन की संख्या",lFy:"वित्तीय वर्ष",
    lBuy:"कुल खरीद मूल्य",lSell:"कुल बिक्री मूल्य",
    lTds:"कटा हुआ TDS",lTdsNote:"— Form 26AS से",
    calcBtn:"मेरा ब्रेकडाउन दिखाएं",resetBtn:"रीसेट",
    copyBtn:"📋 कॉपी",copiedBtn:"✓ कॉपी हो गया!",waBtn:"💬 WhatsApp",pdfBtn:"🖨 Print / PDF",
    calcNote:"धारा 115BBH (AY 2026-27) पर आधारित अनुमान। DeFi, NFTs के लिए CA से परामर्श लें।",
    eBuy:"कृपया कुल खरीद मूल्य दर्ज करें",eSell:"कृपया कुल बिक्री मूल्य दर्ज करें",
    emptyH:"आपका परिणाम यहाँ दिखेगा",emptySub:"अपने नंबर डालें और \"मेरा ब्रेकडाउन दिखाएं\" पर क्लिक करें",
    noTax:"✓ कोई टैक्स नहीं — लाभ शून्य या नकारात्मक है।",
    keepLabel:"आप रखते हैं",taxLabel:"टैक्स देय",
    rGains:"शुद्ध VDA लाभ",rTax:"30% टैक्स",rCess:"4% सेस",rGross:"कुल टैक्स (31.2%)",rTds:"TDS क्रेडिट",
    rNet:"देय शुद्ध टैक्स",rEff:"प्रभावी दर",
    slipTitle:"BYK CryptoTax · अनुमान",calcSlipTitle:"धारा 115BBH",
    csvH:"बहुत सारे ट्रांजेक्शन हैं?",
    csvSub:"अपना CSV ईमेल करें — हम 24 घंटे में Schedule VDA सारांश भेज देंगे।",
    csvBtn:"CSV ईमेल करें →",
    taxEye:"क्यों जरूरी है",taxH:"भारत में क्रिप्टो टैक्स",
    taxSub:"धारा 115BBH कड़ी है। यह जानना जरूरी है:",
    taxNote:"↑ ऊपर का कैलकुलेटर यह सब स्वचालित रूप से लागू करता है।",
    compEye:"तुलना",compH:"BYK CryptoTax की तुलना",compSub:"एक नज़र में।",
    compNote:"हम एक ही चीज़ पर ध्यान देते हैं — सटीक Section 115BBH नंबर।",
    privEye:"गोपनीयता",privH:"आपका डेटा आपके पास रहता है",
    privBody:"गणना पूरी तरह आपके ब्राउज़र में होती है — आपके नंबर हमारे सर्वर पर कभी नहीं जाते।",
    whyEye:"BYK CryptoTax के बारे में",whyH:"पहली बार फाइल करने वालों के लिए",
    whyQ:"\"ज़्यादातर टूल्स या तो महंगे हैं या मानते हैं कि आप नियम पहले से जानते हैं। हमने यह मुफ़्त बनाया।\"",
    whyAttr:"— बालांगीर, ओडिशा से।",
    faqEye:"सवाल-जवाब",faqH:"आम सवाल",
    comEye:"अपडेट रहें",comH:"टैक्स अपडेट और रिमाइंडर पाएं",
    comSub:"Q&A के लिए WhatsApp ग्रुप जॉइन करें या Telegram पर फॉलो करें।",
    waGroup:"💬 WhatsApp Group जॉइन करें",tgFollow:"📡 Telegram पर फॉलो करें",
    finalH:"अपना नंबर देखने के लिए तैयार?",finalSub:"इसमें लगभग दो मिनट लगते हैं।",finalCTA:"टैक्स कैलकुलेट करें →",
    footerDesc:"भारतीय क्रिप्टो निवेशकों के लिए मुफ़्त धारा 115BBH कैलकुलेटर। बालांगीर, ओडिशा में बना।",
    disc:"BYK CryptoTax केवल सूचना के उद्देश्य से AY 2026-27 (धारा 115BBH) के अनुसार अनुमान प्रदान करता है। यह कर सलाह नहीं है।",
    copy:"© 2026 BYK CryptoTax। बालांगीर, ओडिशा में बना।",
    cookieTxt:"हम आपका अनुभव बेहतर करने के लिए कुकीज़ का उपयोग करते हैं।",cookieLink:"गोपनीयता नीति",cookieBtn:"स्वीकार करें",
    toastCopied:"सारांश क्लिपबोर्ड पर कॉपी हो गया!",toastNoResult:"पहले कैलकुलेट करें।",
  },
  HL:{
    navCalc:"Calculator",navHow:"Kaise Kaam Karta Hai",navFaq:"Sawaal-Jawaab",navContact:"Contact",navBtn:"Tax Calculate Karo",
    heroTag:"Crypto Tax Calculator · Section 115BBH · AY 2026-27",
    h1a:"Aapka Crypto Tax —",h1b:"Calculate Hua",h1c:"Minutes Mein",
    heroSub:"Apni khareed aur bikri ki total value daalo aur Section 115BBH ke under exact tax liability jaano — CA ke liye Schedule VDA summary bhi milegi.",
    cta1:"Tax Calculate Karo →",cta2:"Sample Dekho",
    t1:"🔒 Sirf aapke browser mein — koi upload nahi",t2:"📋 Section 115BBH · AY 2026-27",
    t3:"📄 Schedule VDA ke liye output",t4:"✓ Free — koi account nahi",
    howEye:"Kaise Kaam Karta Hai",howH:"Teen Steps. Kuch Hi Minutes.",
    howSub:"Koi account nahi. Koi upload nahi. Bas aapke numbers aur result.",
    s1h:"Apne Numbers Daalo",s1b:"Total khareed value aur total bikri value daalo. TDS bhi daalo — Form 26AS mein milega.",
    s2h:"Apna Breakdown Lo",s2b:"Section 115BBH ke under 30% tax + 4% cess automatic apply hota hai. TDS credit minus hokar actual liability aati hai.",
    s3h:"Download Ya Share Karo",s3b:"Schedule VDA-ready summary lo — copy karo, CA ko WhatsApp karo, ya PDF download karo.",
    multiNote:"Multiple exchanges par trade kiya? Totals jodo, ya neeche CSV option use karo.",
    sampleEye:"Aapko Kya Milega",sampleH:"Ek Clear, Ready-to-Use Summary",
    sampleSub:"Dekhein output kaisa lagta hai — ek sample portfolio ke basis par.",
    sampleCaption:"Yahi format — PDF, copy-paste, ya CA ko WhatsApp.",
    sampleCTA:"Apna Calculate Karo →",
    calcEye:"Calculator",calcH:"Apna Tax Calculate Karo",
    calcSub:"Bas do minute lagte hain.",
    lEx:"Exchange",lTx:"Transactions ki Sankhya",lFy:"Financial Year",
    lBuy:"Total Khareed Value",lSell:"Total Bikri Value",
    lTds:"Kata Hua TDS",lTdsNote:"— Form 26AS se",
    calcBtn:"Mera Breakdown Dikhao",resetBtn:"Reset Karo",
    copyBtn:"📋 Copy Karo",copiedBtn:"✓ Copy Ho Gaya!",waBtn:"💬 WhatsApp",pdfBtn:"🖨 Print / PDF",
    calcNote:"Section 115BBH (AY 2026-27) ka estimate. DeFi, NFTs ke liye CA se salah lo.",
    eBuy:"Kripaya total khareed value daalo",eSell:"Kripaya total bikri value daalo",
    emptyH:"Aapka result yahan dikhega",emptySub:"Apne numbers daalo aur \"Mera Breakdown Dikhao\" click karo",
    noTax:"✓ Koi tax nahi — gains zero ya negative hain.",
    keepLabel:"Aap rakhte ho",taxLabel:"Tax dena hai",
    rGains:"Net VDA Gains",rTax:"Tax @ 30%",rCess:"Cess @ 4%",rGross:"Gross Tax (31.2%)",rTds:"TDS Credit",
    rNet:"Net Tax Dena Hai",rEff:"Effective rate",
    slipTitle:"BYK CryptoTax · Estimate",calcSlipTitle:"Section 115BBH",
    csvH:"Zyada Transactions Hain?",
    csvSub:"Apna exchange CSV email karo — hum 24 ghante mein Schedule VDA summary bhej denge.",
    csvBtn:"CSV Email Karo →",
    taxEye:"Kyun Zaruri Hai",taxH:"India Mein Crypto Tax Kaise Kaam Karta Hai",
    taxSub:"Section 115BBH strict hai. Har crypto investor ko yeh jaanna chahiye:",
    taxNote:"↑ Upar ka calculator yeh sab automatic apply karta hai.",
    compEye:"Comparison",compH:"BYK CryptoTax Ka Comparison",compSub:"Ek nazar mein dekho.",
    compNote:"Hum ek cheez par dhyan dete hain — accurate Section 115BBH numbers.",
    privEye:"Privacy",privH:"Aapka Data Aapke Paas Rehta Hai",
    privBody:"Calculation poori tarah aapke browser mein hoti hai — aapke numbers hamare server par kabhi nahi jaate.",
    whyEye:"BYK CryptoTax Ke Baare Mein",whyH:"Pehli Baar File Karne Walon Ke Liye",
    whyQ:"\"Zyaadatar tools ya toh mehnge hain ya mante hain ki aap rules pehle se jaante ho. Humne yeh free banaya, usi bhasha mein jo hum normally bolte hain.\"",
    whyAttr:"— Balangir, Odisha se.",
    faqEye:"Sawaal-Jawaab",faqH:"Aam Sawaal",
    comEye:"Updated Raho",comH:"Tax Updates Aur Reminders Lo",
    comSub:"Q&A ke liye WhatsApp group join karo ya Telegram par follow karo.",
    waGroup:"💬 WhatsApp Group Join Karo",tgFollow:"📡 Telegram Par Follow Karo",
    finalH:"Apna Number Dekhne Ke Liye Tayyar?",finalSub:"Bas do minute lagte hain.",finalCTA:"Tax Calculate Karo →",
    footerDesc:"Indian crypto investors ke liye free Section 115BBH calculator. Balangir, Odisha mein bana.",
    disc:"BYK CryptoTax sirf information ke liye AY 2026-27 (Section 115BBH) ka estimate deta hai. Yeh tax advice nahi hai.",
    copy:"© 2026 BYK CryptoTax. Balangir, Odisha mein bana.",
    cookieTxt:"Hum experience behtar karne ke liye cookies use karte hain.",cookieLink:"Privacy Policy",cookieBtn:"Theek Hai",
    toastCopied:"Summary clipboard par copy ho gayi!",toastNoResult:"Pehle calculate karo.",
  },
};

/* ─── multilingual FAQs ─────────────────────────── */
const FAQS = {
  EN:[
    {q:"Can I set off crypto losses against other gains?",a:"No. Under Section 115BBH, losses from VDAs can't be set off against any other income — including other crypto gains — and can't be carried forward to future years. The calculator applies this automatically."},
    {q:"Can I deduct trading or platform fees?",a:"No. The only deduction allowed is your cost of acquisition. Exchange fees, gas fees, and similar costs aren't deductible under current rules."},
    {q:"What about the 1% TDS deducted by exchanges?",a:"If your total VDA sales cross ₹10,000 in a year, exchanges deduct 1% TDS under Section 194S. This appears in your Form 26AS and can be claimed as a credit — the calculator factors this in."},
    {q:"Which ITR form should I use?",a:"If you have VDA income, ITR-1 isn't an option. You'll need ITR-2 (capital gains) or ITR-3 (business income), both of which include Schedule VDA."},
    {q:"How accurate is this calculator?",a:"It applies Section 115BBH as written — flat 30% + cess, cost-of-acquisition-only deductions, mandatory loss disallowance. For complex cases (DeFi, staking, NFTs, multiple years), consult a CA before filing."},
  ],
  HI:[
    {q:"क्या मैं क्रिप्टो नुकसान से अन्य लाभ घटा सकता हूं?",a:"नहीं। धारा 115BBH के तहत, VDA से नुकसान किसी अन्य आय से नहीं घटाया जा सकता — न ही अन्य क्रिप्टो लाभ से — और आगे भी नहीं ले जाया जा सकता।"},
    {q:"क्या मैं ट्रेडिंग फीस काट सकता हूं?",a:"नहीं। केवल अधिग्रहण की लागत (खरीद मूल्य) ही कटौती योग्य है। एक्सचेंज फीस, गैस फीस आदि वर्तमान नियमों के तहत कटौती योग्य नहीं हैं।"},
    {q:"एक्सचेंज द्वारा काटे गए 1% TDS का क्या?",a:"यदि आपकी कुल VDA बिक्री ₹10,000 से अधिक है, तो एक्सचेंज धारा 194S के तहत 1% TDS काटते हैं। यह Form 26AS में दिखता है और क्रेडिट के रूप में क्लेम किया जा सकता है।"},
    {q:"कौन सा ITR फॉर्म भरना चाहिए?",a:"VDA आय होने पर ITR-1 मान्य नहीं है। आपको ITR-2 (पूंजीगत लाभ) या ITR-3 (व्यावसायिक आय) भरना होगा।"},
    {q:"यह कैलकुलेटर कितना सटीक है?",a:"यह धारा 115BBH को जैसा लिखा गया है वैसा लागू करता है। DeFi, NFTs, कई वर्षों के लिए CA से परामर्श लें।"},
  ],
  HL:[
    {q:"Kya main crypto losses ko dusre gains se set off kar sakta hoon?",a:"Nahi. Section 115BBH ke under, VDA losses kisi bhi dusri income se set off nahi ho sakti — dusre crypto gains se bhi nahi — aur aage bhi nahi le jayi ja sakti."},
    {q:"Kya main trading fees kaata sakta hoon?",a:"Nahi. Sirf cost of acquisition hi deductible hai. Exchange fees, gas fees current rules ke under deductible nahi hain."},
    {q:"1% TDS jo exchange kaata hai uska kya?",a:"Agar total VDA sales ₹10,000 se zyada hain, toh Section 194S ke under 1% TDS kata jaata hai. Form 26AS mein milta hai aur credit ke roop mein claim ho sakta hai."},
    {q:"Konsa ITR form bharna chahiye?",a:"VDA income hone par ITR-1 valid nahi hai. ITR-2 (capital gains) ya ITR-3 (business income) bharna hoga."},
    {q:"Yeh calculator kitna accurate hai?",a:"Yeh Section 115BBH exactly apply karta hai. DeFi, NFTs, multiple years ke liye CA se salah lo."},
  ],
};

/* ─── static data ───────────────────────────────── */
const INR=(n)=>{
  if(n===null||n===undefined||isNaN(n))return"—";
  const abs=Math.abs(Math.round(n));
  return(n<0?"− ":"")+"₹"+abs.toLocaleString("en-IN");
};

const TAX_RULES=[
  {icon:"📊",rule:"Flat 30% + 4% cess on VDA gains",detail:"No slab benefit, no basic exemption threshold — regardless of your total income."},
  {icon:"🏷️",rule:"Only cost of acquisition is deductible",detail:"Exchange fees, gas fees, internet charges — not deductible under current rules."},
  {icon:"🚫",rule:"Losses can't be set off or carried forward",detail:"VDA losses cannot offset any other income, and can't be carried to future assessment years."},
  {icon:"📑",rule:"1% TDS on sales above ₹10,000/year",detail:"Deducted under Section 194S. Find it in Form 26AS and claim as credit — the calculator handles this."},
  {icon:"📝",rule:"Must report under Schedule VDA — not ITR-1",detail:"VDA income requires ITR-2 (capital gains) or ITR-3 (business income)."},
];

const COMPARE=[
  ["Price","Free","₹999–₹4,999/year"],
  ["Section 115BBH calculation","✓ Included","✓ Included"],
  ["Schedule VDA / ITR-ready PDF","✓ Included","Often a paid add-on"],
  ["Hindi / Hinglish support","✓ Yes","Rarely"],
  ["Account or sign-up required","✗ Not required","Usually required"],
];

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════ */
export default function App() {
  const [dark,setDark]=useState(true);
  const [lang,setLang]=useState("EN");
  const [faqOpen,setFaqOpen]=useState(null);
  const [scrolled,setScrolled]=useState(false);
  const [scrollPct,setScrollPct]=useState(0);
  const [cookieOK,setCookieOK]=useState(false);
  const [toast,setToast]=useState(null);
  const [copied,setCopied]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);

  const [form,setForm]=useState({exchange:"CoinDCX",txCount:"",fy:"AY 2026-27",purchase:"",sale:"",tds:""});
  const [errors,setErrors]=useState({});
  const [shaking,setShaking]=useState(false);
  const [result,setResult]=useState(null);

  const resultRef=useRef(null);
  const formRef=useRef(null);

  const s=STRINGS[lang];
  const faqs=FAQS[lang];

  /* ── scroll listener ── */
  useEffect(()=>{
    const fn=()=>{
      setScrolled(window.scrollY>50);
      const max=document.body.scrollHeight-window.innerHeight;
      setScrollPct(max>0?Math.round(window.scrollY/max*100):0);
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  /* ── toast auto-dismiss ── */
  useEffect(()=>{
    if(!toast)return;
    const t=setTimeout(()=>setToast(null),3000);
    return()=>clearTimeout(t);
  },[toast]);

  /* ── Enter key on last input ── */
  useEffect(()=>{
    const fn=(e)=>{if(e.key==="Enter"&&document.getElementById("calculator")?.contains(e.target))calc();};
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  });

  const upd=(k)=>(e)=>setForm(p=>({...p,[k]:e.target.value}));
  const go=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileOpen(false);};
  const showToast=(msg,type="success")=>setToast({msg,type});

  /* ── calculator ── */
  const validate=()=>{
    const e={};
    if(!form.purchase)e.purchase=s.eBuy;
    if(!form.sale)e.sale=s.eSell;
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const calc=()=>{
    if(!validate()){
      setShaking(true);
      setTimeout(()=>setShaking(false),500);
      return;
    }
    setErrors({});
    const p=parseFloat(form.purchase)||0;
    const sv=parseFloat(form.sale)||0;
    const t=parseFloat(form.tds)||0;
    const gains=sv-p;
    const taxable=Math.max(gains,0);
    const tax30=+(taxable*0.3).toFixed(2);
    const cess=+(tax30*0.04).toFixed(2);
    const gross=+(tax30+cess).toFixed(2);
    const net=+Math.max(gross-t,0).toFixed(2);
    const eff=sv>0?+((net/sv)*100).toFixed(2):0;
    const keepAmt=gains>0?gains-net:gains;
    const keepPct=gains>0?+((keepAmt/gains)*100).toFixed(1):100;
    const taxPct=gains>0?+((net/gains)*100).toFixed(1):0;
    setResult({gains,taxable,tax30,cess,gross,tdsAmt:t,net,eff,keepAmt,keepPct,taxPct});
    setTimeout(()=>resultRef.current?.scrollIntoView({behavior:"smooth",block:"nearest"}),200);
  };

  const resetCalc=()=>{
    setForm({exchange:"CoinDCX",txCount:"",fy:"AY 2026-27",purchase:"",sale:"",tds:""});
    setResult(null);
    setErrors({});
  };

  const buildText=()=>{
    if(!result)return"";
    return[
      "BYK CryptoTax — Section 115BBH Estimate",
      `Exchange: ${form.exchange} | FY: ${form.fy}${form.txCount?` | ~${form.txCount} tx`:""}`,
      "─".repeat(44),
      `${s.rGains.padEnd(22)}${INR(result.gains)}`,
      `${s.rTax.padEnd(22)}${INR(result.tax30)}`,
      `${s.rCess.padEnd(22)}${INR(result.cess)}`,
      `${s.rGross.padEnd(22)}${INR(result.gross)}`,
      `${s.rTds.padEnd(22)}${result.tdsAmt>0?`− ${INR(result.tdsAmt)}`:"₹0"}`,
      "─".repeat(44),
      `${s.rNet.padEnd(22)}${INR(result.net)}`,
      `${s.rEff}: ${result.eff}%`,
      "─".repeat(44),
      "Estimate only. Consult a CA before filing.",
      "byk-cryptotax.vercel.app",
    ].join("\n");
  };

  const doCopy=async()=>{
    if(!result){showToast(s.toastNoResult,"warn");return;}
    try{await navigator.clipboard.writeText(buildText());setCopied(true);setTimeout(()=>setCopied(false),2000);showToast(s.toastCopied);}
    catch{alert(buildText());}
  };

  const doWA=()=>{
    if(!result)return;
    const msg=encodeURIComponent(
      `My crypto tax estimate (Section 115BBH, ${form.fy}):\n\n`+
      `Exchange: ${form.exchange}\n`+
      `${s.rGains}: ${INR(result.gains)}\n`+
      `${s.rGross}: ${INR(result.gross)}\n`+
      (result.tdsAmt>0?`${s.rTds}: − ${INR(result.tdsAmt)}\n`:"")+
      `*${s.rNet}: ${INR(result.net)}*\n\n`+
      `Calculate yours free: byk-cryptotax.vercel.app`
    );
    window.open(`https://wa.me/?text=${msg}`,"_blank");
  };

  const doPrint=()=>{
    if(!result){showToast(s.toastNoResult,"warn");return;}
    const w=window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html><head><title>BYK CryptoTax Estimate</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:monospace;max-width:480px;margin:40px auto;padding:0 20px;color:#0F172A}
.header{margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #E8930A}
.brand{font-size:18px;font-weight:900;letter-spacing:-0.03em}
.brand span{color:#E8930A}
.subtitle{font-size:12px;color:#6B7280;margin-top:4px}
.row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px dashed #E5E7EB;font-size:14px}
.row-label{color:#374151}
.row-val{font-weight:600}
.total{display:flex;justify-content:space-between;align-items:center;
  padding:16px 0;margin-top:4px;border-top:2px solid #E8930A}
.total-label{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280}
.total-val{font-size:26px;font-weight:800;color:#E8930A;letter-spacing:-0.02em}
.eff{font-size:11px;color:#6B7280;margin-top:2px}
.bar-wrap{margin:20px 0 8px}
.bar-title{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:8px}
.bar{height:8px;border-radius:4px;overflow:hidden;display:flex;background:#F3F4F6}
.bar-keep{background:#10B981}
.bar-tax{background:#E8930A}
.bar-labels{display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:#6B7280}
.disc{font-size:11px;color:#9CA3AF;margin-top:24px;line-height:1.6;padding-top:16px;border-top:1px solid #F3F4F6}
@media print{body{margin:24px auto}}
</style></head><body>
<div class="header">
  <div class="brand">BYK <span>CryptoTax</span></div>
  <div class="subtitle">${form.exchange}${form.txCount?` · ~${form.txCount} tx`:""} · ${form.fy} · Section 115BBH</div>
</div>
<div class="row"><span class="row-label">${s.rGains}</span><span class="row-val">${INR(result.gains)}</span></div>
<div class="row"><span class="row-label">${s.rTax}</span><span class="row-val">${INR(result.tax30)}</span></div>
<div class="row"><span class="row-label">${s.rCess}</span><span class="row-val">${INR(result.cess)}</span></div>
<div class="row"><span class="row-label">${s.rGross}</span><span class="row-val">${INR(result.gross)}</span></div>
<div class="row"><span class="row-label">${s.rTds}</span><span class="row-val">${result.tdsAmt>0?`− ${INR(result.tdsAmt)}`:"₹0"}</span></div>
<div class="total">
  <div><div class="total-label">${s.rNet}</div><div class="eff">${s.rEff}: ${result.eff}%</div></div>
  <div class="total-val">${INR(result.net)}</div>
</div>
${result.gains>0?`<div class="bar-wrap">
  <div class="bar-title">Gains Breakdown</div>
  <div class="bar"><div class="bar-keep" style="width:${result.keepPct}%"></div><div class="bar-tax" style="flex:1"></div></div>
  <div class="bar-labels"><span>■ ${s.keepLabel}: ${INR(result.keepAmt)} (${result.keepPct}%)</span><span>■ ${s.taxLabel}: ${INR(result.net)} (${result.taxPct}%)</span></div>
</div>`:""}
<div class="disc">Estimate based on Section 115BBH (AY 2026-27), for informational purposes only. Not tax advice. Consult a CA before filing.<br>byk-cryptotax.vercel.app</div>
</body></html>`);
    w.document.close();w.focus();setTimeout(()=>w.print(),400);
  };

  /* ── theme ── */
  const G="#E8930A";
  const GREEN="#10B981";
  const d=dark;
  const T={
    bg:d?"#0D1117":"#FFFFFF",
    bgAlt:d?"#13192A":"#F6F7F9",
    card:d?"#1A1F2E":"#FFFFFF",
    hero:d?"#090C14":"#0A0F1E",
    text:d?"#E8ECF4":"#0F172A",
    text2:d?"#B0BAC9":"#374151",
    muted:d?"#6B7587":"#6B7280",
    border:d?"#252D3D":"#E5E7EB",
    err:"#F87171",
  };

  const W={maxWidth:1100,margin:"0 auto"};
  const SEC=(bg)=>({padding:"80px 24px",background:bg||T.bg});
  const EYE={fontSize:11,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:G,marginBottom:12};
  const H2={fontSize:"clamp(26px,4vw,40px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-0.025em",color:T.text};

  const PRI={background:G,color:"#0F172A",border:"none",cursor:"pointer",padding:"13px 24px",
    borderRadius:8,fontSize:15,fontWeight:700,display:"inline-flex",alignItems:"center",gap:8,
    fontFamily:"inherit",textDecoration:"none"};
  const SEC2={background:"transparent",color:T.text,border:`1.5px solid ${T.border}`,cursor:"pointer",
    padding:"12px 20px",borderRadius:8,fontSize:14,fontWeight:600,
    display:"inline-flex",alignItems:"center",gap:8,fontFamily:"inherit",textDecoration:"none"};
  const OUT={background:"transparent",color:"#E8ECF4",border:"1.5px solid rgba(232,236,244,0.18)",
    cursor:"pointer",padding:"12px 22px",borderRadius:8,fontSize:15,fontWeight:600,
    display:"inline-flex",alignItems:"center",gap:8,fontFamily:"inherit",textDecoration:"none"};
  const INP={width:"100%",padding:"11px 14px",border:`1.5px solid ${T.border}`,
    borderRadius:8,background:T.card,color:T.text,fontSize:15,fontFamily:"inherit",outline:"none"};
  const INP_ERR={...INP,border:`1.5px solid ${T.err}`};
  const LBL={display:"block",fontSize:13,fontWeight:600,color:T.text2,marginBottom:7};

  /* ── rupee prefix input ── */
  const RInput=({hasError,...props})=>(
    <div style={{position:"relative"}}>
      <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",
        color:T.muted,fontSize:15,fontWeight:600,pointerEvents:"none",userSelect:"none"}}>₹</span>
      <input style={{...(hasError?INP_ERR:INP),paddingLeft:30}} {...props}/>
    </div>
  );

  /* ── slip row ── */
  const SR=(label,val,valC)=>(
    <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"10px 20px",borderBottom:`1px dashed ${T.border}`,fontSize:13,fontFamily:"monospace"}}>
      <span style={{color:T.text2}}>{label}</span>
      <span style={{fontWeight:600,color:valC||T.text}}>{val}</span>
    </div>
  );

  return(
    <div style={{background:T.bg,color:T.text,fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      minHeight:"100vh",transition:"background .2s,color .2s"}}>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:#FEF3C7;color:#0F172A}
        a{color:inherit;text-decoration:none}
        button{font-family:inherit}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
        @keyframes barGrow{from{width:0}to{width:var(--w)}}
        .shake{animation:shake .45s ease}
        .reveal{animation:slideDown .35s ease both}
        .fade{animation:fadeIn .3s ease both}
        .step-card{transition:transform .2s,box-shadow .2s}
        .step-card:hover{transform:translateY(-4px)}
        @media(max-width:768px){
          .hmob{display:none!important}
          .smob{grid-template-columns:1fr!important}
          .cmob{flex-direction:column!important;align-items:flex-start!important}
          .fmob{flex-wrap:wrap!important}
          .mob-show{display:flex!important}
        }
        @media(min-width:769px){.mob-show{display:none!important}}
      `}</style>

      {/* ── TOAST ── */}
      {toast&&(
        <div style={{position:"fixed",top:76,right:20,zIndex:500,
          background:toast.type==="success"?"#065F46":toast.type==="warn"?"#92400E":"#1E293B",
          color:"#fff",padding:"12px 20px",borderRadius:10,
          fontSize:14,fontWeight:600,maxWidth:280,
          boxShadow:"0 4px 24px rgba(0,0,0,0.35)",
          animation:"slideDown .25s ease"}} className="fade">
          {toast.type==="success"&&"✓ "}{toast.type==="warn"&&"⚠ "}{toast.msg}
        </div>
      )}

      {/* ── COOKIE ── */}
      {!cookieOK&&(
        <div style={{position:"fixed",bottom:16,left:16,right:16,zIndex:300,
          background:T.card,border:`1px solid ${T.border}`,borderRadius:12,
          padding:"14px 20px",display:"flex",alignItems:"center",
          justifyContent:"space-between",gap:14,
          boxShadow:"0 8px 40px rgba(0,0,0,0.3)",flexWrap:"wrap"}}>
          <span style={{fontSize:14,color:T.text2}}>
            {s.cookieTxt}{" "}
            <a href="/privacy.html" style={{color:G,textDecoration:"underline"}}>{s.cookieLink}</a>
          </span>
          <button onClick={()=>setCookieOK(true)} style={{...PRI,padding:"8px 18px",fontSize:13}}>
            {s.cookieBtn}
          </button>
        </div>
      )}

      {/* ── MOBILE OVERLAY NAV ── */}
      {mobileOpen&&(
        <div style={{position:"fixed",top:58,left:0,right:0,bottom:0,zIndex:200,
          background:d?"rgba(9,12,20,0.98)":"rgba(255,255,255,0.98)",
          backdropFilter:"blur(20px)",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:36}}
          className="fade">
          {[[s.navCalc,"calculator"],[s.navHow,"how-it-works"],[s.navFaq,"faq"],[s.navContact,"contact"]].map(([l,id])=>(
            <button key={id} onClick={()=>go(id)}
              style={{background:"none",border:"none",cursor:"pointer",
                fontSize:22,fontWeight:700,color:T.text,letterSpacing:"-0.02em"}}>
              {l}
            </button>
          ))}
          <button onClick={()=>{go("calculator");setMobileOpen(false);}}
            style={{...PRI,marginTop:8,padding:"14px 32px",fontSize:16}}>{s.navBtn}</button>
        </div>
      )}

      {/* ── FLOATING MOBILE CTA ── */}
      {scrolled&&(
        <div className="mob-show" style={{position:"fixed",bottom:24,right:20,zIndex:150,display:"flex"}}>
          <button onClick={()=>go("calculator")}
            style={{...PRI,borderRadius:28,boxShadow:"0 4px 20px rgba(232,147,10,0.45)",
              padding:"12px 20px",fontSize:14}}>
            {lang==="HI"?"टैक्स कैलकुलेट करें ↑":lang==="HL"?"Calculate Karo ↑":"Calculate ↑"}
          </button>
        </div>
      )}

      {/* ── HEADER ── */}
      <header style={{position:"sticky",top:0,zIndex:100,overflow:"hidden",
        background:scrolled?(d?"rgba(9,12,20,0.96)":"rgba(255,255,255,0.96)"):(d?"rgba(9,12,20,0.7)":"rgba(255,255,255,0.7)"),
        backdropFilter:"blur(18px)",
        borderBottom:scrolled?`1px solid ${T.border}`:"1px solid transparent",
        padding:"0 24px",transition:"all .25s"}}>
        {/* scroll progress bar */}
        {scrolled&&(
          <div style={{position:"absolute",bottom:0,left:0,height:2,background:G,
            width:`${scrollPct}%`,transition:"width .15s",borderRadius:2}}/>
        )}
        <div style={{...W,display:"flex",alignItems:"center",justifyContent:"space-between",height:58}}>
          <div onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
            style={{fontWeight:900,fontSize:16,letterSpacing:"-0.03em",cursor:"pointer"}}>
            BYK <span style={{color:G}}>CryptoTax</span>
          </div>

          {/* desktop nav */}
          <nav className="hmob" style={{display:"flex",gap:28,fontSize:13.5,fontWeight:500,color:T.muted}}>
            {[[s.navCalc,"calculator"],[s.navHow,"how-it-works"],[s.navFaq,"faq"],[s.navContact,"contact"]].map(([l,id])=>(
              <button key={id} onClick={()=>go(id)}
                style={{background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:13.5,fontWeight:500}}>
                {l}
              </button>
            ))}
          </nav>

          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {/* lang */}
            <div style={{display:"flex",gap:2,background:T.bgAlt,borderRadius:6,padding:3}}>
              {["EN","HI","HL"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{
                  padding:"3px 7px",borderRadius:4,border:"none",
                  background:lang===l?G:"transparent",
                  color:lang===l?"#0F172A":T.muted,
                  fontSize:10,fontWeight:800,cursor:"pointer",letterSpacing:"0.05em"}}>
                  {l}
                </button>
              ))}
            </div>
            {/* dark */}
            <button onClick={()=>setDark(!dark)} style={{
              background:T.bgAlt,border:`1px solid ${T.border}`,
              borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:15}}>
              {dark?"☀️":"🌙"}
            </button>
            {/* desktop CTA */}
            <button className="hmob" onClick={()=>go("calculator")}
              style={{...PRI,padding:"8px 16px",fontSize:13}}>{s.navBtn}</button>
            {/* hamburger */}
            <button className="mob-show" onClick={()=>setMobileOpen(!mobileOpen)}
              style={{background:"none",border:`1px solid ${T.border}`,
                borderRadius:6,padding:"6px 10px",cursor:"pointer",color:T.text,
                fontSize:18,lineHeight:1,display:"none"}}>
              {mobileOpen?"✕":"☰"}
            </button>
          </div>
        </div>
      </header>

      {/* ════════ HERO ════════ */}
      <section style={{background:T.hero,padding:"96px 24px 80px",position:"relative",overflow:"hidden"}}>
        {/* dot pattern */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px)",
          backgroundSize:"28px 28px"}}/>
        <div style={{...W,position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
            <span style={{display:"block",width:22,height:2,background:G,borderRadius:2,flexShrink:0}}/>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:G}}>
              {s.heroTag}
            </span>
          </div>
          <h1 style={{fontSize:"clamp(36px,8vw,76px)",fontWeight:900,lineHeight:1.02,
            letterSpacing:"-0.04em",color:"#E8ECF4",marginBottom:22,maxWidth:820}}>
            {s.h1a}<br/>{s.h1b}{" "}<em style={{color:G,fontStyle:"italic"}}>{s.h1c}</em>
          </h1>
          <p style={{fontSize:"clamp(15px,2vw,18px)",lineHeight:1.65,color:"#7B85A0",maxWidth:520,marginBottom:36}}>
            {s.heroSub}
          </p>
          <div className="fmob" style={{display:"flex",gap:12,marginBottom:52}}>
            <button onClick={()=>go("calculator")} style={{...PRI,padding:"15px 28px",fontSize:16}}>{s.cta1}</button>
            <button onClick={()=>go("sample")} style={{...OUT,fontSize:15,padding:"14px 24px"}}>{s.cta2}</button>
          </div>
          <div className="fmob" style={{display:"flex",gap:8}}>
            {[s.t1,s.t2,s.t3,s.t4].map(pill=>(
              <span key={pill} style={{padding:"6px 12px",borderRadius:20,
                background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                fontSize:12,fontWeight:500,color:"rgba(232,236,244,0.7)",
                display:"inline-flex",alignItems:"center"}}>{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section id="how-it-works" style={SEC()}>
        <div style={W}>
          <p style={EYE}>{s.howEye}</p>
          <h2 style={{...H2,marginBottom:10}}>{s.howH}</h2>
          <p style={{color:T.muted,fontSize:16,marginBottom:48,maxWidth:420}}>{s.howSub}</p>
          <div className="smob" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[{n:"01",title:s.s1h,body:s.s1b},{n:"02",title:s.s2h,body:s.s2b},{n:"03",title:s.s3h,body:s.s3b}].map(({n,title,body})=>(
              <div key={n} className="step-card" style={{padding:"28px 24px",
                border:`1px solid ${T.border}`,borderRadius:12,background:T.card,
                boxShadow:d?"none":"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{fontFamily:"monospace",fontSize:11,fontWeight:800,letterSpacing:"0.1em",color:G,marginBottom:14}}>
                  STEP {n}
                </div>
                <h3 style={{fontSize:17,fontWeight:700,marginBottom:10,letterSpacing:"-0.02em",color:T.text}}>{title}</h3>
                <p style={{fontSize:14,lineHeight:1.65,color:T.text2}}>{body}</p>
              </div>
            ))}
          </div>
          <p style={{marginTop:22,fontSize:13,color:T.muted,textAlign:"center"}}>{s.multiNote}</p>
        </div>
      </section>

      {/* ════════ SAMPLE RESULT ════════ */}
      <section id="sample" style={SEC(T.bgAlt)}>
        <div style={W}>
          <p style={EYE}>{s.sampleEye}</p>
          <h2 style={{...H2,marginBottom:10}}>{s.sampleH}</h2>
          <p style={{color:T.muted,fontSize:16,marginBottom:44,maxWidth:480}}>{s.sampleSub}</p>
          <div style={{maxWidth:500,margin:"0 auto"}}>
            <div style={{border:`1.5px solid ${T.border}`,borderRadius:6,overflow:"hidden"}}>
              <div style={{background:T.bgAlt,borderBottom:`1.5px solid ${T.border}`,padding:"14px 20px"}}>
                <div style={{fontFamily:"monospace",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.muted}}>
                  {s.slipTitle}
                </div>
                <div style={{fontFamily:"monospace",fontSize:12,color:T.muted,marginTop:3}}>
                  CoinDCX · 127 transactions · AY 2026-27
                </div>
              </div>
              {SR(s.rGains,"₹1,25,000")}
              {SR(s.rTax,"₹37,500")}
              {SR(s.rCess,"₹1,500")}
              {SR(s.rGross,"₹39,000")}
              {SR("TDS Already Deducted","− ₹1,250")}
              <div style={{background:T.bgAlt,borderTop:`2px solid ${G}`,padding:"16px 20px",
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontFamily:"monospace",fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                  textTransform:"uppercase",color:T.muted}}>{s.rNet}</div>
                <span style={{fontFamily:"monospace",fontSize:26,fontWeight:800,color:G,letterSpacing:"-0.02em"}}>₹37,750</span>
              </div>
              {/* sample breakdown bar */}
              <div style={{padding:"14px 20px",borderTop:`1px solid ${T.border}`,background:d?"rgba(255,255,255,0.02)":T.bgAlt}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:T.muted,marginBottom:8}}>
                  Gains Breakdown
                </div>
                <div style={{height:8,borderRadius:4,overflow:"hidden",display:"flex",background:T.border,marginBottom:8}}>
                  <div style={{width:"69.8%",background:GREEN,borderRadius:"4px 0 0 4px"}}/>
                  <div style={{flex:1,background:G}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.muted}}>
                  <span><span style={{color:GREEN,fontWeight:700}}>■ </span>{s.keepLabel}: ₹85,250 (68.2%)</span>
                  <span><span style={{color:G,fontWeight:700}}>■ </span>{s.taxLabel}: ₹39,750 (31.8%)</span>
                </div>
              </div>
            </div>
            <p style={{marginTop:14,fontSize:13,color:T.muted,textAlign:"center"}}>{s.sampleCaption}</p>
            <div style={{textAlign:"center",marginTop:22}}>
              <button onClick={()=>go("calculator")} style={PRI}>{s.sampleCTA}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CALCULATOR ════════ */}
      <section id="calculator" style={SEC()}>
        <div style={W}>
          <p style={EYE}>{s.calcEye}</p>
          <h2 style={{...H2,marginBottom:10}}>{s.calcH}</h2>
          <p style={{color:T.muted,fontSize:16,marginBottom:40}}>{s.calcSub}</p>
          <div className="smob" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>
            {/* ── Form ── */}
            <div ref={formRef} className={shaking?"shake":""} style={{display:"grid",gap:18}}>
              <div>
                <label style={LBL}>{s.lEx}</label>
                <select style={INP} value={form.exchange} onChange={upd("exchange")}>
                  <option>CoinDCX</option><option>WazirX</option><option>ZebPay</option>
                  <option>Other (enter totals manually)</option>
                </select>
              </div>
              <div className="smob" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div>
                  <label style={LBL}>{s.lTx}</label>
                  <input style={INP} type="number" min="0" placeholder="e.g. 45"
                    value={form.txCount} onChange={upd("txCount")}/>
                </div>
                <div>
                  <label style={LBL}>{s.lFy}</label>
                  <select style={INP} value={form.fy} onChange={upd("fy")}>
                    <option>AY 2026-27</option><option>AY 2025-26</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={LBL}>{s.lBuy}</label>
                <RInput hasError={!!errors.purchase} type="number" min="0" placeholder="What you paid to buy"
                  value={form.purchase} onChange={upd("purchase")}
                  onFocus={()=>setErrors(e=>({...e,purchase:null}))}/>
                {errors.purchase&&<p style={{fontSize:12,color:T.err,marginTop:5}}>{errors.purchase}</p>}
              </div>
              <div>
                <label style={LBL}>{s.lSell}</label>
                <RInput hasError={!!errors.sale} type="number" min="0" placeholder="What you received from selling"
                  value={form.sale} onChange={upd("sale")}
                  onFocus={()=>setErrors(e=>({...e,sale:null}))}/>
                {errors.sale&&<p style={{fontSize:12,color:T.err,marginTop:5}}>{errors.sale}</p>}
              </div>
              <div>
                <label style={LBL}>
                  {s.lTds}{" "}
                  <span style={{color:T.muted,fontWeight:400}}>{s.lTdsNote}</span>
                </label>
                <RInput type="number" min="0" placeholder="0 if unsure"
                  value={form.tds} onChange={upd("tds")}/>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={calc}
                  style={{...PRI,flex:1,justifyContent:"center",padding:16,fontSize:16}}>
                  {s.calcBtn}
                </button>
                <button onClick={resetCalc} style={{...SEC2,padding:"16px 18px",fontSize:14}}>
                  {s.resetBtn}
                </button>
              </div>
              <p style={{fontSize:12,color:T.muted,marginTop:-8}}>
                ↩ {lang==="HI"?"Enter दबाएं":lang==="HL"?"Enter dabao":"Press Enter"} to calculate
              </p>
            </div>

            {/* ── Result ── */}
            <div ref={resultRef}>
              {result?(
                <div className="reveal">
                  <div style={{border:`1.5px solid ${T.border}`,borderRadius:6,overflow:"hidden"}}>
                    <div style={{background:T.bgAlt,borderBottom:`1.5px solid ${T.border}`,padding:"14px 20px"}}>
                      <div style={{fontFamily:"monospace",fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                        textTransform:"uppercase",color:T.muted}}>{s.calcSlipTitle} · {form.fy}</div>
                      <div style={{fontFamily:"monospace",fontSize:12,color:T.muted,marginTop:3}}>
                        {form.exchange}{form.txCount?` · ~${form.txCount} tx`:""}
                      </div>
                    </div>
                    {SR(s.rGains,INR(result.gains),result.gains<0?GREEN:T.text)}
                    {SR(s.rTax,INR(result.tax30))}
                    {SR(s.rCess,INR(result.cess))}
                    {SR(s.rGross,INR(result.gross))}
                    {SR(s.rTds,result.tdsAmt>0?`− ${INR(result.tdsAmt)}`:"₹0")}
                    <div style={{background:T.bgAlt,borderTop:`2px solid ${G}`,padding:"14px 20px",
                      display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontFamily:"monospace",fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                          textTransform:"uppercase",color:T.muted}}>{s.rNet}</div>
                        <div style={{fontFamily:"monospace",fontSize:11,color:T.muted,marginTop:3}}>
                          {s.rEff}: {result.eff}%
                        </div>
                      </div>
                      <span style={{fontFamily:"monospace",fontSize:24,fontWeight:800,color:G,letterSpacing:"-0.02em"}}>
                        {INR(result.net)}
                      </span>
                    </div>
                    {result.gains<=0?(
                      <div style={{padding:"12px 20px",background:"#ECFDF5",fontSize:13,color:"#065F46",fontFamily:"monospace"}}>
                        {s.noTax}
                      </div>
                    ):(
                      /* ── gains breakdown bar ── */
                      <div style={{padding:"14px 20px",borderTop:`1px solid ${T.border}`,
                        background:d?"rgba(255,255,255,0.02)":T.bgAlt}}>
                        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",
                          textTransform:"uppercase",color:T.muted,marginBottom:8}}>
                          Gains Breakdown
                        </div>
                        <div style={{height:8,borderRadius:4,overflow:"hidden",display:"flex",
                          background:T.border,marginBottom:8}}>
                          <div style={{width:`${result.keepPct}%`,background:GREEN,
                            borderRadius:"4px 0 0 4px",transition:"width .7s ease"}}/>
                          <div style={{flex:1,background:G}}/>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.muted,flexWrap:"wrap",gap:4}}>
                          <span><span style={{color:GREEN,fontWeight:700}}>■ </span>
                            {s.keepLabel}: {INR(result.keepAmt)} ({result.keepPct}%)</span>
                          <span><span style={{color:G,fontWeight:700}}>■ </span>
                            {s.taxLabel}: {INR(result.net)} ({result.taxPct}%)</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p style={{fontSize:12,color:T.muted,margin:"10px 0 14px",lineHeight:1.55}}>{s.calcNote}</p>
                  <div className="fmob" style={{display:"flex",gap:8}}>
                    <button onClick={doCopy} style={{...PRI,padding:"10px 14px",fontSize:13}}>
                      {copied?s.copiedBtn:s.copyBtn}
                    </button>
                    <button onClick={doWA} style={{...SEC2,fontSize:13,padding:"10px 14px"}}>{s.waBtn}</button>
                    <button onClick={doPrint} style={{...SEC2,fontSize:13,padding:"10px 14px"}}>{s.pdfBtn}</button>
                  </div>
                </div>
              ):(
                <div style={{border:`1.5px dashed ${T.border}`,borderRadius:12,
                  padding:"60px 32px",textAlign:"center",color:T.muted}}>
                  <div style={{fontSize:42,marginBottom:14}}>📊</div>
                  <div style={{fontWeight:600,marginBottom:6,color:T.text}}>{s.emptyH}</div>
                  <div style={{fontSize:13}}>{s.emptySub}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CSV HELP ── */}
      <section style={{background:T.bgAlt,padding:"36px 24px"}}>
        <div style={W}>
          <div className="cmob" style={{border:`1px solid ${T.border}`,borderRadius:12,background:T.card,
            padding:"24px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:18}}>
            <div>
              <h3 style={{fontSize:17,fontWeight:700,marginBottom:5,letterSpacing:"-0.02em",color:T.text}}>{s.csvH}</h3>
              <p style={{fontSize:14,color:T.text2,maxWidth:480,lineHeight:1.55}}>{s.csvSub}</p>
            </div>
            <a href="mailto:qamin219@gmail.com?subject=CSV for Schedule VDA Summary"
              style={{...PRI,whiteSpace:"nowrap",flexShrink:0}}>{s.csvBtn}</a>
          </div>
        </div>
      </section>

      {/* ════════ TAX RULES ════════ */}
      <section id="tax-rules" style={{background:T.hero,padding:"80px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize:"32px 32px"}}/>
        <div style={{...W,position:"relative"}}>
          <p style={EYE}>{s.taxEye}</p>
          <h2 style={{...H2,color:"#E8ECF4",marginBottom:10}}>{s.taxH}</h2>
          <p style={{color:"#7B85A0",fontSize:16,marginBottom:44,maxWidth:480}}>{s.taxSub}</p>
          <div style={{display:"grid",gap:12,maxWidth:700}}>
            {TAX_RULES.map(({icon,rule,detail})=>(
              <div key={rule} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"18px 20px",
                border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,background:"rgba(255,255,255,0.025)"}}>
                <span style={{fontSize:20,flexShrink:0,marginTop:1}}>{icon}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:"#E8ECF4",marginBottom:4}}>{rule}</div>
                  <div style={{fontSize:13,color:"#7B85A0",lineHeight:1.55}}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{marginTop:24,fontSize:13.5,color:G}}>{s.taxNote}</p>
        </div>
      </section>

      {/* ════════ COMPARISON ════════ */}
      <section style={SEC()}>
        <div style={W}>
          <p style={EYE}>{s.compEye}</p>
          <h2 style={{...H2,marginBottom:10}}>{s.compH}</h2>
          <p style={{color:T.muted,fontSize:16,marginBottom:40,maxWidth:420}}>{s.compSub}</p>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr>
                  <th style={{textAlign:"left",padding:"12px 16px",fontSize:11,fontWeight:700,
                    letterSpacing:"0.06em",textTransform:"uppercase",color:T.muted,
                    borderBottom:`1.5px solid ${T.border}`,width:"36%"}}/>
                  <th style={{textAlign:"left",padding:"12px 16px",fontSize:11,fontWeight:700,
                    letterSpacing:"0.06em",textTransform:"uppercase",color:G,
                    borderBottom:`1.5px solid ${T.border}`}}>BYK CryptoTax</th>
                  <th style={{textAlign:"left",padding:"12px 16px",fontSize:11,fontWeight:700,
                    letterSpacing:"0.06em",textTransform:"uppercase",color:T.muted,
                    borderBottom:`1.5px solid ${T.border}`}}>Typical Paid Tools</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([feat,byk,paid])=>(
                  <tr key={feat}>
                    <td style={{padding:"13px 16px",fontSize:14,borderBottom:`1px solid ${T.border}`,fontWeight:600,color:T.text}}>{feat}</td>
                    <td style={{padding:"13px 16px",fontSize:14,borderBottom:`1px solid ${T.border}`,fontWeight:600,color:T.text}}>{byk}</td>
                    <td style={{padding:"13px 16px",fontSize:14,borderBottom:`1px solid ${T.border}`,color:T.muted}}>{paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{marginTop:22,fontSize:14,color:T.muted,fontStyle:"italic"}}>{s.compNote}</p>
        </div>
      </section>

      {/* ════════ PRIVACY ════════ */}
      <section style={SEC(T.bgAlt)}>
        <div style={W}>
          <p style={EYE}>{s.privEye}</p>
          <h2 style={{...H2,marginBottom:18}}>{s.privH}</h2>
          <p style={{fontSize:16,lineHeight:1.7,color:T.text2,maxWidth:600,marginBottom:32}}>{s.privBody}</p>
          <div className="fmob" style={{display:"flex",gap:12}}>
            {["🔒 No data stored","🚫 No ads or trackers","🇮🇳 DPDP Act, 2023 aligned"].map(b=>(
              <span key={b} style={{padding:"9px 16px",border:`1px solid ${T.border}`,borderRadius:8,
                fontSize:13.5,fontWeight:600,background:T.card,color:T.text}}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHY WE BUILT ════════ */}
      <section style={SEC()}>
        <div style={W}>
          <p style={EYE}>{s.whyEye}</p>
          <h2 style={{...H2,marginBottom:28}}>{s.whyH}</h2>
          <blockquote style={{borderLeft:`3px solid ${G}`,paddingLeft:24,
            fontSize:"clamp(15px,2vw,18px)",lineHeight:1.72,
            color:T.text2,maxWidth:620,fontStyle:"italic"}}>
            {s.whyQ}
          </blockquote>
          <p style={{marginTop:18,fontSize:14,color:T.muted}}>{s.whyAttr}</p>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section id="faq" style={SEC(T.bgAlt)}>
        <div style={W}>
          <p style={EYE}>{s.faqEye}</p>
          <h2 style={{...H2,marginBottom:40}}>{s.faqH}</h2>
          <div style={{maxWidth:700}}>
            {faqs.map((item,i)=>(
              <div key={i} style={{borderBottom:`1px solid ${T.border}`}}>
                <button onClick={()=>setFaqOpen(faqOpen===i?null:i)}
                  style={{width:"100%",background:"none",border:"none",cursor:"pointer",
                    textAlign:"left",padding:"18px 0",fontSize:15,fontWeight:600,color:T.text,
                    display:"flex",justifyContent:"space-between",alignItems:"center",gap:16}}>
                  <span>{item.q}</span>
                  <span style={{color:G,fontSize:22,flexShrink:0,display:"inline-block",
                    transform:faqOpen===i?"rotate(45deg)":"none",transition:"transform .2s"}}>+</span>
                </button>
                {faqOpen===i&&(
                  <p style={{paddingBottom:16,fontSize:14.5,lineHeight:1.65,color:T.text2}}
                    className="fade">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ COMMUNITY + FINAL CTA ════════ */}
      <section style={{background:T.hero,padding:"80px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize:"28px 28px"}}/>
        <div style={{...W,position:"relative"}}>
          <div style={{textAlign:"center",marginBottom:64,paddingBottom:64,
            borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <p style={EYE}>{s.comEye}</p>
            <h2 style={{...H2,color:"#E8ECF4",marginBottom:14}}>{s.comH}</h2>
            <p style={{color:"#7B85A0",fontSize:16,maxWidth:420,margin:"0 auto 28px"}}>{s.comSub}</p>
            <div className="fmob" style={{display:"flex",gap:12,justifyContent:"center"}}>
              <a href="https://www.whatsapp.com/channel/0029Vb7OqOu60eBcKzMpxb0b0w" target="_blank" rel="noreferrer" style={PRI}>{s.waGroup}</a>
              <a href="https://t.me/+A5ZACC8YKig0Njdl" target="_blank" rel="noreferrer" style={OUT}>{s.tgFollow}</a>
            </div>
          </div>
          <div style={{border:"1px solid rgba(232,147,10,0.22)",borderRadius:16,
            padding:"52px 40px",textAlign:"center",background:"rgba(232,147,10,0.04)"}}>
            <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:800,letterSpacing:"-0.035em",
              color:"#E8ECF4",marginBottom:10}}>{s.finalH}</h2>
            <p style={{color:"#7B85A0",fontSize:16,marginBottom:28}}>{s.finalSub}</p>
            <button onClick={()=>go("calculator")}
              style={{...PRI,padding:"15px 36px",fontSize:16}}>{s.finalCTA}</button>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer id="contact" style={{background:"#06090F",padding:"48px 24px 28px",
        borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div style={W}>
          <div className="cmob" style={{display:"flex",justifyContent:"space-between",
            alignItems:"flex-start",gap:28,marginBottom:36}}>
            <div>
              <div style={{fontWeight:900,fontSize:16,color:"#E8ECF4",marginBottom:8,letterSpacing:"-0.03em"}}>
                BYK <span style={{color:G}}>CryptoTax</span>
              </div>
              <p style={{fontSize:13.5,color:"#5B6170",maxWidth:340,lineHeight:1.6}}>{s.footerDesc}</p>
            </div>
            <nav className="hmob" style={{display:"flex",gap:20,fontSize:13.5,color:"#5B6170",flexShrink:0}}>
              {[[s.navHow,"how-it-works"],[s.navCalc,"calculator"],[s.navFaq,"faq"]].map(([l,id])=>(
                <button key={id} onClick={()=>go(id)}
                  style={{background:"none",border:"none",cursor:"pointer",color:"#5B6170",fontSize:13.5}}>
                  {l}
                </button>
              ))}
              <a href="mailto:qamin219@gmail.com" style={{color:"#5B6170"}}>{s.navContact}</a>
            </nav>
          </div>
          <div style={{padding:"18px 22px",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,
            fontSize:12,lineHeight:1.65,color:"#484F5E",background:"rgba(255,255,255,0.015)",marginBottom:28}}>
            <strong style={{color:"#7B85A0"}}>Disclaimer: </strong>
            {s.disc}{" "}
            <a href="https://incometax.gov.in" target="_blank" rel="noreferrer" style={{color:G}}>
              incometax.gov.in
            </a>.
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <span style={{fontSize:12.5,color:"#484F5E"}}>{s.copy}</span>
            <div style={{display:"flex",gap:18}}>
              <a href="https://youtube.com/@bykfinance" target="_blank" rel="noreferrer" style={{fontSize:13,color:"#5B6170"}}>YouTube</a>
              <a href="https://instagram.com/buildyourknowledge2023" target="_blank" rel="noreferrer" style={{fontSize:13,color:"#5B6170"}}>Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}