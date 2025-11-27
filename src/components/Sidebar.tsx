import { NavLink } from 'react-router-dom';
import { Home, BookOpen, PanelLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { label: 'Dashboard', to: '/', icon: <Home className='h-5 w-5' /> },
  { label: 'Risk Indicator', to: '/risk-indicator', icon: <BookOpen className='h-5 w-5' /> },
  { label: 'AI Analyzer', to: '/ai-analyzer', icon: <ShieldCheck className='h-5 w-5' /> },
];

function NavLinks() {
  return (
    <nav className='grid items-start gap-2 text-sm font-medium'>
      {navItems.map(({ label, to, icon }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive ? 'bg-muted text-primary' : ''}`
          }
        >
          {icon}
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export function Sidebar() {
  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <NavLink to='/' className='flex items-center gap-2 font-semibold'>
            <BookOpen className='h-6 w-6' />
            <span className=''>Navio</span>
          </NavLink>
        </div>
        <div className='flex-1'>
          <NavLinks />
        </div>
      </div>
    </div>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <NavLink to='/' className='flex items-center gap-2 font-semibold'>
                <BookOpen className='h-6 w-6' />
                <span className=''>Navio</span>
            </NavLink>
        </div>
        <NavLinks />
      </SheetContent>
    </Sheet>
  );
}