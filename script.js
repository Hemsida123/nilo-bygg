const menuButton=document.querySelector('.menu-toggle'),menu=document.querySelector('#mobile-nav');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Öppna meny');menuButton.querySelector('.menu-word').textContent='Meny';document.body.classList.remove('menu-open');}
menuButton?.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Stäng meny':'Öppna meny');menuButton.querySelector('.menu-word').textContent=open?'Stäng':'Meny';document.body.classList.toggle('menu-open',open);});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
matchMedia('(min-width: 1101px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const dialog=document.querySelector('.lightbox'),allPhotos=[...document.querySelectorAll('.gallery-open')];let photos=allPhotos,currentPhoto=0;
function showPhoto(i){currentPhoto=(i+photos.length)%photos.length;const a=photos[currentPhoto];dialog.querySelector('img').src=a.href;dialog.querySelector('img').alt=a.dataset.caption;dialog.querySelector('.lightbox-caption').textContent=a.dataset.caption;dialog.querySelector('.lightbox-counter').textContent=`${currentPhoto+1} / ${photos.length}`;}
allPhotos.forEach((a)=>a.addEventListener('click',e=>{e.preventDefault();photos=allPhotos.filter(x=>!x.closest('[data-category]')?.hidden);showPhoto(photos.indexOf(a));dialog.showModal();document.body.classList.add('modal-open');}));
dialog?.querySelector('.close-lightbox').addEventListener('click',()=>dialog.close());
dialog?.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog?.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>showPhoto(currentPhoto+Number(b.dataset.direction))));
dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(currentPhoto+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(currentPhoto-1);}});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const group=b.closest('.catalog');group.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));group.querySelectorAll('[data-category]').forEach(x=>x.hidden=b.dataset.filter!=='alla'&&x.dataset.category!==b.dataset.filter);}));
document.querySelectorAll('[data-load-frame]').forEach(b=>b.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src=b.dataset.loadFrame;frame.title=b.dataset.title||'Kundomdömen';frame.loading='lazy';frame.height='650';b.closest('.frame-placeholder').replaceChildren(frame);}));
document.querySelectorAll('form[data-email]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);let body=[...data.entries()].filter(([k,v])=>v).map(([k,v])=>`${k}: ${v}`).join('\n\n');const url='mailto:'+form.dataset.email+'?subject='+encodeURIComponent('Förfrågan via hemsidan')+'&body='+encodeURIComponent(body);const result=form.querySelector('.form-result');result.hidden=false;result.textContent='Ditt mejlprogram öppnas med uppgifterna. Granska och tryck Skicka där. Om inget öppnas kan du mejla oss direkt på '+form.dataset.email+'.';window.location.href=url;}));
document.querySelectorAll('[data-video-play]').forEach(b=>b.addEventListener('click',()=>{const v=b.parentElement.querySelector('video');v.controls=true;v.play().then(()=>b.hidden=true).catch(()=>{b.textContent='Starta filmen';});}));

// Keep keyboard navigation within the expanded mobile menu.
document.addEventListener('keydown',e=>{if(e.key!=='Tab'||menu.hidden)return;const items=[menuButton,...menu.querySelectorAll('a')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});

// A stable, always-visible header. The observer only toggles its subtle scroll shadow.
const header=document.querySelector('.site-header');
const sentinel=document.createElement('span');sentinel.className='header-sentinel';sentinel.setAttribute('aria-hidden','true');document.body.prepend(sentinel);
if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>header.classList.toggle('is-scrolled',!entry.isIntersecting)).observe(sentinel);
