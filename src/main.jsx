import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {
  MapPin, Search, Bell, UserRound, HeartPulse, Siren, Bot, CalendarDays,
  FileText, Pill, Home, Stethoscope, Navigation, Phone, Mic, Camera,
  Languages, ShieldCheck, ChevronRight, Clock, Hospital, X, Send
} from "lucide-react";
import "./styles.css";

const doctors = [
  {id:1,name:"Dr. Ananya Patil",specialty:"Cardiologist",hospital:"District Civil Hospital",distance:"1.8 km",exp:"12 years",phone:"+91 90000 00001",address:"Main Road, Maharashtra",available:"Today · 4:30 PM"},
  {id:2,name:"Dr. Rahul Deshmukh",specialty:"Pediatrician",hospital:"Rural Community Health Centre",distance:"2.6 km",exp:"9 years",phone:"+91 90000 00002",address:"PHC Road, Maharashtra",available:"Today · 5:15 PM"},
  {id:3,name:"Dr. Meera Kulkarni",specialty:"Dermatologist",hospital:"Sahyadri Government Clinic",distance:"4.1 km",exp:"8 years",phone:"+91 90000 00003",address:"Market Area, Maharashtra",available:"Tomorrow · 10:00 AM"},
  {id:4,name:"Dr. Vikram Jadhav",specialty:"Orthopedic",hospital:"Taluka Hospital",distance:"5.3 km",exp:"15 years",phone:"+91 90000 00004",address:"Taluka Main Road, Maharashtra",available:"Tomorrow · 11:30 AM"}
];

const services = [
  {name:"District Civil Hospital",type:"Government Hospital",distance:"1.8 km",icon:"🏥"},
  {name:"Rural Community Health Centre",type:"CHC",distance:"2.6 km",icon:"🩺"},
  {name:"Sahyadri Government Clinic",type:"PHC",distance:"4.1 km",icon:"🏥"},
  {name:"Government Diagnostic Centre",type:"Diagnostics",distance:"4.7 km",icon:"🧪"}
];

