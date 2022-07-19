import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import {useEffect, useRef} from "react";
import Filter from "./components/Filter";
import {useDispatch} from "react-redux";
import {addAnecdotes, initializeAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const sendNotification = (message, delay) => {
        ref.current.sendNotificationMessageTimeout(message, delay)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification ref={ref}/>
            <li></li>
            <Filter/>
            <AnecdoteList sendNotification = {sendNotification}/>
            <AnecdoteForm sendNotification = {sendNotification}/>
        </div>
    )
}

export default App