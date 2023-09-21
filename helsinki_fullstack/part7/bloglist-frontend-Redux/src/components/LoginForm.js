const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>

      <div>
      username: <input id="username" value={username}
          onChange={handleUsernameChange} />

      </div>
      <div>password: <input id="password" type="password" value={password} onChange = {handlePasswordChange}/></div>
      <div>
        <button id="loginBtn" type="submit">Login</button>
      </div>
    </form>
  )

}
export default LoginForm