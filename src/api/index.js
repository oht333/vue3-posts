import axios from 'axios'

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options))
  return instance
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`)
// development : http://localhost:5000/posts/
// production : http://localhost:5001/posts/

// Root폴더의 .env, .env.development 에서 포트설정 (Default : Dev)
// vite.config.js에서 mode를 통해 포트변경 가능
