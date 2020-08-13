const getNavigation = (loggedIn, user) => {
const authLinks = [
    {
    title: "HomePage",
    link: "/"
},
{
    title: "Nominate your collegue",
    link: `/nominate`
},
{
    title: "Profile",
    link: `/profile/${user && user.id}`
},
]

const guestLinks = [
    {
    title: "HomePage",
    link: "/"
},
{
    title: "Login",
    link: "/login"
},
{
    title: "Register",
    link: "/register"
},
]

return loggedIn? authLinks : guestLinks;
}

export default getNavigation;