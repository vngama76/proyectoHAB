import { useState, createContext, useContext } from 'react';

const QuestionContext = createContext();

function QuestionContextProvider({ children }) {
    const [trigger, setTrigger] = useState(1);
    console.log(trigger);

    return (
        <QuestionContext.Provider value={[trigger, setTrigger]}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useTrigger = () => useContext(QuestionContext)[0];
export const useSetTrigger = () => useContext(QuestionContext)[1];

export default QuestionContextProvider;
