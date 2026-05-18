<template>
  <div class="home-view">
    <!-- 头条新闻 + 轮播图 -->
    <section class="top-section">
      <!-- 头条新闻 -->
      <div class="headline-area">
        <div class="headline-main tap-active" @click="onHeadlineClick">
          <h2 class="headline-title">{{ headline.title }}</h2>
          <p class="headline-subtitle">{{ headline.subtitle }}</p>
        </div>
        <ul class="headline-list">
          <li v-for="(item, idx) in headlineList" :key="idx" class="tap-active" @click="onHeadlineItemClick(item)">
            <span class="headline-num">{{ idx + 1 }})</span>
            <a class="headline-link" :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
        <a href="#" class="more-headlines" @click.prevent="showToast('查看更多头条')">更多头条&gt;&gt;</a>
      </div>

      <!-- 轮播图 -->
      <div class="carousel-area">
        <el-carousel :interval="5000" arrow="always" height="320px" indicator-position="outside">
          <el-carousel-item v-for="slide in slides" :key="slide.id">
            <div class="slide-item" :style="{ background: slide.gradient }">
              <div class="slide-content">
                <h3 class="slide-title">{{ slide.title }}</h3>
                <p class="slide-subtitle">{{ slide.subtitle }}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- 重点工作新闻 -->
    <section class="key-work-section">
      <div class="key-work-grid">
        <div class="key-work-main">
          <div class="section-header">
            <h3 class="section-title">重点工作</h3>
            <a class="more-link" href="#" @click.prevent="showToast('查看更多')">更多&gt;&gt;</a>
          </div>
          <ul class="news-list">
            <li v-for="(item, idx) in keyWorkNews" :key="idx" class="tap-active">
              <a class="news-link" href="#" @click.prevent="showToast(item.title)">
                <span class="news-title">{{ item.title }}</span>
                <span class="news-date">{{ item.date }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="key-work-side">
          <div class="section-header">
            <h3 class="section-title">专题</h3>
          </div>
          <div class="topic-grid">
            <div v-for="topic in topics" :key="topic.title" class="topic-item tap-active" @click="showToast(topic.title)">
              <span class="topic-title">{{ topic.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 多栏新闻 -->
    <section class="multi-news-section">
      <div class="multi-news-grid">
        <!-- 检察新闻 -->
        <div class="news-block">
          <div class="section-header">
            <h3 class="section-title">最高检新闻</h3>
            <a class="more-link" href="#" @click.prevent="showToast('查看更多')">更多&gt;&gt;</a>
          </div>
          <ul class="news-list">
            <li v-for="(item, idx) in newsItems" :key="idx" class="tap-active">
              <a class="news-link" href="#" @click.prevent="showToast(item.title)">
                <span class="news-title">{{ item.title }}</span>
                <span class="news-date">{{ item.date }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 地方动态 -->
        <div class="news-block">
          <div class="section-header">
            <h3 class="section-title">地方动态</h3>
            <a class="more-link" href="#" @click.prevent="showToast('查看更多')">更多&gt;&gt;</a>
          </div>
          <ul class="news-list">
            <li v-for="(item, idx) in localNews" :key="idx" class="tap-active">
              <a class="news-link" href="#" @click.prevent="showToast(item.title)">
                <span class="news-title">{{ item.title }}</span>
                <span class="news-date">{{ item.date }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 权威发布 -->
        <div class="news-block">
          <div class="section-header">
            <h3 class="section-title">权威发布</h3>
            <a class="more-link" href="#" @click.prevent="showToast('查看更多')">更多&gt;&gt;</a>
          </div>
          <ul class="news-list">
            <li v-for="(item, idx) in authorityNews" :key="idx" class="tap-active">
              <a class="news-link" href="#" @click.prevent="showToast(item.title)">
                <span class="news-title">{{ item.title }}</span>
                <span class="news-date">{{ item.date }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 新闻发布 + 访谈 -->
    <section class="press-section">
      <div class="press-grid">
        <!-- 新闻发布会 -->
        <div class="press-block">
          <div class="section-header">
            <h3 class="section-title">新闻发布会</h3>
          </div>
          <ul class="news-list">
            <li v-for="(item, idx) in pressNews" :key="idx" class="tap-active">
              <a class="news-link" href="#" @click.prevent="showToast(item.title)">
                <span class="news-title">{{ item.title }}</span>
                <span class="news-date">{{ item.date }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 网上发布厅 -->
        <div class="press-block">
          <div class="section-header">
            <h3 class="section-title">网上发布厅</h3>
          </div>
          <ul class="news-list">
            <li v-for="(item, idx) in onlineHall" :key="idx" class="tap-active">
              <a class="news-link" href="#" @click.prevent="showToast(item.title)">
                <span class="news-title">{{ item.title }}</span>
                <span class="news-date">{{ item.date }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 通知公告 -->
    <section class="notice-section">
      <div class="section-header">
        <h3 class="section-title">通知公告</h3>
        <a class="more-link" href="#" @click.prevent="showToast('查看更多')">更多&gt;&gt;</a>
      </div>
      <ul class="notice-list">
        <li v-for="(item, idx) in notices" :key="idx" class="tap-active">
          <a class="notice-link" href="#" @click.prevent="showToast(item.title)">{{ item.title }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBannerData } from '@/composables/useMockData'
import { getArticles } from '@/composables/useMockData'
import { ElMessage } from 'element-plus'

const slides = useBannerData()

const headline = {
  title: '习近平就推动哲学社会科学高质量发展作出重要指示',
  subtitle: '习近平：加快构建中国哲学社会科学自主知识体系 更好回答中国之问世界之问人民之问时代之问',
}

const headlineList = [
  { title: '第二十三次上合组织成员国总检察长会议召开', link: '#' },
  { title: '最高检：促进"最高检"和"最基层"双向奔赴', link: '#' },
  { title: '最高检：以高质效办案巩固拓展反腐败斗争成果', link: '#' },
  { title: '"两高"发布办理非法占用耕地案件适用法律若干问题规定', link: '#' },
]

const keyWorkNews = [
  { title: '最高检：做习近平法治思想的坚定信仰者忠实实践者', date: '2026-05-14' },
  { title: '最高检：全面准确贯彻宽严相济刑事政策', date: '2026-05-13' },
  { title: '最高检:提升检委会科学决策水平 推动检察工作高质发展', date: '2026-05-12' },
  { title: '最高检部署专项监督聚焦4类重点问题保护长征红色资源', date: '2026-05-11' },
  { title: '最高检发布海洋生态环境资源保护检察公益诉讼典型案例', date: '2026-05-10' },
  { title: '检察机关守护群众用药安全 筑牢药品安全防线', date: '2026-05-09' },
]

const topics = [
  { title: '2026全国两会\n蓝图已绘就 奋进正当时' },
  { title: '树立和践行正确政绩观' },
  { title: '习近平法治思想引领下的检察实践' },
  { title: '2026年中央政法工作会议' },
  { title: '2026年全国检察长会议' },
]

const newsItems = computed(() => {
  const articles = getArticles().filter(a => a.status === 'published').slice(0, 6)
  return articles.map(a => ({
    title: a.title,
    date: new Date(a.publishDate).toLocaleDateString('zh-CN'),
  }))
})

const localNews = [
  { title: '山西：开展知识产权保护庭审观摩活动', date: '2026-05-14' },
  { title: '辽宁：与高校建立实践基地深化检校合作', date: '2026-05-14' },
  { title: '重庆：刑事执行检察监督破解涉案财物处置难题', date: '2026-05-14' },
  { title: '宁夏：完善四项机制推进行政争议实质性化解', date: '2026-05-13' },
]

const authorityNews = [
  { title: '浙江检察机关依法对高以忱案提起公诉', date: '2026-05-15' },
  { title: '浙江检察机关依法对林景臻涉嫌受贿案提起公诉', date: '2026-05-13' },
  { title: '宁夏检察机关依法对马爱平案提起公诉', date: '2026-05-11' },
  { title: '贵州检察机关依法对姜志强涉嫌受贿案提起公诉', date: '2026-05-11' },
]

const pressNews = [
  { title: '"两高"举行《关于办理非法占用耕地案件适用法律若干问题的规定》新闻发布会', date: '2026-05-11' },
  { title: '"两高"举行《关于办理危害民航飞行安全刑事案件适用法律若干问题的解释》', date: '2026-05-10' },
  { title: '最高检举行"四大检察"工作白皮书（2025）新闻发布会', date: '2026-05-09' },
  { title: '最高检举行"持续深化\'检护民生\'专项行动" 新闻发布会', date: '2026-05-08' },
]

const onlineHall = [
  { title: '"两高"联合发布《关于办理非法占用耕地案件适用法律若干问题的规定》', date: '2026-05-11' },
  { title: '检察机关守护群众用药安全 筑牢药品安全防线', date: '2026-04-29' },
  { title: '检察机关强化社保领域行政检察履职监督', date: '2026-04-28' },
  { title: '最高检发布海洋生态环境资源保护检察公益诉讼典型案例', date: '2026-04-24' },
]

const notices = [
  { title: '"惩治新型、隐性职务犯罪"主题征文启事' },
  { title: '全国人民代表大会常务委员会免职名单' },
  { title: '最高人民检察院关于张华东同志为中华人民共和国二级大检察官的公告' },
  { title: '最高人民检察院2026年度部门预算' },
  { title: '关于申报2026年度最高人民检察院检察理论研究课题的公告' },
  { title: '最高人民检察院关于确定2026年度法律实习生接收人选的公告' },
  { title: '最高人民检察院直属事业单位2026年度公开招聘工作人员公告' },
  { title: '全国人民代表大会常务委员会批准任免的名单' },
]

const showToast = (msg: string) => {
  ElMessage.success({ message: msg, duration: 1500 })
}

const onHeadlineClick = () => {
  showToast('查看头条新闻')
}

const onHeadlineItemClick = (item: { title: string; link: string }) => {
  showToast(item.title)
}
</script>

<style lang="scss" scoped>
.home-view {
  max-width: $max-page-width;
  margin: 0 auto;
  padding: 0 $spacing-xl;
}

// ===== 头条 + 轮播 =====
.top-section {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;
  padding-top: $spacing-lg;
}

.headline-area {
  position: relative;
}

.headline-main {
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-light;

  &:hover {
    .headline-title {
      color: $primary-light;
    }
  }
}

.headline-title {
  font-size: 26px;
  font-weight: 700;
  color: $primary-color;
  margin: 0 0 $spacing-sm;
  line-height: 1.4;
  transition: color $transition-fast;
}

.headline-subtitle {
  font-size: $font-size-base;
  color: $text-secondary;
  margin: 0;
  line-height: 1.6;
}

.headline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.headline-list li {
  display: flex;
  align-items: baseline;
  padding: $spacing-sm 0;
  border-bottom: 1px dashed $border-light;

  &:hover .headline-link {
    color: $primary-light;
  }
}

.headline-num {
  color: $primary-color;
  font-size: $font-size-sm;
  font-weight: 700;
  margin-right: $spacing-sm;
  flex-shrink: 0;
}

.headline-link {
  font-size: $font-size-base;
  color: $text-primary;
  text-decoration: none;
  transition: color $transition-fast;
}

.more-headlines {
  display: inline-block;
  margin-top: $spacing-md;
  color: $text-muted;
  font-size: $font-size-sm;
  text-decoration: none;

  &:hover {
    color: $primary-light;
  }
}

// 轮播
.carousel-area {
  border-radius: $card-radius;
  overflow: hidden;

  :deep(.el-carousel__indicators--outside) {
    bottom: -30px;
  }

  :deep(.el-carousel__arrow) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 18px;
  }
}

.slide-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.slide-content {
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 1;
  padding: $spacing-lg;
}

.slide-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 $spacing-sm;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.slide-subtitle {
  font-size: $font-size-base;
  margin: 0;
  opacity: 0.8;
  letter-spacing: 1px;
}

// ===== 区块标题 =====
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $primary-color;
  position: relative;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $primary-color;
  margin: 0;
}

.more-link {
  font-size: $font-size-sm;
  color: $text-muted;
  text-decoration: none;

  &:hover {
    color: $primary-light;
  }
}

// ===== 新闻列表 =====
.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.news-list li {
  padding: $spacing-sm 0;
  border-bottom: 1px dashed $border-light;

  &:hover .news-title {
    color: $primary-light;
  }
}

.news-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  text-decoration: none;
  gap: $spacing-md;
}

.news-title {
  flex: 1;
  font-size: $font-size-base;
  color: $text-primary;
  transition: color $transition-fast;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-date {
  font-size: $font-size-xs;
  color: $text-muted;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
}

// ===== 重点工作 + 专题 =====
.key-work-section {
  margin-bottom: $spacing-xl;
}

.key-work-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: $spacing-xl;
}

.topic-grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.topic-item {
  padding: $spacing-md;
  background: linear-gradient(135deg, rgba($primary-color, 0.04), rgba($primary-color, 0.02));
  border: 1px solid $border-light;
  border-radius: $card-radius;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background: rgba($primary-color, 0.08);
    border-color: $primary-color;
  }
}

.topic-title {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $primary-color;
  white-space: pre-line;
  line-height: 1.5;
}

// ===== 多栏新闻 =====
.multi-news-section {
  margin-bottom: $spacing-xl;
}

.multi-news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-xl;
}

.news-block {
  padding: $spacing-md;
  border: 1px solid $border-light;
  border-radius: $card-radius;
  background: $bg-white;
}

// ===== 新闻发布 =====
.press-section {
  margin-bottom: $spacing-xl;
}

.press-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl;
}

.press-block {
  padding: $spacing-md;
  border: 1px solid $border-light;
  border-radius: $card-radius;
  background: $bg-white;
}

// ===== 通知公告 =====
.notice-section {
  margin-bottom: $spacing-xxl;
  padding: $spacing-md;
  border: 1px solid $border-light;
  border-radius: $card-radius;
  background: $bg-white;
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;
  column-count: 2;
  column-gap: $spacing-xl;
}

.notice-list li {
  padding: $spacing-sm 0;
  border-bottom: 1px dashed $border-light;
  break-inside: avoid;

  &:hover .notice-link {
    color: $primary-light;
  }
}

.notice-link {
  font-size: $font-size-base;
  color: $text-primary;
  text-decoration: none;
  transition: color $transition-fast;
}

// ===== 响应式 =====
@media (max-width: 1024px) {
  .top-section {
    grid-template-columns: 1fr;
  }
  .key-work-grid {
    grid-template-columns: 1fr;
  }
  .multi-news-grid {
    grid-template-columns: 1fr;
  }
  .press-grid {
    grid-template-columns: 1fr;
  }
  .notice-list {
    column-count: 1;
  }
}

@media (max-width: 768px) {
  .headline-title {
    font-size: 20px;
  }
  .home-view {
    padding: 0 $spacing-md;
  }
}
</style>
