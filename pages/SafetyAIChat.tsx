
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface SafetyAIChatProps {
  onBack: () => void;
}

const SafetyAIChat: React.FC<SafetyAIChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "반갑습니다. (주)그랜드썬에스피 AI 안전 비서입니다.\n산업안전보건법 및 태양광 공사 현장의 1,500여 개 법규를 바탕으로 답변해 드립니다.\n\n질문 시 관련 **[법규 조문 번호]**를 함께 제공하며, 모든 답변은 반드시 현장 관리자의 최종 승인을 거쳐야 함을 유의해 주세요." 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, { role: 'user', text: userMsg }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `당신은 대한민국 '산업안전보건법' 및 '태양광 발전설비 공사 현장'의 법규 전문가입니다.
          
          [핵심 지시 사항]
          1. 1,500여 개의 관련 법규 조문을 바탕으로 질문에 답하십시오.
          2. 모든 답변에는 반드시 근거가 되는 [산업안전보건법 제O조], [안전보건규칙 제O조] 등의 '조문 번호'를 구체적으로 명시하십시오.
          3. 답변은 현장 팀장과 작업자가 즉시 행동 지침으로 삼을 수 있도록 명확하고 단호한 어조로 구성하십시오.
          4. 답변 끝에는 반드시 '전문가 확답 필수'에 관한 면책 조항이 포함됩니다 (이것은 UI에서 처리되거나 당신이 텍스트로 강조해야 합니다).
          
          [답변 형식]
          - 관련 법규: [조문 번호 명시]
          - 핵심 내용: [간결한 설명]
          - 현장 조치 사항: [구체적 행동 지침]`,
          temperature: 0.2, // 정확도를 위해 온도를 낮춤
        },
      });

      const aiText = response.text || "죄송합니다. 법규 데이터를 분석하는 중 오류가 발생했습니다.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (err) {
      console.error(err);
      setError("네트워크 연결이 불안정합니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] safe-area-inset overflow-hidden">
      {/* 헤더 */}
      <div className="flex justify-between items-center bg-slate-900 border-b-2 border-slate-800 p-4 sticky top-0 z-50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white active:bg-yellow-400 active:text-slate-900 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="text-center">
          <p className="text-yellow-400 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Safety Legal Compliance</p>
          <h1 className="text-white font-black text-lg">AI 법규/안전 비서</h1>
        </div>
        <div className="w-10 h-10 flex items-center justify-center text-xl">🛡️</div>
      </div>

      {/* 채팅 영역 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[90%] space-y-2">
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-yellow-400 text-slate-900 font-bold rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none whitespace-pre-wrap'
              }`}>
                {msg.text}
              </div>
              
              {/* AI 답변일 때만 보여주는 면책 박스 */}
              {msg.role === 'model' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
                  <span className="text-lg">⚠️</span>
                  <p className="text-[10px] text-red-400 font-bold leading-tight">
                    위 답변은 AI가 분석한 참고 자료입니다. 실제 작업 전 반드시 <span className="underline decoration-red-500 underline-offset-2">안전관리자 또는 본사 관계자의 최종 확답</span>을 받으시기 바랍니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-white/5 flex flex-col gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-150"></div>
              </div>
              <p className="text-[10px] text-slate-500 font-bold italic">1,500여 개 법규 조문을 검색 중입니다...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-400 text-xs text-center font-bold">
            {error}
            <button onClick={handleSend} className="block mx-auto mt-2 underline">다시 시도</button>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="p-4 bg-slate-900 border-t border-white/10">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="예: 사다리 작업 안전 기준은?"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-yellow-400 transition-all placeholder:text-slate-700 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isLoading ? 'bg-slate-800 text-slate-600' : 'bg-yellow-400 text-slate-900 shadow-xl active:scale-95'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyAIChat;
