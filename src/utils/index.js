/**
 * 从远端获取文件的blob对象
 * @param {String} src 远端地址
 * @returns {Promise<Blob>}
 */
function getBlobFromRemote(src) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', src);
        xhr.responseType = 'blob';

        xhr.onload = () => {
            xhr.status === 200 && resolve(xhr.response);
        };
        xhr.send();
    });
}

/***
 * 文件下载
 * @param {String|Blob} src 文件访问地址
 * @param {String} fileName 文件名
 */
export async function download(src, fileName) {
    const downloader = document.createElement('a');

    downloader.download = fileName;

    downloader.href = URL.createObjectURL(src instanceof Blob ? src : await getBlobFromRemote(src));

    downloader.click();
    URL.revokeObjectURL(downloader.href);
    downloader.remove();
}

