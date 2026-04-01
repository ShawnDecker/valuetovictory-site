// Content Override v4.4 — ALL fixes via DOM, JS bundle NEVER touched
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
        '<a href="https://buy.stripe.com/4gM3cu8kAeywaBr43W6oo08" target="_blank" rel="noopener" style="display:block;width:100%;padding:14px;background:#000;color:#fff;text-align:center;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;">Join Value Builder \u2192</a>' +
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

// CART, CHECKOUT, PREORDER, COACHING MODAL
(function(){
  // Cart
  function ec(){var ds=document.querySelectorAll('[role="dialog"]'),d=null;for(var i=0;i<ds.length;i++){if(ds[i].textContent.indexOf('Your Cart')!==-1){d=ds[i];break;}}if(!d||document.getElementById('cart-enhancements'))return;var el=document.createElement('div');el.id='cart-enhancements';el.style.cssText='padding:16px 0;border-top:1px solid #e4e4e4;margin-top:16px;';el.innerHTML='<a href="https://calendly.com/valuetovictory/30min" target="_blank" style="display:block;padding:12px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;">\uD83D\uDCC5 Add Coaching \u2014 $300/hr</a>';(d.querySelector('[class*="content"]')||d).appendChild(el);}
  var co=new MutationObserver(function(){ec();});setTimeout(function(){co.observe(document.body,{childList:true,subtree:true});},2000);
  // Checkout
  var sl={'The Lost Art of Value':'https://buy.stripe.com/aEUcNY44k3TS6l5dYl','Running From Miracles':'https://shawnedecker.com/#book','VictoryPath':'https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07','Value Builder':'https://buy.stripe.com/4gM3cu8kAeywaBr43W6oo08','Victory VIP':'https://buy.stripe.com/28E8wO44kbmkdNDbwo6oo09','default':'https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07'};
  var oa=window.alert;window.alert=function(m){if(m&&m.indexOf('Checkout')!==-1){var cd=document.querySelector('[role="dialog"]'),ct=cd?cd.textContent:'',u=sl['default'];for(var p in sl){if(ct.indexOf(p)!==-1){u=sl[p];break;}}window.open(u,'_blank');return;}oa.call(window,m);};
  // Preorder
  function ap(){document.querySelectorAll('button').forEach(function(b){var c=b.closest('[class*="rounded-2xl"]');if(!c)return;var t=c.textContent;if(b.textContent.trim()==='Add to Cart'){if(t.indexOf('upcoming')!==-1||t.indexOf('90-Day')!==-1||t.indexOf('21-Day')!==-1){b.innerHTML='\uD83D\uDD52 Pre-Order';b.style.background='#f97316';b.style.color='#fff';}else if(t.indexOf('Presale')!==-1||t.indexOf('Lost Art of Value')!==-1){b.innerHTML='\u2B50 Pre-Order Now';b.style.background='linear-gradient(135deg,#D4A847,#b8942e)';b.style.color='#000';}}});}
  setTimeout(ap,2000);setTimeout(ap,4000);
  // Coaching modal
  document.addEventListener('click',function(e){var l=e.target.closest('a[href*="calendly.com/valuetovictory"]');if(!l||document.getElementById('coaching-pricing-modal'))return;e.preventDefault();e.stopPropagation();var m=document.createElement('div');m.id='coaching-pricing-modal';m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';m.innerHTML='<div style="background:#fff;border-radius:16px;max-width:480px;width:100%;padding:32px;position:relative;max-height:90vh;overflow-y:auto;"><button onclick="this.closest(\'#coaching-pricing-modal\').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button><div style="text-align:center;margin-bottom:20px;"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#D4A847;margin-bottom:8px;">Coaching Rates</div><h3 style="font-size:22px;font-weight:800;color:#000;margin:0;">Book a Session with Shawn</h3></div><div style="background:#f9f9f9;border-radius:12px;padding:16px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;"><strong>Life & Business Coaching</strong><span style="color:#D4A847;font-weight:700;font-size:18px;">$300/hr</span></div><div style="font-size:13px;color:#666;">Personalized 1-on-1</div></div><div style="background:#f9f9f9;border-radius:12px;padding:16px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;"><strong>Real Estate Consulting</strong><span style="color:#D4A847;font-weight:700;font-size:18px;">$300/30min</span></div><div style="font-size:13px;color:#666;">60-min: $500</div></div><div style="background:#22c55e15;border:1px solid #22c55e40;border-radius:12px;padding:16px;margin-bottom:20px;"><div style="font-size:13px;font-weight:700;color:#22c55e;margin-bottom:6px;">Member Discounts</div><div style="font-size:12px;color:#333;line-height:1.6;">\u2022 First-time: <strong>20% off</strong><br>\u2022 VictoryPath: <strong>15% off</strong><br>\u2022 Value Builder: <strong>25% off</strong><br>\u2022 Victory VIP: <strong>50% off</strong></div></div><a href="https://calendly.com/valuetovictory/30min" target="_blank" style="display:block;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;text-decoration:none;margin-bottom:10px;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">\uD83D\uDCC5 Schedule</a><a href="https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07" target="_blank" style="display:block;padding:12px;border:1px solid #D4A847;color:#D4A847;text-align:center;border-radius:10px;font-weight:600;font-size:13px;text-decoration:none;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">Join VictoryPath ($29/mo) for 15% off</a></div>';m.addEventListener('click',function(ev){if(ev.target===m)m.remove();});document.body.appendChild(m);},true);
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
