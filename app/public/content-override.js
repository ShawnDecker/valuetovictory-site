// Content Override v4.9.5 — Fix: guard nav Join Now from cart intercept
// The original Vite bundle (458,936 bytes) is the ONLY working version.

(function(){
  // ============================================================
  // SUBSCRIPTION PRICING FIX — handles Monthly/Yearly toggle
  // ============================================================
  function fixSubscriptionPricing(){
    var sub = document.getElementById('subscriptions');
    if(!sub) return;
    var grid = sub.querySelector('[class*="grid-cols"]');
    if(!grid) return;

    // Fix prices per-card by position
    // Card 0 = VictoryPath (original React card)
    // Card 1 = Value Builder (injected — skip, already correct)
    // Card 2 = Victory VIP (original React card)
    for(var ci = 0; ci < grid.children.length; ci++){
      var card = grid.children[ci];
      if(card.id === 'vb-injected') continue; // Skip our injected card

      var walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, null, false);
      var node;
      var isVP = card.textContent.indexOf('VictoryPath') !== -1;
      var isVIP = card.textContent.indexOf('Victory VIP') !== -1 || card.textContent.indexOf('Become VIP') !== -1;

      while(node = walker.nextNode()){
        var t = node.textContent, o = t;

        if(isVP){
          // VictoryPath: $47->$29, $470->$290
          if(t === '$47') t = '$29';
          if(t === '47') t = '29';
          if(t === '$470') t = '$290';
          if(t === '470') t = '290';
          if(t.indexOf('$470/year') !== -1) t = t.replace('$470/year','$290/year');
          if(t.indexOf('$470/yr') !== -1) t = t.replace('$470/yr','$290/yr');
        }

        if(isVIP){
          // Victory VIP: $33->$497, $397->$4,970
          if(t === '$33') t = '$497';
          if(t === '33') t = '497';
          if(t === '$397') t = '$4,970';
          if(t === '397') t = '4,970';
          if(t.indexOf('$397/year') !== -1) t = t.replace('$397/year','$4,970/year');
          if(t.indexOf('$397/yr') !== -1) t = t.replace('$397/yr','$4,970/yr');
          if(t.indexOf('save 30%') !== -1) t = t.replace('save 30%','save 17%');
        }

        if(t !== o) node.textContent = t;
      }
    }
  }

  // ============================================================
  // INJECT VALUE BUILDER CARD
  // ============================================================
  function injectValueBuilder(){
    var sub = document.getElementById('subscriptions');
    if(!sub || document.getElementById('vb-injected')) return;

    var grid = sub.querySelector('[class*="grid-cols"]');
    if(!grid || grid.children.length < 2) return;

    // Change grid to 3 columns
    grid.className = grid.className.replace('grid-cols-2','grid-cols-3').replace('max-w-4xl','max-w-6xl');

    // Get the VictoryPath card to match styling
    var vpCard = grid.children[0];
    var vpClasses = vpCard.className;

    // Build Value Builder card from scratch, matching VP card structure
    var vb = document.createElement('div');
    vb.id = 'vb-injected';
    vb.className = vpClasses;
    vb.style.cssText = 'position:relative;border:2px solid #D4A847;box-shadow:0 8px 30px rgba(212,168,71,0.15);opacity:1!important;transform:translateY(0)!important;transition:none!important;';

    // Detect if yearly mode is active
    var isYearly = sub.textContent.indexOf('/year') !== -1 && sub.textContent.indexOf('$290') !== -1;
    var price = isYearly ? '$470' : '$47';
    var period = isYearly ? '/year' : '/month';
    var savings = isYearly ? '<p style="font-size:13px;color:#16a34a;margin-top:4px;">$470/year (save 17%)</p>' : '';

    vb.innerHTML = '' +
      '<div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:#D4A847;color:#000;padding:4px 16px;border-radius:999px;font-size:12px;font-weight:700;white-space:nowrap;z-index:5;display:flex;align-items:center;gap:4px;">\u2B50 Most Popular</div>' +
      '<div style="padding:32px;">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
          '<div style="width:48px;height:48px;background:#D4A847;border-radius:12px;display:flex;align-items:center;justify-content:center;">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>' +
          '</div>' +
          '<div><div style="font-size:18px;font-weight:700;color:#000;">Value Builder</div></div>' +
        '</div>' +
        '<p style="font-size:14px;color:#6b7280;margin-bottom:20px;">Full access to all courses, challenges, Q&A, toolkit and playbook with 25% off coaching.</p>' +
        '<div style="margin-bottom:4px;">' +
          '<span style="font-size:36px;font-weight:800;color:#000;" id="vb-price">' + price + '</span>' +
          '<span style="font-size:14px;color:#6b7280;" id="vb-period">' + period + '</span>' +
        '</div>' +
        savings +
        '<div style="margin-top:20px;margin-bottom:24px;display:flex;flex-direction:column;gap:12px;" id="vb-features">' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Everything in VictoryPath</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">All P.I.N.K. framework courses</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Monthly challenges & Q&A</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Mastermind community</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Toolkit & Playbook access</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">25% off all coaching sessions</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">25% off Real Estate consulting</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;opacity:0.4;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#d1d5db" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M7 7l6 6M13 7l-6 6" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#9ca3af;">VIP mastermind group</span></div>' +
          '<div style="display:flex;align-items:flex-start;gap:10px;opacity:0.4;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#d1d5db" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M7 7l6 6M13 7l-6 6" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#9ca3af;">Direct author access</span></div>' +
        '</div>' +
        '<a href="https://buy.stripe.com/3cIaEW6cs4XW24Vbwo6oo0i" target="_blank" rel="noopener" style="display:block;width:100%;padding:14px;background:#000;color:#fff;text-align:center;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;">Join Value Builder \u2192</a>' +
      '</div>';

    // Insert between VictoryPath (0) and Victory VIP (1)
    grid.insertBefore(vb, grid.children[1]);

    // === REMOVE the old React VIP card and replace with correct one ===
    // The old card has wrong pricing ($397, $33/mo) and a misplaced "Most Popular" badge
    var oldVIP = grid.children[2]; // After VB injection, old VIP is at index 2
    if(oldVIP && oldVIP.id !== 'vip-injected'){
      oldVIP.remove(); // Completely remove the broken React card from DOM

      // Build a clean Victory VIP card
      var vip = document.createElement('div');
      vip.id = 'vip-injected';
      vip.className = vpClasses;
      vip.style.cssText = 'position:relative;opacity:1!important;transform:translateY(0)!important;transition:none!important;';

      var vipPrice = isYearly ? '$4,970' : '$497';
      var vipPeriod = isYearly ? '/year' : '/month';
      var vipSavings = isYearly ? '<p style="font-size:13px;color:#16a34a;margin-top:4px;">$4,970/year (save 17%)</p>' : '';

      vip.innerHTML = '' +
        '<div style="padding:32px;">' +
          '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
            '<div style="width:48px;height:48px;background:rgba(212,168,71,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;">' +
              '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' +
            '</div>' +
            '<div><div style="font-size:18px;font-weight:700;color:#000;">Victory VIP</div></div>' +
          '</div>' +
          '<p style="font-size:14px;color:#6b7280;margin-bottom:20px;">The complete transformation experience with direct access to Shawn.</p>' +
          '<div style="margin-bottom:4px;">' +
            '<span style="font-size:36px;font-weight:800;color:#000;" id="vip-price">' + vipPrice + '</span>' +
            '<span style="font-size:14px;color:#6b7280;" id="vip-period">' + vipPeriod + '</span>' +
          '</div>' +
          vipSavings +
          '<div style="margin-top:20px;margin-bottom:24px;display:flex;flex-direction:column;gap:12px;">' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Everything in Value Builder</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Quarterly 1-on-1 coaching calls</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">VIP mastermind group access</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Early access to new content</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Direct email support</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">Exclusive VIP events</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:10px;"><svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#374151;">50% off all coaching sessions</span></div>' +
          '</div>' +
          '<a href="https://buy.stripe.com/28E8wO44kbmkdNDbwo6oo09" target="_blank" rel="noopener" style="display:block;width:100%;padding:14px;background:#000;color:#fff;text-align:center;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;">Become VIP \u2192</a>' +
        '</div>';

      grid.appendChild(vip);
      console.log('[V2V] Old VIP card replaced with correct $497/mo card');
    }
  }

  // ============================================================
  // MAIN TEXT OVERRIDES
  // ============================================================
  function applyTextOverrides(){
    var body = document.body;
    if(!body) return;
    var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while(node = walker.nextNode()){
      var t = node.textContent, o = t;
      // Skip nodes inside the subscriptions section (handled separately)
      if(node.parentElement && node.parentElement.closest && node.parentElement.closest('#subscriptions')) continue;

      // Hero stats
      if(t==='5K+')t='23+';
      if(t==='Members')t='Years in Business';
      if(t==='98%'){var p=node.parentElement;if(!p||!p.closest||!p.closest('#faq'))t='7+';}
      if(t==='Success Rate')t='TV Networks';
      // Success stories
      if(t==='5,000+')t='23+';
      if(t==='$12M+')t='$80K+';
      if(t==='47%')t='7+';
      if(t==='Success Stories'){var p2=node.parentElement;if(!p2||!p2.closest||!p2.closest('nav'))t='Years in Business';}
      if(t==='Debt Eliminated')t='Saved for One Client';
      if(t==='Avg Salary Increase')t='TV Networks Featured';
      if(t==='Would Recommend')t='Professional Courses';
      // Badges
      if(t==='5,000+ Active Members')t='23+ Years in Business';
      if(t==='Active Members')t='Years in Business';
      if(t==='Bestseller')t='Published';
      if(t==='Amazon Top 100')t='Author';
      // VictoryPath badge -- change from "Most Popular" to real value prop
      if(t.indexOf('Most Popular')!==-1 && node.parentElement && node.parentElement.closest){
        var inVB = node.parentElement.closest('#vb-injected');
        if(!inVB) t = t.replace('Most Popular','Fastest Transformation Per Dollar');
      }
      // Narrative
      if(t.indexOf('$2.3M in debt to bestselling')!==-1)
        t=t.replace('The proven system that helped Shawn Decker go from $2.3M in debt to bestselling author and coach.','Built from real crisis \u2014 a house fire, separation, and $30K in debt on a six-figure income. The P.I.N.K. framework measures what others won\u2019t. No opinions. No guessing. Just truth.');
      if(t.indexOf('$2.3 million in debt')!==-1&&t.indexOf('losing everything')!==-1)
        t=t.replace('After losing everything \u2014 his business, his marriage, his home \u2014 and facing $2.3 million in debt, Shawn discovered','In 2024, Shawn\u2019s house burned down. Combined with a separation, family losses, and major surgeries, he found himself $30,000 in debt while earning six figures. That\u2019s when he discovered');
      if(t.indexOf('From Bankruptcy to')!==-1)t=t.replace('From Bankruptcy to','From Crisis to');
      if(t.indexOf("bestselling author, speaker")!==-1)
        t=t.replace("I'm a bestselling author, speaker, and coach who has helped thousands transform their lives","I'm a published author, speaker, and coach dedicated to helping others transform their lives");
      if(t.indexOf('From Bankruptcy to Bestseller')!==-1)t=t.replace('From Bankruptcy to Bestseller','From House Fire to Framework');
      if(t.indexOf('Thousands have transformed')!==-1)
        t=t.replace('Thousands have transformed their lives using the P.I.N.K. framework. Here are their stories.','Real results from real coaching. The P.I.N.K. framework is built on actual experience and proven outcomes.');
      if(t.indexOf('$2.3 million in debt to financial freedom')!==-1)
        t=t.replace('specifically, my journey from $2.3 million in debt to financial freedom','specifically, my journey through a house fire, separation, and financial crisis');
      if(t.indexOf("$2.3 million in debt, sleeping")!==-1)
        t=t.replace("My business failed. My marriage ended. I was $2.3 million in debt, sleeping on my sister's couch, wondering if life was worth living.","In April 2024, my house burned down. I was going through a separation, losing family members, and carrying over $30,000 in debt \u2014 all while making six figures a year.");
      // Footer prices
      if(t==='VictoryPath ($47/mo)')t='VictoryPath ($29/mo)';
      if(t==='Victory VIP ($397/yr)')t='Victory VIP ($497/mo)';
      // Plan casing
      if(t==='Victorypath')t='VictoryPath';
      if(t==='Victory-vip')t='Victory VIP';
      // Phone
      if(t==='540-632-6503')t='valuetovictory@gmail.com';
      // Urgent matters
      if(t.indexOf('please call us directly')!==-1)t='We typically respond within 24-48 hours.';

      if(t!==o)node.textContent=t;
    }
    // Fix phone card label
    document.querySelectorAll('h3').forEach(function(h){if(h.textContent.trim()==='Phone')h.textContent='Email';});
    // Fix tel: links
    document.querySelectorAll('a[href^="tel:540"]').forEach(function(a){a.href='mailto:valuetovictory@gmail.com';});
    // Fix social links
    document.querySelectorAll('a[aria-label]').forEach(function(a){
      var l=a.getAttribute('aria-label');
      if(l==='Facebook'&&a.href.indexOf('#')!==-1)a.href='https://www.facebook.com/valuetovictory';
      if(l==='Twitter'&&a.href.indexOf('#')!==-1)a.href='https://x.com/valuetovictory';
      if(l==='Instagram'&&a.href.indexOf('#')!==-1)a.href='https://www.instagram.com/valuetovictory';
      if(l==='LinkedIn'&&a.href.indexOf('#')!==-1)a.href='https://www.linkedin.com/in/shawnedecker';
    });
  }

  // ============================================================
  // MASTER RUNNER — v4.4 fix: aggressive polling + deep observer
  // ============================================================
  function runAllSafe(){
    try { applyTextOverrides(); } catch(e){ console.warn('[V2V] textOverrides error:', e.message); }
    try { fixSubscriptionPricing(); } catch(e){ console.warn('[V2V] pricing error:', e.message); }
    try { injectValueBuilder(); } catch(e){ console.warn('[V2V] VB inject error:', e.message); }
  }

  // Poll until React has rendered meaningful content (not just empty root)
  var pollCount = 0;
  function waitForReact(){
    pollCount++;
    var root = document.getElementById('root');
    // Check for actual rendered content — not just root existing
    var hasContent = root && root.innerHTML.length > 500;
    if(!hasContent && pollCount < 40){
      setTimeout(waitForReact, 250);
      return;
    }
    // React is rendered — run overrides at staggered intervals
    console.log('[V2V] React detected after ' + (pollCount * 250) + 'ms');
    runAllSafe();
    setTimeout(runAllSafe, 500);
    setTimeout(runAllSafe, 1500);
    setTimeout(runAllSafe, 3000);
    setTimeout(runAllSafe, 5000);
    setTimeout(runAllSafe, 8000);
    setTimeout(runAllSafe, 12000);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', waitForReact);
  else waitForReact();

  // DEEP observer on root — catches ALL React re-renders, not just direct children
  setTimeout(function(){
    var root = document.getElementById('root');
    if(root){
      var debounceTimer = null;
      new MutationObserver(function(){
        // Debounce to avoid running 100 times during a single React render
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runAllSafe, 150);
      }).observe(root, {childList:true, subtree:true, characterData:true});
      console.log('[V2V] Deep MutationObserver attached to root');
    }
  }, 1000);

  // Also watch subscriptions section specifically for toggle changes
  setTimeout(function(){
    var sub = document.getElementById('subscriptions');
    if(sub){
      new MutationObserver(function(){
        try {
          fixSubscriptionPricing();
          if(!document.getElementById('vb-injected')) injectValueBuilder();
          var vbPrice = document.getElementById('vb-price');
          var vbPeriod = document.getElementById('vb-period');
          if(vbPrice && vbPeriod){
            // Detect yearly by checking the toggle button state, not section text
            var btns = sub.querySelectorAll('button');
            var isYearly = false;
            for(var i=0;i<btns.length;i++){
              if(btns[i].textContent.indexOf('Yearly')!==-1 || btns[i].textContent.indexOf('Save')!==-1){
                var bg = window.getComputedStyle(btns[i]).backgroundColor;
                isYearly = bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && bg !== '';
                break;
              }
            }
            vbPrice.textContent = isYearly ? '$470' : '$47';
            vbPeriod.textContent = isYearly ? '/year' : '/month';
          }
          // Also update the injected VIP card price
          var vipPrice = document.getElementById('vip-price');
          var vipPeriod = document.getElementById('vip-period');
          if(vipPrice && vipPeriod){
            vipPrice.textContent = isYearly ? '$4,970' : '$497';
            vipPeriod.textContent = isYearly ? '/year' : '/month';
          }
        } catch(e){}
      }).observe(sub, {childList:true, subtree:true, characterData:true});
    }
  }, 2000);
})();

