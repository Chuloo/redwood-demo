import {Link, routes} from "@redwoodjs/router";
import {useAuth} from "@redwoodjs/auth";

const BlogLayout = ({children}) => {
  const {logIn, logOut, isAuthenticated, currentUser} = useAuth();
  console.log(currentUser)
  return (
    <>
      <header>
        <h1><Link to={routes.home()}>Redwood Blog</Link></h1>
        <nav>
          <ul>
            <li><Link to={routes.about()}>About</Link></li>
            <li><Link to={routes.contact()}>Contact Us</Link></li>
            <li><button onClick={isAuthenticated? logOut: logIn}>{isAuthenticated? 'Log Out': 'Log In'}</button></li>
            {isAuthenticated && <li>{currentUser.email}</li>}
            {currentUser && currentUser.roles.includes('admin') && <li><Link to={routes.posts()}>View posts</Link></li>}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
