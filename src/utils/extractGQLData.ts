const extractGQLData = <T>(data) => {
  return Object.keys(data).reduce((acc, key) => ({
    ...acc,
    [key]: data[key].edges.map(({node}) =>  ({
      html: node.html,
      ...node.frontmatter,
      excerpt: node.excerpt,
      ...node.fields
    }))
  }), {}) as T
}

export default extractGQLData;
