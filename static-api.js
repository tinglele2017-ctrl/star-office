// GitHub Pages 静态模式：拦截 API 调用，返回 mock 数据
(function() {
  const AGENTS = [
    { id: 'douye', name: '逗爷', status: 'working', emoji: '🎯', desc: '产品设计师', avatar: 'star' },
    { id: 'codexia', name: '代码侠', status: 'idle', emoji: '⚔️', desc: '全栈工程师', avatar: 'cats_3' },
    { id: 'tester', name: '测试员', status: 'idle', emoji: '🧪', desc: 'QA 工程师', avatar: 'cats_7' },
  ];

  const MEMO = '📌 像素办公室已部署到 GitHub Pages\n\n- 2026-03-24: Star Office UI 搭建完成\n- 2026-03-25: 重启并部署公网\n- 底部面板自适应修复\n- 安全检查面板上线';

  const AGENT_STATUS = {
    "status-version": "OpenClaw 2026.3.23-2",
    "status-gateway": "端口 18789 · systemd",
    "status-uptime": "up 2+ hours"
  };

  const _fetch = window.fetch;
  window.fetch = function(url, opts) {
    const u = typeof url === 'string' ? url : url.url;

    if (u.includes('/agents')) {
      return Promise.resolve(new Response(JSON.stringify(AGENTS), { headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.includes('/yesterday-memo')) {
      return Promise.resolve(new Response(JSON.stringify({ success: true, memo: MEMO, date: new Date().toLocaleDateString('zh-CN') }), { headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.includes('/status')) {
      return Promise.resolve(new Response(JSON.stringify({ status: 'online', agents: AGENTS.length }), { headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.includes('/set_state')) {
      return Promise.resolve(new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.includes('/agent-status')) {
      return Promise.resolve(new Response(JSON.stringify(AGENT_STATUS), { headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.includes('/assets/')) {
      return Promise.resolve(new Response(JSON.stringify({ ok: false, error: 'static mode' }), { headers: { 'Content-Type': 'application/json' } }));
    }

    return _fetch.call(this, url, opts);
  };
})();
