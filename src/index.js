
import jsPreviewPdf from '@js-preview/pdf';
import jsPreviewDocx from '@js-preview/docx';
import jsPreviewExcel from '@js-preview/excel';

import { download } from './utils';

const defOptions = {
    pageGap: 10,
    backgroundColor: 'rgb(82,86,89)',
    headerHeight: 50,
    headerBackgroundColor: 'rgb(50,54,57)'
};

window.__jsOfficePreview = { 
    defOptions, 
    download(evt) {
        const base = window.__jsOfficePreview[evt.path[evt.path[0].nodeName == 'svg' ? 3 : 4].id];

        download(base.src, base.options.fileName);
    },
    close(evt) {
        const id = evt.path[evt.path[0].nodeName == 'svg' ? 3 : 4].id;
            
        document.getElementById(id).remove();
        document.body.style.overflow = 'auto';

        typeof window.__jsOfficePreview[id].destroy === 'function' && window.__jsOfficePreview[id].destroy();

        delete window.__jsOfficePreview[id];
    }
};

/**
 * 
 * @param {String|Blob} fileUrl 
 * @param {{pageGap?:Number;backgroundColor?: String;headerHeight?:Number;headerBackgroundColor?: String;fileName?: String}} options 配置信息 
 */
export async function preview(src, options = {}) {
    let previewer = undefined;
    const container = document.createElement('div');

    const _options = Object.assign({ fileName: decodeURIComponent(src.split('?')[0].split('/').pop()) }, defOptions, options);
    const _fileType = _options.fileName.split('.').pop().toLowerCase();

    container.id = `jsOfficePreview_${Math.random().toString(36).substring(2)}`;
    container.style = `position:fixed;inset:0;z-index:9999;padding:${_options.headerHeight + _options.pageGap}px 0 ${_options.pageGap}px;overflow:auto;background-color:${_options.backgroundColor};`;
    container.innerHTML = `
        <div class="flex-row jsOfficePreview_header">
            <div style="font-weight:bold;">${_options.fileName}</div>
            <div style="height:36px;">
                <svg class="jsOfficePreview_header-icon download" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M479.37763555 736.52603222a50.09863111 50.09863111 0 0 0 72.23523556 0l289.71766556-292.04783331a51.26371555 51.26371555 0 1 0-72.23523555-72.23523556l-212.82209223 210.88028444V94.17614223c0-31.0689189-14.75773667-52.0404389-44.27320889-52.0404389a48.93354667 48.93354667 0 0 0-51.65207666 51.6520778v488.94710442L251.79780779 371.85460111a63.69128334 63.69128334 0 0 0-72.23523556 10.48576 50.09863111 50.09863111 0 0 0 0 72.23523556z m408.94464 77.67229667H135.67772445c-31.0689189 0-51.65207666 8.54395221-51.65207666 38.83614778s20.5831589 46.21501667 51.65207666 46.21501667h752.6445511c31.0689189 0 51.65207666-15.14609778 51.65207666-46.21501667s-20.5831589-38.44778667-51.65207666-38.44778667z" fill="#ffffff" p-id="2566">
                    </path>
                </svg>
                <svg class="jsOfficePreview_header-icon close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M886.94140625 886.94140625c-11.46972656 11.46972656-26.10351563 16.61132813-40.73730469 16.61132813-14.63378906 0-29.26757813-5.53710938-40.73730468-16.61132813L512 592.68359375l-293.86230469 293.86230469c-22.1484375 22.1484375-58.53515625 22.1484375-80.68359375 0-11.46972656-11.46972656-16.61132813-26.10351563-16.61132812-40.73730469 0-14.63378906 5.53710938-29.26757813 16.61132812-40.73730469L431.31640625 512 137.05859375 218.13769531c-22.1484375-22.1484375-22.1484375-58.53515625 0-80.68359375C148.52832031 125.58886719 163.16210937 120.44726562 177.79589844 120.44726562s29.26757813 5.53710938 40.73730469 16.61132813L512 431.31640625l293.86230469-293.86230469c22.1484375-22.1484375 58.53515625-22.1484375 80.68359375 0 11.46972656 11.46972656 16.61132813 26.10351563 16.61132812 40.73730469s-5.53710938 29.26757813-16.61132812 40.73730469L592.68359375 512l293.86230469 293.86230469c22.54394531 22.54394531 22.54394531 58.53515625 0.39550781 81.07910156z" p-id="2056" fill="#ffffff">
                    </path>
                </svg>
            </div>
        </div>
        <div id="${container.id}_loader" class="jsOfficePreview_loader">
            <svg viewBox="25 25 50 50" class="jsOfficePreview_loader-icon">
                <circle cx="50" cy="50" r="20" fill="none" class="jsOfficePreview_loader-icon-path"></circle>
            </svg>
            文件加载中...
        </div>
        <style type="text/css">${getStyleContent(_options)}</style>
    `;
    // 控制页面显示区域的滚动条处于不可见状态
    document.body.style.overflow = 'hidden';
    document.body.appendChild(container);
    initFnEvent(container);
    // 控制可预览的文件类型
    switch (_fileType) {
        case 'doc':
        case 'docx':
            previewer = jsPreviewDocx.init(container); break;
        case 'xls':
        case 'xlsx':
            previewer = jsPreviewExcel.init(container); break;
        case 'pdf':
            previewer = jsPreviewPdf.init(container, { width: Math.min(innerWidth, 800), gap: _options.pageGap }); break;
    }
    if (!previewer) return document.getElementById(container.id + '_loader').innerText = `暂不支持${_fileType}文件预览`;

    // 挂在预览实例到window对象上
    window.__jsOfficePreview[container.id] = {
        options: _options,
        instance: previewer,
        isBlob: src instanceof Blob,
        src: src instanceof Blob ? URL.createObjectURL(src) : src
    };
    try {
        await previewer.preview(src);
    } catch (e) {
        document.getElementById(container.id + '_loader').innerText = e.message;
    }
}

