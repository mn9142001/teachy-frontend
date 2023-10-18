import { useQuery } from "@tanstack/react-query"
import { axiosFetchRequest } from "../utils/fetch"
import { LECTURES } from "../utils/constants"


const IsLoading = _ => {

    return <div>
        Is loading
    </div>
}


const IsError = _ => {

    return <div>
        <p>
            Is error
        </p>
    </div>
}


const PreQuerySuccess = ({query}) => {

    if (query.isLoading){
        return <IsLoading />
    }

    if (query.isError){
        return <IsError />
    }

}


const ChildRow = ({data}) => {
    const query = useQuery(
        {
            queryFn : _ => axiosFetchRequest({url: data.url, useToken: true}), 
            queryKey : data.queryKeys,
            refetchOnWindowFocus: false
        },
    )

    if (!query.isSuccess){
        return <PreQuerySuccess query={query} />
    }


    return <div className="flex">
        {query.data?.data?.results?.map((item, key) => {
            return <div key={key}>
                <p>
                    {item.name}
                </p>
            </div>
        })}
    </div>

}

const MyLearning = _ => {
    const ROWS = [
        {
            url : LECTURES,
            queryKeys : ["lectures"]
        }
    ]

    return (
        <div className="flex flex-col">
            {ROWS.map((item, key) => {
                return <ChildRow key={"child-component-" + key} data={item} />
            })}
        </div>
    )


}

export default MyLearning