# Model 3 自驾助手 PWA

## GitHub Pages 部署
1. 在 GitHub 新建一个 Public 仓库，例如 `model3-roadtrip`
2. 把本文件夹里的所有文件上传到仓库根目录
3. GitHub 仓库进入 Settings → Pages
4. Build and deployment 选择 `Deploy from a branch`
5. Branch 选择 `main`，文件夹选择 `/ (root)`，保存
6. 稍等 1–3 分钟后，用 GitHub Pages 给出的 HTTPS 地址在 iPhone Safari 打开

## iPhone 安装
Safari → 分享 → 添加到主屏幕

## 高德地图
在 App 内“高德设置”填写 Web端(JS API) Key 与 securityJsCode。
GitHub Pages 是 HTTPS，因此实时 GPS 定位权限可以正常请求。


## 云端同步（v8）

本版本加入 Supabase 云同步：
- 同一邮箱登录后，多设备读取同一份行程。
- 本地仍保留 localStorage 缓存，离线可继续使用。
- 修改后约 0.9 秒自动推送云端。
- 页面重新打开 / 回到前台会自动拉取云端较新的版本。
- 冲突时以 `updatedAt` 较新的行程为准。

启用步骤：
1. 创建 Supabase 项目。
2. 在 SQL Editor 执行 `supabase-setup.sql`。
3. 把 Project URL 与 Publishable Key 填入 `cloud-config.js`。
4. 在 Supabase Auth URL Configuration 中，把 GitHub Pages 地址加入 Site URL / Redirect URLs。
5. 上传更新后的文件到 GitHub Pages。


## v9 已绑定 Supabase 项目

`cloud-config.js` 已填入当前项目的 Project URL 与 Publishable Key。

还需要在 Supabase 控制台完成一次：
1. SQL Editor 执行 `supabase-setup.sql`
2. Authentication → URL Configuration
3. Site URL 填你的 GitHub Pages 站点
4. Redirect URLs 加入同一个 GitHub Pages 地址（建议同时加入带 / 与不带 / 的版本）
5. Authentication → Providers → Email 保持启用

完成后，多设备使用同一邮箱的 Magic Link 登录即可同步。
