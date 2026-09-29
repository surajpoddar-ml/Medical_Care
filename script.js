const quick=[['fa-calendar-check','Book Appointment','Reserve your visit online','#appointment'],['fa-user-doctor','Find a Doctor','Meet our specialists','#doctors'],['fa-hospital','Our Departments','Explore specialties','#departments'],['fa-truck-medical','Emergency','24/7 immediate care','#emergency'],['fa-phone','Contact Hospital','Call or visit us','#contact']];
const depts=[['fa-truck-medical','Emergency Medicine','24/7 round-the-clock critical and trauma care.'],['fa-stethoscope','General Medicine','Comprehensive diagnosis and treatment for acute and chronic conditions.'],['fa-user-doctor','General Surgery','Safe advanced minimally invasive and open surgical interventions.'],['fa-baby','Pediatrics','Gentle pediatric healthcare and vaccinations for newborns and children.'],['fa-person-pregnant','Obstetrics & Gynecology','Dedicated maternity, prenatal and comprehensive women health care.'],['fa-bone','Orthopedics','Advanced bone, joint restoration, fracture repair and spine care.'],['fa-heart-pulse','Cardiology','Cardiac evaluations, preventive screening and diagnostic ECG.'],['fa-hand-dots','Dermatology','Specialized care for clinical and aesthetic skin conditions.'],['fa-x-ray','Radiology','High-precision digital radiography and ultrasound diagnostics.'],['fa-microscope','Pathology','Fast, reliable clinical laboratory diagnostics and pathology.']];
const docs=[['Dr. Name Surname','General Medicine','10+ yrs'],['Dr. Name Surname','General Surgery','12+ yrs'],['Dr. Name Surname','Obstetrics & Gynecology','9+ yrs'],['Dr. Name Surname','Pediatrics','8+ yrs'],['Dr. Name Surname','Orthopedics','11+ yrs'],['Dr. Name Surname','Cardiology','10+ yrs'],['Dr. Name Surname','Radiology','7+ yrs'],['Dr. Name Surname','Emergency Medicine','9+ yrs']];
const svcs=[['fa-truck-medical','24/7 Emergency Care','Immediate response any hour.'],['fa-user-nurse','OPD Services','Consultations with specialists.'],['fa-dna','Diagnostic Services','Fast, reliable diagnostics.'],['fa-vial','Laboratory','Complete pathology tests.'],['fa-pills','Pharmacy','Medicines available on site.'],['fa-x-ray','Radiology & Imaging','Digital X-ray and ultrasound.'],['fa-van-shuttle','Ambulance Service','Safe patient transport.'],['fa-clipboard-check','Health Checkup','Preventive health packages.'],['fa-bed-pulse','Inpatient Care','Comfortable, monitored rooms.'],['fa-syringe','Surgical Services','Modern operation theatre.']];
const sups=[['fa-headset','Patient Support','Guidance for every step of your visit.'],['fa-calendar-days','Appointment Help','Rescheduling and booking assistance.'],['fa-file-invoice-dollar','Insurance & Billing','Billing questions and claims.'],['fa-prescription-bottle-medical','Pharmacy Support','Medicine availability and advice.'],['fa-folder-open','Medical Records','Request reports and records.'],['fa-circle-question','General Enquiry','Anything else – just ask.']];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const card=(i,t,d,x='')=>`<div class="card reveal"><div class="ic"><i class="fa-solid ${i}"></i></div><h3>${t}</h3><p>${d}</p>${x}</div>`;

