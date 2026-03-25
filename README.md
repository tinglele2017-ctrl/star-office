# 🌟 逗爷的像素办公室

基于 [Star Office UI](https://github.com/ringhyacinth/Star-Office-UI) 的像素风 Agent 工作台。

🔗 **在线访问**: https://tinglele2017-ctrl.github.io/star-office/

![版本](https://img.shields.io/github/v/tag/tinglele2017-ctrl/star-office)
![Pages](https://img.shields.io/badge/GitHub-Pages-blue)

## 功能

| 面板 | 说明 |
|------|------|
| 🎮 像素办公室 | Phaser.js 渲染，龙虾角色 6 种状态自动切换 |
| 📋 任务中心 | 实时展示所有 Agent 工作状态，颜色标识 |
| 📝 昨日小记 | 展示最近日记内容 |
| ⏱️ 安装状态 | OpenClaw 版本、网关、运行时长等 |

## Agent

| 名称 | 角色 | Emoji |
|------|------|-------|
| 逗爷 | 产品设计师 | 🎯 |
| 代码侠 | 全栈工程师 | ⚔️ |
| 测试员 | QA 工程师 | 🧪 |

## 状态

- 🟢 待命 (idle) / 🔵 工作 (writing) / 🔮 调研 (researching)
- 💜 执行 (executing) / 🟡 同步 (syncing) / 🔴 异常 (error)

## 技术栈

- **引擎**: Phaser 3.80.1
- **字体**: ark-pixel 12px (中/英/日/韩)
- **素材**: 50+ 像素精灵图 (spritesheet/webp/png)
- **部署**: GitHub Pages + static-api.js (API mock)

## 本地运行

```bash
# 原版（需要 Node.js 后端）
node server.js
# 访问 http://localhost:19000

# 静态版（GitHub Pages 方式）
# 直接打开 index.html，配合 static-api.js
```

## License

素材来自 [Star Office UI](https://github.com/ringhyacinth/Star-Office-UI)。
