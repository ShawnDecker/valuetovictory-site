// Content Override v4.2 — ALL fixes via DOM, never touch the JS bundle
// The original Vite bundle (458,936 bytes / index-C-CZwJiL.js) is the ONLY working version.
// DO NOT MODIFY index-UPDATED-2026.js — it crashes React every time.

(function(){
  var RAN = false;
  function applyOverrides(){
    var body = document.body;
    var root = document.getElementById('root');
    if(!body || !root || root.children.length === 0){
      setTimeout(applyOverrides, 500); return;
    }

    setTimeout(function(){
      if(RAN) return; RAN = true;

      // ============================================================
      // 1. TEXT REPLACEMENTS (TreeWalker)
      // ============================================================
      var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while(node = walker.nextNode()){
        var t = node.textContent, o = t;

        // --- PRICING TEXT ---
        // VictoryPath: $47 -> $29
        if(t === '$47') {
          var ctx = node.parentElement ? node.parentElement.textContent : '';
          if(ctx.indexOf('VictoryPath') !== -1 || ctx.indexOf('/month') !== -1 || ctx.indexOf('/mo') !== -1) t = '$29';
        }
        if(t === '$470') {
          var ctx2 = node.parentElement ? node.parentElement.textContent : '';
          if(ctx2.indexOf('year') !== -1 || ctx2.indexOf('save') !== -1) t = '$290';
        }
        // Victory VIP: $33 -> $497, $397 -> $4,970
        if(t === '$33') t = '$497';
        if(t === '$397') {
          var ctx3 = node.parentElement ? node.parentElement.textContent : '';
          if(ctx3.indexOf('year') !== -1 || ctx3.indexOf('VIP') !== -1) t = '$4,970';
        }

        // Footer/text price references
        if(t === 'VictoryPath ($47/mo)') t = 'VictoryPath ($29/mo)';
        if(t === 'Victory VIP ($397/yr)') t = 'Victory VIP ($497/mo)';
        if(t.indexOf('VictoryPath plan ($47/month)') !== -1) t = t.replace('VictoryPath plan ($47/month)', 'VictoryPath plan ($29/month)');
        if(t.indexOf('VictoryPath at $47/month') !== -1) t = t.replace('VictoryPath at $47/month', 'VictoryPath at $29/month');
        if(t.indexOf('Value Builder plan is $79/month') !== -1) t = t.replace('Value Builder plan is $79/month ($948/year) on monthly billing, or $790/year', 'Value Builder plan is $47/month ($564/year) on monthly billing, or $470/year');
        if(t.indexOf('$47/month, Value Builder at $79') !== -1) t = t.replace('$47/month, Value Builder at $79', '$29/month, Value Builder at $47');

        // --- HERO STATS ---
        if(t === '5K+') t = '23+';
        if(t === 'Members') t = 'Years in Business';
        if(t === '98%') { var p = node.parentElement; if(!p || !p.closest || !p.closest('#faq')) t = '7+'; }
        if(t === 'Success Rate') t = 'TV Networks';

        // --- SUCCESS STORIES STATS ---
        if(t === '5,000+') t = '23+';
        if(t === '$12M+') t = '$80K+';
        if(t === '47%') t = '7+';
        if(t === 'Success Stories') { var p2 = node.parentElement; if(!p2 || !p2.closest || !p2.closest('nav')) t = 'Years in Business'; }
        if(t === 'Debt Eliminated') t = 'Saved for One Client';
        if(t === 'Avg Salary Increase') t = 'TV Networks Featured';
        if(t === 'Would Recommend') t = 'Professional Courses';

        // --- BADGES ---
        if(t === '5,000+ Active Members') t = '23+ Years in Business';
        if(t === 'Active Members') t = 'Years in Business';
        if(t === 'Bestseller') t = 'Published';
        if(t === 'Amazon Top 100') t = 'Author';

        // --- NARRATIVE ---
        if(t.indexOf('$2.3M in debt to bestselling author') !== -1)
          t = t.replace('The proven system that helped Shawn Decker go from $2.3M in debt to bestselling author and coach.',
            'Built from real crisis \u2014 a house fire, separation, and $30K in debt on a six-figure income. The P.I.N.K. framework measures what others won\u2019t. No opinions. No guessing. Just truth.');
        if(t.indexOf('$2.3 million in debt') !== -1 && t.indexOf('losing everything') !== -1)
          t = t.replace('After losing everything \u2014 his business, his marriage, his home \u2014 and facing $2.3 million in debt, Shawn discovered',
            'In 2024, Shawn\u2019s house burned down. Combined with a separation, family losses, and major surgeries, he found himself $30,000 in debt while earning six figures. That\u2019s when he discovered');
        if(t.indexOf('From Bankruptcy to') !== -1) t = t.replace('From Bankruptcy to', 'From Crisis to');
        if(t.indexOf("bestselling author, speaker") !== -1)
          t = t.replace("I'm a bestselling author, speaker, and coach who has helped thousands transform their lives",
            "I'm a published author, speaker, and coach dedicated to helping others transform their lives");
        if(t.indexOf('From Bankruptcy to Bestseller') !== -1) t = t.replace('From Bankruptcy to Bestseller', 'From House Fire to Framework');
        if(t.indexOf('Thousands have transformed') !== -1)
          t = t.replace('Thousands have transformed their lives using the P.I.N.K. framework. Here are their stories.',
            'Real results from real coaching. The P.I.N.K. framework is built on actual experience and proven outcomes.');
        if(t.indexOf('$2.3 million in debt to financial freedom') !== -1)
          t = t.replace('specifically, my journey from $2.3 million in debt to financial freedom',
            'specifically, my journey through a house fire, separation, and financial crisis');
        if(t.indexOf("$2.3 million in debt, sleeping on my sister") !== -1)
          t = t.replace("My business failed. My marriage ended. I was $2.3 million in debt, sleeping on my sister's couch, wondering if life was worth living.",
            "In April 2024, my house burned down. I was going through a separation, losing family members, and carrying over $30,000 in debt \u2014 all while making six figures a year.");

        // --- PLAN CASING ---
        if(t === 'Victorypath') t = 'VictoryPath';
        if(t === 'Victory-vip') t = 'Victory VIP';

        // --- PHONE -> EMAIL ---
        if(t === '540-632-6503') t = 'valuetovictory@gmail.com';

        if(t !== o) node.textContent = t;
      }

      // ============================================================
      // 2. RELABEL PHONE CARDS & FIX LINKS
      // ============================================================
      document.querySelectorAll('h3').forEach(function(h3){
        if(h3.textContent.trim() === 'Phone') h3.textContent = 'Email';
      });
      // Fix tel: links to mailto:
      document.querySelectorAll('a[href^="tel:540"]').forEach(function(a){
        a.href = 'mailto:valuetovictory@gmail.com';
      });
      // Fix social links
      document.querySelectorAll('a[aria-label]').forEach(function(a){
        var label = a.getAttribute('aria-label');
        if(label === 'Facebook' && a.href.indexOf('#') !== -1) a.href = 'https://www.facebook.com/valuetovictory';
        if(label === 'Twitter' && a.href.indexOf('#') !== -1) a.href = 'https://x.com/valuetovictory';
        if(label === 'Instagram' && a.href.indexOf('#') !== -1) a.href = 'https://www.instagram.com/valuetovictory';
        if(label === 'LinkedIn' && a.href.indexOf('#') !== -1) a.href = 'https://www.linkedin.com/in/shawnedecker';
      });

      // ============================================================
      // 3. INJECT VALUE BUILDER (3rd tier) INTO SUBSCRIPTIONS
      // ============================================================
      var subSection = document.getElementById('subscriptions');
      if(subSection){
        var grid = subSection.querySelector('.grid');
        if(grid && grid.children.length === 2){
          // Change grid to 3 columns
          grid.className = grid.className.replace('md:grid-cols-2', 'md:grid-cols-3').replace('max-w-4xl', 'max-w-6xl');

          // Clone VictoryPath card as base for Value Builder
          var vpCard = grid.children[0];
          var vbCard = vpCard.cloneNode(true);

          // Update Value Builder card content
          var allText = vbCard.querySelectorAll('*');
          for(var i = 0; i < allText.length; i++){
            var el = allText[i];
            // Title
            if(el.textContent.trim() === 'VictoryPath') el.textContent = 'Value Builder';
            // Description
            if(el.textContent.indexOf('Start your value journey') !== -1)
              el.textContent = 'Full access to all courses, challenges, Q&A, toolkit and playbook with 25% off coaching.';
            // Monthly price
            if(el.textContent.trim() === '$29') el.textContent = '$47';
            // Yearly price
            if(el.textContent.trim() === '$290') el.textContent = '$470';
            // Button text
            if(el.textContent.indexOf('Join VictoryPath') !== -1) el.textContent = 'Join Value Builder \u2192';
          }

          // Update features list
          var features = vbCard.querySelectorAll('.space-y-3 > div, .space-y-3 > li');
          var vbFeatures = [
            'Everything in VictoryPath',
            'All P.I.N.K. framework courses',
            'Monthly challenges & Q&A',
            'Mastermind community',
            'Toolkit & Playbook access',
            '25% off all coaching sessions',
            '25% off Real Estate consulting'
          ];
          // Replace feature text where possible
          for(var j = 0; j < features.length && j < vbFeatures.length; j++){
            var spans = features[j].querySelectorAll('span');
            if(spans.length > 0) spans[spans.length - 1].textContent = vbFeatures[j];
          }

          // Add "Most Popular" badge
          var badge = document.createElement('div');
          badge.style.cssText = 'position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:#D4A847;color:#000;padding:4px 16px;border-radius:999px;font-size:13px;font-weight:600;white-space:nowrap;z-index:5;';
          badge.textContent = '\u2B50 Most Popular';
          vbCard.style.position = 'relative';
          vbCard.insertBefore(badge, vbCard.firstChild);

          // Add slight visual emphasis
          vbCard.style.boxShadow = '0 8px 30px rgba(212,168,71,0.15)';
          vbCard.style.border = '2px solid #D4A847';

          // Insert between VictoryPath and Victory VIP
          grid.insertBefore(vbCard, grid.children[1]);
        }
      }

      // ============================================================
      // 4. FIX URGENT MATTERS TEXT (references calling)
      // ============================================================
      document.querySelectorAll('p').forEach(function(p){
        if(p.textContent.indexOf('please call us directly') !== -1)
          p.textContent = 'We typically respond within 24-48 hours.';
      });

      console.log('[V2V] Content override v4.2 applied');
    }, 1200);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyOverrides);
  else applyOverrides();

  // Re-run on SPA route changes
  setTimeout(function(){
    var root = document.getElementById('root');
    if(root) new MutationObserver(function(){ RAN = false; applyOverrides(); }).observe(root, {childList:true, subtree:false});
  }, 3000);
})();

