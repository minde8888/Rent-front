import Main from './components/Main.component';


function App(): JSX.Element {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;

// FnName:React.FC<Interface> = ({})=>{}
// renderList = ():JSX.Element[] =>{
//   return el.map(e => return(<div>{e.name}</div>))
// }