$('#quick').innerHTML=quick.map(q=>`<a href="${q[3]}" class="card"><div class="ic"><i class="fa-solid ${q[0]}"></i></div><h3>${q[1]}</h3><p>${q[2]}</p></a>`).join('');
$('#deptGrid').innerHTML=depts.map(d=>card(d[0],d[1],d[2],'<a class="lnk" href="#doctors">View Department →</a>')).join('');
$('#svcGrid').innerHTML=svcs.map(s=>card(...s)).join('');
$('#supGrid').innerHTML=sups.map(s=>card(...s)).join('');
$('#docGrid').innerHTML=docs.map((d,i)=>`<div class="card doc reveal"><div class="av"><i class="fa-solid fa-user-doctor"></i></div><h3>${d[0]}</h3><p>${d[1]}</p><p><b>${d[2]}</b> experience</p><div class="row"><a href="#contact" class="btn btn-out">View Profile</a><a href="#appointment" class="btn btn-primary" data-doc="${i}">Book</a></div></div>`).join('');
$('#fDept').innerHTML+=depts.map(d=>`<option>${d[1]}</option>`).join('');
$('#fDoc').innerHTML+=docs.map((d,i)=>`<option>${d[0]} (${d[1]}) #${i+1}</option>`).join('');
$('#fDate').min=new Date().toISOString().split('T')[0];

const slides=$$('.slide'),dots=$('#dots');let cur=0,timer;
slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Slide '+(i+1));b.onclick=()=>{go(i);auto()};dots.append(b)});
function go(n){slides[cur].classList.remove('active');cur=(n+slides.length)%slides.length;slides[cur].classList.add('active');$$('#dots button').forEach((b,i)=>b.classList.toggle('on',i===cur))}
function auto(){clearInterval(timer);timer=setInterval(()=>go(cur+1),5000)}
$('#prev').onclick=()=>{go(cur-1);auto()};$('#next').onclick=()=>{go(cur+1);auto()};
go(0);auto();

const menu=$('#menu'),burger=$('#burger');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
$$('#menu a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){menu.classList.remove('open');burger.setAttribute('aria-expanded',false);burger.focus()}});
addEventListener('scroll',()=>{$('#navbar').classList.toggle('scrolled',scrollY>40);$('#toTop').classList.toggle('show',scrollY>500)},{passive:true});
$('#toTop').onclick=()=>scrollTo({top:0,behavior:'smooth'});
const secs=$$('section[id]');
const navObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#menu a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>navObs.observe(s));

const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>rv.observe(el));

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const cObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cObs.unobserve(e.target);
 const el=e.target,end=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now();
 const step=t=>{const progress=reduce?1:Math.min((t-t0)/1400,1);const ease=1-Math.pow(1-progress,3);el.textContent=Math.floor(end*ease).toLocaleString()+(ease>=1?suf:'');if(progress<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.4});
$$('[data-count]').forEach(el=>cObs.observe(el));

const modal=$('#modal');
let lastFocusedElement=null;
function showModal(title,msg){lastFocusedElement=document.activeElement;$('#mt').textContent=title;$('#mp').textContent=msg;modal.hidden=false;$('#mclose').focus()}
function closeModal(){modal.hidden=true;if(lastFocusedElement)lastFocusedElement.focus()}
$('#mclose').onclick=closeModal;
modal.onclick=e=>{if(e.target===modal)closeModal()};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()});

function validate(form){let ok=true;
 form.querySelectorAll('[required]').forEach(f=>{const bad=!f.value.trim()||(f.pattern&&!new RegExp('^'+f.pattern+'$').test(f.value));f.classList.toggle('invalid',bad);if(bad)ok=false});
 const em=form.querySelector('[type=email]');if(em&&em.value&&!em.checkValidity()){em.classList.add('invalid');ok=false}
 return ok}
$('#apptForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target;
 if(!validate(f)){f.querySelector('.invalid').focus();return}
 showModal('Request Received','Your appointment request has been received. Our support team will contact you shortly.');f.reset()});
$('#supForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target;
 if(!validate(f))return;showModal('Message Sent','Thank you. Our patient support team will get back to you shortly.');f.reset()});
$$('[data-doc]').forEach(b=>b.addEventListener('click',()=>{const d=docs[b.dataset.doc];$('#fDoc').selectedIndex=+b.dataset.doc+1;$('#fDept').value=d[1]}));