// ============================================================
// CSS LAYOUT FIXES
// ============================================================
(function(){
  setTimeout(function(){
    var s = document.createElement('style');
    s.textContent =
      '#subscriptions .grid{align-items:stretch!important;}' +
      '#subscriptions .grid>div{display:flex!important;flex-direction:column!important;}' +
      '#subscriptions .grid>div button,#subscriptions .grid>div a.btn-primary{margin-top:auto!important;}' +
      '#contact form button[type="submit"]{max-width:320px!important;margin-left:auto!important;margin-right:auto!important;}' +
      '#hook-banner button{min-width:32px!important;min-height:32px!important;font-size:20px!important;}' +
      '@media(max-width:640px){#audience-cards{grid-template-columns:1fr!important;max-width:280px!important;}}' +
      '';
    document.head.appendChild(s);
  }, 800);
})();

// ============================================================
// AUDIENCE CARDS (Individuals / Relationships / Companies)
// ============================================================
(function(){
  function add(){
    var ps = document.querySelectorAll('p'), hp = null;
    for(var i = 0; i < ps.length; i++){
      if(ps[i].textContent.indexOf('No opinions. No guessing.') !== -1 ||
         ps[i].textContent.indexOf('measures what others') !== -1 ||
         ps[i].textContent.indexOf('house fire, separation') !== -1){
        hp = ps[i]; break;
      }
    }
    if(!hp || document.getElementById('audience-cards')) return;
    var c = document.createElement('div'); c.id = 'audience-cards';
    c.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;max-width:560px;';
    c.innerHTML =
      '<a href="https://assessment.valuetovictory.com/?mode=individual" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\uD83D\uDC64</div>Individuals</a>' +
      '<a href="https://assessment.valuetovictory.com/?mode=relationship" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\u2764\uFE0F</div>Relationships</a>' +
      '<a href="https://assessment.valuetovictory.com/?mode=leadership" target="_blank" rel="noopener" style="background:#000;color:#D4A847;padding:14px 12px;border-radius:12px;text-decoration:none;text-align:center;border:1px solid #D4A847;font-size:13px;font-weight:700;"><div style="font-size:20px;margin-bottom:4px;">\uD83C\uDFE2</div>Companies</a>';
    hp.parentNode.insertBefore(c, hp.nextSibling);
  }
  setTimeout(add, 1500); setTimeout(add, 3000);
})();

