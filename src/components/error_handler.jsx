import { useState } from "react";
import {getErrorCodeMessage} from "../utils/errors";


const ErrorHandlerComponent = ({message}) => {

    return <div className="flex flex-col w-full h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
            {getErrorCodeMessage(message)}
        </h1>
        <br />
        <a className="text-blue-500 text-xl font-semibold" href="/">
            أنقر للعودة
        </a>
        <br />
        <h1 className="text-xl font-semibold">
            ادعيلي اتجوزها بالمرة
        </h1>

        
    </div>
}


const ErrorHandlerComponentWrapper = props => {
    const [errorMessage, setErrorMessage] = useState();

    if (errorMessage){
        return <ErrorHandlerComponent message={errorMessage} />
    }

    return <props.Child setErrorMessage={setErrorMessage} {...props} />
}


export {ErrorHandlerComponent, ErrorHandlerComponentWrapper}