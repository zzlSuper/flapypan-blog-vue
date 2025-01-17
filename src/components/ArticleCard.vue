<script setup>
import { useSettingStore } from '@/store/setting'
import { computed } from 'vue'
import colorMap from '@/utils/color-map'

const props = defineProps({
  article: {},
})
const emits = defineEmits(['onRoute'])

const settingStore = useSettingStore()

const formatter = new Intl.DateTimeFormat(
    'zh-CN',
    {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      timeZone: 'Asia/ShangHai',
    },
)
const formattedDate = computed(() => formatter.format(Date.parse(props.article.updateDate) ?? Date.now()))

</script>

<template>
  <router-link :to="`/${article.path}`" @click="emits('onRoute')"
               class="text-decoration-none cover-link">
    <v-hover v-slot="{ isHovering, props }">
      <v-card v-bind="props" v-ripple>

        <v-responsive :aspect-ratio="16 / 9" class="cover-container">
          <v-img height="100%" width="100%" :src="article.cover" cover class="cover">
            <template v-slot:error>
              <v-img height="100%" width="100%" cover :src="settingStore.settings.banner"></v-img>
            </template>
          </v-img>
        </v-responsive>

        <v-card-title class="article-title">{{ article.title }}</v-card-title>

        <v-card-item>

          <div class="d-flex align-center flex-wrap">
            <v-icon class="text-grey-darken-1 text-body-2">mdi-tag</v-icon>
            <v-card-subtitle class="mx-1">标签:</v-card-subtitle>
            <v-chip class="mr-1" size="small" v-for="tag in article.tags || []"
                    :color="colorMap(tag.name)" :to="`/tag/${tag.name}`">
              {{ tag.name }}
            </v-chip>
            <v-card-subtitle v-if="article.tags?.length===0" class="mx-1">null</v-card-subtitle>
          </div>

        </v-card-item>

        <v-card-subtitle class="mb-2">
          <p class="text-caption">
            {{ formattedDate }}
          </p>
        </v-card-subtitle>

      </v-card>
    </v-hover>
  </router-link>
</template>

<style scoped>
.cover-container {
  overflow: hidden;
}

.cover {
  transition: transform 0.2s;
}

.cover-link:hover .cover {
  transform: scale(1.1);
}

.article-title {
  padding: 0.5rem 1rem;
}
</style>
