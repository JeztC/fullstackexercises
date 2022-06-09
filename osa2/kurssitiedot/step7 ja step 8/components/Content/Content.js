import Part from "../Part/Part";

const Content = ( {props} ) => {
    return (
        <div>
            {props.map(part =>
                <Part key={part.id} name = {part.name} exercise = {part.exercises}/>
            )}
            <h3>{`total of ${props.map(part => part.exercises).reduce((a, b) => a + b)} excercises`}</h3>
        </div>
    )
};

export default Content