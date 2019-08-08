
function compress({
  dataURL, 
  fileInfo = {}, 
  innerCallBack, 
  shouldCompress = true,
  outerCallBack
}) {
  const img = new window.Image()
  img.src = dataURL
  const type = fileInfo.type || 'image/jpeg'
  img.onload = function() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    let compressedDataUrl

    if (shouldCompress) {
      compressedDataUrl = canvas.toDataURL(type, 0.2)  // 按照0~1的图片质量比例，不是大小比例
    } else {
      compressedDataUrl = canvas.toDataURL(type, 1)
    }
    // console.log('dataUrl', compressedDataUrl)
    return innerCallBack({ dataURL: compressedDataUrl, fileInfo, outerCallBack })
  }
}

function dataUrl2File({ dataURL, fileInfo, outerCallBack }) {
  // 这里使用二进制方式处理dataUrl
  const binaryString = window.atob(dataURL.split(',')[1])
  const arrayBuffer = new ArrayBuffer(binaryString.length)
  const intArray = new Uint8Array(arrayBuffer)
  const type = fileInfo.type || 'image/jpeg'
  const name = fileInfo.name || 'unknow'
  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i)
  }
  const data = [intArray]
  let blob
  try {
    blob = new Blob(data, { type })
  } catch (error) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (error.name === 'TypeError' && window.BlobBuilder) {
      const builder = new BlobBuilder();
      builder.append(arrayBuffer);
      blob = builder.getBlob(type);
    } else {
      // Toast.error("版本过低，不支持上传图片", 2000, undefined, false);
      throw new Error('版本过低，不支持上传图片');
    }
  }
  // blob 转file
  const fileOfBlob = new File([blob], name)
  // console.log('compress result', { compressedUrl: dataURL, compressedFile: fileOfBlob })
  // return { compressedUrl: dataURL, compressedFile: fileOfBlob }
  outerCallBack({ compressedUrl: dataURL, compressedFile: fileOfBlob })
}

export default {
  methods: {
    getCompressedImageData(file, callBack) {
      const imgCompassMaxSize = 1024 * 1024 // 超过或等于 1MB 就压缩
      // 文件类型信息
      const imgFile = {}
      imgFile.type = file.type || 'image/jpeg' // 部分安卓出现获取不到type的情况
      imgFile.size = file.size
      imgFile.name = file.name
      imgFile.lastModifiedDate = file.lastModifiedDate

      // 封装好的函数
      const reader = new FileReader()

      // file转dataUrl是个异步函数，要将代码写在回调里
      reader.onload = function(e) {
        console.log('result reader event', e)
        const result = e.target.result
        if (result.length < imgCompassMaxSize) {
          return compress({dataURL: result, fileInfo: imgFile, innerCallBack: dataUrl2File, shouldCompress: false, outerCallBack: callBack}) // 图片不压缩
        } else {
          return compress({dataURL: result, fileInfo: imgFile, innerCallBack: dataUrl2File, outerCallBack: callBack}) // 图片压缩
        }
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }
}
