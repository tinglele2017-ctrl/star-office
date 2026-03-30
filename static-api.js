(function(){
  var agents=[
    {id:'douye',name:'逗爷',emoji:'🎯',desc:'产品设计师',state:'writing',task:'整理文档'},
    {id:'codexia',name:'代码侠',emoji:'⚔️',desc:'全栈工程师',state:'idle',task:'待命中'},
    {id:'tester',name:'测试员',emoji:'🧪',desc:'QA工程师',state:'idle',task:'待命中'}
  ];
  var mainState='idle', mainDetail='待命';

  var yesterdayMemo = {
    date: '2026-03-26',
    content: '· 飞书文档: OpenClaw教学\n' +
             '  5章+6张AI配图\n' +
             '· PUA紧急修复\n' +
             '  配图跑题→重生成4张\n' +
             '· 文档权限规范\n' +
             '  给乐少full_access\n' +
             '· Star Office部署\n' +
             '  3个Agent上线'
  };

  var _fetch=window.fetch;
  window.fetch=function(url,opts){
    var u=typeof url==='string'?url:url.url;
    if(u.indexOf('/set_state')>=0 && opts && opts.body){
      try{var d=JSON.parse(opts.body);
        if(d.agent){var a=agents.find(function(x){return x.id===d.agent});if(a){a.state=d.state||a.state;a.task=d.detail||a.task;}}
        else{mainState=d.state||mainState;mainDetail=d.detail||mainDetail;}
      }catch(e){}
      return Promise.resolve(new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json'}}));
    }
    if(u.indexOf('/status')>=0)return Promise.resolve(new Response(JSON.stringify({status:'online',agents:agents.length,state:mainState,detail:mainDetail}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/agents')>=0)return Promise.resolve(new Response(JSON.stringify(agents),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/yesterday-memo')>=0)return Promise.resolve(new Response(JSON.stringify({success:true,memo:yesterdayMemo.content,date:yesterdayMemo.date}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/agent-status')>=0)return Promise.resolve(new Response(JSON.stringify({"status-version":"OpenClaw 2026.3.23-2","status-gateway":"GitHub Pages","status-uptime":"在线"}),{headers:{'Content-Type':'application/json'}}));
    if(u.indexOf('/assets/')>=0)return Promise.resolve(new Response(JSON.stringify({ok:false,error:'static'}),{headers:{'Content-Type':'application/json'}}));
    return _fetch.call(this,url,opts);
  };
  var states=['idle','writing','researching','executing','syncing','error'];
  var tasks={'idle':'待命中','writing':'处理中','researching':'调研中','executing':'执行中','syncing':'同步中','error':'异常'};
  setInterval(function(){
    var a=agents[Math.floor(Math.random()*agents.length)];
    var s=states[Math.floor(Math.random()*states.length)];
    a.state=s;a.task=tasks[s];
    mainState=s;mainDetail=tasks[s];
  },12000);
})();
