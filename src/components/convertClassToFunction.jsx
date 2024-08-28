import {useLocation, useNavigate} from "react-router-dom";
// optional
function mangeProps(AnyClassComponent) {
    return function (props) { // The function returns another function that takes props as input
        // ✅ Good: top-level in a custom Hook
        const navigate = new useNavigate()
        const location = useLocation();
        // *** let history = useHistory();  // In react-router-dom v6, you need to use useNavigate rather than useHistory.
        return (
            <AnyClassComponent
                {...props}
                navigate={navigate}
                location={location}
            >
            </AnyClassComponent>
        )
    }
}

function covertClassToFunction(AnyClassComponent) { // Parameter: The AnyComponent parameter remains the same, indicating that the function takes a generic component as input.

    return mangeProps(AnyClassComponent);
}

export default covertClassToFunction