// import { useQuery } from "@tanstack/react-query"
// import { axiosFetchRequest } from "../utils/fetch"
import GenericForm from "../utils/generic_form"
// import { CATEGORY } from "../utils/constants"


// const CategoryFilter = ({url}) => {
//     const query = useQuery({
//         queryFn : axiosFetchRequest({url : url}),
//         queryKey : ["category"],
//         refetchOnWindowFocus : false
//     })



// }


const AddQuestion = _ => {
    const fields = [
        { name: "text", placeholder: "Question Text", type: "text" },
    ];


    return <GenericForm fields={fields} />
}

export default AddQuestion