// ============================================================
// CSS FIXES
// ============================================================
(function(){
  setTimeout(function(){
    var s=document.createElement('style');
    s.textContent=
      '#subscriptions [class*="grid-cols"]{align-items:stretch!important;}'+
      '#subscriptions [class*="grid-cols"]>div{display:flex!important;flex-direction:column!important;}'+
      '#contact form button[type="submit"]{max-width:320px!important;margin-left:auto!important;margin-right:auto!important;}'+
      '#hook-banner button{min-width:32px!important;min-height:32px!important;font-size:20px!important;}'+
      '@media(max-width:640px){#audience-cards{grid-template-columns:1fr!important;max-width:280px!important;}}'+
      '@media(max-width:768px){#subscriptions [class*="grid-cols"]{grid-template-columns:1fr!important;}}#vb-injected,#vip-injected{opacity:1!important;transform:translateY(0) scale(1)!important;transition:none!important;}'+
      '#pricing{display:none!important;}'+
      '';
    document.head.appendChild(s);
  },800);
})();

// ============================================================
// REMOVE FAKE PRICING SECTIONS & STALE VIP CARDS
// Starter/Growth/Elite ($99/$199/$499) and old VIP $397 cards
// ============================================================
(function(){
  function removeFakePricing(){
    // 1. Hide the entire #pricing section (Starter/Growth/Elite $99/$199/$499)
    var pricing = document.getElementById('pricing');
    if(pricing) pricing.style.display = 'none';

    // 2. Find and remove ANY card showing $397 or "Victory VIP" with wrong price
    //    These appear in the products section as standalone product cards
    document.querySelectorAll('[class*="rounded"]').forEach(function(card){
      var text = card.textContent || '';
      // Match the $397 VIP card (has "Victory VIP" + "$397" + "Most Popular")
      if(text.indexOf('$397') !== -1 && text.indexOf('Victory VIP') !== -1){
        // Don't remove our injected card
        if(card.id === 'vip-injected') return;
        card.remove();
        console.log('[V2V] Removed stale $397 VIP card');
      }
      // Also catch Starter/Growth/Elite if they appear outside #pricing
      if((text.indexOf('Starter Plan') !== -1 && text.indexOf('$99') !== -1) ||
         (text.indexOf('Growth Plan') !== -1 && text.indexOf('$199') !== -1) ||
         (text.indexOf('Elite Plan') !== -1 && text.indexOf('$499') !== -1)){
        card.remove();
        console.log('[V2V] Removed fake plan card');
      }
      // Remove VictoryPath Membership $47 card from Products section
      if(text.indexOf('VictoryPath Membership') !== -1 && text.indexOf('$47') !== -1){
        if(!card.closest('#subscriptions')){
          card.remove();
          console.log('[V2V] Removed VictoryPath Membership product card');
        }
      }
    });

    // 3. Also find any section containing "Starter Plan" heading and hide the parent
    document.querySelectorAll('h3, h4').forEach(function(h){
      var t = h.textContent.trim();
      if(t === 'Starter Plan' || t === 'Growth Plan' || t === 'Elite Plan'){
        // Walk up to find the section container
        var section = h.closest('section') || h.closest('[class*="py-"]') || h.closest('[id]');
        if(section && section.id !== 'subscriptions'){
          section.style.display = 'none';
          console.log('[V2V] Hidden section containing: ' + t);
        }
      }
    });
  }

  function injectCoachingTiers(){
    // Find where #pricing was (or insert after #subscriptions)
    var pricing = document.getElementById('pricing');
    if(document.getElementById('coaching-tiers')) return;

    var container = pricing || document.getElementById('subscriptions');
    if(!container) return;

    var section = document.createElement('section');
    section.id = 'coaching-tiers';
    section.style.cssText = 'padding:80px 24px;background:linear-gradient(180deg,#0a0a0a 0%,#1a1a2e 100%);';
    section.innerHTML = '' +
      '<div style="max-width:1100px;margin:0 auto;text-align:center;">' +
        '<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#D4A847;margin-bottom:12px;">Coaching & Consulting</div>' +
        '<h2 style="font-size:clamp(28px,4vw,40px);font-weight:800;color:#fff;margin:0 0 8px;">Work Directly with Shawn</h2>' +
        '<p style="color:#a1a1aa;font-size:15px;margin-bottom:48px;max-width:560px;margin-left:auto;margin-right:auto;">Personalized sessions for life, business, and real estate. Members save up to 50%.</p>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;text-align:left;">' +

          // Card 1: Life & Business Coaching
          '<div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:32px;">' +
            '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">' +
              '<div style="width:48px;height:48px;background:rgba(212,168,71,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;">' +
                '<svg width="24" height="24" fill="none" stroke="#D4A847" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
              '</div>' +
              '<div>' +
                '<div style="font-size:18px;font-weight:700;color:#fff;">Life & Business Coaching</div>' +
                '<div style="font-size:13px;color:#71717a;">1-on-1 with Shawn</div>' +
              '</div>' +
            '</div>' +
            '<div style="margin-bottom:20px;">' +
              '<span style="font-size:36px;font-weight:800;color:#fff;">$300</span>' +
              '<span style="font-size:14px;color:#a1a1aa;">/hour</span>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">P.I.N.K. framework deep-dive</span></div>' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Personalized action plan</span></div>' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Business strategy & growth</span></div>' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Accountability & follow-up</span></div>' +
            '</div>' +
            '<div style="background:#111;border:1px solid #27272a;border-radius:10px;padding:12px;margin-bottom:20px;">' +
              '<div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Member Discounts</div>' +
              '<div style="font-size:12px;color:#a1a1aa;line-height:1.8;">VictoryPath: <strong style="color:#D4A847;">15% off</strong> ($255/hr)<br>Value Builder: <strong style="color:#D4A847;">25% off</strong> ($225/hr)<br>Victory VIP: <strong style="color:#D4A847;">50% off</strong> ($150/hr)</div>' +
            '</div>' +
            '<a href="https://calendly.com/valuetovictory/30min" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;">Book a Session</a>' +
          '</div>' +

          // Card 2: Real Estate Consulting
          '<div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:32px;">' +
            '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">' +
              '<div style="width:48px;height:48px;background:rgba(212,168,71,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;">' +
                '<svg width="24" height="24" fill="none" stroke="#D4A847" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
              '</div>' +
              '<div>' +
                '<div style="font-size:18px;font-weight:700;color:#fff;">Real Estate Consulting</div>' +
                '<div style="font-size:13px;color:#71717a;">23+ years expertise</div>' +
              '</div>' +
            '</div>' +
            '<div style="margin-bottom:6px;">' +
              '<span style="font-size:36px;font-weight:800;color:#fff;">$300</span>' +
              '<span style="font-size:14px;color:#a1a1aa;">/30 min</span>' +
            '</div>' +
            '<p style="font-size:13px;color:#71717a;margin-bottom:20px;">60-minute session: $500</p>' +
            '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Property valuation strategy</span></div>' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Tax assessment appeals</span></div>' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Maximize appraisal value</span></div>' +
              '<div style="display:flex;align-items:center;gap:8px;"><svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg><span style="font-size:14px;color:#d4d4d8;">Renovation ROI analysis</span></div>' +
            '</div>' +
            '<div style="background:#111;border:1px solid #27272a;border-radius:10px;padding:12px;margin-bottom:20px;">' +
              '<div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Member Discounts</div>' +
              '<div style="font-size:12px;color:#a1a1aa;line-height:1.8;">VictoryPath: <strong style="color:#D4A847;">15% off</strong><br>Value Builder: <strong style="color:#D4A847;">25% off</strong><br>Victory VIP: <strong style="color:#D4A847;">50% off</strong></div>' +
            '</div>' +
            '<a href="https://calendly.com/valuetovictory/30min" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;">Book a Consultation</a>' +
          '</div>' +

        '</div>' +
        '<p style="color:#71717a;font-size:12px;margin-top:24px;">First-time clients: 20% off ($240/hr). Payment at time of session. 24-hour cancellation required.</p>' +
      '</div>';

    // Insert after the pricing section (or after subscriptions)
    if(pricing){
      pricing.parentNode.insertBefore(section, pricing.nextSibling);
    } else if(container.nextSibling){
      container.parentNode.insertBefore(section, container.nextSibling);
    } else {
      container.parentNode.appendChild(section);
    }
    console.log('[V2V] Coaching tiers section injected');
  }

  setTimeout(removeFakePricing, 1000);
  setTimeout(removeFakePricing, 2000);
  setTimeout(function(){ removeFakePricing(); injectCoachingTiers(); }, 3000);
  setTimeout(function(){ removeFakePricing(); injectCoachingTiers(); }, 5000);
  setTimeout(function(){ removeFakePricing(); injectCoachingTiers(); }, 8000);

  // Watch for React re-renders
  setTimeout(function(){
    var root = document.getElementById('root');
    if(root){
      var dt = null;
      new MutationObserver(function(){
        clearTimeout(dt);
        dt = setTimeout(function(){ removeFakePricing(); if(!document.getElementById('coaching-tiers')) injectCoachingTiers(); }, 200);
      }).observe(root, {childList:true, subtree:true});
    }
  }, 1500);
})();

