/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Loader2, Phone, MessageCircle } from 'lucide-react';
import { Car, Language, ChatMessage } from '../types';
import { getTranslation } from '../translations';
import { sendMessageToGemini } from '../services/geminiService';
import { SHOWROOM_INFO } from '../constants';

interface AssistantProps {
  cars: Car[];
  lang: Language;
}

const Assistant: React.FC<AssistantProps> = ({ cars, lang }) => {
  const t = getTranslation(lang);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: lang === 'fr' 
        ? "Bonjour ! Je suis l'assistant IA de Auto Elite. Posez-moi vos questions sur la location et la vente de voitures en Algérie !"
        : lang === 'en'
        ? "Hello! I am the Auto Elite AI assistant. Ask me anything about car rental and sales in Algeria!"
        : "مرحباً بك! أنا مساعد أوتو إيليت الذكي 🤖. اسألني عن أسعار كراء السيارات، شروط الإيجار، أو السيارات المتاحة للبيع الفوري!",
      timestamp: Date.now()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
    const replyText = await sendMessageToGemini(historyForApi, textToSend, cars, lang);

    const modelMsg: ChatMessage = {
      role: 'model',
      text: replyText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  const quickPrompts = [
    'ما هي أسعار كراء السيارات اليومية والشهري؟',
    'ما هي شروط ووثائق كراء سيارة في المعرض؟',
    'ما هي السيارات المتوفرة للبيع الفوري اليوم؟',
    'كيف يمكنني حجز سيارة للكراء عبر الواتساب؟'
  ];

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-950 p-4 rounded-full shadow-2xl shadow-amber-500/30 border border-amber-400 flex items-center gap-2 font-black text-xs hover:scale-110 transition-all duration-300"
      >
        <Bot className="w-6 h-6 animate-bounce" />
        <span className="hidden sm:inline font-cairo">{t.assistantName}</span>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-gray-950 p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-white text-sm font-cairo">{t.assistantName}</h3>
                <p className="text-[10px] text-gray-400">{t.assistantSubtitle}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-gray-950/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-amber-500 text-gray-950 font-bold rounded-tr-none shadow-md'
                      : 'bg-gray-800 text-gray-100 border border-gray-700/80 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-amber-400 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تحليل استفسارك...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-gray-950 border-t border-gray-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 text-[10px] rounded-lg border border-gray-800 shrink-0 whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Direct Phone/WhatsApp Banner in Chat */}
          <div className="px-3 py-1.5 bg-amber-500/10 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300">
            <span>تواصل مع المبيعات:</span>
            <div className="flex items-center gap-2">
              <a href={`tel:${SHOWROOM_INFO.phone1}`} className="hover:underline font-bold" dir="ltr">
                {SHOWROOM_INFO.phone1}
              </a>
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-gray-950 border-t border-gray-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.assistantPlaceholder}
              className="flex-1 px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-amber-500 text-gray-950 font-bold rounded-xl hover:bg-amber-400 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default Assistant;
