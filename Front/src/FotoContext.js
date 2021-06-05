import { useState, createContext, useContext } from 'react';
const FotoContext = createContext();

function FotoContextProvider({ children }) {
    const [foto, setFoto] = useState();

    return (
        <FotoContext.Provider value={[foto, setFoto]}>
            {children}
        </FotoContext.Provider>
    );
}
export const useFoto = () => useContext(FotoContext)[0];
export const useSetFoto = () => useContext(FotoContext)[1];

export default FotoContextProvider;
