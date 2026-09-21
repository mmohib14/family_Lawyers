import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Scale,
  Phone,
  Calendar,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Minimize2
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onOpenScheduler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello, I'm CounselConnect, Vanguard & Sterling's 24/7 Legal Intake Specialist. What legal matter or injury can our trial partners evaluate for you today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasPromptedContact, setHasPromptedContact] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = [
    'I was injured in a crash',
    'Explain contingency fees',
    'Wrongfully fired / Whistleblower',
    'Commercial contract dispute',
    'What is my case worth?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();
      const aiReply = data.reply || "Our trial partners evaluate claims 24/7. Please call our rapid intake desk at (800) 555-0199 for an immediate confidential consultation.";

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'ai',
          text: "Our intake desk is experiencing high demand. Please call our 24/7 line directly at (800) 555-0199 or click 'Book Consultation' to secure your slot.",
          timestamp: 'Now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px] mb-3 animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#41342E] text-white p-4 flex items-center justify-between border-b border-[#5A4840]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#708238]/20 border border-[#708238]/40 flex items-center justify-center text-[#87994B]">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif-display font-bold text-sm text-slate-100">
                    CounselConnect 24/7
                  </h4>
                  <span className="flex h-2 w-2 rounded-full bg-[#87994B]" />
                </div>
                <p className="text-[10px] text-[#87994B] font-medium">
                  Vanguard &amp; Sterling Legal Triage
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="tel:+18005550199"
                title="Call 24/7"
                className="p-1.5 text-[#87994B] hover:bg-[#41342E] rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 fill-current" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#41342E] transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F7F3F1]">
            {/* Confidentiality Notice */}
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Confidential intake channel. Zero public records created.</span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#41342E] text-[#87994B] flex items-center justify-center shrink-0 text-xs mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#41342E] text-white rounded-tr-none'
                      : 'bg-white text-[#41342E] border border-slate-200/80 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      m.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#708238] text-white flex items-center justify-center shrink-0 text-xs mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 pl-8">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-[#708238] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#708238] rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-[#708238] rounded-full animate-bounce delay-200" />
                </span>
                <span>CounselConnect is analyzing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                className="text-[11px] font-medium bg-slate-100 hover:bg-[#F1F3E8] hover:text-[#46521F] text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input & Book Action */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your case or leave phone #..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-[#708238]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-[#708238] hover:bg-[#5F6F2F] text-white rounded-xl disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
              <span>Not legal advice until retained.</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenScheduler();
                }}
                className="text-[#5F6F2F] font-bold hover:underline flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Attorney</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        id="chat-widget-launcher"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3.5 bg-[#41342E] hover:bg-[#1e293b] text-white rounded-full shadow-2xl border border-[#6A554B]/80 hover:border-[#708238]/60 transition-all duration-200 group active:scale-95"
        aria-label="Open 24/7 AI Legal Intake Chat"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#708238] text-[#241B17] flex items-center justify-center">
            {isOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
          </div>
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#87994B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#708238]" />
            </span>
          )}
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold leading-tight flex items-center gap-1">
            <span>24/7 Legal Intake AI</span>
          </p>
          <p className="text-[10px] text-[#87994B] font-semibold">
            Confidential Case Chat
          </p>
        </div>
      </button>
    </div>
  );
};



