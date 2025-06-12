<template>
  <el-drawer 
    v-model="props.isVisible" 
    :title="props.title">
    <div class="product-image-container">
        <el-image 
            :src="srcList[0]"
            :preview-src-list="srcList"
            fit="fill"
            show-progress>
            <template
                #toolbar="{ actions, prev, next, reset, activeIndex, setActiveItem }">
                <el-icon @click="prev">
                    <Back />
                </el-icon>
                <el-icon @click="next">
                    <Right />
                </el-icon>
                <el-icon @click="setActiveItem(srcList.length - 1)">
                <DArrowRight />
                </el-icon>
                <el-icon @click="actions('zoomOut')">
                    <ZoomOut />
                </el-icon>
                <el-icon @click="actions('zoomIn', { enableTransition: false, zoomRate: 2 })">
                    <ZoomIn />
                </el-icon>
                <el-icon @click="actions('clockwise', { rotateDeg: 180, enableTransition: false })">
                    <RefreshRight />
                </el-icon>
                <el-icon @click="actions('anticlockwise')">
                    <RefreshLeft />
                </el-icon>
                <el-icon @click="reset">
                    <Refresh />
                </el-icon>
                <el-icon @click="download(activeIndex)">
                    <Download />
                </el-icon>
            </template>
        </el-image>
    </div>
    <div class="product-info-container">
        
    </div>
    <template #footer>
        <el-button type="primary">保存</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ZoomOut, ZoomIn, RefreshRight, RefreshLeft, Download, Back, Right, DArrowRight, Refresh } from '@element-plus/icons-vue'
const props = defineProps({
    isVisible: Boolean,
    title: String,
})

const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
]


const download = (index: number) => {
  const url = srcList[index]
  const suffix = url.slice(url.lastIndexOf('.'))
  const filename = Date.now() + suffix

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(blobUrl)
      link.remove()
    })
}
</script>

<style scoped>
.product-image-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 30%;
    width: 100%;
}

.product-info-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 80%;
    width: 100%;
}

.el-image {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
</style>

