import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIConciergeProps {
  lang: 'es' | 'en';
}

export default function AIConcierge({ lang }: AIConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Default starters depending on language
  const starters = lang === 'es' 
    ? [
        '¿Cómo llego desde el aeropuerto de Málaga?',
        '¿Qué habitaciones tienen baño privado?',
        '¿Cuáles son las horas de entrada y salida?',
        '¿Se permiten mascotas en el hostal?'
      ]
    : [
        'How do I get there from Malaga airport?',
        'Which rooms have a private bathroom?',
        'What are the check-in and check-out times?',
        'Are pets allowed at the hostel?'
      ];

  const welcomeMessage = lang === 'es'
    ? '¡Hola! Soy Serra, tu asistente virtual para Hostal Serramar. ¿En qué puedo ayudarte hoy sobre tu estancia, habitaciones o Benalmádena?'
    : 'Hello! I am Serra, your virtual assistant for Hostal Serramar. How can I help you today with your stay, rooms, or Benalmadena?';

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: welcomeMessage
        }
      ]);
    }
  }, [lang]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build simple history excluding the welcome message
      const historyToSend = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyToSend
        })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: data.reply
        }]);
      } else {
        throw new Error(data.error || 'Server returned invalid response');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: lang === 'es'
          ? 'Lo siento, he tenido un problema de conexión. ¿Puedes volver a decírmelo en unos momentos?'
          : 'Sorry, I encountered a connectivity issue. Could you tell me again in a moment?'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-2xl transition duration-300 hover:scale-105 group font-medium"
          id="btn-ai-floating"
        >
          <Sparkles className="h-6 w-6 animate-pulse text-yellow-200" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-sm pr-1">
            {lang === 'es' ? 'Pregunta a Serra IA' : 'Ask Serra AI'}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-96 max-w-[calc(100vw-2rem)] h-[550px] max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          id="panel-ai-chat"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-sky-500/20 p-1.5 rounded-lg border border-sky-500/40">
                <Sparkles className="h-5 w-5 text-sky-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Serra IA
                  <span className="inline-block h-2/3 py-0.5 px-1 bg-sky-500 text-[10px] uppercase font-bold rounded">
                    Concierge
                  </span>
                </h4>
                <p className="text-xs text-slate-400">Hostal Serramar</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition"
              aria-label="Close Chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                    m.role === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-md'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm leading-relaxed'
                  }`}
                >
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none border border-slate-200/80 p-3.5 shadow-sm text-slate-500 text-xs flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>{lang === 'es' ? 'Serra está pensando...' : 'Serra is thinking...'}</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Starters & Starters List */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex flex-col gap-1.5 max-h-36 overflow-y-auto">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                {lang === 'es' ? 'Preguntas sugeridas' : 'Suggesed Questions'}
              </span>
              <div className="flex flex-wrap gap-1">
                {starters.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-left text-xs bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 rounded-lg py-1 px-2.5 transition duration-200 cursor-pointer active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={lang === 'es' ? 'Pregúntame algo sobre el hostal...' : 'Ask me anything...'}
              disabled={isLoading}
              className="flex-1 bg-slate-100 focus:bg-white text-slate-800 text-sm py-2 px-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full transition disabled:opacity-40 disabled:hover:bg-sky-600"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
