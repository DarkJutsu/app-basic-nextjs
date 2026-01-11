import fs from 'fs' // is a Node.js module that lets you read files from the file system.
import matter from 'gray-matter'
import path from 'path' // is a Node.js module that lets you manipulate file paths.

// Ruta al directorio de posts
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // OBTENER LOS NOMBRES DE LOS ARCHIVOS posts/
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Elimine ".md" del nombre del archivo para obtener la ID
    const id = fileName.replace(/\.md$/, '')

    // Leer el archivo Markdown como cadena
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Utilice gray-matter para analizar la sección de metadatos del post
    const matterResult = matter(fileContents)

    // Combinar los datos con el Id
    return {
      id, ...matterResult.data
    }
  })

  // Buscar posts por fecha
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1
    else return -1
  })

}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  return {
    id, ...matterResult.data
  }
}