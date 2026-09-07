
(function(){
  for(let i=0;i<20;i++){
    const b=document.createElement('i'); b.className='bubble';
    b.style.left=(Math.random()*100)+'%'; b.style.setProperty('--d',(9+Math.random()*14)+'s');
    b.style.animationDelay=(-Math.random()*15)+'s'; b.style.width=b.style.height=(5+Math.random()*12)+'px';
    document.body.appendChild(b);
  }
  window.showToast=function(msg){
    let t=document.querySelector('.toast'); if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('on');clearTimeout(window.__tt);window.__tt=setTimeout(()=>t.classList.remove('on'),1600);
  };
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-toast]'); if(el){e.preventDefault();showToast(el.dataset.toast)}
    const tab=e.target.closest('.tab'); if(tab){tab.parentElement.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));tab.classList.add('active')}
  })
})();
