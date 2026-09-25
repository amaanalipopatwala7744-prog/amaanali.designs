const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('mobile-open'));}

const USERS_KEY='amaanali_client_users';
const SESSION_KEY='amaanali_client_session';
const getUsers=()=>JSON.parse(localStorage.getItem(USERS_KEY)||'[]');
const saveUsers=(users)=>localStorage.setItem(USERS_KEY,JSON.stringify(users));
const setMsg=(el,text,type='')=>{if(el){el.textContent=text;el.className='form-msg '+type;}};

const loginForm=document.getElementById('loginForm');
const signupForm=document.getElementById('signupForm');
const forgotForm=document.getElementById('forgotForm');
if(loginForm&&signupForm){
 const tabs=[...document.querySelectorAll('[data-auth-tab]')];
 const showAuth=(name)=>{
   loginForm.classList.toggle('hidden',name!=='login');
   signupForm.classList.toggle('hidden',name!=='signup');
   if(forgotForm) forgotForm.classList.add('hidden');
   tabs.forEach(t=>t.classList.toggle('active',t.dataset.authTab===name));
 };
 tabs.forEach(tab=>tab.addEventListener('click',()=>showAuth(tab.dataset.authTab)));
 // New visitors see signup first; returning visitors can choose Login.
 showAuth('signup');

 loginForm.addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('loginEmail').value.trim().toLowerCase();const password=document.getElementById('loginPassword').value;const user=getUsers().find(u=>u.email===email&&u.password===password);if(!user){setMsg(document.getElementById('loginMsg'),'Email or password is incorrect.','error');return;}localStorage.setItem(SESSION_KEY,JSON.stringify({name:user.name,email:user.email}));location.href='client-dashboard.html';});
 signupForm.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('signupName').value.trim();const email=document.getElementById('signupEmail').value.trim().toLowerCase();const password=document.getElementById('signupPassword').value;const users=getUsers();if(users.some(u=>u.email===email)){setMsg(document.getElementById('signupMsg'),'An account with this email already exists. Please use Login or Forgot password.','error');return;}users.push({name,email,password});saveUsers(users);document.getElementById('loginEmail').value=email;document.getElementById('loginPassword').value='';showAuth('login');setMsg(document.getElementById('loginMsg'),'Account created. Please log in with your new password.','success');});

 const forgotBtn=document.getElementById('forgotPasswordBtn');
 const backToLogin=document.getElementById('backToLoginBtn');
 const resetStepEmail=document.getElementById('resetStepEmail');
 const resetStepCode=document.getElementById('resetStepCode');
 const resetEmail=document.getElementById('resetEmail');
 const demoCode=document.getElementById('demoCode');
 let resetCodeValue='';
 let resetUserEmail='';
 const showForgot=()=>{
   loginForm.classList.add('hidden'); signupForm.classList.add('hidden'); if(forgotForm) forgotForm.classList.remove('hidden');
   tabs.forEach(t=>t.classList.remove('active'));
   if(resetStepEmail) resetStepEmail.classList.remove('hidden');
   if(resetStepCode) resetStepCode.classList.add('hidden');
   if(resetEmail) resetEmail.value=document.getElementById('loginEmail').value.trim().toLowerCase();
   setMsg(document.getElementById('resetMsg'),'');
 };
 if(forgotBtn) forgotBtn.addEventListener('click',showForgot);
 if(backToLogin) backToLogin.addEventListener('click',()=>showAuth('login'));
 if(forgotForm){
   const sendResetCode=()=>{
     resetUserEmail=resetEmail.value.trim().toLowerCase();
     if(!resetUserEmail){
       setMsg(document.getElementById('resetMsg'),'Enter your registered email first.','error');
       if(resetEmail) resetEmail.focus();
       return;
     }
     const users=getUsers();
     if(!users.some(u=>u.email===resetUserEmail)){
       setMsg(document.getElementById('resetMsg'),'No client account was found with this email. Create an account first.','error');
       return;
     }
     resetCodeValue=String(Math.floor(100000+Math.random()*900000));
     resetStepEmail.classList.add('hidden'); resetStepCode.classList.remove('hidden');
     demoCode.textContent='Demo verification code: '+resetCodeValue;
     const codeInput=document.getElementById('resetCode');
     if(codeInput){ codeInput.value=''; codeInput.focus(); }
     setMsg(document.getElementById('resetMsg'),'Verification code created. Enter it below, then choose a new password.','success');
   };
   const sendResetCodeBtn=document.getElementById('sendResetCodeBtn');
   if(sendResetCodeBtn) sendResetCodeBtn.addEventListener('click',sendResetCode);
   forgotForm.addEventListener('submit',e=>{e.preventDefault(); if(resetStepCode && !resetStepCode.classList.contains('hidden')){document.getElementById('resetPasswordBtn')?.click();}else{sendResetCode();}});
 }
 const resetPasswordBtn=document.getElementById('resetPasswordBtn');
 if(resetPasswordBtn) resetPasswordBtn.addEventListener('click',()=>{
   const code=document.getElementById('resetCode').value.trim();
   const newPassword=document.getElementById('newPassword').value;
   const confirmPassword=document.getElementById('confirmPassword').value;
   if(code!==resetCodeValue){setMsg(document.getElementById('resetMsg'),'Verification code is incorrect.','error');return;}
   if(newPassword.length<6){setMsg(document.getElementById('resetMsg'),'Password must be at least 6 characters.','error');return;}
   if(newPassword!==confirmPassword){setMsg(document.getElementById('resetMsg'),'Passwords do not match.','error');return;}
   const users=getUsers();
   const index=users.findIndex(u=>u.email===resetUserEmail);
   if(index<0){setMsg(document.getElementById('resetMsg'),'Account could not be found.','error');return;}
   users[index].password=newPassword; saveUsers(users);
   document.getElementById('loginEmail').value=resetUserEmail;
   document.getElementById('loginPassword').value='';
   showAuth('login');
   setMsg(document.getElementById('loginMsg'),'Password updated successfully. You can now log in.','success');
 });
}

