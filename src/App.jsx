import Frm from "./componentes/Frm.jsx";
import Info from "./componentes/Info.jsx";
import { ComponentDataConext } from "./componentes/dataContext.jsx";

function App() {
  return (
    <div className='p-8 grid md:grid-cols-[1fr_auto_1fr] gap-8 w-full max-w-7xl m-auto
      sm:grid-cols-1
    '>
      <ComponentDataConext>
        <>
          <Frm></Frm>
          <span className='bg-white rounded-sm md:w-1.5 sm:w-full sm:h-1.5 md:h-full'></span>
          <Info></Info>
        </>
      </ComponentDataConext>
    </div>
  )
}

export default App
