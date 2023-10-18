import { useParams } from "react-router-dom"
import {axiosFetchRequest, axiosPost} from "../../utils/fetch";
import { getCurrentExamSessionUrl, getExamUrl, SESSION_CREATE } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useError } from "../../hooks/use_error";


const ExamInfoData = ({examID, data}) => {

    const {setError} = useError()

    const canStartExam = _ => {
        let now = Date.now();
        let starts_at = data.starts_at
        return (now > Date.parse(starts_at))
    }

    const disableStartBtn = _ => {
        return !canStartExam()
    }

    const startSession = e => {
        e.target.disabled = true;

        let body = {
            exam : examID
        }
        axiosPost({url : SESSION_CREATE, data: body, useToken : true}).then(
            res => {
                console.log(res)
            }
        ).catch(error => {
            let message = error.response.data.detail
            setError(message)
        })
        
    }

    const tdStyle = "p-2 border-black border-2"
    return <div className="w-full h-full flex items-center justify-center flex-col">
        <table className="w-fit">
            <tbody>
            <tr>
                <td className={tdStyle}>
                    مدة الإمتحان
                </td>
                <td className={tdStyle}>
                    {data.session_minutes_duration}
                </td>
            </tr>
            <tr>
                <td className={tdStyle}>
                    موعد بدء الإمتحان
                </td>
                <td className={tdStyle}>
                    {data.starts_at}
                </td>
            </tr>
            <tr>
                <td className={tdStyle}>
                موعد غلق الإمتحان
                </td>
                <td className={tdStyle}>
                {data.closes_at}
                </td>
            </tr>
            <tr>
                <td className={tdStyle}>
                    عدد الأسئلة
                </td>
                <td className={tdStyle}>
                    {data.questions_numbers}
                </td>
            </tr>
            </tbody>
        </table>
        <br />
        <button onClick={startSession} disabled={disableStartBtn()} className="p-2 bg-slate-600 text-white font-bold w-36 rounded-md hover:bg-slate-700">
            {
                canStartExam() ? "ابدأ" : "لا يمكنك البدأ الأن"
            }
        </button>
    </div>
}

const ExamStartComponent = ({examID}) => {
    const queryData = useQuery({
        queryFn : _ => axiosFetchRequest({
            url : getExamUrl(examID),
            useToken : true
        }),
        refetchOnWindowFocus : false,
        queryKey : ["exam", `exam-${examID}`],
        retry : false,
        staleTime: Infinity, 
        cacheTime: Infinity,
    })
    

    if(queryData.isSuccess){
        return <ExamInfoData data={queryData.data.data} examID={examID} />
    }

    return <>
        <h1>
            hello mf
        </h1>
    </>
}


const ExamStart = () => {
    const params = useParams();
    const { isError, error } = useQuery({
      queryFn: () => axiosFetchRequest({
        url: getCurrentExamSessionUrl(params.id),
        useToken: true
      }),
      refetchOnWindowFocus: false,
      queryKey: ["exam-session"],
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity
    });
  
    const { setError } = useError();
  
    if (isError) {
      const status_code = error?.response?.status;
      if (status_code === 404) {
        return <ExamStartComponent examID={params.id} />;
      } else {
        setError(error.response.data.detail);
      }
    }
  
    return (
      <h1>
        IDK my purpose yet.
      </h1>
    );
  };
  

export default ExamStart