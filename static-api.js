(function(){
  var agents=[
    {id:'douye',name:'逗爷',emoji:'🎯',desc:'产品设计师',state:'writing',task:'整理文档'},
    {id:'codexia',name:'代码侠',emoji:'⚔️',desc:'全栈工程师',state:'idle',task:'待命中'},
    {id:'tester',name:'测试员',emoji:'🧪',desc:'QA工程师',state:'idle',task:'待命中'}
  ];
  var mainState='idle', mainDetail='待命';

  // 昨日工作小记 - 由逗爷自动更新
  var yesterdayMemo = {
    date: '2026-03-26',
    content: [
      '📋 创建 OpenClaw 小白教学飞书文档',
      '  · 5个章节：记忆设置、技能配置、交流提示词、飞书配置、注意事项',
      '  · 生成6张龙虾吉祥物风格AI配图（NVIDIA FLUX模型）',
      '  · 从 SegmentFault、菜鸟教程、知乎爬取实用内容',
      '',
      '🔧 PUA 模式紧急修复',
      '  · 子任务卡住16分钟，启动PUA直接接手',
      '  · 约2分钟搞定全部6张图片插入',
      '  · P9审查发现3张配图跑题，重新生成4张替换',
      '',
      '📝 建立飞书文档权限规范',
      '  · 所有飞书文档必须给乐少管理者权限(full_access)',
      '',
      '📚 Star Office 像素办公室部署',
      '  · 从 GitHub 下载素材，用 Node.js 搭建替代后端',
      '  · 部署到 GitHub Pages，3个Agent：逗爷、代码侠、测试员'
    ].join('\n')
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
