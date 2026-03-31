// Content Override Script v4.1
(function(){
  function applyOverrides(){
    var body=document.body;
    if(!body||!document.getElementById('root')||document.getElementById('root').children.length===0){
      setTimeout(applyOverrides,500);return;
    }
    setTimeout(function(){
      var walker=document.createTreeWalker(body,NodeFilter.SHOW_TEXT,null,false);
      var node,changed=false;
      while(node=walker.nextNode()){
        var t=node.textContent,o=t;
        // Hero stats
        if(t==='5K+')t='23+';
        if(t==='Members')t='Years in Business';
        if(t==='98%'&&node.parentElement&&!node.parentElement.closest('#faq'))t='7+';
        if(t==='Success Rate')t='TV Networks';
        // Success stories stats
        if(t==='5,000+')t='23+';
        if(t==='$12M+')t='$80K+';
        if(t==='47%')t='7+';
        if(t==='Success Stories'){var p=node.parentElement;if(!p||!p.closest||!p.closest('nav'))t='Years in Business';}
        if(t==='Debt Eliminated')t='Saved for One Client';
        if(t==='Avg Salary Increase')t='TV Networks Featured';
        if(t==='Would Recommend')t='Professional Courses';
        // Badges
        if(t==='5,000+ Active Members')t='23+ Years in Business';
        if(t==='Active Members')t='Years in Business';
        if(t==='Bestseller')t='Published';
        if(t==='Amazon Top 100')t='Author';
        // Plan casing
        if(t==='Victorypath')t='VictoryPath';
        if(t==='Victory-vip')t='Victory VIP';
        if(t!==o){node.textContent=t;changed=true;}
      }
      // Relabel Phone card to Email
      document.querySelectorAll('h3').forEach(function(h3){
        if(h3.textContent.trim()==='Phone')h3.textContent='Email';
      });
      if(changed)console.log('[V2V] Content overrides applied');
    },800);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyOverrides);
  else applyOverrides();
  var obs=new MutationObserver(function(){applyOverrides();});
  setTimeout(function(){var r=document.getElementById('root');if(r)obs.observe(r,{childList:true,subtree:false});},2000);
})();

// CSS layout & padding fixes
(function(){
  setTimeout(function(){
    var s=document.createElement('style');
    s.textContent=
      // Tighten blank gaps between sections
      'section+section{margin-top:0!important;}'+
      // Subscription cards equal height
      '#subscriptions .grid{align-items:stretch!important;}'+
      '#subscriptions .grid>div{display:flex!important;flex-direction:column!important;}'+
      '#subscriptions .grid>div>div:last-child{margin-top:auto!important;}'+
      // Tighter section header bottom margin
      'section .text-center.max-w-3xl{margin-bottom:clamp(32px,4vw,48px)!important;}'+
      // Contact form button constrained
      '#contact form button[type="submit"]{max-width:320px!important;margin-left:auto!important;margin-right:auto!important;display:block!important;}'+
      // Banner dismiss bigger tap target
      '#hook-banner button{min-width:32px!important;min-height:32px!important;font-size:20px!important;}'+
      // Audience cards mobile
      '@media(max-width:640px){#audience-cards{grid-template-columns:1fr!important;max-width:280px!important;}}'+
      '';
    document.head.appendChild(s);
    console.log('[V2V] CSS fixes applied');
  },1000);
})();

// Audience cards
(function(){
  function add(){
    var ps=document.querySelectorAll('p'),hp=null;
    for(var i=0;i<ps.length;i++){
      if(ps[i].textContent.indexOf('No opinions. No guessing.')!==-1||ps[i].textContent.indexOf('measures what others')!==-1){hp=ps[i];break;}
    }
    if(!hp||document.getElementById('audience-cards'))return;
    var c=document.createElement('div');c.id='audience-cards';
    c.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;max-width:560px;';
    c.innerHTML='<a href="https://assessment.valuetovictory.com/?mode=individual" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\uD83D\uDC64</div>Individuals</a><a href="https://assessment.valuetovictory.com/?mode=relationship" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\u2764\uFE0F</div>Relationships</a><a href="https://assessment.valuetovictory.com/?mode=leadership" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\uD83C\uDFE2</div>Companies</a>';
    hp.parentNode.insertBefore(c,hp.nextSibling);
  }
  setTimeout(add,1500);setTimeout(add,3000);
})();

// Cart enhancements
(function(){
  function e(){var ds=document.querySelectorAll('[role="dialog"]'),d=null;for(var i=0;i<ds.length;i++){if(ds[i].textContent.indexOf('Your Cart')!==-1){d=ds[i];break;}}if(!d||document.getElementById('cart-enhancements'))return;var el=document.createElement('div');el.id='cart-enhancements';el.style.cssText='padding:16px 0;border-top:1px solid #e4e4e4;margin-top:16px;';el.innerHTML='<div style="margin-bottom:12px;"><a href="https://calendly.com/valuetovictory/30min" target="_blank" rel="noopener" style="display:block;padding:12px 16px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:8px;">\uD83D\uDCC5 Add a Coaching Session \u2014 $300/hr</a></div>';var dc=d.querySelector('[class*="DialogContent"],[class*="content"]')||d;dc.appendChild(el);}
  var o=new MutationObserver(function(){e();});setTimeout(function(){o.observe(document.body,{childList:true,subtree:true});},2000);
})();

