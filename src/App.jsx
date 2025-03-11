
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';

function App() {   
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <AppRoutes/>
    </>
  )
}

export default App
