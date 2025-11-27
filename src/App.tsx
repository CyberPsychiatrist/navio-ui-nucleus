import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Sidebar, MobileNav } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RiskIndicator from './pages/RiskIndicator';
import AIAnalyzer from './pages/AIAnalyzer';
import PanicInfo from './pages/PanicInfo'; // Import the new page

export default function App() {
  return (
    <Router>
      <Toaster />
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <Sidebar />
        <div className='flex flex-col'>
          <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
            <MobileNav />
            <div className='w-full flex-1'>
              {/* Add nav items here if needed */}
            </div>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/risk-indicator' element={<RiskIndicator />} />
              <Route path='/ai-analyzer' element={<AIAnalyzer />} />
              <Route path='/panic-info' element={<PanicInfo />} /> {/* Add the new route */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