function App(){
  const [screen,setScreen]=useState("home");
  const [lang,setLang]=useState("English");
  const [search,setSearch]=useState("");
  const [selectedDoctor,setSelectedDoctor]=useState(null);
  const [emergency,setEmergency]=useState(false);
  const [toast,setToast]=useState("");

  const notify=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2600)};
  const filtered=doctors.filter(d => (d.name+d.specialty+d.hospital).toLowerCase().includes(search.toLowerCase()));

  return <div className="app">
    <header className="topbar">
      <div className="brand" onClick={()=>setScreen("home")}><div className="logo"><HeartPulse size={23}/></div><div><b>GramDoctor-Rural-HealthCare</b><small>Rural Health Connect</small></div></div>
      <div className="header-actions"><button className="icon-btn" onClick={()=>notify("No new notifications")}><Bell/></button><button className="avatar" onClick={()=>setScreen("profile")}>R</button></div>
    </header>

    {screen==="home" && <main>
      <section className="hero">
        <div><span className="eyebrow">SMART PUBLIC HEALTHCARE</span><h1>Healthcare, closer to you.</h1><p>Find specialists, government hospitals and emergency care around your current location.</p></div>
        <div className="hero-badge"><ShieldCheck/><span>Consent-first<br/>health support</span></div>
      </section>

      <div className="search-row"><div className="search"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search specialist, hospital or service..."/></div><button className="lang" onClick={()=>setLang(lang==="English"?"मराठी":"English")}><Languages size={18}/>{lang}</button></div>

      <section className="map-card">
        <div className="map"><div className="map-grid"></div>
          <div className="user-pin"><span>YOU</span><MapPin fill="currentColor"/></div>
          {filtered.slice(0,4).map((d,i)=><button key={d.id} className={"map-pin p"+i} onClick={()=>setSelectedDoctor(d)} title={d.specialty}><span>{d.specialty}</span>●</button>)}
          <div className="map-label"><Navigation size={15}/> Your location · Demo map</div>
        </div>
        <div className="map-side">
          <div className="side-title"><span>Nearby specialists</span><small>{filtered.length} found</small></div>
          {filtered.slice(0,3).map(d=><button className="mini-doctor" key={d.id} onClick={()=>setSelectedDoctor(d)}>
            <div className="doc-avatar">{d.name.split(" ").slice(1,2)[0]?.[0]||"D"}</div><div><b>{d.name}</b><small>{d.specialty} · {d.distance}</small></div><ChevronRight size={17}/>
          </button>)}
          <button className="outline-btn" onClick={()=>setScreen("doctors")}>View all specialists</button>
        </div>
      </section>

      <section className="quick-grid">
        <button className="quick emergency" onClick={()=>setEmergency(true)}><div><Siren/><b>Emergency Mode</b><span>Get help quickly</span></div><ChevronRight/></button>
        <button className="quick" onClick={()=>setScreen("ai")}><div><Bot/><b>Arogya AI</b><span>Multilingual health guidance</span></div><ChevronRight/></button>
        <button className="quick" onClick={()=>setScreen("records")}><div><FileText/><b>My Health Records</b><span>Reports & prescriptions</span></div><ChevronRight/></button>
        <button className="quick" onClick={()=>setScreen("medicines")}><div><Pill/><b>Medicines</b><span>Reminders & schedule</span></div><ChevronRight/></button>
      </section>

      <section className="section"><div className="section-head"><div><h2>Nearby public healthcare</h2><p>Services useful for rural and underserved communities</p></div><button className="text-btn" onClick={()=>setScreen("services")}>See all</button></div>
        <div className="service-list">{services.slice(0,3).map(s=><div className="service" key={s.name}><div className="service-icon">{s.icon}</div><div><b>{s.name}</b><small>{s.type} · {s.distance}</small></div><button onClick={()=>notify("Navigation started for "+s.name)}><Navigation size={17}/></button></div>)}</div>
      </section>
    </main>}

    {screen==="doctors" && <Page title="Find a specialist" onBack={()=>setScreen("home")}><div className="search full"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or speciality..."/></div><div className="doctor-grid">{filtered.map(d=><DoctorCard d={d} key={d.id} onClick={()=>setSelectedDoctor(d)}/>)}</div></Page>}
    {screen==="services" && <Page title="Public healthcare services" onBack={()=>setScreen("home")}><div className="doctor-grid">{services.map(s=><div className="service big" key={s.name}><div className="service-icon">{s.icon}</div><div><b>{s.name}</b><small>{s.type} · {s.distance}</small><p>Open today · Government/public service</p></div><button onClick={()=>notify("Navigation started")}><Navigation size={17}/></button></div>)}</div></Page>}
    {screen==="records" && <Page title="My Health Records" onBack={()=>setScreen("home")}><div className="stats"><div><FileText/><b>4</b><small>Reports</small></div><div><Stethoscope/><b>3</b><small>Visits</small></div><div><Pill/><b>2</b><small>Active medicines</small></div></div><div className="panel"><h3>Recent medical documents</h3>{["Blood Test Report.pdf","Prescription · Dr. Ananya Patil","Chest X-Ray Report.jpg","Previous Visit Summary"].map((x,i)=><div className="record" key={x}><FileText/><div><b>{x}</b><small>{i+1} Sept 2026</small></div><ChevronRight/></div>)}</div></Page>}
    {screen==="medicines" && <Page title="Medicines & reminders" onBack={()=>setScreen("home")}><div className="medicine-card"><div className="pill-icon"><Pill/></div><div><b>Medicine A</b><small>1 tablet · After food</small><div className="times"><span>08:00 AM</span><span>08:00 PM</span></div></div><button className="taken" onClick={()=>notify("Medicine marked as taken ✓")}>Mark taken</button></div><div className="panel"><h3>Upcoming appointment</h3><div className="appointment"><CalendarDays/><div><b>Dr. Ananya Patil · Cardiology</b><small>15 Sept 2026 · 4:30 PM</small></div><button onClick={()=>notify("Appointment reminder set")}>Reminder</button></div></div></Page>}
    {screen==="ai" && <AI onBack={()=>setScreen("home")} notify={notify}/>}
    {screen==="profile" && <Page title="Profile & permissions" onBack={()=>setScreen("home")}><div className="profile-card"><div className="profile-big">R</div><h2>Rena</h2><p>Language: {lang}</p></div>{["📍 Location permission","🎤 Microphone permission","📷 Camera permission","🔔 Notifications"].map(x=><div className="permission" key={x}><span>{x}</span><strong>Allowed</strong></div>)}</Page>}

    <nav className="bottom"><button className={screen==="home"?"active":""} onClick={()=>setScreen("home")}><Home/><span>Home</span></button><button onClick={()=>setScreen("doctors")}><Stethoscope/><span>Doctors</span></button><button onClick={()=>setEmergency(true)} className="nav-em"><Siren/><span>Emergency</span></button><button onClick={()=>setScreen("records")}><FileText/><span>Records</span></button><button onClick={()=>setScreen("profile")}><UserRound/><span>Profile</span></button></nav>

    {selectedDoctor && <div className="modal-bg" onClick={()=>setSelectedDoctor(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelectedDoctor(null)}><X/></button><div className="doc-head"><div className="doc-avatar xl">{selectedDoctor.name[3]}</div><div><h2>{selectedDoctor.name}</h2><p>{selectedDoctor.specialty}</p></div></div><div className="info-grid"><span>🏥 Hospital<b>{selectedDoctor.hospital}</b></span><span>📍 Distance<b>{selectedDoctor.distance}</b></span><span>⏱ Experience<b>{selectedDoctor.exp}</b></span><span>📞 Phone<b>{selectedDoctor.phone}</b></span></div><div className="address"><MapPin size={17}/>{selectedDoctor.address}</div><div className="modal-actions"><button className="outline-btn" onClick={()=>notify("Calling "+selectedDoctor.name)}> <Phone/> Call</button><button className="primary" onClick={()=>notify("Appointment request created for "+selectedDoctor.available)}> <CalendarDays/> Book appointment</button></div></div></div>}

    {emergency && <Emergency onClose={()=>setEmergency(false)} notify={notify}/>}
    {toast && <div className="toast">{toast}</div>}
  </div>
}

function Page({title,onBack,children}){return <main className="page"><button className="back" onClick={onBack}>← Back</button><h1>{title}</h1>{children}</main>}
function DoctorCard({d,onClick}){return <button className="doctor-card" onClick={onClick}><div className="doc-avatar">{d.name[3]}</div><div><b>{d.name}</b><small>{d.specialty}</small><span>{d.hospital} · {d.distance}</span><em>{d.available}</em></div><ChevronRight/></button>}

function Emergency({onClose,notify}){
 const [step,setStep]=useState("ready");
 const start=()=>{setStep("checking");setTimeout(()=>setStep("confirm"),1800)};
 return <div className="modal-bg"><div className="emergency-modal">{step==="ready"&&<><div className="danger-icon"><Siren/></div><h1>Emergency Mode</h1><p>Use this when you need urgent help. Your location can be shared with an authorized emergency service after confirmation.</p><div className="consent"><ShieldCheck/> Camera, microphone and location are used only with permission.</div><button className="danger-btn" onClick={start}>Start emergency check</button><button className="cancel" onClick={onClose}>Cancel</button></>}
 {step==="checking"&&<><div className="pulse"><HeartPulse/></div><h1>Checking for emergency…</h1><p>Listening for your voice and preparing your location. Demo mode only.</p><div className="loader"></div></>}
 {step==="confirm"&&<><div className="danger-icon"><Siren/></div><h1>Possible emergency detected</h1><p>Do you need immediate assistance?</p><div className="em-actions"><button className="safe" onClick={onClose}>I'm safe</button><button className="danger-btn" onClick={()=>{notify("Emergency alert prepared with your location");setStep("sent")}}>SEND HELP</button></div></>}
 {step==="sent"&&<><div className="sent">✓</div><h1>Emergency alert prepared</h1><p>Your demo alert contains your current location, emergency status and nearest suitable public healthcare facility.</p><div className="alert-box">📍 Location captured<br/>🏥 Nearest suitable facility identified<br/>🛡️ User consent recorded</div><button className="danger-btn" onClick={onClose}>Close emergency mode</button></>}</div></div>
}

function AI({onBack,notify}){
 const [msgs,setMsgs]=useState([{from:"ai",text:"Namaste! I’m Arogya AI. Tell me what you are experiencing, or upload a report/photo. I can provide general health guidance and help you decide whether to seek care."}]);
 const [input,setInput]=useState("");
 const send=()=>{if(!input.trim())return;const q=input;setMsgs(m=>[...m,{from:"user",text:q},{from:"ai",text:"Thanks. I can help you organize your symptoms, but I cannot confirm a diagnosis. If symptoms are severe, sudden, or life-threatening, use Emergency Mode or contact local emergency services. For a persistent problem, consider booking the appropriate specialist."}]);setInput("")};
 return <main className="page ai-page"><button className="back" onClick={onBack}>← Back</button><div className="ai-title"><div className="ai-logo"><Bot/></div><div><h1>Arogya AI</h1><p>Multilingual health guidance · {langSafe()}</p></div></div><div className="chat">{msgs.map((m,i)=><div className={"bubble "+m.from} key={i}>{m.text}</div>)}</div><div className="ai-tools"><button onClick={()=>notify("Photo upload is a prototype action")}><Camera/> Photo</button><button onClick={()=>notify("Voice input is a prototype action")}><Mic/> Voice</button><button onClick={()=>notify("Report upload is a prototype action")}><FileText/> Report</button></div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Describe your problem..."/><button onClick={send}><Send/></button></div></main>
}
function langSafe(){return "English / Marathi"}
createRoot(document.getElementById("root")).render(<App/>);