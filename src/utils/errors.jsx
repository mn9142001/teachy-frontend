const ErrorCodeMessage = {
    
    empty_exam : "الإمتحان لا يحتوى على أي أسئلة",
    exam_is_over : "إنتهى الإمتحان",
    exam_session_is_over : "إنتهت جلسة الإمتحان",
    
}

const getErrorCodeMessage = code => {

    return ErrorCodeMessage[code] || "حدث خطأ ما"
}

export {ErrorCodeMessage, getErrorCodeMessage}