/**
 * 获取样式模版内容
 * @param {Record<string,any>} options 配置信息
 */
function getStyleContent(options = {}) {
    return `
        .flex-row { display: flex; align-items: center; justify-content: space-between; }
        .vue-office-pdf, .vue-office-docx { position: relative; height: auto!important; z-index: 10; }
        .vue-office-excel { position: absolute; inset: ${options.headerHeight }px 0 0 0; z-index: 10; }

        .docx-wrapper, .vue-office-pdf-wrapper { padding: 0!important; background-color: ${options.backgroundColor}!important; }
        .docx-wrapper .docx { box-shadow: none!important; margin-bottom: ${options.pageGap}px!important; }
        .docx-wrapper .docx:last-child { margin-bottom: 0!important; }

        
        .jsOfficePreview_header { position: fixed; inset: 0; height: 50px; z-index: 9999; padding: 0 20px; color: #fff; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5); background-color: ${options.headerBackgroundColor}; }
        .jsOfficePreview_header-icon { width: 36px; height: 36px; padding: 8px; box-sizing: border-box; cursor: pointer; border-radius: 50%; }
        .jsOfficePreview_header-icon:hover { background-color: rgba(238,238,238,0.1); }
        .jsOfficePreview_loader { position: fixed; inset: 50px 0 0 0; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; color: #fff; }
        .jsOfficePreview_loader-icon { height: 42px; width: 42px; margin-bottom: 15px; animation: jsOfficePreview_rotate 2s linear infinite; }
        .jsOfficePreview_loader-icon-path { stroke: #fff; stroke-width: 3; stroke-dashoffset: 0; stroke-linecap: round; stroke-dasharray: 90, 150; animation: jsOfficePreview_dash 1.5s ease-in-out infinite; }
        @keyframes jsOfficePreview_rotate { 
            100% { transform: rotate(1turn); } 
        }
        @keyframes jsOfficePreview_dash { 
            0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 
            50% { stroke-dasharray: 90, 150; stroke-dashoffset: -40px; } 
            100%{ stroke-dasharray: 90, 150; stroke-dashoffset: -120px; }
        }
    `;
}

/**
 * 初始化扩展功能事件
 * 
 * @param {Element} container 预览容器
 */
function initFnEvent(container) {
    container.querySelector('.download').addEventListener('click', window.__jsOfficePreview.download);
    container.querySelector('.close').addEventListener('click', window.__jsOfficePreview.close);
}

export default { preview, download }