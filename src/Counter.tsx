import { FunctionComponent, MouseEvent, PropsWithChildren, useState, useRef, ReactNode, forwardRef, ForwardedRef } from "react"
import { useCounter } from "./CounterProvider"

type Props = PropsWithChildren<{ // L'idéal est d'utiliser un type dédié comme ici. Nous avons un générique (grâce aux "<>") qui correspond à l'ensemble des autres propriétés et qui nous donne un objet qui nous donne children et sera du bon type. Maintenant je peux si je le souhaite ajouter des enfants dans mon Counter de App.    
    start?: number               // Si je veux garder la prop start Obligatoire alors je dois ajouter la modif sur la function Counter (comme fait sur l'exemple commenté dans App.tsx).  
    title?: ReactNode            // Fichier notion et théorie ligne 90. 
    titleTag?: keyof JSX.IntrinsicElements
}>

export const Counter = forwardRef<HTMLButtonElement, Props>(({start = 0, children, title = 'Compteur', titleTag: Title = 'h1'}, ref) => { // ici le compteur aura un numéro de démarrage, c'est une propriété "start" qui vaudra un nombre et nous devons le typer.

 // const [n, setN] = useState(start)           // hook useState : on a un nombre n, son setter setN et useState qui démarrera au point de départ "start"; ici TS comprend automatiquement grâce au type qui est spécifié sur start que "n" va être de type number et "setN" une fonction qui permettra de faire un setter d'un number.
 // const ref = useRef<HTMLButtonElement>(null) // si on veut être plus précis, useState peut avoir un type générique et automatiquement il fera la vérification: const [n, setN] = useState<number>(start)
 // const incr = () => setN(n => n + 1)         // si on utilise un type générique comme ci-dessus et qu'il n'y a rien qui est passé en paramètre => useState<number>() <= TS se dira que la valeur de "n" est la fois un nombre (le type spécifié dans le type générique) ou undifined car dans notre "Props" ce n'est pas défini.
    const {n, incr} = useCounter()              // 1- pour générer le type d'un setter, si on veut passer le setter "setN" et le typer => Dispatch dans SetStateAction. Exemple d'utilisation : nous avons une fonction et on veut lui mettre un setter en paramètre (qui peut prendre une valeur ou un callback comme notre code ici) nous utiliserons Dispatch qui sera importé depuis React, dans ce Dispatch on utilise un type utilitaire qui est le <SetStateAction> et ensuite on met le type que l'on attend en paramètre. Code exemple : function funcExemple (setter: Dispatch<SetStateAction<number>>) { 
                                                // 2- si notre setter n'est utilisé que pour spécifier la valeur, on peut avoir un type plus simple en lui disant que nous avons une fonction number qui ne renverra rien, exemple ici : function funcExemple (setter: (n: number) => void) {           
                                                // ensuite on peut déclarer une constante "incr" pour incrémenter et on lui dit que c'est une fonction qui fera un "n + 1", on l'ajoutera dans le return sur la propriété onClick du bouton d'incrémentation. Je peux utiliser directement un setter ou un callback de setter.
    
    return <div>
        <Title>{title}</Title>
        {children}
        <p>
            Numéro : {n}
        </p>
        <button ref={ref} onClick={incr}>Incrémenter</button> 
    </div>
})

// function onClick (e: MouseEvent) {  toujours bien penser à utiliser les événements compatibles à react dans les suggestions et non javascript !!!!

