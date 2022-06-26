export function getDefaultPhoto(auth) {
  const user = auth.firstName ? auth : auth.state?.user
  const name = user ? (user.firstName + ' ' + user.lastName) : '_'
  return 'https://ui-avatars.com/api/?background=random&name=' + encodeURIComponent(name)
}