// ============================================================
// CART ENHANCEMENTS
// ============================================================
(function(){
  function e(){
    var ds = document.querySelectorAll('[role="dialog"]'), d = null;
    for(var i = 0; i < ds.length; i++){ if(ds[i].textContent.indexOf('Your Cart') !== -1){ d = ds[i]; break; } }
    if(!d || document.getElementById('cart-enhancements')) return;
    var el = document.createElement('div'); el.id = 'cart-enhancements';
    el.style.cssText = 'padding:16px 0;border-top:1px solid #e4e4e4;margin-top:16px;';
    el.innerHTML = '<a href="https://calendly.com/valuetovictory/30min" target="_blank" rel="noopener" style="display:block;padding:12px 16px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:8px;">\uD83D\uDCC5 Add a Coaching Session \u2014 $300/hr</a>';
    (d.querySelector('[class*="DialogContent"],[class*="content"]') || d).appendChild(el);
  }
  var o = new MutationObserver(function(){ e(); });
  setTimeout(function(){ o.observe(document.body, {childList:true, subtree:true}); }, 2000);
})();

// ============================================================
// CHECKOUT -> STRIPE
// ============================================================
(function(){
  var links = {
    'The Lost Art of Value':'https://buy.stripe.com/dRm28q9oE2POcJz8kc6oo0f',
    'Running From Miracles':'https://shawnedecker.com/#book',
    'VictoryPath':'https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07',
    'Value Builder':'https://buy.stripe.com/4gM3cu8kAeywaBr43W6oo08',
    'Victory VIP':'https://buy.stripe.com/28E8wO44kbmkdNDbwo6oo09',
    'default':'https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07'
  };
  var oa = window.alert;
  window.alert = function(m){
    if(m && m.indexOf('Checkout functionality') !== -1){
      var cd = document.querySelector('[role="dialog"]'), ct = cd ? cd.textContent : '', u = links['default'];
      for(var p in links){ if(ct.indexOf(p) !== -1){ u = links[p]; break; } }
      window.open(u, '_blank'); return;
    }
    oa.call(window, m);
  };
})();

