import { Post } from '../types/Post';

interface Prop {
  posts: Post[];
  setSelectedPost: (value: Post) => void;
  // setSelectedUser: (user: User) => void;
  // setErrorMessage: (errorMessage: string) => void;
}

export const PostsList: React.FC<Prop> = ({ posts, setSelectedPost }) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => setSelectedPost(post)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            );
          })}

          {/* <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr> */}
        </tbody>
      </table>
    </div>
  );
};
