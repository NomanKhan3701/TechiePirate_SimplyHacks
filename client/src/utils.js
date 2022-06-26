export function getDefaultPhoto(auth) {
  const user = auth.firstName ? auth : auth.state?.user
  const name = user ? (user.firstName + ' ' + user.lastName) : '_'
  return 'https://ui-avatars.com/api/?background=random&name=' + encodeURIComponent(name)
}

export function getEventType(event) {
  const tags = event.eventTags
  if (!tags) return 'misc'
  
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].toLowerCase().includes('water') || tags[i].toLowerCase().includes('beach')) {
      return 'water'
    }

    if (tags[i].toLowerCase().includes('tree')) {
      return 'tree_planting'
    }
  }

  return 'misc'
}