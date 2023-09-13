import { defineStore } from 'pinia'
import { api } from '@/api'
import { ref } from 'vue'

export const useAccessStore = defineStore('access', () => {
  const baseInfo = ref({ all: 0, today: 0 })
  const getBaseInfo = () => api(`/access`).then((info) => baseInfo.value = info)
  setInterval(getBaseInfo, 5000)

  return { baseInfo }
})