import { initModal } from '../components/modal.js';
import { initSlider } from '../components/slider.js';
import { initNavigation } from '../components/navigation.js';
import { submitAppointment, submitSupportMessage } from '../api/appointment.js';

const quick = [
  ['fa-calendar-check', 'Book Appointment', 'Reserve your visit online', '#appointment'],
  ['fa-user-doctor', 'Find a Doctor', 'Meet our specialists', '#doctors'],
  ['fa-hospital', 'Our Departments', 'Explore specialties', '#departments'],
  ['fa-truck-medical', 'Emergency', '24/7 immediate care', '#emergency'],
  ['fa-phone', 'Contact Hospital', 'Call or visit us', '#contact']
];

const depts = [
  ['fa-truck-medical', 'Emergency Medicine', '24/7 round-the-clock critical and trauma care.'],
  ['fa-stethoscope', 'General Medicine', 'Comprehensive diagnosis and treatment for acute and chronic conditions.'],
  ['fa-user-doctor', 'General Surgery', 'Safe advanced minimally invasive and open surgical interventions.'],
  ['fa-baby', 'Pediatrics', 'Gentle pediatric healthcare and vaccinations for newborns and children.'],
  ['fa-person-pregnant', 'Obstetrics & Gynecology', 'Dedicated maternity, prenatal and comprehensive women health care.'],
  ['fa-bone', 'Orthopedics', 'Advanced bone, joint restoration, fracture repair and spine care.'],
  ['fa-heart-pulse', 'Cardiology', 'Cardiac evaluations, preventive screening and diagnostic ECG.'],
  ['fa-hand-dots', 'Dermatology', 'Specialized care for clinical and aesthetic skin conditions.'],
  ['fa-x-ray', 'Radiology', 'High-precision digital radiography and ultrasound diagnostics.'],
  ['fa-microscope', 'Pathology', 'Fast, reliable clinical laboratory diagnostics and pathology.']
];

const docs = [
  ['Dr. Name Surname', 'General Medicine', '10+ yrs'],
  ['Dr. Name Surname', 'General Surgery', '12+ yrs'],
  ['Dr. Name Surname', 'Obstetrics & Gynecology', '9+ yrs'],
  ['Dr. Name Surname', 'Pediatrics', '8+ yrs'],
  ['Dr. Name Surname', 'Orthopedics', '11+ yrs'],
  ['Dr. Name Surname', 'Cardiology', '10+ yrs'],
  ['Dr. Name Surname', 'Radiology', '7+ yrs'],
  ['Dr. Name Surname', 'Emergency Medicine', '9+ yrs']
];

const svcs = [
  ['fa-truck-medical', '24/7 Emergency Care', 'Immediate response and trauma management at any hour.'],
  ['fa-user-nurse', 'OPD Services', 'Specialist outpatient consultations across all medical branches.'],
  ['fa-dna', 'Diagnostic Services', 'High-accuracy pathology and rapid clinical diagnostics.'],
  ['fa-vial', 'Modern Laboratory', 'Comprehensive automated blood and clinical pathology testing.'],
  ['fa-pills', '24/7 Pharmacy', 'Genuine branded medications and pharmaceutical supplies.'],
  ['fa-x-ray', 'Radiology & Imaging', 'High-definition digital X-ray and diagnostic ultrasonography.'],
  ['fa-van-shuttle', 'Ambulance Service', 'Rapid emergency patient transit with life-support equipment.'],
  ['fa-clipboard-check', 'Health Checkups', 'Comprehensive executive and preventive full-body health screening.'],
  ['fa-bed-pulse', 'Inpatient Care', 'Air-conditioned rooms, ICU observation and dedicated nursing.'],
  ['fa-syringe', 'Surgical Services', 'Modular operation theatres equipped with advanced surgical tools.']
];