// Checkout to Stripe
(function(){
  var links={'The Lost Art of Value':'https://buy.stripe.com/dRm28q9oE2POcJz8kc6oo0f','Running From Miracles - Digital':'https://shawnedecker.com/#book','Running From Miracles - Audiobook':'https://shawnedecker.com/#book','Running From Miracles - Paperback':'https://shawnedecker.com/#book','VictoryPath':'https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07','Value Builder':'https://buy.stripe.com/4gM3cu8kAeywaBr43W6oo08','Victory VIP':'https://buy.stripe.com/28E8wO44kbmkdNDbwo6oo09','default':'https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07'};
  var oa=window.alert;window.alert=function(m){if(m&&m.indexOf('Checkout functionality')!==-1){var cd=document.querySelector('[role="dialog"]'),ct=cd?cd.textContent:'',u=links['default'];for(var p in links){if(ct.indexOf(p)!==-1){u=links[p];break;}}window.open(u,'_blank');return;}oa.call(window,m);};
})();

// Preorder labels
(function(){
  function a(){document.querySelectorAll('button').forEach(function(b){var c=b.closest('[class*="rounded-2xl"]')||b.closest('[class*="rounded-3xl"]');if(!c)return;var t=c.textContent;var up=t.indexOf('upcoming')!==-1||t.indexOf('90-Day P.I.N.K.')!==-1||t.indexOf('21-Day Negotiation')!==-1;var pr=t.indexOf('Presale')!==-1||t.indexOf('Lost Art of Value')!==-1;if(b.textContent.trim()==='Add to Cart'){if(up){b.innerHTML='\uD83D\uDD52 Pre-Order';b.style.background='#f97316';b.style.color='#fff';}else if(pr){b.innerHTML='\u2B50 Pre-Order Now';b.style.background='linear-gradient(135deg,#D4A847,#b8942e)';b.style.color='#000';}}});}
  setTimeout(a,2000);setTimeout(a,4000);
  var o=new MutationObserver(function(){setTimeout(a,500);});setTimeout(function(){o.observe(document.body,{childList:true,subtree:true});},3000);
})();

// Coaching pricing modal
(function(){
  document.addEventListener('click',function(e){
    var l=e.target.closest('a[href*="calendly.com/valuetovictory"]');if(!l)return;if(document.getElementById('coaching-pricing-modal'))return;e.preventDefault();e.stopPropagation();
    var m=document.createElement('div');m.id='coaching-pricing-modal';m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    m.innerHTML='<div style="background:#fff;border-radius:16px;max-width:480px;width:100%;padding:32px;position:relative;max-height:90vh;overflow-y:auto;"><button onclick="this.closest(\'#coaching-pricing-modal\').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button><div style="text-align:center;margin-bottom:20px;"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#D4A847;margin-bottom:8px;">Coaching Rates</div><h3 style="font-size:22px;font-weight:800;color:#000;margin:0;">Book a Session with Shawn</h3></div><div style="background:#f9f9f9;border-radius:12px;padding:16px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><strong style="color:#000;">Life & Business Coaching</strong><span style="color:#D4A847;font-weight:700;font-size:18px;">$300/hr</span></div><div style="font-size:13px;color:#666;">Personalized 1-on-1 sessions</div></div><div style="background:#f9f9f9;border-radius:12px;padding:16px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><strong style="color:#000;">Real Estate Consulting</strong><span style="color:#D4A847;font-weight:700;font-size:18px;">$300/30min</span></div><div style="font-size:13px;color:#666;">60-minute session: $500</div></div><div style="background:#22c55e15;border:1px solid #22c55e40;border-radius:12px;padding:16px;margin-bottom:20px;"><div style="font-size:13px;font-weight:700;color:#22c55e;margin-bottom:6px;">Member Discounts</div><div style="font-size:12px;color:#333;line-height:1.6;">\u2022 First-time clients: <strong>20% off</strong> ($240/hr)<br>\u2022 VictoryPath: <strong>15% off</strong> ($255/hr)<br>\u2022 Value Builder: <strong>25% off</strong> ($225/hr)<br>\u2022 Victory VIP: <strong>50% off</strong> ($150/hr)</div></div><a href="https://calendly.com/valuetovictory/30min" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;margin-bottom:10px;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">\uD83D\uDCC5 Continue to Schedule</a><a href="https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07" target="_blank" rel="noopener" style="display:block;padding:12px;background:none;border:1px solid #D4A847;color:#D4A847;text-align:center;border-radius:10px;font-weight:600;font-size:13px;text-decoration:none;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">Join VictoryPath ($29/mo) for 15% off</a><p style="text-align:center;font-size:11px;color:#999;margin-top:12px;">Payment at time of session. 24hr cancellation required.</p></div>';
    m.addEventListener('click',function(ev){if(ev.target===m)m.remove();});document.body.appendChild(m);
  },true);
})();
