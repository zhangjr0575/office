# @zhangjr0575/office

[English](#english) | [中文](#中文)

---

## 中文

一个轻量级的 Office 文件预览与下载插件，支持 **PDF**、**Word（doc/docx）**、**Excel（xls/xlsx）** 文件在浏览器中的全屏预览和一键下载。无需依赖任何框架，开箱即用。

### 特性

- 支持 PDF、DOCX、DOC、XLSX、XLS 格式文件预览
- 全屏遮罩层预览，不影响页面布局
- 内置文件下载功能
- 支持 URL 和 Blob 两种文件来源
- 自动识别文件类型
- 可自定义头部样式和页面间距
- 加载中动画提示
- 框架无关，可在 Vue、React 或原生 JS 项目中使用

### 安装

```bash
npm install @zhangjr0575/office
```

### 快速开始

```javascript
import { preview } from '@zhangjr0575/office';

preview('https://example.com/sample.pdf');
```

### API

#### `preview(src, options?)`

预览文件的主入口函数。调用后会在全屏遮罩层中打开文件预览器。

**参数：**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `String \| Blob` | 文件的 URL 地址或 Blob 对象 |
| `options` | `Object` | 可选，配置项，见下表 |

**配置项（options）：**

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fileName` | `String` | 从 URL 自动解析 | 显示在头部的文件名 |
| `pageGap` | `Number` | `10` | 页面之间的间距（px） |
| `backgroundColor` | `String` | `'rgb(82,86,89)'` | 预览区域背景色 |
| `headerHeight` | `Number` | `50` | 头部工具栏高度（px） |
| `headerBackgroundColor` | `String` | `'rgb(50,54,57)'` | 头部工具栏背景色 |

**示例：**

```javascript
import { preview } from '@zhangjr0575/office';

// 通过 URL 预览
preview('https://example.com/document.pdf');

// 通过 Blob 预览
preview(blobObject, { fileName: 'report.xlsx' });

// 自定义样式
preview('https://example.com/document.docx', {
  pageGap: 15,
  backgroundColor: '#f5f5f5',
  headerHeight: 60,
  headerBackgroundColor: '#333',
  fileName: '自定义文件名.docx'
});
```

#### `download(src, fileName)`

下载文件到本地。

**参数：**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `String \| Blob` | 文件的 URL 地址或 Blob 对象 |
| `fileName` | `String` | 下载后的文件名 |

**示例：**

```javascript
import { download } from '@zhangjr0575/office';

download('https://example.com/report.xlsx', 'report.xlsx');
```

### 支持的文件格式

| 格式 | 扩展名 |
| --- | --- |
| PDF | `.pdf` |
| Word | `.doc`, `.docx` |
| Excel | `.xls`, `.xlsx` |

### 依赖

本插件基于以下开源库构建：

- [@js-preview/pdf](https://www.npmjs.com/package/@js-preview/pdf) — PDF 文件预览
- [@js-preview/docx](https://www.npmjs.com/package/@js-preview/docx) — Word 文件预览
- [@js-preview/excel](https://www.npmjs.com/package/@js-preview/excel) — Excel 文件预览

### 在 Vue 3 中使用

```vue
<template>
  <button @click="onPreview">预览文件</button>
</template>

<script setup>
import { preview } from '@zhangjr0575/office';

function onPreview() {
  preview('https://example.com/sample.pdf');
}
</script>
```

项目内置了一个 Vue 3 示例，位于 `example/vue3/` 目录，可按如下方式运行：

```bash
cd example/vue3
npm install
npm run dev
```

### 预览器操作

预览器打开后，头部工具栏提供以下操作按钮：

- **下载**：将当前预览的文件下载到本地
- **关闭**：关闭预览器，恢复页面滚动

### 注意事项

- 预览 PDF 文件时，PDF 渲染宽度最大为 `800px`，超出浏览器宽度时会自动适配
- 当传入 URL 时，请确保目标服务器配置了正确的 CORS 策略
- 文件名默认从 URL 路径中自动提取，若 URL 中包含查询参数会被自动忽略

---

## English

A lightweight Office file preview and download plugin for browsers. Supports fullscreen preview and one-click download for **PDF**, **Word (doc/docx)**, and **Excel (xls/xlsx)** files. Framework-agnostic and ready to use out of the box.

### Features

- Preview PDF, DOCX, DOC, XLSX, and XLS files
- Fullscreen overlay preview without affecting page layout
- Built-in file download capability
- Supports both URL and Blob file sources
- Automatic file type detection
- Customizable header styles and page spacing
- Loading animation indicator
- Framework-agnostic — works with Vue, React, or vanilla JavaScript

### Installation

```bash
npm install @zhangjr0575/office
```

### Quick Start

```javascript
import { preview } from '@zhangjr0575/office';

preview('https://example.com/sample.pdf');
```

### API

#### `preview(src, options?)`

Main entry function for file preview. Opens a fullscreen overlay with the file previewer.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `src` | `String \| Blob` | File URL or Blob object |
| `options` | `Object` | Optional configuration, see table below |

**Options:**

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `fileName` | `String` | Auto-parsed from URL | File name displayed in the header |
| `pageGap` | `Number` | `10` | Gap between pages (px) |
| `backgroundColor` | `String` | `'rgb(82,86,89)'` | Preview area background color |
| `headerHeight` | `Number` | `50` | Header toolbar height (px) |
| `headerBackgroundColor` | `String` | `'rgb(50,54,57)'` | Header toolbar background color |

**Examples:**

```javascript
import { preview } from '@zhangjr0575/office';

// Preview via URL
preview('https://example.com/document.pdf');

// Preview via Blob
preview(blobObject, { fileName: 'report.xlsx' });

// Custom styles
preview('https://example.com/document.docx', {
  pageGap: 15,
  backgroundColor: '#f5f5f5',
  headerHeight: 60,
  headerBackgroundColor: '#333',
  fileName: 'custom-name.docx'
});
```

#### `download(src, fileName)`

Download a file to local disk.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `src` | `String \| Blob` | File URL or Blob object |
| `fileName` | `String` | Downloaded file name |

**Example:**

```javascript
import { download } from '@zhangjr0575/office';

download('https://example.com/report.xlsx', 'report.xlsx');
```

### Supported File Formats

| Format | Extensions |
| --- | --- |
| PDF | `.pdf` |
| Word | `.doc`, `.docx` |
| Excel | `.xls`, `.xlsx` |

### Dependencies

This plugin is built on top of the following open-source libraries:

- [@js-preview/pdf](https://www.npmjs.com/package/@js-preview/pdf) — PDF file preview
- [@js-preview/docx](https://www.npmjs.com/package/@js-preview/docx) — Word file preview
- [@js-preview/excel](https://www.npmjs.com/package/@js-preview/excel) — Excel file preview

### Usage with Vue 3

```vue
<template>
  <button @click="onPreview">Preview File</button>
</template>

<script setup>
import { preview } from '@zhangjr0575/office';

function onPreview() {
  preview('https://example.com/sample.pdf');
}
</script>
```

A Vue 3 example is included in the `example/vue3/` directory. Run it with:

```bash
cd example/vue3
npm install
npm run dev
```

### Previewer Controls

Once the previewer is open, the header toolbar provides the following buttons:

- **Download**: Download the currently previewed file to local disk
- **Close**: Close the previewer and restore page scrolling

### Notes

- PDF rendering width is capped at `800px`; it auto-adapts when the browser window is narrower
- When passing a URL, ensure the target server has proper CORS policies configured
- The file name is automatically extracted from the URL path; query parameters are ignored

### License

ISC
