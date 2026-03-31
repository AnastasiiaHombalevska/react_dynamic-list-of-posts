import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Prop {
  comments: Comment[];
  selectedPost: Post | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export const PostDetails: React.FC<Prop> = ({
  comments,
  selectedPost,
  isLoading,
  // setIsLoading,
  // setErrorMessage,
}) => {
  let writeCommentForm = false;

  const selectedPostComnments = comments.filter(
    comment => selectedPost?.id === comment.postId,
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block" key={selectedPost?.id}>
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div> */}

          {selectedPostComnments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>
              {selectedPostComnments.map(comment => {
                const { id, name, email, body } = comment;

                return (
                  <article className="message is-small" data-cy="Comment" key={id}>
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
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
                      {body}
                    </div>
                  </article>
                );
              })}
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
