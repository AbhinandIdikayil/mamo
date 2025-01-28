import MyCalendar from './components/MyCalendar'
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <Toaster position='top-center' richColors/>
      <MyCalendar />
    </>
  )
}

export default App