// ============================================================
// PREORDER LABELS
// ============================================================
(function(){
  function a(){
    document.querySelectorAll('button').forEach(function(b){
      var c = b.closest('[class*="rounded-2xl"]');
      if(!c) return;
      var t = c.textContent;
      if(b.textContent.trim() === 'Add to Cart'){
        if(t.indexOf('upcoming') !== -1 || t.indexOf('90-Day') !== -1 || t.indexOf('21-Day') !== -1){
          b.innerHTML = '\uD83D\uDD52 Pre-Order'; b.style.background = '#f97316'; b.style.color = '#fff';
        } else if(t.indexOf('Presale') !== -1 || t.indexOf('Lost Art of Value') !== -1){
          b.innerHTML = '\u2B50 Pre-Order Now'; b.style.background = 'linear-gradient(135deg,#D4A847,#b8942e)'; b.style.color = '#000';
        }
      }
    });
  }
  setTimeout(a, 2000); setTimeout(a, 4000);
  setTimeout(function(){ new MutationObserver(function(){ setTimeout(a,500); }).observe(document.body,{childList:true,subtree:true}); }, 3000);
})();

// ============================================================
// COACHING PRICING MODAL (intercepts Calendly links)
// ============================================================
(function(){
  document.addEventListener('click', function(e){
    var l = e.target.closest('a[href*="calendly.com/valuetovictory"]');
    if(!l || document.getElementById('coaching-pricing-modal')) return;
    e.preventDefault(); e.stopPropagation();
    var m = document.createElement('div'); m.id = 'coaching-pricing-modal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    m.innerHTML = '<div style="background:#fff;border-radius:16px;max-width:480px;width:100%;padding:32px;position:relative;max-height:90vh;overflow-y:auto;">' +
      '<button onclick="this.closest(\'#coaching-pricing-modal\').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button>' +
      '<div style="text-align:center;margin-bottom:20px;"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#D4A847;margin-bottom:8px;">Coaching Rates</div><h3 style="font-size:22px;font-weight:800;color:#000;margin:0;">Book a Session with Shawn</h3></div>' +
      '<div style="background:#f9f9f9;border-radius:12px;padding:16px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><strong>Life & Business Coaching</strong><span style="color:#D4A847;font-weight:700;font-size:18px;">$300/hr</span></div><div style="font-size:13px;color:#666;">Personalized 1-on-1 sessions</div></div>' +
      '<div style="background:#f9f9f9;border-radius:12px;padding:16px;margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><strong>Real Estate Consulting</strong><span style="color:#D4A847;font-weight:700;font-size:18px;">$300/30min</span></div><div style="font-size:13px;color:#666;">60-min session: $500</div></div>' +
      '<div style="background:#22c55e15;border:1px solid #22c55e40;border-radius:12px;padding:16px;margin-bottom:20px;"><div style="font-size:13px;font-weight:700;color:#22c55e;margin-bottom:6px;">Member Discounts</div><div style="font-size:12px;color:#333;line-height:1.6;">\u2022 First-time: <strong>20% off</strong> ($240/hr)<br>\u2022 VictoryPath: <strong>15% off</strong> ($255/hr)<br>\u2022 Value Builder: <strong>25% off</strong> ($225/hr)<br>\u2022 Victory VIP: <strong>50% off</strong> ($150/hr)</div></div>' +
      '<a href="https://calendly.com/valuetovictory/30min" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,#D4A847,#b8942e);color:#000;text-align:center;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;margin-bottom:10px;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">\uD83D\uDCC5 Continue to Schedule</a>' +
      '<a href="https://buy.stripe.com/fZufZgeIYgGEfVL6c46oo07" target="_blank" rel="noopener" style="display:block;padding:12px;background:none;border:1px solid #D4A847;color:#D4A847;text-align:center;border-radius:10px;font-weight:600;font-size:13px;text-decoration:none;" onclick="this.closest(\'#coaching-pricing-modal\').remove()">Join VictoryPath ($29/mo) for 15% off</a>' +
      '<p style="text-align:center;font-size:11px;color:#999;margin-top:12px;">Payment at time of session. 24hr cancellation required.</p></div>';
    m.addEventListener('click', function(ev){ if(ev.target === m) m.remove(); });
    document.body.appendChild(m);
  }, true);
})();
