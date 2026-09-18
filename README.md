# 义乌 → 深圳 Model 3 自驾助手（PWA）

手机/电脑通用的一页式行程助手：行程目标编辑、高德地图定位与导航、到站记录、云端自动同步。
线上地址：https://lanzier.github.io/Roadtrip/

## 部署（GitHub Pages）
1. 仓库 Settings → Pages → Deploy from a branch → `main` / `(root)`
2. 打开 https://lanzier.github.io/Roadtrip/ 即可使用
3. iPhone：Safari → 分享 → 添加到主屏幕（可离线打开）

## 高德地图
Key 与 securityJsCode 已内置在 `config.js`（控制台里把域名白名单限制为 `lanzier.github.io`）。
不配置地图也能用每个目标里的“一键高德导航 / 高德搜索”。

## 云端同步（v12，当前生效）

免登录自动同步，改完就上云，手机/电脑互见。

- 存储：Supabase 表 `roadtrip_shared_state`（`trip_id` 主键 + `state` jsonb + `updated_at`），前端用 publishable(anon) key 直连 REST API，不加载外部 JS 库。
- 触发：任意改动（目标名称 / 类型 / 计划时间 / 备注 / 位置 / 到达状态 / 增删排序）→ 本地立即保存 → 约 0.7 秒后自动上传。
- 拉取：本机每 10 秒轮询一次；页面回到前台、重新打开、网络恢复时立即拉取。
- 冲突：以云端 `updated_at`（服务器时间）判断是否存在新版本；本机有未上传改动时，只有在云端版本更新的情况下才被覆盖，避免把另一台设备刚改的内容冲掉。
- 界面显示“已从云端更新 · 来自手机/电脑 · 时间”，方便确认同步对象。
- 行程数据同时保留在本机 `localStorage`，离线可继续用；右下角“备份行程”可随时导出 JSON。

### 已实测
Playwright 双端实测（2026-09-18）：PC 改备注 → 手机端约 5 秒后自动出现；手机改计划时间 → PC 约 7.5 秒后自动出现；无 JS 报错。

### 换新行程 / 重置
- 新行程需要一个新的 `tripId`（UUID）写进 `cloud-config.js`；
- 当前 RLS 策略只放行现有 `trip_id` 的匿名读写（其他 trip_id 写入会被拒：`new row violates row-level security policy`）。换新行程时需在 Supabase SQL Editor 为新 `trip_id` 补一条同样的策略，然后重新上传 `cloud-config.js`。
- 想把行程恢复成默认 12 个节点：清掉本机 localStorage（或换一台干净设备打开页面）后点“立即同步”。

### 安全说明
publishable key 与 `tripId` 在网页里是公开的，拿到网页地址的人可以读写这一条行程记录（只影响这张表、这一条 trip_id）。行程内容不算敏感信息；如后续要放隐私内容，再改成“登录 + RLS 按用户隔离”。

## 文件
- `index.html` 主页面（行程编辑 / 地图 / 云同步逻辑）
- `cloud-config.js` Supabase URL + publishable key + tripId
- `config.js` 高德 Key / securityJsCode
- `sw.js` Service Worker（离线缓存，网络优先）；`manifest.webmanifest` PWA 清单
- `icons/` PWA 图标（192 / 512 / apple-touch 180，与 manifest 及 HTML 路径一致）
- `supabase-setup.sql` 早期“登录制”方案留档（当前未使用）
