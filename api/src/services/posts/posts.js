import { db } from 'src/lib/db'
import {getCurrentUser, requireAuth} from "src/lib/auth";

export const posts = () => {
  return db.post.findMany()
}

export const post = ({ id }) => {
  return db.post.findOne({
    where: { id },
  })
}

export const createPost = ({ input }) => {
  requireAuth({role: ['admin']})
  return db.post.create({
    data: input,
  })
}

export const updatePost = ({ id, input }) => {
  requireAuth()
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }) => {
  requireAuth({role: ['admin']})
  return db.post.delete({
    where: { id },
  })
}
