export interface AllMarkdownRemarkRes<T> {
  data?: {
    allMarkdownRemark: {
      edges: { node: T }[]
    }
  },
  errors?: any
}
