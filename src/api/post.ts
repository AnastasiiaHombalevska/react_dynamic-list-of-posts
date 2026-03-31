import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

// export const addPost = (data: Omit<Post, 'id'>) => {
//   return client.post<Post>(`/posts`, data);
// };

// export const updatePost = ({ id, title }: Post) => {
//   return client.patch<Post>(`/posts/${id}`, { title });
// };

// export const deletePost = (id: number) => {
//   return client.delete(`/posts/${id}`);
// };