const clientName=document.getElementById('clientName');
if(clientName){const session=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');if(!session){location.href='auth.html';}else{clientName.textContent=session.name||'Client';}}
const logout=document.getElementById('logoutBtn');
if(logout)logout.addEventListener('click',()=>{localStorage.removeItem(SESSION_KEY);location.href='auth.html';});

const contactForm=document.getElementById('contactForm');
if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(contactForm);const subject=encodeURIComponent('New UI/UX project enquiry — '+data.get('project'));const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject type: ${data.get('project')}\n\nProject brief:\n${data.get('message')}`);window.location.href=`mailto:amaanali.popatwala2005@gmail.com?subject=${subject}&body=${body}`;setMsg(document.getElementById('contactMsg'),'Your email app is opening with the project brief prepared.','success');});}

/* WhatsApp + AI portfolio assistant */
(function(){
  const WA_LINK='https://wa.me/918200078923?text='+encodeURIComponent('Hi Amaanali, I visited your UI/UX portfolio and would like to discuss a design project. Please share your availability and the next steps.');
  document.querySelectorAll('a[href^="https://wa.me/918200078923"]').forEach(a=>a.href=WA_LINK);

  if(document.getElementById('aiChatPanel')) return;
  const wrap=document.createElement('div');
  wrap.innerHTML=`
    <button class="ai-chat-launcher" id="aiChatLauncher" type="button" aria-label="Open Amaanali AI Assistant"><span class="ai-chat-dot"></span> AI ASSISTANT</button>
    <section class="ai-chat-panel" id="aiChatPanel" aria-label="Amaanali AI Assistant">
      <div class="ai-chat-head">
        <div class="ai-chat-brand"><div class="ai-chat-avatar">AI</div><div><div class="ai-chat-title">Amaanali AI Assistant</div><div class="ai-chat-sub">Portfolio & project enquiries</div></div></div>
        <button class="ai-chat-close" id="aiChatClose" type="button" aria-label="Close chatbot">×</button>
      </div>
      <div class="ai-chat-body" id="aiChatBody">
        <div class="ai-msg bot"><div class="ai-bubble">Hi! 👋 I'm Amaanali's AI assistant. Ask me about his UI/UX services, projects, process, or how to start a project.</div></div>
        <div class="ai-quick" id="aiQuick"><button type="button" data-q="What UI/UX services do you offer?">Services</button><button type="button" data-q="Tell me about your projects.">Projects</button><button type="button" data-q="How can I hire Amaanali?">Hire Amaanali</button><button type="button" data-q="What tools do you use?">Tools</button></div>
      </div>
      <div class="ai-chat-foot">
        <form class="ai-chat-form" id="aiChatForm"><input class="ai-chat-input" id="aiChatInput" autocomplete="off" placeholder="Ask about the portfolio..." aria-label="Chat message"><button class="ai-chat-send" type="submit">SEND</button></form>
        <div class="ai-chat-note">AI answers are based on the portfolio. For a project quote, use the contact form or <a class="ai-chat-wa" href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp Amaanali</a>.</div>
      </div>
    </section>`;
  document.body.appendChild(wrap);

  const launcher=document.getElementById('aiChatLauncher');
  const panel=document.getElementById('aiChatPanel');
  const close=document.getElementById('aiChatClose');
  const body=document.getElementById('aiChatBody');
  const form=document.getElementById('aiChatForm');
  const input=document.getElementById('aiChatInput');
  const quick=document.getElementById('aiQuick');
  const history=[];

  function openChat(){panel.classList.add('open');setTimeout(()=>input.focus(),80)}
  function closeChat(){panel.classList.remove('open')}
  function addMessage(role,text,typing=false){
    const row=document.createElement('div');row.className='ai-msg '+(role==='user'?'user':'bot');
    const bubble=document.createElement('div');bubble.className='ai-bubble'+(typing?' ai-typing':'');bubble.textContent=text;row.appendChild(bubble);body.appendChild(row);body.scrollTop=body.scrollHeight;return bubble;
  }
  function localReply(q){
    const s=q.toLowerCase();
    if(s.includes('service')) return 'Amaanali offers Mobile App UI/UX, Website UI/UX, Dashboard Design, Design Systems, Prototyping, and UI Refresh services.';
    if(s.includes('project')) return 'Featured projects are VYBE Fitness App, TravelMate Flight Booking App, and a Restaurant App. The portfolio includes detailed case-study pages for VYBE and TravelMate.';
    if(s.includes('tool')||s.includes('figma')) return 'Amaanali works with Figma and focuses on UI design, UX design, wireframing, prototyping, design systems, and visual design.';
    if(s.includes('hire')||s.includes('contact')||s.includes('price')||s.includes('cost')) return 'To start a project, send a brief through the contact form or message Amaanali on WhatsApp at +91 82000 78923. Pricing depends on the project scope.';
    if(s.includes('vybe')) return 'VYBE is a mobile fitness UI/UX project with 6 supplied screens and a dark, bold, focused visual direction.';
    if(s.includes('travel')) return 'TravelMate is a completed 11-screen flight-booking UI/UX concept. The case study presents the supplied mobile flow and visual decisions.';
    return 'I can help with Amaanali\'s services, projects, tools, process, and contact details. Try asking “What services do you offer?” or “How can I hire Amaanali?”';
  }
  async function sendMessage(text){
    text=(text||'').trim();if(!text)return;
    quick.style.display='none';addMessage('user',text);history.push({role:'user',content:text});
    const typing=addMessage('assistant','Thinking…',true);
    try{
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history})});
      const data=await r.json();
      if(!r.ok||!data.reply)throw new Error(data.error||'AI unavailable');
      typing.textContent=data.reply;typing.classList.remove('ai-typing');history.push({role:'assistant',content:data.reply});
    }catch(err){
      const reply=localReply(text)+'\n\nAI mode is not connected on this deployment yet, so I’m using the portfolio assistant mode.';
      typing.textContent=reply;typing.classList.remove('ai-typing');history.push({role:'assistant',content:reply});
    }
    body.scrollTop=body.scrollHeight;
  }
  launcher.addEventListener('click',openChat);close.addEventListener('click',closeChat);
  quick.addEventListener('click',e=>{const b=e.target.closest('button');if(b)sendMessage(b.dataset.q)});
  form.addEventListener('submit',e=>{e.preventDefault();const value=input.value;input.value='';sendMessage(value)});
})();
