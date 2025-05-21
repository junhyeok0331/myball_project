// src/api/index.js
const BASE_URL = process.env.REACT_APP_API_URL; // ex) 'http://172.30.1.79:8080'

// 1) 모든 포스트 가져오기
export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts/getAll`, {
    // 개발 중 캐시 때문에 이전 데이터가 보이면 cache 옵션도 꺼주세요:
    cache: 'no-store'
  });
  if (!res.ok) throw new Error(`GET /posts/getAll failed: ${res.status}`);
  return res.json();  // 배열 [{…}, …]
}

// 2) 단일 포스트 가져오기
export async function fetchPost(id) {
  const res = await fetch(`${BASE_URL}/posts/getOne/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error(`GET /posts/getOne/${id} failed: ${res.status}`);
  return res.json();  // 단일 객체 {id, title, description}
}

// 3) 새 포스트 생성
export async function createPost(data) {
  const res = await fetch(`${BASE_URL}/posts/postCreate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST /posts/postCreate failed: ${res.status}`);
  return res.json();  // 생성된 {title, description}
}

// 4) 포스트 수정
export async function updatePost(id, data) {
  const res = await fetch(`${BASE_URL}/posts/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT /posts/update/${id} failed: ${res.status}`);
  return res.json();  // 수정된 {title, description}
}

// 5) 포스트 삭제
export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/delete/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`DELETE /posts/delete/${id} failed: ${res.status}`);
  return res.text();  // "삭제 완료"
}