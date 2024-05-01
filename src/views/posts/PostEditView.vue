<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <form @submit.prevent="edit">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input v-model="form.title" type="text" class="form-control" id="title" />
      </div>
      <div class="mb-3">
        <label for="contents" class="form-label">내용</label>
        <textarea v-model="form.content" class="form-control" id="contents" rows="3"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form>
    <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, updatePost } from '@/api/posts'
import AppAlert from '@/components/AppAlert.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
  title: null,
  content: null
})

//수정페이지에 원래의 제목과 내용이 나오게끔 위에는 v-model사용하고 setForm을 설정해주기
const fetchPost = async () => {
  try {
    const { data } = await getPostById(id)
    setForm(data)
  } catch (error) {
    console.error(error)
    vAlert('네트워크 오류!') //API 서버가 모종의 이유로 다운이 되었을때 Alert
  }
}
const setForm = ({ title, content }) => {
  form.value.title = title
  form.value.content = content
}

fetchPost()
const edit = async () => {
  try {
    await updatePost(id, { ...form.value })
    // router.push({ name: 'PostDetail', params: { id } }) //수정이 끝나고 상세페이지로 이동
    vAlert('수정이 완료되었습니다', 'success')
  } catch (error) {
    console.error(error)
  }
}

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } })

// alert
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('error')
const vAlert = (message, type = 'error') => {
  showAlert.value = true
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    showAlert.value = false
  }, 3000) //3초후 콜백함수 실행(사라짐)
}
</script>

<style lang="scss" scoped></style>
