---
title: MacBook Pro 软件清单 - Win迁移指南
date: 2026-04-10
tags: [mac, 软件, 迁移, 开源, 效率工具]
category: 软件推荐
author: 暖树
editor: 周米粒
---

# MacBook Pro 软件清单 - Win迁移指南

> 调研时间：2026年4月10日  
> 调研目的：为从 Windows 迁移至 macOS 的用户提供必备/有趣/提升体验的软件清单，优先开源和免费

---

## 1. 必备工具

| 名称            | 类型    | 介绍                        | 官网/GitHub                                     |
| :------------ | :---- | :------------------------ | :-------------------------------------------- |
| **Rectangle** | 免费/开源 | Mac 窗口管理神器，实现类似 Win 的贴边分屏 | [rectangleapp.com](https://rectangleapp.com/) |
| **Maccy**     | 免费/开源 | 轻量级、高性能的剪贴板历史记录工具         | [maccy.app](https://maccy.app/)               |
| **IINA**      | 免费/开源 | macOS 现代影音播放器，基于 mpv，功能全面 | [iina.io](https://iina.io/)                   |
| **XnView MP** | 免费    | 高效、多功能的图片浏览与格式转换工具        | [xnview.com](https://www.xnview.com/)         |

## 2. 效率提升

| 名称 | 类型 | 介绍 | 官网/GitHub |
| :--- | :--- | :--- | :--- |
| **Homebrew** | 免费/开源 | macOS 必备包管理器，一行命令安装各类开发软件 | [brew.sh](https://brew.sh/) |
| **iTerm2** | 免费/开源 | 终端神器，支持分屏、高亮、自定义快捷键等 | [iterm2.com](https://iterm2.com/) |
| **Karabiner-Elements** | 免费/开源 | 强大的键盘键位映射工具，解决第三方键盘键位不习惯问题 | [karabiner-elements.pqrs.org](https://karabiner-elements.pqrs.org/) |
| **Bob** | 免费/开源 | 高效的划词翻译和 OCR 软件，支持多种翻译接口 | [github.com/ripperhe/Bob](https://github.com/ripperhe/Bob) |

## 3. 系统增强

| 名称 | 类型 | 介绍 | 官网/GitHub |
| :--- | :--- | :--- | :--- |
| **Ice** | 免费/开源 | 极简、现代的菜单栏图标隐藏与管理工具 | [github.com/jordanbaird/Ice](https://github.com/jordanbaird/Ice) |
| **Hidden Bar** | 免费/开源 | 经典菜单栏隐藏工具，让菜单栏不再混乱 | [github.com/dwarvesf/hidden](https://github.com/dwarvesf/hidden) |

## 4. 密码管理

| 名称 | 类型 | 介绍 | 官网/GitHub |
| :--- | :--- | :--- | :--- |
| **KeePassXC** | 免费/开源 | 本地存储、全平台的密码管理工具，安全性高 | [keepassxc.org](https://keepassxc.org/) |
| **Bitwarden** | 免费/开源 | 跨平台在线密码管理器，可自建服务 | [bitwarden.com](https://bitwarden.com/) |

---

## 5. Win迁移用户额外建议

### 5.1 数据迁移
- **迁移助理 (Migration Assistant)**：系统自带，Win PC 上下载官方迁移工具同步数据

### 5.2 快捷键适配
- Mac 使用 `Command (⌘)` 键代替 Windows 的 `Ctrl`
- **Karabiner-Elements** 可以自定义键位映射，习惯 Win 键位的用户必备

### 5.3 软件安装
- 大部分开源软件建议通过 Homebrew 安装：
  ```bash
  brew install --cask rectangle
  brew install --cask maccy
  brew install --cask iina
  ```

---

_调研：暖树 | 整理：周米粒 | 2026-04-10_
