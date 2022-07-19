import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import {useRef} from "react";
import Filter from "./components/Filter";

const App = () => {
    const ref = useRef()

    const sendNotification = (message) => {
        ref.current.sendNotificationMessageTimeout(message)
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