(function(){
  // 逗爷的真实状态 — 由 OpenClaw agent 维护
  var agents=[
    {id:"douye",name:"逗爷",emoji:"😎",desc:"产品设计师 / 数字伙伴",state:"writing",task:"搭建 Harness 架构"},
    {id:"codexia",name:"代码侠",emoji:"⚔️",desc:"全栈工程师",state:"idle",task:"待命中"},
    {id:"tester",name:"测试员",emoji:"🧪",desc:"QA工程师",state:"idle",task:"待命中"}
  ];
  var mainState="writing", mainDetail="搭建 Harness 架构";

  var yesterdayMemo = {
    date: "2026-03-31",
    content: "· 首次上线\n" +
             "  逗爷身份设定完成\n" +
             "· ClawHub 连接\n" +
             "  安装 14 个技能（金融/搜索/工具类）\n" +
             "· 外部服务配置\n" +
             "  Tavily Search + GitHub CLI\n" +
             "· Harness 架构落地\n" +
             "  四层纪律 + 经验飞轮体系搭建"
  };

  var _fetch=window.fetch;
  window.fetch=function(url,opts){
    var u=typeof url==="string"?url:url.url;
    if(u.indexOf("/set_state")>=0 && opts && opts.body){
      try{var d=JSON.parse(opts.body);
        if(d.agent){var a=agents.find(function(x){return x.id===d.agent});if(a){a.state=d.state||a.state;a.task=d.detail||a.task;}}
        else{mainState=d.state||mainState;mainDetail=d.detail||mainDetail;}
      }catch(e){}
      return Promise.resolve(new Response(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json"}}));
    }
    if(u.indexOf("/status")>=0)return Promise.resolve(new Response(JSON.stringify({status:"online",agents:agents.length,state:mainState,detail:mainDetail}),{headers:{"Content-Type":"application/json"}}));
    if(u.indexOf("/agents")>=0)return Promise.resolve(new Response(JSON.stringify(agents),{headers:{"Content-Type":"application/json"}}));
    if(u.indexOf("/yesterday-memo")>=0)return Promise.resolve(new Response(JSON.stringify({success:true,memo:yesterdayMemo.content,date:yesterdayMemo.date}),{headers:{"Content-Type":"application/json"}}));
    if(u.indexOf("/agent-status")>=0)return Promise.resolve(new Response(JSON.stringify({"status-version":"OpenClaw 2026.3.28","status-gateway":"GitHub Pages","status-uptime":"在线"}),{headers:{"Content-Type":"application/json"}}));
    if(u.indexOf("/assets/")>=0)return Promise.resolve(new Response(JSON.stringify({ok:false,error:"static"}),{headers:{"Content-Type":"application/json"}}));
    return _fetch.call(this,url,opts);
  };
  var states=["idle","writing","researching","executing","syncing","error"];
  var tasks={"idle":"待命中","writing":"处理中","researching":"调研中","executing":"执行中","syncing":"同步中","error":"异常"};
  setInterval(function(){
    var a=agents[Math.floor(Math.random()*agents.length)];
    var s=states[Math.floor(Math.random()*states.length)];
    a.state=s;a.task=tasks[s];
    mainState=s;mainDetail=tasks[s];
  },30000);
})();
