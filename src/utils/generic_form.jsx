import React, { useState } from "react";
import isFormValid from "./validator";
import axios from "axios";
import { AUTH_HEADER } from "./constants";
import {getAuthToken} from "../hooks/is_anonymous"
import { useMutation } from "@tanstack/react-query";

const GenericForm = ({ fields, onSubmit, onSuccess, onPreSubmit, submitUrl, onError, method="post", useToken, token, formStyle, formDivStyle, modifyData }) => {
    const initialFormData = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);

    const setData = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        return setData(name, value)
    };

    const sendData = data => {

        if(modifyData){
            data = modifyData(data);
        }

        let config = {
            method : method,
            data : data,
            headers : {}
        }

        if(submitUrl.href){
            submitUrl = submitUrl.href
        }

        if(useToken){
            let _token;
            if (token){
                _token = token
            } else {
                _token = getAuthToken()
            }
            config.headers.authorization = `${AUTH_HEADER} ${_token}`
            
        }

        return axios(submitUrl, config)
    }

    const mutateData = useMutation({
        mutationFn : sendData,
        onSuccess : response => {
            if (onSuccess) {
                return onSuccess(response)
            }
            console.log("response", response)
        },
        onError : error => {
            if(onError){
                return onError(error)
            }
            console.log("error", error)
        }
    })

    const autoSubmit = data => {
        mutateData.mutate(data)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const is_valid = isFormValid(initialFormData, formData);
        if (is_valid) {
            let _formData = formData
            if(onPreSubmit) {
                _formData = onPreSubmit(_formData)
            }
            onSubmit ? onSubmit(_formData) : autoSubmit(_formData);
        }
    };

    const inputStyle = "p-1 text-center border-black border-2 text-black rounded-md";

    return (
        <div className="w-full max-w-screen flex-1 flex items-center justify-center">
            <form className={formStyle || "flex flex-col w-fit p-2"} onSubmit={formSubmitHandler}>
                {fields.map((field) => (
                    field.element ? <field.element key={field.name} onValueChange={value => setData(field.name, value)} /> :
                    <div className="p-2" key={field.name} >
                        <input
                        className={inputStyle}
                        placeholder={field.placeholder}
                        type={field.type}
                        name={field.name}
                        onChange={inputChangeHandler}
                        value={formData[field.name]}
                    />
                    </div>
                ))}
                <button disabled={mutateData.isLoading} type="submit" className="p-2 bg-gray-500 text-white">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GenericForm