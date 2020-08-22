const getLinks = (logged, user) => {

  const authLinks = [
      {
          title: 'Home',
          href: '/',
      },
      {
          title: 'Add Employee',
          href: '/create',
      },
      {
          title: 'Profile',
          href: `/profile/${user && user.id}`,
      },
  ];
  
  const guestLinks = [
      {
          title: 'Home',
          href: '/'
      },
      {
          title: 'Login',
          href: '/login'
      },
      {
          title: 'Register',
          href: '/register'
      },
  ];
  if (logged){
    return authLinks;
}
return guestLinks;

}

export default getLinks;