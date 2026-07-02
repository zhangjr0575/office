<template>
  <div id="app">
    <el-button type="primary" @click="onPreviewPdf">pdf文件预览</el-button>
    <el-button type="primary" @click="onPreviewDoc">doc文件预览</el-button>
    <el-button type="primary" @click="onPreviewExcel">excel文件预览</el-button>
  </div>
</template>

<script setup>
import { preview } from '@zhangjr0575/office';

function onPreviewPdf() {
  preview('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf');
}

function onPreviewDoc() {
  preview('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx');
}

function onPreviewExcel() {
  preview('http://spman-vision.oss-cn-shanghai.aliyuncs.com/%E5%AF%BC%E5%85%A5%E6%8A%95%E4%BF%9D%E5%8D%95%E5%88%97%E8%A1%A8%E6%A8%A1%E6%9D%BF.xlsx?Expires=1782982146&OSSAccessKeyId=LTAI5tH2DVfzLnrRZctDUUh8&Signature=tihHzdkTMhRvycKKXfYXuTTbqS8%3D');
}
</script>
