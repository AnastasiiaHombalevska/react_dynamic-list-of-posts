import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getPostComments, getPosts } from './api/post';

import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoading(true);

    getPosts(selectedUser.id)
      .then(p => setPosts(p))
      .catch(() => setErrorMessage('Unable to load posts'))
      .finally(() => setIsLoading(false));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsLoading(true);

    getPostComments(selectedPost.id)
      .then(comm => setComments(comm))
      .catch(() => setErrorMessage('Unable to load comments'))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setIsLoading={setIsLoading}
                  setErrorMessage={setErrorMessage}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {errorMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && (
                  <PostsList posts={posts} setSelectedPost={setSelectedPost} />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                posts={posts}
                comments={comments}
                selectedUser={selectedUser}
                selectedPost={selectedPost}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setErrorMessage={setErrorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
