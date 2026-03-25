// GitHub Pages 静态模式：拦截 API 调用，返回 mock 数据
(function() {
  const AGENTS = [
    { id: 'douye', name: '逗爷', status: 'working', emoji: '🎯', desc: '产品设计师', avatar: 'star' },
    { id: 'codexia', name: '代码侠', status: 'idle', emoji: '⚔️', desc: '全栈工程师', avatar: 'cats_3' },
    { id: 'tester', name: '测试员', status: 'idle', emoji: '🧪', desc: 'QA 工程师', avatar: 'cats_7' },
  ];

  const MEMO = '📌 像素办公室已部署到 GitHub Pages\n\n- 2026-03-24: Star Office UI 搭建完成\n- 2026-03-25: 重启并部署公网\n- 底部面板自适应修复\n- 安全检查面板上线';

  const SECURITY_CHECKS = {
    checks: [
      { icon: '🤖', name: 'OpenClaw', status: 'pass', detail: 'v2026.3.23-2' },
      { icon: '🌐', name: 'Gateway', status: 'pass', detail: '端口 18789 · systemd 托管' },
      { icon: '🔐', name: 'SSH', status: 'pass', detail: 'WSL 环境 · 未暴露' },
      { icon: '🛡️', name: '防火墙', status: 'pass', detail: 'WSL 无独立防火墙' },
      { icon: '📡', name: '监听端口', status: 'pass', detail: '5 个 · 仅本地回环' },
      { icon: '💾', name: '磁盘', status: 'pass', detail: '1% 已用 · 剩余充足' },
      { icon: '🧠', name: '内存', status: 'pass', detail: '1.1G/15G · 运行正常' },
      { icon: '📦', name: '系统更新', status: 'warn', detail: '26 个待更新' },
      { icon: '🐧', name: '系统', status: 'pass', detail: 'Ubuntu 24.04.4 LTS' },
      { icon: '⏱️', name: '运行时间', status: 'pass', detail: 'up 1 hour' },
    ],
    timestamp: new Date().toISOString()
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
    if (u.includes('/security-check')) {
      return Promise.resolve(new Response(JSON.stringify(SECURITY_CHECKS), { headers: { 'Content-Type': 'application/json' } }));
    }
    if (u.includes('/assets/')) {
      return Promise.resolve(new Response(JSON.stringify({ ok: false, error: 'static mode' }), { headers: { 'Content-Type': 'application/json' } }));
    }

    return _fetch.call(this, url, opts);
  };
})();
