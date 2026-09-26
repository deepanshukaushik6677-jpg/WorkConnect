
const categories=[
{name:'Plumber',icon:'⌁',desc:'Pipes, leaks, fittings & repairs'},
{name:'Electrician',icon:'ϟ',desc:'Wiring, repairs & installations'},
{name:'Cleaner',icon:'✦',desc:'Home, office & deep cleaning'},
{name:'Driver',icon:'↗',desc:'Personal, commercial & delivery'},
{name:'Painter',icon:'◌',desc:'Interior, exterior & finishing'},
{name:'Carpenter',icon:'⌂',desc:'Furniture, doors & woodwork'},
{name:'Technician',icon:'⚙',desc:'Appliance, device & field repair'},
{name:'Construction',icon:'▧',desc:'Site, labour & skilled trades'},
{name:'Security',icon:'◇',desc:'Guards, site & night duty'},
{name:'Domestic helper',icon:'♡',desc:'Household and routine support'},
{name:'Delivery',icon:'□',desc:'Local pickup & last-mile work'},
{name:'Manager',icon:'◒',desc:'Operations, stores & teams'}
];

const matches=[
{initials:'RK',name:'Ravi Kumar',role:'Electrician · 8 yrs',meta:'2.4 km',rate:'₹450–₹900',tags:['verified','available','high-rated'],rating:'4.9'},
{initials:'AS',name:'Asha Singh',role:'Cleaner · 5 yrs',meta:'1.8 km',rate:'₹500–₹900',tags:['verified','available'],rating:'4.8'},
{initials:'NP',name:'Nitin Pal',role:'Plumber · 11 yrs',meta:'3.1 km',rate:'₹400–₹850',tags:['available','high-rated'],rating:'4.9'},
{initials:'SM',name:'Sajid Malik',role:'Technician · 7 yrs',meta:'4.0 km',rate:'₹350–₹750',tags:['verified'],rating:'4.6'},
{initials:'VM',name:'Vivek Mishra',role:'Driver · 6 yrs',meta:'2.7 km',rate:'₹800–₹1,400/day',tags:['verified','available','high-rated'],rating:'4.9'},
{initials:'PG',name:'Pooja Gupta',role:'Domestic helper · 4 yrs',meta:'2.2 km',rate:'₹8k–₹12k/month',tags:['verified','high-rated'],rating:'4.8'},
{initials:'AM',name:'Arun Mishra',role:'Painter · 9 yrs',meta:'3.6 km',rate:'₹650–₹1,100/day',tags:['available'],rating:'4.7'},
{initials:'RS',name:'Rohit Sharma',role:'Construction · 12 yrs',meta:'5.0 km',rate:'₹700–₹1,200/day',tags:['verified','high-rated'],rating:'4.9'}
];

const categoryGrid=document.querySelector('#category-grid');
categoryGrid.innerHTML=categories.map(item=>`
<button class="category" type="button" data-toast="${item.name} category selected">
  <span class="category-icon" aria-hidden="true">${item.icon}</span>
  <strong>${item.name}</strong>
  <small>${item.desc}</small>
</button>`).join('');

function renderMatches(filter='all'){
  const result=filter==='all'?matches:matches.filter(item=>item.tags.includes(filter));
  document.querySelector('#result-count').textContent=`${result.length} ${result.length===1?'match':'matches'}`;
  document.querySelector('#search-results').innerHTML=result.map(item=>`
    <article class="search-result">
      <div class="avatar">${item.initials}</div>
      <div><strong>${item.name}</strong><small>${item.role} · ${item.meta}</small></div>
      <div class="search-result-meta"><strong>${item.rate}</strong><small>${item.rating} ★</small></div>
    </article>`).join('');
}
renderMatches();

