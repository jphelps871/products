import fsPromises from 'fs/promises';
import path from 'path'

export async function getLocalData() {
  const filePath = path.join(process.cwd(), 'json/data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  return objectData
}

export async function createPathsObject() {
  const data = await getLocalData()
  const ids = data.map(obj => {
    const container = {}
    container["params"] = {id: obj.id}
    return container
  }) 
  return ids
}

export async function getFeedbackById(id) {
  const data = await getLocalData()
  const feedback = data[id - 1]

  const comments = feedback.comments
  let nestedComments = {}

  for (let comment of comments) {

    const parentId = comment.parentCommentId
    comment["childComments"] = []

    if (!parentId) {

      nestedComments[comment.id] = [comment]

    } else {

      if (parentId in nestedComments) {
        console.log(nestedComments[parentId]["childComments"])
        nestedComments[parentId]["childComments"].push(comment)
      } 
    }
  }

  let newFeedback = {...feedback}
  newFeedback["comments"] = nestedComments
  return newFeedback
}