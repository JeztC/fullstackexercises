const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
};

const Content = (props) => {
    return (
        <div>
            <p>
                {props.part1} {props.exercise1}
            </p>
            <p>
                {props.part2} {props.exercise2}
            </p>
            <p>
                {props.part3} {props.exercise3}
            </p>
        </div>
    )
};

const Total = (props) => {
    return (
        <p>Number of exercise {props.excercises}</p>
    )
};

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
    return (
        <div>
            <Header course = {course} />
            <Content part1 = {part1.name} part2 = {part2.name} part3 = {part3.name} exercise1 = {part1.exercises} exercise2 = {part2.exercises} exercise3 = {part3.exercises}/>
            <Total excercises = {part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

export default App