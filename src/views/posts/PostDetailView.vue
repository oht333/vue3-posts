<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getPostById, deletePost } from '@/api/posts'
import { ref } from 'vue'

const props = defineProps({
  id: [String, Number]
})

// const route = useRoute();
const router = useRouter()
// const id = route.params.id;   이렇게 받는대신 위의 const props로 대신 받는게 좋다
/**
 * ref
 * 장점) 객체 할당 가능
 * 단점) form.value.title, form.value.content
 * 장점) 일관성 유지 가능
 *
 * reactive
 * 단점) 객체 할당 불가능
 * 장점) form.title, formcontent
 */
const post = ref({})
//reactive()

const fetchPost = async () => {
  try {
    // const data = getPostById(id);
    const { data } = await getPostById(props.id)
    console.log(data)
    //post.value = { ...data }; //전개구문
    setPost(data)
  } catch (error) {
    console.error(error)
  }
}
const setPost = ({ title, content, createdAt }) => {
  // post.value = { ...data };
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}
fetchPost()
const remove = async () => {
  try {
    if (confirm('삭제 하시겠습니까?') === false) {
      return
    }
    await deletePost(props.id)
    router.push({ name: 'PostList' })
  } catch (error) {
    console.error(error)
  }
}
const goListPage = () => router.push({ name: 'PostList' })
// const goEditPage = () => router.push({ name: 'PostEdit', params: { id } });
const goEditPage = () => router.push({ name: 'PostEdit', params: { id: props.id } })
</script>

<style lang="scss" scoped></style>
