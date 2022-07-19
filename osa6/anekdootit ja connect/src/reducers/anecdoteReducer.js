import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers : {
    addVote(state, action) {
      const id = action.payload
      const anecdote = state.find(n => n.id === id)
      const changedAnecdote = {
        content : anecdote.content, id, votes : anecdote.votes + 1
      }
      return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    addAnecdotes(state, action) {
      return state = action.payload
    },
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content);
    },
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(addAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addNewVote = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAnecdote(id)
    await anecdoteService.update(
        id,
        {
          content : anecdote.content,
          id,
          votes : anecdote.votes + 1
        }
    );
    dispatch(addVote(id))
  }
}

export const { addVote, addAnecdotes, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer