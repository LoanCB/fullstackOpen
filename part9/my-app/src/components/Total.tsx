import {CoursePart} from "../types";

interface TotalProps {
    CoursePart: CoursePart[];
}

const Total = (props: TotalProps) => {
    return (
        <p>
            Number of exercises{" "}
            {props.CoursePart.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

export default Total;
