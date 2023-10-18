
const getSessionKey = examSessionId => `exam-session-${examSessionId}-questions`

const getCurrentExamSessionQuestions = examSessionId => {
    let questionsIDs = sessionStorage.setItem(
        getSessionKey(examSessionId)
    )

    return JSON.parse(questionsIDs)

}

const setCurrentExamSessionQuestions = ({examSessionId, questionsIDs}) => {
    sessionStorage.setItem(
        getSessionKey(examSessionId), 
        JSON.stringify(questionsIDs)
    )
}

export {getSessionKey, getCurrentExamSessionQuestions, setCurrentExamSessionQuestions}