import Header from "../Header/Header";
import Content from "../Content/Content";

const Course = ( { course }) => {
    return (
        <div>
            <Header course = {course.name}/>
            <Content props = {course.parts}/>
        </div>
    )
}

export default Course