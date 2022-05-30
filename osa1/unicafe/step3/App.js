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

const Statistics = (props) => {
    return (
        <div>
            <Header title = {props.feedbackTitle} />
            <Button handleClick={() => props.goodButton(props.good + 1)} text="Hyvä" />
            <Button handleClick={() => props.neutralButton(props.neutral + 1)} text="Neutraali" />
            <Button handleClick={() => props.badButton(props.bad + 1)} text="Huono" />
            <Header title = {props.statistics} />
            <Display value={"Hyvä: " + props.good} />
            <Display value={"Neutraali: " + props.neutral} />
            <Display value={"Huono: " + props.bad} />
            <Display value = {"Keskiarvo: " + props.average} />
            <Display value = {"Positiivinen: " + props.positive + "%"} />
        </div>
    )
}

const App = () => {
    const feedbackTitle = 'Anna Palautetta!'
    const statistics = 'Statistiikka'
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const average = (good - bad) / (good + bad + neutral);
    const positive = (good) / (good + bad + neutral) * 100;
    return (
        <Statistics feedbackTitle={feedbackTitle} statistics = {statistics} good = {good} goodButton = {setGood} neutral = {neutral} neutralButton = {setNeutral} badButton = {setBad} bad = {bad} average = {average} positive = {positive}/>
    )
}

export default App