import { useState } from 'react';
import { Post } from '../types/Post';

interface Prop {
  posts: Post[];
  setSelectedPost: (value: Post) => void;
}

export const PostsList: React.FC<Prop> = ({ posts, setSelectedPost }) => {
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  function toggleComments(post: Post) {
    setSelectedPost(post);
    setOpenPostId(prev => (prev === post.id ? null : post.id));
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const { id, title } = post;
            const isOpen = openPostId === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={isOpen ? 'button is-link' : 'button is-link is-light'}
                    onClick={() => toggleComments(post)}
                  >
                    {isOpen ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
