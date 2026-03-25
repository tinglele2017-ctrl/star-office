(function(){
  var AGENTS=[
    {id:'douye',name:'逗爷',status:'working',emoji:'🎯',desc:'产品设计师',avatar:'star'},
    {id:'codexia',name:'代码侠',status:'idle',emoji:'⚔️',desc:'全栈工程师',avatar:'cats_3'},
    {id:'tester',name:'测试员',status:'idle',emoji:'🧪',desc:'QA工程师',avatar:'cats_7'}
  ];
  var MEMO='像素办公室已部署到GitHub Pages';
  var _fetch=window.fetch;
  window.fetch=function(url,opts){
    var u=typeof url==='string'?url:url.url;
    if(u.indexOf('/agents')>=0)return Promise.resolve(new Response(JSON.stringify(AGENTS),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/yesterday-memo')>=0)return Promise.resolve(new Response(JSON.stringify({success:true,memo:MEMO,date:new Date().toLocaleDateString('zh-CN')}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/status')>=0)return Promise.resolve(new Response(JSON.stringify({status:'online',agents:AGENTS.length}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/set_state')>=0)return Promise.resolve(new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/agent-status')>=0)return Promise.resolve(new Response(JSON.stringify({"status-version":"OpenClaw 2026.3.23-2","status-gateway":"GitHub Pages","status-uptime":"在线"}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/security-check')>=0)return Promise.resolve(new Response(JSON.stringify({checks:[],ok:true}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/assets/')>=0)return Promise.resolve(new Response(JSON.stringify({ok:false,error:'static'}),{headers:{'Content-Type':'application/json'}}));
    return _fetch.call(this,url,opts);
  };
})();
