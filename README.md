# 生命靈數計算與解析 (Numerology Web App)

一個簡潔、現代且帶有神祕感的生命靈數計算工具。輸入西元出生年月日，即刻解析你的生命能量藍圖。

🚀 **線上體驗：[https://laurenchen-yt.github.io/Numerology/](https://laurenchen-yt.github.io/Numerology/)**

---

## ✨ 核心功能

- **生命數核心解析**：自動計算並推導生命數（1-9），提供核心性格與成長建議。
- **天賦數與星座**：精確判定西洋星座及其對應星座數，拆解天賦數特質。
- **視覺化九宮格**：動態生成 1-9 九宮格，直觀呈現數字分布與能量強弱。
- **連線判定機制**：自動偵測「思維、意志、行動」等 8 條主要連線，並以 SVG 動態繪製。
- **智能解析文案**：根據計算結果，自動生成 300~500 字的繁體中文深度分析。
- **現代化介面**：深色星空美學，全面支援響應式設計（RWD）。

## 🛠️ 技術棧

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Deployment**: GitHub Actions (GitHub Pages)

## 🚀 本地開發

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```
瀏覽器打開 [http://localhost:3000](http://localhost:3000) 即可查看。

### 3. 建置與匯出 (Static Export)
```bash
npm run build
```
產生的靜態檔案將位於 `out/` 目錄。

## 📁 專案結構

- `/app`: 頁面路由與全域樣式
- `/components`: 拆分後的功能元件（表單、九宮格、解析卡片等）
- `/lib`: 核心計算邏輯（日期解析、靈數演算法、連線判定）
- `/types`: TypeScript 型別定義
- `/constants`: 靜態映射資料（星座數等）

## 📜 聲明
本工具僅供娛樂與自我探索參考，不構成任何專業命理建議。

---
Produced by Antigravity AI Engineering.
