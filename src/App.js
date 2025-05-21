import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost, updatePost, deletePost } from './api';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  const onAdd = async () => {
    const newPost = await createPost({ title: '제목', description: '내용' });
    setPosts(p => [newPost, ...p]);
  };

  const onDelete = async id => {
    await deletePost(id);
    setPosts(p => p.filter(x => x.id !== id));
  };

  return (
    <div>
      <h1>MyBall Posts</h1>
      <button onClick={onAdd}>새 글 추가</button>
      <ul>
        {posts.map(p =>
          <li key={p.id}>
            {p.title}
            <button onClick={() => onDelete(p.id)}>삭제</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;