// ============================================================
// AUDIENCE CARDS
// ============================================================
(function(){
  function add(){
    var ps=document.querySelectorAll('p'),hp=null;
    for(var i=0;i<ps.length;i++){if(ps[i].textContent.indexOf('No opinions. No guessing.')!==-1||ps[i].textContent.indexOf('measures what others')!==-1||ps[i].textContent.indexOf('house fire, separation')!==-1||ps[i].textContent.indexOf('$2.3M in debt to bestselling')!==-1||ps[i].textContent.indexOf('P.I.N.K. framework')!==-1){hp=ps[i];break;}}
    if(!hp||document.getElementById('audience-cards'))return;
    var c=document.createElement('div');c.id='audience-cards';
    c.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;max-width:560px;';
    c.innerHTML='<a href="https://assessment.valuetovictory.com/?mode=individual" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\uD83D\uDC64</div>Individuals</a><a href="https://assessment.valuetovictory.com/?mode=relationship" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\u2764\uFE0F</div>Relationships</a><a href="https://assessment.valuetovictory.com/?mode=leadership" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\uD83C\uDFE2</div>Companies</a>';
    hp.parentNode.insertBefore(c,hp.nextSibling);
  }
  setTimeout(add,1500);setTimeout(add,3000);
})();

// COACHING MODAL
(function(){
  // Coaching modal
  document.addEventListener('click',function(e){var l=e.target.closest('a[href*="calendly.com/valuetovictory"]');if(!l||document.getElementById('coaching-pricing-modal'))return;e.preventDefault();e.stopPropagation();var m=document.createElement('div');m.id='coaching-pricing-modal';m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';m.innerHTML='<div style="background:#fff;border-radius:16px;max-width:480px;width:100%;padding:32px;position:relative;max-height:90vh;overflow-y:auto;"><button onclick="this.closest(\'#coaching-pricing-modal\').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button><div style="text-align:center;margin-bottom:24px;"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#D4A847;margin-bottom:8px;">COACHING WITH SHAWN</div><h3 style="font-size:22px;font-weight:800;color:#000;margin:0;">Choose Your Session</h3></div><a href="https://calendly.com/valuetovictory/30min" target="_blank" style="display:block;background:#f9f9f9;border:2px solid #e5e7eb;border-radius:14px;padding:20px;margin-bottom:12px;text-decoration:none;transition:border-color 0.15s;" onclick="this.closest(\'#coaching-pricing-modal\').remove()" onmouseover="this.style.borderColor=\'#D4A847\'" onmouseout="this.style.borderColor=\'#e5e7eb\'"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><strong style="font-size:16px;color:#000;">30-Minute Consultation</strong><span style="color:#D4A847;font-weight:800;font-size:20px;">$300</span></div><div style="font-size:13px;color:#6b7280;line-height:1.5;">Strategy session, real estate consulting, or quick coaching. Ideal for focused topics.</div></a><a href="https://calendly.com/valuetovictory/60min1on1coaching" target="_blank" style="display:block;background:#f9f9f9;border:2px solid #D4A847;border-radius:14px;padding:20px;margin-bottom:16px;text-decoration:none;position:relative;" onclick="this.closest(\'#coaching-pricing-modal\').remove()"><div style="position:absolute;top:-10px;right:16px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:3px 10px;border-radius:20px;">Best Value</div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><strong style="font-size:16px;color:#000;">60-Minute Coaching Call</strong><span style="color:#D4A847;font-weight:800;font-size:20px;">$300</span></div><div style="font-size:13px;color:#6b7280;line-height:1.5;">Full 1-on-1 coaching session. Life, business, P.I.N.K. framework deep dive, or real estate ($500 for RE consulting).</div></a><div style="background:#22c55e10;border:1px solid #22c55e30;border-radius:12px;padding:14px;margin-bottom:20px;"><div style="font-size:12px;font-weight:700;color:#22c55e;margin-bottom:6px;">Member Discounts</div><div style="font-size:12px;color:#555;line-height:1.7;">First-time: <strong>20% off</strong> &bull; VictoryPath: <strong>15% off</strong> &bull; Value Builder: <strong>25% off</strong> &bull; Victory VIP: <strong>50% off</strong></div></div><a href="https://buy.stripe.com/3cIfZgeIY9ecdND7g86oo0h" target="_blank" style="display:block;padding:12px;border:1px solid #D4A847;color:#D4A847;text-align:center;border-radius:10px;font-weight:600;font-size:13px;text-decoration:none;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">Join VictoryPath ($29/mo) for member discounts</a></div>';m.addEventListener('click',function(ev){if(ev.target===m)m.remove();});document.body.appendChild(m);},true);
})();

// ============================================================
// MULTI-ITEM CART SYSTEM (v4.8)
// ============================================================

// ============================================================
// MULTI-ITEM CART SYSTEM
// ============================================================
/**
 * VTV Multi-Item Cart System
 * valuetovictory.com — DOM-injection cart override
 * Intercepts React app cart; manages state in localStorage.
 *
 * Drop into content-override.js as-is.
 */
(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // 0. Guard: only run once
  // ─────────────────────────────────────────────
  if (window.__VTV_CART_LOADED__) return;
  window.__VTV_CART_LOADED__ = true;

  // ─────────────────────────────────────────────
  // 1. Product Catalog
  // ─────────────────────────────────────────────
  var VTV_PRODUCTS = {
    'victorypath':        { name: 'VictoryPath Membership',              price: 29,    display: '$29/mo',   type: 'subscription', badge: '3-day free trial' },
    'value-builder':      { name: 'Value Builder Membership',            price: 47,    display: '$47/mo',   type: 'subscription', badge: '3-day free trial' },
    'victory-vip':        { name: 'Victory VIP Membership',              price: 497,   display: '$497/mo',  type: 'subscription', badge: '3-day free trial' },
    'loav-presale':       { name: 'The Lost Art of Value - Presale',     price: 197,   display: '$197',     type: 'one_time' },
    'rfm-audiobook':      { name: 'Running From Miracles - Audiobook',   price: 9.97,  display: '$9.97',    type: 'one_time' },
    'rfm-paperback':      { name: 'Running From Miracles - Paperback',   price: 11.97, display: '$11.97',   type: 'one_time', soldOut: true },
    'mastering-listings': { name: 'Mastering Listings Course',           price: 197,   display: '$197',     type: 'one_time' },
  };

  // ─────────────────────────────────────────────
  // 2. Cart State (localStorage)
  // ─────────────────────────────────────────────
  var CART_KEY = 'vtv-cart';

  function cartLoad() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }

  function cartSave(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    cartUpdateBadge();
    cartRefreshModal();
  }

  function cartAdd(slug) {
    var product = VTV_PRODUCTS[slug];
    if (!product) return;
    var items = cartLoad();
    var existing = items.find(function (i) { return i.slug === slug; });
    if (product.type === 'subscription') {
      // max 1
      if (!existing) items.push({ slug: slug, quantity: 1 });
    } else {
      if (existing) { existing.quantity += 1; }
      else { items.push({ slug: slug, quantity: 1 }); }
    }
    cartSave(items);
  }

  function cartRemove(slug) {
    var items = cartLoad().filter(function (i) { return i.slug !== slug; });
    cartSave(items);
  }

  function cartSetQty(slug, qty) {
    var items = cartLoad();
    var item = items.find(function (i) { return i.slug === slug; });
    if (!item) return;
    if (qty < 1) { cartRemove(slug); return; }
    item.quantity = qty;
    cartSave(items);
  }

  function cartTotalItems() {
    return cartLoad().reduce(function (s, i) { return s + i.quantity; }, 0);
  }

  function cartSubtotal() {
    return cartLoad().reduce(function (s, i) {
      var p = VTV_PRODUCTS[i.slug];
      return s + (p ? p.price * i.quantity : 0);
    }, 0);
  }

  function cartHasSubscriptions() {
    return cartLoad().some(function (i) {
      var p = VTV_PRODUCTS[i.slug];
      return p && p.type === 'subscription';
    });
  }

  function cartClear() {
    localStorage.removeItem(CART_KEY);
  }

  // ─────────────────────────────────────────────
  // 3. Cart Badge
  // ─────────────────────────────────────────────
  var _badgeEl = null;

  function cartUpdateBadge() {
    var btn = findNavCartButton();
    if (!btn) return;

    if (!_badgeEl) {
      // Ensure relative positioning on the button so badge positions correctly
      var pos = window.getComputedStyle(btn).position;
      if (pos === 'static') btn.style.position = 'relative';

      _badgeEl = document.createElement('span');
      _badgeEl.id = 'vtv-cart-badge';
      _badgeEl.style.cssText = [
        'position:absolute',
        'top:-6px',
        'right:-6px',
        'min-width:18px',
        'height:18px',
        'border-radius:9px',
        'background:linear-gradient(135deg,#D4A847,#b8942e)',
        'color:#fff',
        'font-size:11px',
        'font-weight:700',
        'line-height:18px',
        'text-align:center',
        'padding:0 4px',
        'pointer-events:none',
        'z-index:9999',
        'box-shadow:0 1px 4px rgba(0,0,0,.35)',
        'display:none',
      ].join(';');
      btn.appendChild(_badgeEl);
    }

    var count = cartTotalItems();
    if (count > 0) {
      _badgeEl.textContent = count;
      _badgeEl.style.display = 'block';
    } else {
      _badgeEl.style.display = 'none';
    }
  }

  // ─────────────────────────────────────────────
  // 4. Helpers — find React nav cart button
  // ─────────────────────────────────────────────
  function findNavCartButton() {
    // Look for a button in the nav that contains an SVG (cart icon)
    var candidates = document.querySelectorAll('nav button, header button, [role="navigation"] button');
    for (var i = 0; i < candidates.length; i++) {
      var btn = candidates[i];
      // Must have an svg child (cart icon)
      if (btn.querySelector('svg')) {
        // Prefer ones that look like cart: aria-label contains "cart", or path count typical of cart icon
        var label = (btn.getAttribute('aria-label') || '').toLowerCase();
        var title = (btn.getAttribute('title') || '').toLowerCase();
        if (label.includes('cart') || title.includes('cart')) return btn;
      }
    }
    // Fallback: any button with svg in nav area
    for (var j = 0; j < candidates.length; j++) {
      if (candidates[j].querySelector('svg')) return candidates[j];
    }
    return null;
  }

  // ─────────────────────────────────────────────
  // 5. Slug detection from element context
  // ─────────────────────────────────────────────
  function detectSlugFromContext(el) {
    // Walk up the DOM tree looking for a card/section that contains product info
    var root = el;
    for (var depth = 0; depth < 10; depth++) {
      if (!root) break;
      var text = (root.textContent || '').toLowerCase();

      // Match by product name fragments
      if (text.includes('victory vip') || text.includes('victoryvip')) return 'victory-vip';
      if (text.includes('value builder')) return 'value-builder';
      if (text.includes('victorypath') || text.includes('victory path membership')) return 'victorypath';
      if (text.includes('lost art of value') || text.includes('loav')) return 'loav-presale';
      if (text.includes('running from miracles') && text.includes('audiobook')) return 'rfm-audiobook';
      if (text.includes('running from miracles') && text.includes('paperback')) return 'rfm-paperback';
      if (text.includes('mastering listings')) return 'mastering-listings';

      root = root.parentElement;
    }

    // Try button's own text for subscription join buttons
    var btnText = (el.textContent || '').toLowerCase().trim();
    if (btnText.includes('vip') || btnText.includes('victory vip')) return 'victory-vip';
    if (btnText.includes('value builder')) return 'value-builder';
    if (btnText.includes('victorypath') || btnText.includes('join victorypath')) return 'victorypath';

    return null;
  }

  function detectSlugFromButtonText(text) {
    var t = text.toLowerCase().trim();
    if (t.includes('victory vip') || t.includes('become vip') || t.includes('join vip')) return 'victory-vip';
    if (t.includes('value builder') || t.includes('join value builder')) return 'value-builder';
    if (t.includes('victorypath') || t.includes('join victorypath')) return 'victorypath';
    return null;
  }

  // ─────────────────────────────────────────────
  // 6. Toast Notification
  // ─────────────────────────────────────────────
  var _toastContainer = null;

  function ensureToastContainer() {
    if (_toastContainer) return _toastContainer;
    _toastContainer = document.createElement('div');
    _toastContainer.id = 'vtv-toast-container';
    _toastContainer.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:24px',
      'z-index:100002',
      'display:flex',
      'flex-direction:column',
      'gap:8px',
      'pointer-events:none',
    ].join(';');
    document.body.appendChild(_toastContainer);
    return _toastContainer;
  }

  function showToast(msg) {
    var container = ensureToastContainer();
    var toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = [
      'background:linear-gradient(135deg,#D4A847,#b8942e)',
      'color:#fff',
      'font-weight:600',
      'font-size:14px',
      'padding:10px 18px',
      'border-radius:10px',
      'box-shadow:0 4px 16px rgba(0,0,0,.25)',
      'opacity:0',
      'transform:translateX(40px)',
      'transition:opacity .25s ease,transform .25s ease',
      'pointer-events:none',
      'white-space:nowrap',
    ].join(';');
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
      });
    });

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2000);
  }

  // ─────────────────────────────────────────────
  // 7. Cart Modal
  // ─────────────────────────────────────────────
  var _modalOverlay = null;
  var _modalOpen = false;

  function buildModal() {
    if (_modalOverlay) return;

    // Inject styles
    var style = document.createElement('style');
    style.textContent = [
      '#vtv-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .2s ease}',
      '#vtv-modal-overlay.vtv-visible{opacity:1}',
      '#vtv-modal-box{background:#fff;border-radius:16px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.35);display:flex;flex-direction:column;transform:translateY(24px);transition:transform .25s ease}@media(max-width:640px){#vtv-modal-box{max-width:100%;border-radius:12px;max-height:85vh;margin:8px}}',
      '#vtv-modal-overlay.vtv-visible #vtv-modal-box{transform:translateY(0)}',
      '#vtv-modal-header{display:flex;align-items:center;gap:10px;padding:20px 24px 16px;border-bottom:1px solid #e5e7eb}',
      '#vtv-modal-header h2{margin:0;font-size:18px;font-weight:700;color:#111;flex:1}',
      '#vtv-modal-close{background:none;border:none;cursor:pointer;font-size:22px;color:#6b7280;line-height:1;padding:4px;border-radius:6px}',
      '#vtv-modal-close:hover{color:#111;background:#f3f4f6}',
      '#vtv-modal-body{padding:20px 24px;flex:1}',
      '.vtv-cart-item{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid #f3f4f6}',
      '.vtv-cart-item:last-child{border-bottom:none}',
      '.vtv-item-info{flex:1}',
      '.vtv-item-name{font-size:14px;font-weight:600;color:#111;margin:0 0 2px}',
      '.vtv-item-price{font-size:13px;color:#6b7280;margin:0}',
      '.vtv-item-badge{display:inline-block;font-size:11px;font-weight:600;color:#b8942e;background:#fef9ec;border:1px solid #D4A847;border-radius:20px;padding:1px 8px;margin-top:4px}',
      '.vtv-qty-controls{display:flex;align-items:center;gap:6px}',
      '.vtv-qty-btn{width:28px;height:28px;border:1px solid #d1d5db;background:#fff;border-radius:6px;cursor:pointer;font-size:15px;font-weight:600;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1}',
      '.vtv-qty-btn:hover{background:#f3f4f6;border-color:#9ca3af}',
      '.vtv-qty-num{font-size:14px;font-weight:600;color:#111;min-width:20px;text-align:center}',
      '.vtv-remove-btn{background:none;border:none;cursor:pointer;color:#dc2626;font-size:18px;padding:4px 6px;border-radius:6px;line-height:1}',
      '.vtv-remove-btn:hover{background:#fef2f2}',
      '#vtv-modal-subtotal{display:flex;justify-content:space-between;align-items:center;padding:14px 0 0;border-top:2px solid #e5e7eb;margin-top:8px}',
      '#vtv-modal-subtotal .vtv-sub-label{font-size:14px;font-weight:600;color:#374151}',
      '#vtv-modal-subtotal .vtv-sub-amount{font-size:18px;font-weight:700;color:#111}',
      '#vtv-modal-sub-note{font-size:12px;color:#6b7280;margin:8px 0 0;text-align:center}',
      '#vtv-modal-footer{padding:16px 24px 20px;border-top:1px solid #f3f4f6;display:flex;flex-direction:column;gap:10px}',
      '#vtv-checkout-btn{width:100%;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#fff;font-size:16px;font-weight:700;border:none;border-radius:12px;cursor:pointer;letter-spacing:.3px;transition:opacity .15s,transform .1s}',
      '#vtv-checkout-btn:hover:not(:disabled){opacity:.9;transform:translateY(-1px)}',
      '#vtv-checkout-btn:active{transform:translateY(0)}',
      '#vtv-checkout-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}',
      '#vtv-coaching-btn{width:100%;padding:11px;background:#fff;color:#374151;font-size:14px;font-weight:600;border:1.5px solid #d1d5db;border-radius:12px;cursor:pointer;transition:background .15s,border-color .15s;text-decoration:none;display:block;text-align:center}',
      '#vtv-coaching-btn:hover{background:#f9fafb;border-color:#9ca3af}',
      '#vtv-continue-link{text-align:center;font-size:13px;color:#6b7280;cursor:pointer;text-decoration:underline;background:none;border:none;width:100%;padding:0}',
      '#vtv-continue-link:hover{color:#374151}',
      '#vtv-modal-error{background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;color:#dc2626;font-size:13px;padding:10px 14px;margin-bottom:8px;display:none}',
      '.vtv-empty-state{text-align:center;padding:32px 0}',
      '.vtv-empty-state p{color:#6b7280;font-size:15px;margin:0 0 16px}',
      '.vtv-browse-btn{display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#fff;font-weight:600;font-size:14px;border-radius:10px;text-decoration:none;cursor:pointer;border:none}',
    ].join('\n');
    document.head.appendChild(style);

    _modalOverlay = document.createElement('div');
    _modalOverlay.id = 'vtv-modal-overlay';
    _modalOverlay.innerHTML = [
      '<div id="vtv-modal-box" role="dialog" aria-modal="true" aria-labelledby="vtv-modal-title">',
        '<div id="vtv-modal-header">',
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
            '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>',
            '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
          '</svg>',
          '<h2 id="vtv-modal-title">Your Cart (<span id="vtv-modal-count">0</span> items)</h2>',
          '<button id="vtv-modal-close" aria-label="Close cart">&times;</button>',
        '</div>',
        '<div id="vtv-modal-body"></div>',
        '<div id="vtv-modal-footer">',
          '<div id="vtv-modal-error"></div>',
          '<button id="vtv-checkout-btn">Checkout</button>',
          '<a id="vtv-coaching-btn" href="https://calendly.com/valuetovictory" target="_blank" rel="noopener">Add Coaching &mdash; $300/hr</a>',
          '<button id="vtv-continue-link">Continue Shopping</button>',
        '</div>',
      '</div>',
    ].join('');
    document.body.appendChild(_modalOverlay);

    // Close events
    _modalOverlay.addEventListener('click', function (e) {
      if (e.target === _modalOverlay) closeModal();
    });
    document.getElementById('vtv-modal-close').addEventListener('click', closeModal);
    document.getElementById('vtv-continue-link').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && _modalOpen) closeModal();
    });

    document.getElementById('vtv-checkout-btn').addEventListener('click', handleCheckout);
  }

  // --- Scroll lock for mobile (iOS needs special handling) ---
  var _scrollY = 0; var _scrollLocked = false;
  function lockScroll() {
    if (_scrollLocked) return;
    _scrollLocked = true;
    _scrollY = window.scrollY || window.pageYOffset || 0;
    // Compensate for scrollbar width to prevent layout shift
    var sw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    if (sw > 0) document.documentElement.style.paddingRight = sw + 'px';
  }
  function unlockScroll() {
    if (!_scrollLocked) return;
    _scrollLocked = false;
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    // Scroll position is naturally preserved — no scrollTo needed
  }

  function openModal() {
    buildModal();
    renderModalBody();
    _modalOpen = true;
    _modalOverlay.style.opacity = '0';
    _modalOverlay.style.transition = 'opacity 0.2s ease';
    _modalOverlay.style.display = 'flex';
    void _modalOverlay.offsetWidth;
    _modalOverlay.style.opacity = '1';
    _modalOverlay.classList.add('vtv-visible');
    lockScroll();
  }

  function closeModal() {
    if (!_modalOverlay) return;
    _modalOverlay.style.transition = 'opacity 0.2s ease';
    _modalOverlay.style.opacity = '0';
    _modalOverlay.classList.remove('vtv-visible');
    setTimeout(function () {
      _modalOverlay.style.display = 'none';
    }, 220);
    _modalOpen = false;
    unlockScroll();
  }

  // --- Floating cart button for mobile ---
  function createFloatingCartButton() {
    if (document.getElementById('vtv-floating-cart')) return;
    var fab = document.createElement('div');
    fab.id = 'vtv-floating-cart';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', 'Open cart');
    fab.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span id="vtv-fab-label" style="font-size:10px;font-weight:700;color:#000;letter-spacing:.3px;line-height:1;white-space:nowrap;">Cart</span><span id="vtv-fab-badge" style="display:none;background:#dc2626;color:#fff;font-size:11px;font-weight:800;min-width:20px;height:20px;border-radius:10px;align-items:center;justify-content:center;line-height:1;padding:0 4px;"></span>';
    fab.style.cssText = 'position:fixed;top:50%;right:0;transform:translateY(-50%);z-index:9998;background:linear-gradient(160deg,#D4A847,#b8942e);border-radius:12px 0 0 12px;padding:14px 10px;display:none;flex-direction:column;align-items:center;gap:6px;box-shadow:-3px 0 14px rgba(0,0,0,0.22);cursor:pointer;-webkit-tap-highlight-color:transparent;min-width:46px;transition:transform .18s ease,opacity .18s ease;';
    fab.addEventListener('touchstart', function() { fab.style.transform = 'translateY(-50%) translateX(-4px)'; }, {passive:true});
    fab.addEventListener('touchend', function() { fab.style.transform = 'translateY(-50%)'; }, {passive:true});
    fab.addEventListener('mouseenter', function() { fab.style.transform = 'translateY(-50%) translateX(-4px)'; });
    fab.addEventListener('mouseleave', function() { fab.style.transform = 'translateY(-50%)'; });
    fab.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); openModal(); });
    document.body.appendChild(fab);
    updateFloatingCartVisibility();
  }

  function updateFloatingCartVisibility() {
    var fab = document.getElementById('vtv-floating-cart');
    if (!fab) return;
    var count = cartTotalItems();
    var badge = document.getElementById('vtv-fab-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
    if (count > 0) {
      fab.style.display = 'flex';
    } else {
      fab.style.display = 'none';
    }
  }

  // Update floating button on resize and cart changes
  var _origCartUpdateBadge = cartUpdateBadge;
  cartUpdateBadge = function() {
    _origCartUpdateBadge();
    updateFloatingCartVisibility();
  };
  window.addEventListener('resize', updateFloatingCartVisibility);
  setTimeout(createFloatingCartButton, 1500);
  setTimeout(createFloatingCartButton, 3000);

  function cartRefreshModal() {
    if (_modalOpen) renderModalBody();
  }

  function renderModalBody() {
    if (!_modalOverlay) return;
    var body = document.getElementById('vtv-modal-body');
    var countEl = document.getElementById('vtv-modal-count');
    var checkoutBtn = document.getElementById('vtv-checkout-btn');
    var footer = document.getElementById('vtv-modal-footer');
    if (!body) return;

    var items = cartLoad();
    var total = cartTotalItems();
    countEl.textContent = total;

    // Clear error
    var errEl = document.getElementById('vtv-modal-error');
    if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }

    if (items.length === 0) {
      body.innerHTML = [
        '<div class="vtv-empty-state">',
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 12px;display:block" aria-hidden="true">',
            '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>',
            '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
          '</svg>',
          '<p>Your cart is empty</p>',
          '<button class="vtv-browse-btn" id="vtv-browse-products-btn">Browse Products</button>',
        '</div>',
      ].join('');
      // Hide checkout, show only coaching & continue
      checkoutBtn.style.display = 'none';

      var browseBtn = document.getElementById('vtv-browse-products-btn');
      if (browseBtn) {
        browseBtn.addEventListener('click', function () {
          closeModal();
          // Navigate to products section if possible
          var productsSection = document.querySelector('[id*="product"], [id*="shop"], [id*="store"], section[class*="product"]');
          if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    } else {
      checkoutBtn.style.display = 'block';
      checkoutBtn.disabled = false;
      checkoutBtn.textContent = 'Checkout';

      var html = '<div id="vtv-items-list">';
      items.forEach(function (item) {
        var product = VTV_PRODUCTS[item.slug];
        if (!product) return;
        var isSub = product.type === 'subscription';
        var itemTotal = (product.price * item.quantity).toFixed(2);
        // Remove trailing .00 for clean display
        if (itemTotal.endsWith('.00')) itemTotal = itemTotal.slice(0, -3);

        html += '<div class="vtv-cart-item" data-slug="' + item.slug + '">';
        html += '<div class="vtv-item-info">';
        html += '<p class="vtv-item-name">' + escHtml(product.name) + '</p>';
        html += '<p class="vtv-item-price">' + escHtml(product.display);
        if (!isSub && item.quantity > 1) html += ' &times; ' + item.quantity + ' = $' + itemTotal;
        html += '</p>';
        if (product.badge) {
          html += '<span class="vtv-item-badge">' + escHtml(product.badge) + '</span>';
        }
        html += '</div>';

        if (!isSub) {
          html += '<div class="vtv-qty-controls">';
          html += '<button class="vtv-qty-btn" data-action="dec" data-slug="' + item.slug + '" aria-label="Decrease quantity">&minus;</button>';
          html += '<span class="vtv-qty-num">' + item.quantity + '</span>';
          html += '<button class="vtv-qty-btn" data-action="inc" data-slug="' + item.slug + '" aria-label="Increase quantity">+</button>';
          html += '</div>';
        }

        html += '<button class="vtv-remove-btn" data-slug="' + item.slug + '" aria-label="Remove ' + escHtml(product.name) + '">&#10005;</button>';
        html += '</div>';
      });
      html += '</div>';

      // Subtotal
      var sub = cartSubtotal().toFixed(2);
      if (sub.endsWith('.00')) sub = sub.slice(0, -3);
      html += '<div id="vtv-modal-subtotal">';
      html += '<span class="vtv-sub-label">Subtotal</span>';
      html += '<span class="vtv-sub-amount">$' + sub + '</span>';
      html += '</div>';

      if (cartHasSubscriptions()) {
        html += '<p id="vtv-modal-sub-note">Subscriptions include a 3-day free trial</p>';
      }

      body.innerHTML = html;

      // Attach item event listeners
      body.querySelectorAll('.vtv-qty-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var slug = btn.getAttribute('data-slug');
          var action = btn.getAttribute('data-action');
          var items2 = cartLoad();
          var item2 = items2.find(function (x) { return x.slug === slug; });
          if (!item2) return;
          cartSetQty(slug, action === 'inc' ? item2.quantity + 1 : item2.quantity - 1);
        });
      });

      body.querySelectorAll('.vtv-remove-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          cartRemove(btn.getAttribute('data-slug'));
        });
      });
    }
  }

  // ─────────────────────────────────────────────
  // 8. Checkout Flow
  // ─────────────────────────────────────────────
  function handleCheckout() {
    var items = cartLoad();
    if (items.length === 0) return;

    var btn = document.getElementById('vtv-checkout-btn');
    var errEl = document.getElementById('vtv-modal-error');

    btn.disabled = true;
    btn.textContent = 'Processing\u2026';
    if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }

    var payload = {
      items: items.map(function (i) { return { slug: i.slug, quantity: i.quantity }; }),
    };

    // Optionally include email if known
    var emailMeta = document.querySelector('meta[name="user-email"]');
    if (emailMeta) payload.email = emailMeta.getAttribute('content');

    fetch('https://assessment.valuetovictory.com/api/cart-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Server error: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data && data.url) {
          cartClear();
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned.');
        }
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.textContent = 'Checkout';
        if (errEl) {
          errEl.textContent = 'Checkout failed: ' + (err.message || 'Unknown error. Please try again.');
          errEl.style.display = 'block';
        }
      });
  }

  // ─────────────────────────────────────────────
  // 9. Button Interception
  // ─────────────────────────────────────────────
  var _interceptedButtons = new WeakSet();

  function isAddToCartButton(el) {
    if (el.tagName !== 'BUTTON' && el.tagName !== 'A') return false;
    var text = (el.textContent || '').toLowerCase().trim();
    return (
      text.includes('add to cart') ||
      text.includes('add to bag') ||
      text === 'buy now' ||
      text === 'get now'
    );
  }

  function isSubscriptionButton(el) {
    if (el.tagName !== 'BUTTON' && el.tagName !== 'A') return false;
    var text = (el.textContent || '').toLowerCase().trim();
    return (
      text.includes('join victorypath') ||
      text.includes('join victory path') ||
      text.includes('join value builder') ||
      text.includes('become vip') ||
      text.includes('join vip') ||
      text.includes('get victory vip') ||
      text.includes('start victorypath') ||
      text.includes('start victory path') ||
      (text.includes('victorypath') && (text.includes('join') || text.includes('start') || text.includes('get'))) ||
      (text.includes('value builder') && (text.includes('join') || text.includes('start') || text.includes('get'))) ||
      (text.includes('victory vip') && (text.includes('join') || text.includes('become') || text.includes('get')))
    );
  }

  function isCartNavButton(el) {
    // The nav cart button
    var btn = findNavCartButton();
    return btn && (el === btn || btn.contains(el));
  }

  // Suppress React's own cart dialog that opens after Add to Cart
  function suppressReactCartDialog() {
    var attempts = 0;
    var checker = setInterval(function() {
      attempts++;
      if (attempts > 20) { clearInterval(checker); return; }
      var dialogs = document.querySelectorAll('[role="dialog"]');
      for (var i = 0; i < dialogs.length; i++) {
        var d = dialogs[i];
        var txt = d.textContent || '';
        if (txt.indexOf('Your Cart') !== -1 && !d.dataset.vtvCart) {
          // This is React's cart dialog — close it
          var closeBtn = d.querySelector('button');
          if (closeBtn) closeBtn.click();
          d.style.display = 'none';
          clearInterval(checker);
          return;
        }
      }
    }, 100);
  }

  function handleAddToCart(e, el) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var slug = detectSlugFromContext(el);
    if (!slug) {
      return;
    }

    var product = VTV_PRODUCTS[slug];
    if (!product) return;

    if (product.soldOut) {
      showToast('Sorry, this item is sold out.');
      return;
    }

    cartAdd(slug);
    showToast('\u2713 Added to cart!');
    // Suppress React's own cart dialog if it appears
    suppressReactCartDialog();
  }

  function handleSubscriptionButton(e, el, slug) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var product = VTV_PRODUCTS[slug];
    if (!product) return;

    cartAdd(slug);
    showToast('\u2713 ' + product.name + ' added!');
    openModal();
  }

  function interceptButton(btn) {
    if (_interceptedButtons.has(btn)) return;
    _interceptedButtons.add(btn);

    var text = (btn.textContent || '').toLowerCase().trim();

    // Check sold out by context
    var slug = detectSlugFromContext(btn);
    var product = slug ? VTV_PRODUCTS[slug] : null;

    if (product && product.soldOut) {
      btn.textContent = 'Sold Out';
      btn.disabled = true;
      btn.style.cssText += ';background:#9ca3af !important;background-image:none !important;cursor:not-allowed !important;opacity:.8 !important;';
      return;
    }

    // Preorder / presale styling
    if (product && (
      product.name.toLowerCase().includes('presale') ||
      product.name.toLowerCase().includes('lost art of value')
    )) {
      if (isAddToCartButton(btn)) {
        btn.textContent = 'Pre-Order Now';
        btn.style.cssText += ';background:linear-gradient(135deg,#D4A847,#b8942e) !important;color:#fff !important;';
      }
    }

    if (isSubscriptionButton(btn)) {
      var subSlug = detectSlugFromButtonText(text) || detectSlugFromContext(btn);
      if (subSlug) {
        btn.addEventListener('click', function (e) {
          handleSubscriptionButton(e, btn, subSlug);
        }, true);
      }
    } else if (isAddToCartButton(btn)) {
      btn.addEventListener('click', function (e) {
        handleAddToCart(e, btn);
      }, true);
    }
  }

  function interceptNavCartButton(btn) {
    if (_interceptedButtons.has(btn)) return;
    _interceptedButtons.add(btn);

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      openModal();
    }, true);

    // Ensure relative positioning for badge
    var pos = window.getComputedStyle(btn).position;
    if (pos === 'static') btn.style.position = 'relative';
  }

  function scanAndIntercept() {
    // Intercept nav cart button
    var navBtn = findNavCartButton();
    if (navBtn && !_interceptedButtons.has(navBtn)) {
      interceptNavCartButton(navBtn);
      cartUpdateBadge();
    }

    // Scan all buttons and links
    var els = document.querySelectorAll('button, a[role="button"]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (_interceptedButtons.has(el)) continue;
      var text = (el.textContent || '').toLowerCase().trim();
      if (
        isAddToCartButton(el) ||
        isSubscriptionButton(el)
      ) {
        interceptButton(el);
      }
    }
  }

  // ─────────────────────────────────────────────
  // 10. View Details / Modal sold out handling
  // ─────────────────────────────────────────────
  // Watch for any modals React opens and patch the Add to Cart button inside
  function patchReactModals() {
    var dialogs = document.querySelectorAll('[role="dialog"], .modal, [class*="modal"], [class*="Modal"]');
    dialogs.forEach(function (dialog) {
      if (_interceptedButtons.has(dialog)) return;
      _interceptedButtons.add(dialog);

      // Find Add to Cart buttons within
      var btns = dialog.querySelectorAll('button');
      btns.forEach(function (btn) {
        var t = (btn.textContent || '').toLowerCase().trim();
        if (t.includes('add to cart') || t.includes('buy now')) {
          interceptButton(btn);
        }
        // Check sold out
        var slug = detectSlugFromContext(btn);
        if (slug && VTV_PRODUCTS[slug] && VTV_PRODUCTS[slug].soldOut) {
          btn.textContent = 'Sold Out';
          btn.disabled = true;
          btn.style.cssText += ';background:#9ca3af !important;cursor:not-allowed !important;';
        }
      });
    });
  }

  // ─────────────────────────────────────────────
  // 11a. GLOBAL CLICK INTERCEPTOR (captures before React)
  // ─────────────────────────────────────────────
  document.addEventListener('click', function(e) {
    // --- Nav cart icon → open modal (must be first check) ---
    var _cartBadge = document.getElementById('vtv-cart-badge');
    if (_cartBadge && _cartBadge.parentElement && _cartBadge.parentElement.contains(e.target)) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      openModal();
      return;
    }

    var btn = e.target.closest('button, a[role="button"], [class*="button"]');
    if (!btn) return;
    var text = (btn.textContent || '').trim();
    var textLower = text.toLowerCase();

    // --- Subscription buttons ---
    if (
      textLower.indexOf('join victorypath') !== -1 ||
      textLower.indexOf('join value builder') !== -1 ||
      textLower.indexOf('become vip') !== -1
    ) {
      var slug = null;
      if (textLower.indexOf('victorypath') !== -1) slug = 'victorypath';
      else if (textLower.indexOf('value builder') !== -1) slug = 'value-builder';
      else if (textLower.indexOf('vip') !== -1) slug = 'victory-vip';
      if (slug) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        cartAdd(slug);
        showToast('\u2713 Added to cart!');
        openModal();
        return;
      }
    }

    // --- Generic CTA subscription buttons — detect product from context (v4.9.1) ---
    // Guard: skip if button is inside nav/header (those should scroll, not add to cart)
    if (
      textLower === 'join now' ||
      textLower === 'join membership' ||
      textLower === 'start your journey' ||
      textLower === 'get access' ||
      textLower === 'get started'
    ) {
      var inNav = !!(btn.closest('nav, header, [class*="nav"], [class*="Nav"], [id*="nav"]'));
      if (!inNav) {
        var ctaSlug = detectSlugFromContext(btn);
        if (ctaSlug && VTV_PRODUCTS[ctaSlug] && VTV_PRODUCTS[ctaSlug].type === 'subscription') {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          cartAdd(ctaSlug);
          showToast('\u2713 Added to cart!');
          openModal();
          return;
        }
      }
      // In nav or no subscription context — allow default (scroll to pricing)
    }

    // --- Add to Cart / Pre-Order / Buy buttons ---
    if (
      textLower === 'add to cart' ||
      textLower === 'pre-order now' ||
      textLower === 'pre-order' ||
      textLower === 'buy now' ||
      textLower === 'get now'
    ) {
      var slug = detectSlugFromContext(btn);
      if (slug) {
        var product = VTV_PRODUCTS[slug];
        if (product && product.soldOut) {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          showToast('Sorry, this item is sold out.');
          return;
        }
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        cartAdd(slug);
        showToast('\u2713 Added to cart!');
        suppressReactCartDialog();
        return;
      }
    }

    // --- Subscribe Now inside React modal ---
    if (textLower.indexOf('subscribe now') !== -1) {
      var dialog = btn.closest('[role="dialog"]');
      if (dialog) {
        var ct = dialog.textContent || '';
        var slug = 'victorypath';
        if (ct.indexOf('Victory VIP') !== -1) slug = 'victory-vip';
        else if (ct.indexOf('Value Builder') !== -1) slug = 'value-builder';
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        cartAdd(slug);
        showToast('\u2713 Added to cart!');
        openModal();
        return;
      }
    }

    // --- Proceed to Checkout in React cart ---
    if (textLower.indexOf('proceed to checkout') !== -1) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      openModal();
      return;
    }

    // --- Nav cart icon ---
    if (isCartNavButton(btn)) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      openModal();
      return;
    }

    // --- Get the Free Book / Get Free Book links ---
    if (
      textLower.indexOf('get the free book') !== -1 ||
      textLower.indexOf('get free book') !== -1 ||
      (btn.tagName === 'A' && btn.href && btn.href.indexOf('shawnedecker.com') !== -1 && btn.href.indexOf('book') !== -1)
    ) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      // Close mobile menu if open
      var mobileMenuClose = document.querySelector('[role="dialog"] button[class*="close"], [data-state="open"] button');
      if (mobileMenuClose && window.innerWidth < 768) {
        // Find the Sheet close button (X) in the mobile nav
        var sheets = document.querySelectorAll('[role="dialog"]');
        for (var si = 0; si < sheets.length; si++) {
          if (sheets[si].textContent.indexOf('Explore Products') !== -1 || sheets[si].textContent.indexOf('Get the Free Book') !== -1) {
            var closeBtn = sheets[si].querySelector('button');
            if (closeBtn) closeBtn.click();
            break;
          }
        }
      }
      setTimeout(showFreeBookModal, 150); // slight delay for menu close animation
      return;
    }
  }, true); // capture phase = fires BEFORE React's delegation

  // --- Free Book Modal with Audiobook Upsell ---
  function showFreeBookModal() {
    if (document.getElementById('free-book-modal')) return;
    var m = document.createElement('div');
    m.id = 'free-book-modal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:100001;display:flex;align-items:center;justify-content:center;padding:16px;';
    m.innerHTML = '<div style="background:#fff;border-radius:16px;max-width:440px;width:100%;padding:28px;position:relative;max-height:90vh;overflow-y:auto;">' +
      '<button onclick="this.closest(\'#free-book-modal\').remove();" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;z-index:1;">&times;</button>' +
      '<div style="text-align:center;margin-bottom:20px;">' +
        '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#22c55e;margin-bottom:8px;">FREE DIGITAL COPY</div>' +
        '<h3 style="font-size:20px;font-weight:800;color:#000;margin:0 0 6px;">Running From Miracles</h3>' +
        '<p style="font-size:13px;color:#6b7280;margin:0;">Shawn\'s powerful story of overcoming adversity and finding victory.</p>' +
      '</div>' +
      '<div id="fb-form-section">' +
        '<input type="text" id="fb-name" placeholder="Your first name" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:15px;margin-bottom:10px;box-sizing:border-box;" />' +
        '<input type="email" id="fb-email" placeholder="Your email address" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:15px;margin-bottom:14px;box-sizing:border-box;" />' +
        '<button id="fb-submit" style="width:100%;padding:14px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;">Send Me the Free Book</button>' +
        '<p style="font-size:11px;color:#a1a1aa;text-align:center;margin-top:10px;">We\'ll send a verification email. No spam, ever.</p>' +
      '</div>' +
      '<div id="fb-success" style="display:none;text-align:center;padding:16px 0;">' +
        '<div style="font-size:40px;margin-bottom:10px;">\u2709\uFE0F</div>' +
        '<h4 style="font-size:17px;font-weight:700;color:#000;margin:0 0 8px;">Check Your Email</h4>' +
        '<p style="font-size:13px;color:#6b7280;margin:0 0 20px;">We sent a verification link. Click it to get your free book.</p>' +
        '<div style="background:#f9f9f9;border:1px solid #e5e7eb;border-radius:12px;padding:16px;text-align:left;">' +
          '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#D4A847;margin-bottom:8px;">WHILE YOU WAIT</div>' +
          '<div style="display:flex;gap:12px;align-items:center;">' +
            '<div style="flex:1;">' +
              '<div style="font-weight:700;color:#000;font-size:14px;margin-bottom:2px;">Get the Audiobook</div>' +
              '<div style="font-size:12px;color:#6b7280;margin-bottom:8px;">Listen on the go. Professional narration, 5+ hours.</div>' +
              '<div style="font-size:18px;font-weight:800;color:#D4A847;">$9.97 <span style="font-size:12px;color:#a1a1aa;text-decoration:line-through;font-weight:400;">$19.99</span></div>' +
            '</div>' +
          '</div>' +
          '<button id="fb-upsell-btn" style="width:100%;padding:10px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;margin-top:10px;">Add Audiobook to Cart</button>' +
        '</div>' +
      '</div>' +
      '<div id="fb-error" style="display:none;text-align:center;padding:8px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;margin-top:8px;color:#dc2626;font-size:13px;"></div>' +
    '</div>';
    m.addEventListener('click', function(ev) { if (ev.target === m) m.remove(); });
    document.body.appendChild(m);

    // Submit handler
    document.getElementById('fb-submit').addEventListener('click', function() {
      var name = document.getElementById('fb-name').value.trim();
      var email = document.getElementById('fb-email').value.trim();
      var errDiv = document.getElementById('fb-error');
      errDiv.style.display = 'none';
      if (!name || !email) { errDiv.textContent = 'Please enter your name and email.'; errDiv.style.display = 'block'; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errDiv.textContent = 'Please enter a valid email address.'; errDiv.style.display = 'block'; return; }
      var btn = document.getElementById('fb-submit');
      btn.textContent = 'Sending...'; btn.disabled = true; btn.style.opacity = '0.6';
      fetch('https://assessment.valuetovictory.com/api/free-book-signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email })
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success) {
          document.getElementById('fb-form-section').style.display = 'none';
          document.getElementById('fb-success').style.display = 'block';
          // Wire up audiobook upsell
          var upsellBtn = document.getElementById('fb-upsell-btn');
          if (upsellBtn) {
            upsellBtn.addEventListener('click', function() {
              if (typeof cartAdd === 'function') cartAdd('rfm-audiobook');
              if (typeof showToast === 'function') showToast('\u2713 Audiobook added to cart!');
              upsellBtn.textContent = 'Added!';
              upsellBtn.style.background = '#22c55e';
              upsellBtn.style.color = '#fff';
              upsellBtn.disabled = true;
            });
          }
        } else {
          errDiv.textContent = data.error || 'Something went wrong. Please try again.';
          errDiv.style.display = 'block';
          btn.textContent = 'Send Me the Free Book'; btn.disabled = false; btn.style.opacity = '1';
        }
      })
      .catch(function() {
        errDiv.textContent = 'Connection error. Please try again.';
        errDiv.style.display = 'block';
        btn.textContent = 'Send Me the Free Book'; btn.disabled = false; btn.style.opacity = '1';
      });
    });

    // Enter key
    ['fb-name', 'fb-email'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('keydown', function(ev) { if (ev.key === 'Enter') document.getElementById('fb-submit').click(); });
    });
  }

  // ─────────────────────────────────────────────
  // 11b. Rewrite free book links to prevent external navigation
  // ─────────────────────────────────────────────
  function rewriteFreeBookLinks() {
    document.querySelectorAll('a[href*="shawnedecker.com"]').forEach(function(a) {
      if (a.href.indexOf('book') !== -1 && !a.dataset.vtvRewritten) {
        a.dataset.vtvRewritten = 'true';
        a.removeAttribute('target');
        a.removeAttribute('rel');
        a.setAttribute('href', 'javascript:void(0)');
        a.style.cursor = 'pointer';
      }
    });
    // Also rewrite any "Get Free Book" links in product cards that have externalLink
    document.querySelectorAll('a').forEach(function(a) {
      var text = (a.textContent || '').trim().toLowerCase();
      if ((text === 'get free book' || text === 'get the free book') && !a.dataset.vtvRewritten) {
        a.dataset.vtvRewritten = 'true';
        a.removeAttribute('target');
        a.removeAttribute('rel');
        a.setAttribute('href', 'javascript:void(0)');
        a.style.cursor = 'pointer';
      }
    });
  }
  setTimeout(rewriteFreeBookLinks, 1500);
  setTimeout(rewriteFreeBookLinks, 3000);
  setTimeout(rewriteFreeBookLinks, 6000);

  // ─────────────────────────────────────────────
  // 11c. MutationObserver (for styling/badge/link rewriting)
  // ─────────────────────────────────────────────
  var _observer = new MutationObserver(function (mutations) {
    var shouldScan = false;
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length > 0) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) {
      scanAndIntercept();
      patchReactModals();
      rewriteFreeBookLinks();
    }
  });

  function startObserver() {
    _observer.observe(document.body, { childList: true, subtree: true });
  }

  // ─────────────────────────────────────────────
  // 12. Polling backup (every 1.5s for 60s after load)
  // ─────────────────────────────────────────────
  var _pollCount = 0;
  var _pollInterval = setInterval(function () {
    scanAndIntercept();
    patchReactModals();
    _pollCount++;
    if (_pollCount >= 40) clearInterval(_pollInterval); // 40 * 1.5s = 60s
  }, 1500);

  // ─────────────────────────────────────────────
  // 13. Utility
  // ─────────────────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─────────────────────────────────────────────
  // 14. Init
  // ─────────────────────────────────────────────
  function init() {
    buildModal();

    if (document.body) {
      scanAndIntercept();
      patchReactModals();
      startObserver();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        scanAndIntercept();
        patchReactModals();
        startObserver();
      });
    }

    cartUpdateBadge();
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ============================================================
// FAQ STALE TIER NAME FIX (v4.9)
// ============================================================
(function fixFaqTierNames() {
  function patchFaqText() {
    document.querySelectorAll('section, [class*="faq"], [id*="faq"]').forEach(function(el) {
      if (!el.innerHTML) return;
      if (el.innerHTML.indexOf('Value Seeker') !== -1 || el.innerHTML.indexOf('Value Master') !== -1) {
        el.innerHTML = el.innerHTML
          .replace(/Value Seeker/g, 'VictoryPath')
          .replace(/Value Master \(Elite\)/g, 'Victory VIP')
          .replace(/Value Master/g, 'Victory VIP');
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchFaqText);
  } else {
    patchFaqText();
    setTimeout(patchFaqText, 1500);
    setTimeout(patchFaqText, 3500);
  }
})();

// ============================================================
// FREE BOOK EMAIL CAPTURE
// ============================================================
(function(){
  // === 3. FREE BOOK EMAIL CAPTURE ===
  // Replace "Get Free Book" button with email capture modal for RFM Digital
  function setupFreeBookCapture() {
    document.querySelectorAll('button').forEach(function(btn) {
      if (btn.textContent.trim().indexOf('Get Free Book') !== -1 || btn.textContent.trim().indexOf('\u2B50 Get Free Book') !== -1) {
        if (btn.dataset.freeBookSetup) return;
        btn.dataset.freeBookSetup = 'true';
        btn.addEventListener('click', function(e) {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          if (document.getElementById('free-book-modal')) return;
          var m = document.createElement('div');
          m.id = 'free-book-modal';
          m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
          m.innerHTML = '<div style="background:#fff;border-radius:16px;max-width:440px;width:100%;padding:32px;position:relative;">' +
            '<button onclick="this.closest(\'#free-book-modal\').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button>' +
            '<div style="text-align:center;margin-bottom:20px;">' +
              '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#D4A847;margin-bottom:8px;">FREE DIGITAL COPY</div>' +
              '<h3 style="font-size:20px;font-weight:800;color:#000;margin:0 0 8px;">Running From Miracles</h3>' +
              '<p style="font-size:14px;color:#6b7280;margin:0;">Enter your name and email to get your free copy</p>' +
            '</div>' +
            '<div id="free-book-form">' +
              '<input type="text" id="fb-name" placeholder="Your first name" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:15px;margin-bottom:12px;box-sizing:border-box;" />' +
              '<input type="email" id="fb-email" placeholder="Your email address" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:15px;margin-bottom:16px;box-sizing:border-box;" />' +
              '<button id="fb-submit" style="width:100%;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;">Send Me the Book</button>' +
              '<p style="font-size:11px;color:#a1a1aa;text-align:center;margin-top:12px;">We\u2019ll send a verification email. No spam, ever.</p>' +
            '</div>' +
            '<div id="free-book-success" style="display:none;text-align:center;padding:20px 0;">' +
              '<div style="font-size:48px;margin-bottom:12px;">\u2709\uFE0F</div>' +
              '<h4 style="font-size:18px;font-weight:700;color:#000;margin:0 0 8px;">Check Your Email</h4>' +
              '<p style="font-size:14px;color:#6b7280;margin:0;">We sent a verification link. Click it to get your free book instantly.</p>' +
            '</div>' +
            '<div id="free-book-error" style="display:none;text-align:center;padding:8px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;margin-top:8px;color:#dc2626;font-size:13px;"></div>' +
          '</div>';
          m.addEventListener('click', function(ev) { if (ev.target === m) m.remove(); });
          document.body.appendChild(m);

          // Handle form submit
          document.getElementById('fb-submit').addEventListener('click', function() {
            var name = document.getElementById('fb-name').value.trim();
            var email = document.getElementById('fb-email').value.trim();
            var errDiv = document.getElementById('free-book-error');
            errDiv.style.display = 'none';
            if (!name || !email) { errDiv.textContent = 'Please enter your name and email.'; errDiv.style.display = 'block'; return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errDiv.textContent = 'Please enter a valid email address.'; errDiv.style.display = 'block'; return; }
            var submitBtn = document.getElementById('fb-submit');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            fetch('https://assessment.valuetovictory.com/api/free-book-signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: name, email: email })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
              if (data.success) {
                document.getElementById('free-book-form').style.display = 'none';
                document.getElementById('free-book-success').style.display = 'block';
              } else {
                errDiv.textContent = data.error || 'Something went wrong. Please try again.';
                errDiv.style.display = 'block';
                submitBtn.textContent = 'Send Me the Book';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
              }
            })
            .catch(function() {
              errDiv.textContent = 'Network error. Please try again.';
              errDiv.style.display = 'block';
              submitBtn.textContent = 'Send Me the Book';
              submitBtn.disabled = false;
              submitBtn.style.opacity = '1';
            });
          });

          // Enter key submits
          ['fb-name', 'fb-email'].forEach(function(id) {
            document.getElementById(id).addEventListener('keydown', function(ev) {
              if (ev.key === 'Enter') document.getElementById('fb-submit').click();
            });
          });
        }, true);
      }
    });
  }
  // Run on load and observe for dynamic rendering
  setTimeout(setupFreeBookCapture, 2000);
  setTimeout(setupFreeBookCapture, 4000);
  setTimeout(setupFreeBookCapture, 8000);
  var fbObs = new MutationObserver(function() { setupFreeBookCapture(); });
  setTimeout(function() { fbObs.observe(document.body, { childList: true, subtree: true }); }, 2000);
  setTimeout(setupFreeBookCapture, 2000);
  setTimeout(setupFreeBookCapture, 4000);
  setTimeout(setupFreeBookCapture, 8000);
  var fbObs = new MutationObserver(function() { setupFreeBookCapture(); });
  setTimeout(function() { fbObs.observe(document.body, { childList: true, subtree: true }); }, 2000);
})();


// ============================================================
// TESTIMONIAL & CREDENTIAL FIXES
// Replace fake named testimonials with real anonymous outcomes
// Remove "Real Estate Appraiser" from credentials (per Shawn's request)
// ============================================================
(function(){
  function fixTestimonialsAndCredentials(){
    var body = document.body;
    if(!body) return;

    // --- REAL ANONYMOUS TESTIMONIALS (replace fake names) ---
    var replacements = {
      // Names -> Anonymous labels
      'Michael Torres': 'Cameron Decker',
      'Sarah Chen': 'Alen M.',
      'David & Lisa Morrison': 'J & R',
      'Jennifer Walsh': 'Alex LB',
      // Titles
      'Former Restaurant Owner': 'Business Owner',
      'Marketing Manager': 'Corporate Professional',
      'Married Couple': 'Couple — 2 Years Together',
      'Single Mom': 'Parent & Freelancer',
      // Companies
      'Now Tech Entrepreneur': 'Verified Results in 180 Days',
      'Fortune 500 Company': 'Virginia',
      'Parents of 3': 'Took the Assessment Together',
      'Now Freelance Consultant': '',
      // Fake metrics -> real outcomes
      'Debt Eliminated': 'Revenue Growth',
      '$340,000': '$8K-$10K/mo',
      'Company Valuation': 'Package Value',
      '$2.3M': '$5,000',
      'Jobs Created': 'Client Savings',
      '12': '$25K-$50K/deal',
      '18 months': '8 months',
      'Salary Increase': 'Value Gained',
      '47%': '$80K+',
      'Additional Annual Income': 'Appraisal Boost',
      '$27,000': '$30K+',
      '10-Year Value': 'Strategic Timing',
      '$270K+': '$80K profit',
      // Before/After
      '$340K debt, unemployed, sleeping in car': '$150/session pricing, no growth strategy',
      'Debt-free, $2.3M company, 12 employees': '$5K packages, $8K-$10K/month in 8 months',
      '$68K salary, working 60 hrs/week, afraid to negotiate': 'Undervalued, no framework for pricing decisions',
      '$95K salary, better boundaries, confident negotiator': '$80K+ in additional profit from strategic timing',
      'Near divorce, constant fighting, considering separation': 'Disconnected, miscommunicating, no shared framework',
      'Strongest marriage ever, weekly value meetings, happy family': 'Aligned values, weekly check-ins, renewed connection',
      'Two jobs, exhausted, no time, barely making ends meet': 'Home undervalued, no strategy for maximizing appraisal',
      'Successful consultant, more time with kids, financial security': '$30K+ increase in appraised value from prep guidance'
    };

    // Replace fake quotes with real outcome descriptions
    var quoteReplacements = {
      'I was $340,000 in debt and ready to give up. The P.I.N.K. framework didn\'t just save my business\u2014it saved my life.':
        'I went from charging $150 per session to packaging my services at $5,000. Scored 247 on the Assessment. Within 8 months I was earning $8K\u201310K per month. The framework changed how I see value.',
      'I negotiated a 47% salary increase using the negotiation scripts. I had been underpaid for years and didn\'t even know it.':
        'One piece of strategic timing advice resulted in over $80,000 in additional profit on a single transaction. The Numbers principle showed me what I was leaving on the table.',
      'The People principle saved our marriage. We learned to value each other correctly for the first time in 15 years.':
        'We were stuck in patterns we couldn\'t see. The P.I.N.K. framework gave us a shared language for what we actually value in each other. Everything shifted.',
      'As a single mom working two jobs, I thought I had no time. The Time Mastery Workshop showed me I had 28 hours a week I was wasting.':
        'The Time principle opened my eyes. I was spending 4 hours a day on things that didn\'t move the needle. Within 60 days I restructured everything and got my life back.'
    };

    var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while(node = walker.nextNode()){
      var t = node.textContent, o = t;

      // Direct text replacements
      if(replacements[t] !== undefined) t = replacements[t];

      // Quote replacements (partial match)
      for(var oldQ in quoteReplacements){
        if(t.indexOf(oldQ) !== -1){
          t = t.replace(oldQ, quoteReplacements[oldQ]);
          break;
        }
      }

      // Fix credential badges
      if(t === 'Real Estate Appraiser') t = 'U.S. Navy Veteran';
      if(t === 'Professional valuation') t = 'Aviation Maintenance, 1998\u20132002';
      if(t === '5,000+ transformed') t = 'Conferences & workshops';
      if(t === '2 bestselling books') t = '2 published books';

      // Fix "Thousands" claim in stories section
      if(t === 'Thousands have transformed their lives using the P.I.N.K. framework. Here are their stories.')
        t = 'Real results from real coaching. The P.I.N.K. framework is built on actual experience and proven outcomes.';

      if(t !== o) node.textContent = t;
    }

    // Remove full story text for fake testimonials (the expand modals)
    // The fullStory content is in the React bundle — we just hide the "Read More" buttons
    // that would expand into the fake detailed stories
    // Actually, leave Read More but the overlay will show cleaned text

    // Fix image alt text for testimonial cards
    document.querySelectorAll('img[alt]').forEach(function(img){
      var alt = img.alt;
      if(alt === 'Michael Torres') { img.alt = 'Cameron Decker'; img.title = 'Cameron Decker'; }
      if(alt === 'Sarah Chen') { img.alt = 'Alen M.'; img.title = 'Alen M.'; }
      if(alt === 'David & Lisa Morrison' || alt === 'David Morrison') { img.alt = 'Couple'; }
      if(alt === 'Jennifer Walsh') { img.alt = 'Alex LB'; img.title = 'Alex LB'; }
      // Hide broken testimonial images and show initials instead
      if(img.naturalWidth === 0 || img.complete === false){
        img.style.display = 'none';
      }
    });

    // Add error handler for broken images in testimonials
    document.querySelectorAll('#success-stories img').forEach(function(img){
      img.onerror = function(){ this.style.display = 'none'; };
    });

    console.log('[V2V] Testimonials & credentials fixed');
  }

  // Run after React renders
  setTimeout(fixTestimonialsAndCredentials, 1500);
  setTimeout(fixTestimonialsAndCredentials, 3500);

  // Re-run on dialog opens (for expanded testimonial stories)
  var tObs = new MutationObserver(function(muts){
    for(var i = 0; i < muts.length; i++){
      if(muts[i].addedNodes.length > 0) {
        setTimeout(fixTestimonialsAndCredentials, 300);
        break;
      }
    }
  });
  setTimeout(function(){ tObs.observe(document.body, {childList: true, subtree: true}); }, 2000);
})();

// ============================================================
// SANDI ALDRIDGE TESTIMONIAL — REAL, VERIFIED
// ============================================================
(function(){
  function addSandiTestimonial(){
    var stories = document.getElementById('success-stories');
    if(!stories || document.getElementById('sandi-testimonial')) return;

    // Find the testimonial grid/container
    var cards = stories.querySelectorAll('[class*="rounded-2xl"], [class*="rounded-3xl"]');
    if(cards.length === 0) return;

    // Find the card container (parent of the first card)
    var container = cards[0].parentElement;
    if(!container) return;

    // Create Sandi's testimonial card matching the existing card style
    var sandi = document.createElement('div');
    sandi.id = 'sandi-testimonial';
    sandi.className = cards[0].className; // Match existing card classes
    sandi.style.cssText = 'border:2px solid #D4A847;position:relative;overflow:hidden;';
    sandi.innerHTML = '' +
      '<div style="position:absolute;top:0;left:0;right:0;background:linear-gradient(135deg,#D4A847,#b8942e);padding:6px 16px;text-align:center;">' +
        '<span style="font-size:11px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:1px;">Verified Result</span>' +
      '</div>' +
      '<div style="padding:32px;padding-top:44px;">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
          '<div style="width:48px;height:48px;background:#D4A847;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#000;">SA</div>' +
          '<div>' +
            '<div style="font-size:16px;font-weight:700;color:#000;">Sandra Aldridge</div>' +
            '<div style="font-size:13px;color:#6b7280;">Business Professional</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:4px;margin-bottom:12px;">' +
          '<span style="color:#D4A847;font-size:16px;">\u2605\u2605\u2605\u2605\u2605</span>' +
        '</div>' +
        '<p style="font-size:15px;color:#374151;line-height:1.6;margin-bottom:20px;font-style:italic;">' +
          '&ldquo;Scored 171 on the Assessment. Went from 25 to 35 hours of billable work per week within 90 days. The P.I.N.K. framework showed me exactly where I was undervaluing my time.&rdquo;' +
        '</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
          '<div style="background:#f9fafb;border-radius:10px;padding:12px;text-align:center;">' +
            '<div style="font-size:22px;font-weight:800;color:#000;">+10 hrs</div>' +
            '<div style="font-size:11px;color:#6b7280;margin-top:2px;">Weekly Billable Hours</div>' +
          '</div>' +
          '<div style="background:#f9fafb;border-radius:10px;padding:12px;text-align:center;">' +
            '<div style="font-size:22px;font-weight:800;color:#000;">90 days</div>' +
            '<div style="font-size:11px;color:#6b7280;margin-top:2px;">Time to Results</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:16px;background:#000;color:#D4A847;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:600;text-align:center;">' +
          'Time Principle \u2022 P.I.N.K. Framework' +
        '</div>' +
      '</div>';

    // Insert as the first card
    container.insertBefore(sandi, container.firstChild);
    console.log('[V2V] Sandi Aldridge testimonial added');
  }

  setTimeout(addSandiTestimonial, 2000);
  setTimeout(addSandiTestimonial, 4000);
})();

// ============================================================
// MEMBER LOGIN BUTTON — top nav, next to Join Now
// ============================================================
(function(){
  function addLoginButton(){
    if(document.getElementById('nav-login-btn')) return;
    // Find the Join Now button in the nav
    var joinBtns = document.querySelectorAll('a, button');
    var joinBtn = null;
    for(var i = 0; i < joinBtns.length; i++){
      if(joinBtns[i].textContent.trim() === 'Join Now' && joinBtns[i].closest('nav,header,[class*="sticky"]')){
        joinBtn = joinBtns[i];
        break;
      }
    }
    if(!joinBtn) return;

    var loginBtn = document.createElement('a');
    loginBtn.id = 'nav-login-btn';
    loginBtn.href = 'https://assessment.valuetovictory.com/member';
    loginBtn.textContent = 'Log In';
    loginBtn.style.cssText = 'padding:8px 16px;border:1px solid #D4A847;color:#D4A847;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;margin-right:8px;transition:all 0.2s;';
    loginBtn.onmouseenter = function(){ this.style.background='#D4A847'; this.style.color='#000'; };
    loginBtn.onmouseleave = function(){ this.style.background='transparent'; this.style.color='#D4A847'; };

    joinBtn.parentNode.insertBefore(loginBtn, joinBtn);
    console.log('[V2V] Login button added to nav');
  }

  setTimeout(addLoginButton, 1500);
  setTimeout(addLoginButton, 3000);
  setTimeout(addLoginButton, 5000);
})();
// Cache bust: 1775053812
