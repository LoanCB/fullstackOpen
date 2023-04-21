import {CoursePart} from "../types";
import Part from "./Part";

interface ContentProps {
    CoursePart: CoursePart[];
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.CoursePart.map((part, i) =>
                <Part key={i} Part={part} />
            )}
        </div>
    )
};

export default Content;