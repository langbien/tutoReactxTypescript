import { createContext, PropsWithChildren, useState, useCallback, useContext } from "react";

const CounterContext = createContext({
    n: 0,
    incr: () => {} 
})

type Props = PropsWithChildren<{
    start?: number
}>

export const CounterProvider = ({start = 0, children}: Props) => {
    const [n, setN] = useState(start)
    const incr = useCallback(() => setN(n => n+1), [])
    return <CounterContext.Provider value={{n, incr}}>
        {children}
    </CounterContext.Provider> 
}

// bonne pratique : créer un hook pour pouvoir utiliser ce compteur plus facilement; comme ci dessous :

export const useCounter = () => {
    return useContext(CounterContext);
}