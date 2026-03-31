import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Prop {
  posts: Post[];
  comments: Comment[];
  selectedUser: User | null;
  selectedPost: Post | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export const PostDetails: React.FC<Prop> = ({
  posts,
  comments,
  selectedUser,
  selectedPost,
  isLoading,
  // setIsLoading,
  // setErrorMessage,
}) => {
  let writeCommentForm = false;

  const userPosts = posts.filter(post => selectedUser?.id === post.userId);

  const selectedPostComnments = comments.filter(
    comment => selectedPost?.id === comment.postId,
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {userPosts.map(post => {
          const { title, body } = post;

          return (
            <div className="block" key={post.id}>
              <h2 data-cy="PostTitle">#18: {title}</h2>

              <p data-cy="PostBody">{body}</p>
            </div>
          );
        })}

        <div className="block">
          {isLoading && <Loader />}

          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          {selectedPostComnments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>

              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    Misha Hrynko
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  Some comment
                </div>
              </article>

              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    Misha Hrynko
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  One more comment
                </div>
              </article>

              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    Misha Hrynko
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {'Multi\nline\ncomment'}
                </div>
              </article>
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => (writeCommentForm = true)}
          >
            Write a comment
          </button>
        </div>

        {writeCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