const sups = [
  ['fa-headset', 'Patient Support', 'Guidance for every step of your visit.'],
  ['fa-calendar-days', 'Appointment Help', 'Rescheduling and booking assistance.'],
  ['fa-file-invoice-dollar', 'Insurance & Billing', 'Billing questions and claims.'],
  ['fa-prescription-bottle-medical', 'Pharmacy Support', 'Medicine availability and advice.'],
  ['fa-folder-open', 'Medical Records', 'Request reports and records.'],
  ['fa-circle-question', 'General Enquiry', 'Anything else – just ask.']
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const card = (i, t, d, x = '') => `<div class="card reveal"><div class="ic"><i class="fa-solid ${i}"></i></div><h3>${t}</h3><p>${d}</p>${x}</div>`;

const quickEl = $('#quick');
if (quickEl) {
  quickEl.innerHTML = quick.map(q => `<a href="${q[3]}" class="card"><div class="ic"><i class="fa-solid ${q[0]}"></i></div><h3>${q[1]}</h3><p>${q[2]}</p></a>`).join('');
}

const deptEl = $('#deptGrid');
if (deptEl) {
  deptEl.innerHTML = depts.map(d => card(d[0], d[1], d[2], '<a class="lnk" href="#doctors">View Department →</a>')).join('');
}

const svcEl = $('#svcGrid');
if (svcEl) {
  svcEl.innerHTML = svcs.map(s => card(...s)).join('');
}

const supEl = $('#supGrid');
if (supEl) {
  supEl.innerHTML = sups.map(s => card(...s)).join('');
}

const docEl = $('#docGrid');
if (docEl) {
  docEl.innerHTML = docs.map((d, i) => `<div class="card doc reveal"><div class="av"><i class="fa-solid fa-user-doctor"></i></div><h3>${d[0]}</h3><p>${d[1]}</p><p><b>${d[2]}</b> experience</p><div class="row"><a href="#contact" class="btn btn-out" aria-label="View doctor profile">View Profile</a><a href="#appointment" class="btn btn-primary" data-doc="${i}" aria-label="Book appointment with ${d[0]}">Book</a></div></div>`).join('');
}

const fDept = $('#fDept');
if (fDept) {
  fDept.innerHTML += depts.map(d => `<option>${d[1]}</option>`).join('');
}

const fDoc = $('#fDoc');
if (fDoc) {
  fDoc.innerHTML += docs.map((d, i) => `<option>${d[0]} (${d[1]}) #${i + 1}</option>`).join('');
}

const fDate = $('#fDate');
if (fDate) {
  const today = new Date();
  fDate.min = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
  fDate.max = maxDate.toISOString().split('T')[0];
}

initSlider();
initNavigation();
const { showModal } = initModal();

const rv = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    rv.unobserve(e.target);
  }
}), { threshold: .08, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach(el => rv.observe(el));

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  cObs.unobserve(e.target);
  const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
  const step = t => {
    const progress = reduce ? 1 : Math.min((t - t0) / 1400, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(end * ease).toLocaleString() + (ease >= 1 ? suf : '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}), { threshold: .4 });
$$('[data-count]').forEach(el => cObs.observe(el));

function validate(form) {
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    const bad = !f.value.trim() || (f.pattern && !new RegExp('^' + f.pattern + '$').test(f.value));
    f.classList.toggle('invalid', bad);
    if (bad) ok = false;
  });
  const em = form.querySelector('[type=email]');
  if (em && em.value && !em.checkValidity()) {
    em.classList.add('invalid');
    ok = false;
  }
  return ok;
}

const apptForm = $('#apptForm');
if (apptForm) {
  apptForm.addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) {
      const firstInvalid = f.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const formData = Object.fromEntries(new FormData(f).entries());
    await submitAppointment(formData);
    showModal('Request Received', 'Your appointment request has been received. Our support team will contact you shortly.');
    f.reset();
  });
}

const supForm = $('#supForm');
if (supForm) {
  supForm.addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    if (!validate(f)) return;
    const formData = Object.fromEntries(new FormData(f).entries());
    await submitSupportMessage(formData);
    showModal('Message Sent', 'Thank you. Our patient support team will get back to you shortly.');
    f.reset();
  });
}

$$('[data-doc]').forEach(b => b.addEventListener('click', () => {
  const d = docs[b.dataset.doc];
  if ($('#fDoc')) $('#fDoc').selectedIndex = +b.dataset.doc + 1;
  if ($('#fDept')) $('#fDept').value = d[1];
}));
