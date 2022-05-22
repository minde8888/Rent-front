import React from 'react'
import { login, logOut, authSelector, CurrentUser } from './auth'
import { useSelector, useDispatch } from 'react-redux'


export function Login() {
  const dispatch = useDispatch()
  const { currentUser, isLoading, error, isAuth } = useSelector(authSelector)
  if (isLoading) return <div>....loading</div>
  if (error) return <div>{error.message}</div>
  return (
    <div >
      {isAuth ? (
        <button onClick={() => dispatch(logOut)}> Logout</button>
      ) : (
        <button onClick={() => dispatch(login)}>Login</button>
      )}
      <UserProfile user={currentUser} />
    </div>
  )
}

interface UserProfileProps {
  user?: CurrentUser
}
function UserProfile({ user }: UserProfileProps) {
  return <div>{user?.display_name}</div>
}