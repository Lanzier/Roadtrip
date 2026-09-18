# Model 3 自驾助手 PWA

## GitHub Pages 部署
1. 在 GitHub 新建一个 Public 仓库，例如 `model3-roadtrip`
2. 把本文件夹里的所有文件上传到仓库根目录
3. GitHub 仓库进入 Settings → Pages
4. Build and deployment 选择 `Deploy from a branch`
5. Branch 选择 `main`，文件夹选择 `/ (root)`，保存
6. 稍等 1–3 分钟后，用 GitHub Pages 给出的 HTTPS 地址在 iPhone Safari 打开
7. 网页地址：https://lanzier.github.io/Roadtrip/

## iPhone 安装
Safari → 分享 → 添加到主屏幕

## 高德地图
在 App 内“高德设置”填写 Web端(JS API) Key 与 securityJsCode。
GitHub Pages 是 HTTPS，因此实时 GPS 定位权限可以正常请求。
