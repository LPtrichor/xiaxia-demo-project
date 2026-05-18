<template>
  <footer class="portal-footer">
    <div class="page-container">
      <!-- 子网专网 -->
      <div class="footer-section">
        <h4 class="footer-title">子网专网</h4>
        <div class="sub-sites">
          <a href="#" class="sub-site-link" @click.prevent="showToast('国家检察官学院')">国家检察官学院</a>
          <a href="#" class="sub-site-link" @click.prevent="showToast('检察日报社')">检察日报社</a>
          <a href="#" class="sub-site-link" @click.prevent="showToast('中国检察出版社')">中国检察出版社</a>
        </div>
      </div>

      <!-- 相关链接 -->
      <div class="footer-section footer-links-row">
        <h4 class="footer-title">相关链接</h4>
        <div class="link-groups">
          <div class="link-group">
            <span class="link-group-title">政府机构</span>
            <a href="#" class="footer-link" @click.prevent>中国共产党新闻网</a>
            <a href="#" class="footer-link" @click.prevent>全国人大</a>
            <a href="#" class="footer-link" @click.prevent>中央政府</a>
            <a href="#" class="footer-link" @click.prevent>全国政协</a>
            <a href="#" class="footer-link" @click.prevent>最高人民法院</a>
          </div>
          <div class="link-group">
            <span class="link-group-title">相关机构</span>
            <a href="#" class="footer-link" @click.prevent>中央政法委</a>
            <a href="#" class="footer-link" @click.prevent>中央纪委国家监委</a>
            <a href="#" class="footer-link" @click.prevent>公安部</a>
            <a href="#" class="footer-link" @click.prevent>司法部</a>
          </div>
          <div class="link-group">
            <span class="link-group-title">新闻媒体</span>
            <a href="#" class="footer-link" @click.prevent>新华网</a>
            <a href="#" class="footer-link" @click.prevent>人民网</a>
            <a href="#" class="footer-link" @click.prevent>法治日报</a>
            <a href="#" class="footer-link" @click.prevent>检察日报</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer-bottom">
      <div class="page-container">
        <div class="footer-bottom-content">
          <p class="copyright">Copyrights©泗洪县人民检察院 All Rights Reserved.</p>
          <p class="footer-address">
            地址：江苏省宿迁市泗洪县XX路XX号（223900） 0527-XXXXXXX（查号台） 12309（检察服务热线）
          </p>
          <p class="footer-icp">
            备案序号：苏ICP备XXXXXXXX号-1 | 苏公网安备 XXXXXXXXXXXXX号
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const showToast = (msg: string) => {
  ElMessage.info({ message: msg, duration: 1500 })
}
</script>

<style lang="scss" scoped>
.portal-footer {
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0;
}

.page-container {
  max-width: $max-page-width;
  margin: 0 auto;
  padding: 0 $spacing-xl;
}

// 子网专网 & 链接
.footer-section {
  padding: $spacing-xl 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: #fff;
  margin: 0 0 $spacing-md;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $primary-color;
  display: inline-block;
}

.sub-sites {
  display: flex;
  gap: $spacing-xl;
  flex-wrap: wrap;
}

.sub-site-link {
  color: rgba(255, 255, 255, 0.7);
  font-size: $font-size-base;
  text-decoration: none;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: $card-radius-sm;
  transition: all $transition-fast;

  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
  }
}

.link-groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-xl;
}

.link-group-title {
  font-size: $font-size-sm;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: $spacing-sm;
  display: block;
}

.link-group {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm $spacing-lg;
}

.footer-link {
  color: rgba(255, 255, 255, 0.5);
  font-size: $font-size-sm;
  text-decoration: none;
  transition: color $transition-fast;

  &:hover {
    color: #fff;
  }
}

// 底部
.footer-bottom {
  padding: $spacing-lg 0;
  background: rgba(0, 0, 0, 0.2);
}

.footer-bottom-content {
  text-align: center;
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.35);
  line-height: 2;

  p {
    margin: 0;
  }
}

.copyright {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
}

@media (max-width: 768px) {
  .link-groups {
    grid-template-columns: 1fr;
  }
}
</style>