document.querySelectorAll('.intent-btn').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.intent-btn').forEach(item=>{
      item.classList.remove('is-active');
      item.setAttribute('aria-selected','false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-selected','true');
    const isWorker=button.dataset.intent==='work';
    document.querySelector('#service').placeholder=isWorker?'Try “electrician”, “driver”, “cleaner”…':'Try “electrician”, “driver”, “painter”…';
    document.querySelector('.search-submit').textContent=isWorker?'Find work':'Find people';
  });
});

document.querySelector('#hero-search').addEventListener('submit',event=>{
  event.preventDefault();
  const service=document.querySelector('#service').value.trim();
  const location=document.querySelector('#location').value.trim();
  const intent=document.querySelector('.intent-btn.is-active').dataset.intent;
  const verb=intent==='work'?'work opportunities':'workers';
  const locationText=location?` near ${location}`:'';
  const serviceText=service?` for “${service}”`:'';
  showToast(`Demo search: ${verb}${serviceText}${locationText}`);
  document.querySelector('#how-it-works').scrollIntoView({behavior:'smooth',block:'start'});
});

document.querySelectorAll('.filter-chip').forEach(chip=>{
  chip.addEventListener('click',()=>{
    document.querySelectorAll('.filter-chip').forEach(item=>item.classList.remove('is-active'));
    chip.classList.add('is-active');
    renderMatches(chip.dataset.filter);
  });
});

const flowTabs=document.querySelectorAll('.workflow-tab');
flowTabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    flowTabs.forEach(item=>{
      item.classList.remove('is-active');
      item.setAttribute('aria-selected','false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected','true');
    document.querySelector('#workflow-hirer').classList.toggle('hidden',tab.dataset.flow!=='hirer');
    document.querySelector('#workflow-worker').classList.toggle('hidden',tab.dataset.flow!=='worker');
  });
});

const jobCopy={
'one-time':'Best for a clearly defined task with a start and finish.',
temporary:'Best for a fixed period, recurring shift or defined project.',
regular:'Best for ongoing work, recurring services or permanent employment.'
};
document.querySelectorAll('.job-type').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.job-type').forEach(item=>item.classList.remove('is-active'));
    button.classList.add('is-active');
    document.querySelector('#job-flow-copy').textContent=jobCopy[button.dataset.jobtype];
  });
});

const modalShell=document.querySelector('#modal-shell');
const modalTitle=document.querySelector('#modal-title');
const modalCopy=document.querySelector('#modal-copy');
function openModal(role='hirer'){
  const worker=role==='worker';
  modalTitle.textContent=worker?'Start your local work profile.':'Start your local hiring journey.';
  modalCopy.textContent=worker
    ?'Create a profile with your categories, skills, service area, availability and work preferences.'
    :'Search nearby workers, post a job and manage the relationship from request to completion.';
  modalShell.classList.add('is-open');
  modalShell.setAttribute('aria-hidden','false');
  document.querySelector('.modal-close').focus();
}
function closeModal(){
  modalShell.classList.remove('is-open');
  modalShell.setAttribute('aria-hidden','true');
}
document.querySelectorAll('.js-auth').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.role)));
document.querySelectorAll('[data-modal-close]').forEach(element=>element.addEventListener('click',closeModal));
document.querySelectorAll('.js-request').forEach(button=>button.addEventListener('click',()=>openModal('hirer')));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&modalShell.classList.contains('is-open')) closeModal();
});

document.querySelectorAll('.modal-option, [data-toast]').forEach(element=>{
  element.addEventListener('click',()=>{
    const message=element.dataset.toast;
    if(message) showToast(message);
    if(element.classList.contains('modal-option')) closeModal();
  });
});

const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
menuToggle?.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded',String(open));
  mobileNav.setAttribute('aria-hidden',String(!open));
});
mobileNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  mobileNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded','false');
  mobileNav.setAttribute('aria-hidden','true');
}));

function showToast(message){
  const toast=document.querySelector('#toast');
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2400);
}

document.querySelector('#year').textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
