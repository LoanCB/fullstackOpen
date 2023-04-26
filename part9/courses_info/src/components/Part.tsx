import {CoursePart} from "../types";

interface PartProps {
    Part: CoursePart;
}

const Part = (props: PartProps) => {
    switch (props.Part.kind) {
        case "group":
            return (
                <>
                    <h2>{props.Part.name} {props.Part.exerciseCount}</h2>
                    <p>project exercises {props.Part.groupProjectCount}</p>
                </>
            );
        case "basic":
            return (
                <>
                    <h2>{props.Part.name} {props.Part.exerciseCount}</h2>
                    <p>{props.Part.description}</p>
                </>
            );
        case "background":
            return (
                <>
                    <h2>{props.Part.name} {props.Part.exerciseCount}</h2>
                    <p>{props.Part.description}<br />{props.Part.backgroundMaterial}</p>
                </>
            );
        case "special":
            return (
                <>
                    <h2>{props.Part.name} {props.Part.exerciseCount}</h2>
                    <p>{props.Part.description}<br />{props.Part.requirements.join(', ')}</p>
                </>
            );
    }
};

export default Part;