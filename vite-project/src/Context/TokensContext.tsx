import { useState, createContext, useContext } from "react";

const TokensContext = createContext(undefined);

function useTokensProvider(){
    const [tokens, setTokens] = useState({});
    return {tokens, setTokens};
}

type ProviderProps = {
    children: React.ReactNode;
}
export default function TokensProvider({children}: ProviderProps){
    const values = useTokensProvider();
    return <TokensContext.Provider value={values}>{children}</TokensContext.Provider>
}

export function useTokensContext(){
    const context = useContext(TokensContext);
    if(context === undefined){
        throw new Error('Provier requeried')
    }
    return context;
}