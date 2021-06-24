import { getSuffix } from "./util";

// 内部变量：文件类型与扩展名映射关系
const FileTypeMap = {
    "t-image": ["jpg", "jpeg", "png", "gif", "bmp", "tif", "webp"],
    "t-video": ["mp4", "rmvb", "avi", "mov", "3gp"],
    "t-word": ["docx", "doc"],
    "t-excel": ["xlsx", "xls"],
    "t-ppt": ["ppt", "pptx"],
    "t-document": ["pdf", "t-word", "t-excel", "t-ppt"],
    "t-zip": ["zip", "rar"]
}

// 内部变量：文件类型列表
const fileTypeKey = Object.keys(FileTypeMap);

/**
 * 通过文件类型获取扩展名列表
 * @param type[String] FileTypeMap 中约定的类型名
 * @return 目标类型的扩展名数组
 * */
export const getExtByType = (type) => {
    if (type && Array.isArray(FileTypeMap[type])) {
        let classList = [];
        let extList = [];
        FileTypeMap[type].forEach(e => {
            if (e.indexOf('t-') === 0) {
                classList.push(e)
            } else {
                extList.push(e)
            }
        })
        if (classList.length) {
            classList.forEach(classType => {
                extList = extList.concat(getExtByType(classType))
            })
        }
        return extList
    } else {
        return [type.toLowerCase()]
    }
}

/**
 * 通过url获取文件类型
 * @param url[String] 文件名或url
 * @return url文件所属的FileTypeMap类别，不匹配返回null
 * */
export const getFileType = (url) => {
    if (url && url.split) {
        const fileExt = getSuffix(url);
        const targetIndex = fileTypeKey.findIndex(key => {
            return getExtByType(key).findIndex(e => e === fileExt) !== -1
        })
        if (targetIndex !== -1) {
            return fileTypeKey[targetIndex]
        } else {
            return null
        }
    }
}