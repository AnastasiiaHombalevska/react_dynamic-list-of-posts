import React, { useState } from 'react';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type NewComment = Omit<Comment, 'id'>;

type Errors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

type Props = {
  selectedPost: Post | null;
  isLoading: boolean;
  onAddComment?: (comment: Comment) => void;
  setIsLoading?: (loading: boolean) => void;
  setErrorMessage?: (msg: string) => void;
  setOpenCommentForm: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  isLoading,
  onAddComment,
  setIsLoading,
  setErrorMessage,
  setOpenCommentForm,
}) => {
  const emptyComment: NewComment = {
    postId: selectedPost?.id ?? 0,
    name: '',
    email: '',
    body: '',
  };

  const emptyErrors: Errors = {
    name: false,
    email: false,
    body: false,
  };

  const [newComment, setNewComment] = useState<NewComment>(emptyComment);
  const [errors, setErrors] = useState<Errors>(emptyErrors);

  if (!selectedPost) {
    return null;
  }

  const resetForm = () => {
    setNewComment(emptyComment);
    setErrors(emptyErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setNewComment(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {
      name: !newComment.name.trim(),
      email: !newComment.email.trim(),
      body: !newComment.body.trim(),
    };

    setErrors(newErrors);
    setErrorMessage?.('');

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    try {
      setIsLoading?.(true);
      const createdComment = await addComment(newComment);

      onAddComment?.(createdComment);
      resetForm();
      setOpenCommentForm(false);
    } catch {
      setErrorMessage?.('Failed to add comment');
    } finally {
      setIsLoading?.(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} onReset={resetForm}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${errors.name ? 'is-danger' : ''}`}
            value={newComment.name}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            value={newComment.email}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            value={newComment.body}
            onChange={handleChange}
          />
        </div>
        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link" disabled={isLoading}>
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
