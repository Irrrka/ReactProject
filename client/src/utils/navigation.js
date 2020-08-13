const getNavigation = (loggedIn, user) => {
const authLinks = [
    {
    title: "HomePage",
    link: "/"
},
{
    title: "Vote for your collegue",
    link: `/vote`
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