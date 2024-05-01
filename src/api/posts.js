//import axios from 'axios'

import { posts } from '.'

//리스트 조회
export function getPosts(params) {
  return posts.get('/', { params })
}

//상세보기 조회
export function getPostById(id) {
  // const numberId = parseInt(id); 타입을 String -> Number 로 바꿨으니까 parseInt 할 필요 없음
  // return posts.find(item => item.id === numberId);
  //  return posts.get(`/${id}`)
  // console.log(typeof id) // typeof id가 number로 되어있으므로 id 뒤에 ''를  붙여서 문자열로 만들어야 작동이 됨
  //return posts.get(id + '') // Number인 id 값 뒤에 ''(문자열)을 더해주면, 숫자가 문자열로 자동 변환된다.
  return posts.get(`/${id}`)
}

//게시글 생성
export function createPost(data) {
  return posts.post('/', data)
}
//게시글 수정
// export function updatePost(id, data) {
//   return posts.put(`/${id}`, data)      //HTTP PUT : 전체 데이터를 수정할 때 사용하는 용도 (일부를 수정할 때에는 PATCH를 사용함)
export function updatePost(id, data) {
  return posts.patch(`/${id}`, data)
}

//게시글 삭제
export function deletePost(id) {
  return posts.delete(`/${id}`)
}
