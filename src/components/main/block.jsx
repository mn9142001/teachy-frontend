import { useQuery } from "@tanstack/react-query"
import { axiosFetchRequest } from "../../utils/fetch"

const truncate = str => {
    return str.length > 20 ? str.substring(0, 17) + "..." : str;
}

const BlockDisplay = ({url, title, queryKey}) => {

    const query = useQuery({
        queryFn : _ => axiosFetchRequest({url: url}),
        queryKey : ["courses", queryKey],
        refetchOnWindowFocus: false

    })

    if (query.isLoading) {
        return <div>
            <p>
                ...Loading
            </p>
        </div>
    }

    if (query.isSuccess && query.data)
        return <div className="flex items-center justify-center p-2 w-full flex-col">
        <div className="w-full p-2">
            <p className="font-bold">
                {title}
            </p>
        </div>

        <div className="flex flex-wrap justify-center">

            {
                query.data?.data && query.data.data?.results?.map((item, key) => {
                    return <div className="w-fit md:h-full p-2" key={key}>
                        <div className="flex w-36 items-center justify-center flex-col">
                            <img draggable={false} className="rounded-md w-full h-36" loading="lazy" src={item.thumbnail} alt="" />
                            <a href="/" dir="rtl" className="p-2 flex-1 w-full flex items-center justify-center break-words font-bold text-center">
                                {truncate(item.name)}
                            </a>
                        </div>
                    </div>
                })
            }
        </div>
        <hr className="w-1/2" />
    </div>
}

export default BlockDisplay