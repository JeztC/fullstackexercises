import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    )
};

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    const feedbackTitle = 'Anna Palautetta!'
    const statistics = 'Statistiikka'
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const average = (good - bad) / (good + bad + neutral);
    const positive = (good) / (good + bad + neutral) * 100;
    return (
        <div>
            <Header title = {feedbackTitle} />
            <Button handleClick={() => setGood(good + 1)} text="Hyvä" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="Neutraali" />
            <Button handleClick={() => setBad(bad + 1)} text="Huono" />
            <Header title = {statistics} />
            <Display value={"Hyvä: " + good} />
            <Display value={"Neutraali: " + neutral} />
            <Display value={"Huono: " + bad} />
            <Display value = {"Keskiarvo: " + average} />
            <Display value = {"Positiivinen: " + positive + "%"} />
        </div>
    )
}

export default App