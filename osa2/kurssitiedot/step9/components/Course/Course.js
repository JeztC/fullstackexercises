import Header from "../Header/Header";
import Content from "../Content/Content";

const Course = ( { course }) => {
    return (
        <div>
            {course.map(c => <CourseComponent key = {c.id} course = {c}/>)}
        </div>
    )
}

const CourseComponent = ( { course }) => {
    return (
        <div>
            <Header course = {course.name}/>
            <Content props = {course.parts}/>
        </div>
    )
}


export default Course