import { useEffect, useState } from 'react';
import { getUsers } from '../api/user';
import { User } from '../types/User';
import classNames from 'classnames';

interface Prop {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export const UserSelector: React.FC<Prop> = ({
  selectedUser,
  setSelectedUser,
  setIsLoading,
  setErrorMessage,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(u => setUsers(u))
      .catch(() => {
        setErrorMessage('Unable to load users');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => {
                  setSelectedUser(user);
                  setIsOpen(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
