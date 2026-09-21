import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Calendar, Shield, Menu, X, Scale, ChevronDown, Clock, MessageCircle } from 'lucide-react';
import { FAMILY_PRACTICE_AREAS } from '../data/familyLawData';

interface HeaderProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
  onOpenPracticeArea: (id: string) => void;
  onOpenAdminLeads?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenScheduler,
  onOpenPracticeArea,
  onOpenAdminLeads
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    setMobileMenuOpen(false);
    setPracticeDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className={`sticky top-0 z-40 w-full shadow-sm transition-all duration-300 ${isScrolled ? 'bg-[#241B17]/95 shadow-xl shadow-[#241B17]/20 backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Click-to-Call Sticky Top Alert Banner */}
      <div className="bg-[#41342E] text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-[#5A4840]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex h-2 w-2 rounded-full bg-[#D7C17A] animate-pulse" />
            <span className="font-medium text-slate-300">
              24/7 Confidential Case Consultations:
            </span>
            <span className="text-[#D7C17A] font-semibold hidden md:inline">
              Free case evaluation
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#C7A14C]" />
              <span>Average response time: &lt; 15 minutes</span>
            </div>

            <a
              id="header-top-tel"
              href="tel:+18005550199"
              className="flex items-center gap-1.5 text-[#D7C17A] hover:text-[#F5E9C8] font-bold tracking-wide transition-colors py-0.5 px-2 rounded bg-[#41342E]/80 hover:bg-[#41342E]"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>(800) 555-FAMILY</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-3.5 flex items-center gap-1 min-[1280px]:gap-6 border-t transition-colors duration-300 ${isScrolled ? 'border-[#5A4840]' : 'border-transparent'}`}>
        {/* Law Firm Crest & Brand */}
        <div
          id="brand-logo"
          onClick={() => navigateTo('/')}
          className="flex w-[220px] min-[1280px]:w-auto flex-none items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#41342E] border border-[#B88A2D]/40 flex items-center justify-center text-[#C7A14C] shadow-sm group-hover:border-[#C7A14C] transition-colors">
            <Scale className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-serif-display font-bold text-lg min-[1280px]:text-2xl tracking-tight whitespace-nowrap transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#41342E]'}`}>
                Apex Family Law
              </span>
            </div>
            <p className="hidden min-[1280px]:block text-[11px] uppercase tracking-widest text-[#C7A14C] font-semibold whitespace-nowrap">
              Family Law | Trial &amp; Resolution
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className={`hidden min-[1081px]:flex flex-1 min-w-0 items-center justify-center gap-1 min-[1280px]:gap-5 text-[11px] min-[1280px]:text-[15px] font-medium transition-colors duration-300 ${isScrolled ? 'text-slate-200' : 'text-[#334155]'}`}>
          {/* Practice Areas Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPracticeDropdownOpen(true)}
            onMouseLeave={() => setPracticeDropdownOpen(false)}
          >
            <button
              id="nav-practice-areas-btn"
              onClick={() => navigateTo('/practice-areas')}
              className={`flex items-center gap-1 whitespace-nowrap py-2 transition-colors ${isScrolled ? 'hover:text-[#F5E9C8]' : 'hover:text-[#41342E]'}`}
            >
              <span>Practice Areas</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-150" />
            </button>

            {practiceDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 px-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Core Specializations
                  </p>
                </div>
                {FAMILY_PRACTICE_AREAS.map((pa) => (
                  <button
                    key={pa.id}
                    onClick={() => {
                      setPracticeDropdownOpen(false);
                      onOpenPracticeArea(pa.id);
                      navigate(`/practice-areas/${pa.id}`);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#7A6328] rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <span className="font-medium">{pa.title}</span>
                    <span className="text-[11px] text-[#C7A14C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Deep Dive -&gt;
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('/eligibility')}
            className={`whitespace-nowrap transition-colors py-2 ${isScrolled ? 'hover:text-[#F5E9C8]' : 'hover:text-[#41342E]'}`}
          >
            Case Eligibility
          </button>

          <button
            onClick={() => navigateTo('/case-results')}
            className={`whitespace-nowrap transition-colors py-2 ${isScrolled ? 'hover:text-[#F5E9C8]' : 'hover:text-[#41342E]'}`}
          >
            Verdicts &amp; Settlements
          </button>

          <button
            onClick={() => navigateTo('/attorneys')}
            className={`whitespace-nowrap transition-colors py-2 ${isScrolled ? 'hover:text-[#F5E9C8]' : 'hover:text-[#41342E]'}`}
          >
            Our Attorneys
          </button>

          <button
            onClick={() => navigateTo('/case-results')}
            className={`whitespace-nowrap transition-colors py-2 ${isScrolled ? 'hover:text-[#F5E9C8]' : 'hover:text-[#41342E]'}`}
          >
            Reviews
          </button>

          <button
            onClick={() => navigateTo('/contact')}
            className={`whitespace-nowrap transition-colors py-2 ${isScrolled ? 'hover:text-[#F5E9C8]' : 'hover:text-[#41342E]'}`}
          >
            Contact
          </button>
        </div>

        {/* Desktop Dual Action Buttons */}
        <div className="hidden min-[1081px]:flex items-center gap-1.5 min-[1280px]:gap-3 shrink-0">
          <a
            id="nav-whatsapp-btn"
            href="https://wa.me/18005550199?text=Hello%20Vanguard%20%26%20Sterling%2C%20I%20would%20like%20to%20discuss%20my%20legal%20matter."
            target="_blank"
            rel="noreferrer"
            aria-label="Message Vanguard and Sterling on WhatsApp"
            className={`flex items-center gap-1.5 px-2.5 min-[1280px]:px-3.5 py-2.5 rounded-lg border text-xs min-[1280px]:text-sm font-semibold transition-colors ${isScrolled ? 'border-[#6A554B] text-[#D7C17A] hover:bg-[#41342E] hover:border-[#C7A14C]' : 'border-[#D8E8DD] text-[#257942] hover:bg-[#F0F8F2] hover:border-[#A8CDB1]'}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            id="nav-book-consultation-btn"
            onClick={() => onOpenScheduler()}
            className="flex items-center gap-1.5 px-3 min-[1280px]:px-4 py-2.5 rounded-lg bg-[#C7A14C] hover:bg-[#B88A2D] text-white text-xs min-[1280px]:text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book</span>
          </button>

          {onOpenAdminLeads && (
            <button
              id="admin-leads-trigger"
              onClick={onOpenAdminLeads}
              title="Intake Leads Management"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-xs"
            >
              <Shield className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex min-[1081px]:hidden items-center gap-2 ml-auto">
          <a
            href="tel:+18005550199"
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-[#D7C17A] bg-[#41342E]' : 'text-[#C7A14C] bg-[#F7F0DB]'}`}
            aria-label="Call law firm"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg focus:outline-none transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E]' : 'text-slate-700 hover:bg-slate-100'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`min-[1081px]:hidden max-h-[calc(100vh-7rem)] overflow-y-auto border-b px-3 pt-3 pb-5 shadow-lg transition-colors duration-300 ${isScrolled ? 'bg-[#241B17] border-[#5A4840]' : 'bg-white border-slate-200'}`}>
          <div className={`mb-3 border-b pb-3 text-[10px] font-bold uppercase tracking-[0.18em] ${isScrolled ? 'border-[#5A4840] text-[#D7C17A]' : 'border-slate-200 text-[#A87920]'}`}>
            Apex Family Law navigation
          </div>
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('/practice-areas')}
              className={`w-full text-left px-3 py-2 font-medium rounded transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E] hover:text-[#F5E9C8]' : 'text-[#41342E] hover:bg-slate-100'}`}
            >
              Practice Areas
            </button>
            <button
              onClick={() => navigateTo('/eligibility')}
              className={`w-full text-left px-3 py-2 font-medium rounded transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E] hover:text-[#F5E9C8]' : 'text-[#41342E] hover:bg-slate-100'}`}
            >
              Eligibility check
            </button>
            <button
              onClick={() => navigateTo('/case-results')}
              className={`w-full text-left px-3 py-2 font-medium rounded transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E] hover:text-[#F5E9C8]' : 'text-[#41342E] hover:bg-slate-100'}`}
            >
              Results &amp; reviews
            </button>
            <button
              onClick={() => navigateTo('/attorneys')}
              className={`w-full text-left px-3 py-2 font-medium rounded transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E] hover:text-[#F5E9C8]' : 'text-[#41342E] hover:bg-slate-100'}`}
            >
              Attorneys
            </button>
            <button
              onClick={() => navigateTo('/case-results')}
              className={`w-full text-left px-3 py-2 font-medium rounded transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E] hover:text-[#F5E9C8]' : 'text-[#41342E] hover:bg-slate-100'}`}
            >
              Client reviews
            </button>
            <button
              onClick={() => navigateTo('/contact')}
              className={`w-full text-left px-3 py-2 font-medium rounded transition-colors ${isScrolled ? 'text-slate-200 hover:bg-[#41342E] hover:text-[#F5E9C8]' : 'text-[#41342E] hover:bg-slate-100'}`}
            >
              Offices &amp; contact
            </button>
          </div>

          <div className={`pt-4 mt-3 border-t space-y-2 ${isScrolled ? 'border-[#5A4840]' : 'border-slate-200'}`}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduler();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C7A14C] text-[#241B17] font-bold rounded-lg shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book</span>
            </button>
            <a
              href="tel:+18005550199"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#30251F] text-[#D7C17A] font-bold rounded-lg"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call 24/7</span>
            </a>
            <a
              href="https://wa.me/18005550199?text=Hello%20Vanguard%20%26%20Sterling%2C%20I%20would%20like%20to%20discuss%20my%20legal%20matter."
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#41342E] hover:bg-[#5A4840] text-[#F5E9C8] font-bold rounded-lg border border-[#6A554B]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};



