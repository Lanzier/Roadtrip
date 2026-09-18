// Supabase 云同步配置（免登录自动同步模式）
// 使用 Publishable Key，可安全放在前端。
// 不要把 service_role / secret key 放进网页。
window.ROADTRIP_CLOUD_CONFIG = {
  url: "https://bpaslvebxvbvjwgvwhac.supabase.co",
  publishableKey: "sb_publishable_Pd22GwMBcZJ7eOI5f2NUlA_idxeyyUJ",
  tripId: "5cba6c6e-2d07-4a59-945f-39b90f4c3f21"
};

// tripId 仅用于当前个人行程的共享记录定位；实时 GPS 位置不会上传。
