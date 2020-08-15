const getNavigation = (user) => {

  const authLinks = [
    {
      title: "HomePage",
      link: "/"
    },
    {
      title: "Nominate",
      link: "/nominate"
    },
    {
      title: "Profile",
      link: `/profile/${user && user.id}`
    }
  ]

  const guestLinks = [
    {
      title: "HomePage",
      link: "/"
    },
    {
      title: "Register",
      link: "/register"
    },
    {
      title: "Login",
      link: "/login"
    }
  ]
  const loggedIn = user && user.loggedIn
  return loggedIn ? authLinks : guestLinks
}

export default getNavigation