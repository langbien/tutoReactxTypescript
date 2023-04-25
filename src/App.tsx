import { Counter } from "./Counter"

function App() {
  return  <div>
            <Counter title={<em>Bonjour</em>} titleTag="h1">      
              <p>Hello World</p>
            </Counter> 
          </div>
}

export default App

// function App() {
//   return <div>
//     <Counter start={2} />     <== Je rajoute la prop du Counter et sa valeur entre brackets si je veux avoir cette prop Obligatoire.
//   </div>
// }

// export default App