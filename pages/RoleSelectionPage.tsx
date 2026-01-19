
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoleSelectionPageProps {
  onBack: () => void;
}

const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [emergencyMsg, setEmergencyMsg] = useState("금일 폭염주의보 발령. 실외 작업 시 1시간마다 15분 휴식 필수 준수 바랍니다.");
  const [inputText, setInputText] = useState("");
  const [sendTarget, setSendTarget] = useState<'all' | 'single'>('all');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    setIsSending(true);
    
    // 실제 전송 시뮬레이션 (NAS 저장 및 푸시 발송)
    setTimeout(() => {
      setEmergencyMsg(inputText);
      setIsSending(false);
      setInputText("");
      alert(`${sendTarget === 'all' ? '전국 모든 현장' : '지정된 개별 현장'}으로 긴급 지시가 송출되었습니다.\n(본사 NAS '명령기록' 폴더에 자동 저장됨)`);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] p-6 safe-area-inset overflow-hidden">
      {/* 상단 가이드 섹션 */}
      <div className="flex items-center gap-5 mb-4 pt-4 shrink-0">
        <div className="w-14 h-14 rounded-full border-2 border-yellow-400 overflow-hidden bg-slate-800 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4202/4202831.png" 
            alt="Character" 
            className="w-full h-full object-cover scale-125 translate-y-2"
          />
        </div>
        <div>
          <h2 className="text-white font-black text-lg tracking-tight leading-tight">반갑습니다, 김안전 님!</h2>
          <p className="text-yellow-400 text-[11px] font-bold opacity-80 italic">접속 권한: 본사 통합 관리자</p>
        </div>
      </div>

      {/* 메인 선택 카드 (비중을 대폭 키움) */}
      <div className="flex-[3] flex flex-col justify-center gap-6 mb-6">
        <button 
          onClick={() => navigate('/field-dashboard')}
          className="w-full bg-gradient-to-br from-yellow-400 to-orange-500 p-10 rounded-[48px] shadow-2xl text-left relative overflow-hidden active:scale-[0.98] transition-all group flex-1"
        >
          <div className="relative z-10 h-full flex flex-col justify-center">
            <span className="inline-block bg-black/20 text-white text-[11px] font-black px-2.5 py-1 rounded-md mb-4 uppercase tracking-tighter border border-white/10 w-fit">SUBCONTRACTOR</span>
            <h3 className="text-slate-900 text-4xl font-black mb-3 italic">현장 안전관리</h3>
            <p className="text-slate-800 text-lg font-bold leading-tight">
              현장 팀장 및 수급업체 전용<br/>
              TBM 점검 및 작업 허가 신청
            </p>
          </div>
          <div className="absolute right-[-30px] bottom-[-30px] opacity-20 text-[140px] group-active:scale-110 transition-transform select-none">🏗️</div>
        </button>

        <button 
          onClick={() => navigate('/hq-dashboard')}
          className="w-full bg-slate-800 border-2 border-slate-700 p-10 rounded-[48px] shadow-2xl text-left relative overflow-hidden active:scale-[0.98] transition-all group flex-1"
        >
          <div className="relative z-10 h-full flex flex-col justify-center">
            <span className="inline-block bg-blue-500/20 text-blue-400 text-[11px] font-black px-2.5 py-1 rounded-md mb-4 uppercase tracking-tighter border border-blue-500/10 w-fit">HQ & MANAGER</span>
            <h3 className="text-white text-4xl font-black mb-3 italic">본사 안전관리</h3>
            <p className="text-slate-400 text-lg font-bold leading-tight">
              그랜드썬 임직원 대시보드<br/>
              실시간 관제 및 서류 자동 보관
            </p>
          </div>
          <div className="absolute right-[-30px] bottom-[-30px] opacity-10 text-[140px] group-active:scale-110 transition-transform select-none">🏢</div>
        </button>
      </div>

      {/* 긴급 안전 메세지 관제 섹션 (컴팩트하게 축소 및 비율 조정) */}
      <div className="flex-1 shrink-0 flex flex-col justify-end">
        <div className="bg-red-950/20 border-2 border-red-500/20 rounded-[32px] p-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <h4 className="text-red-500 font-black text-[10px] uppercase tracking-widest italic">본사 긴급 지시</h4>
            </div>

            <div className="flex bg-black/40 p-0.5 rounded-lg border border-red-900/20">
              <button 
                onClick={() => setSendTarget('all')}
                className={`w-6 h-6 flex items-center justify-center rounded-md transition-all ${sendTarget === 'all' ? 'bg-red-600 text-white' : 'text-slate-500'}`}
              >
                <span className="text-xs">🌐</span>
              </button>
              <button 
                onClick={() => setSendTarget('single')}
                className={`w-6 h-6 flex items-center justify-center rounded-md transition-all ${sendTarget === 'single' ? 'bg-red-600 text-white' : 'text-slate-500'}`}
              >
                <span className="text-xs">📍</span>
              </button>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-2.5 mb-3 border border-red-900/20">
            <p className="text-white/70 font-bold leading-snug break-keep italic text-[10px]">
              "{emergencyMsg}"
            </p>
          </div>

          <div className="flex gap-2 h-10">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="전 현장에 송출할 지시를 입력..."
              className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 text-[11px] text-white focus:outline-none focus:border-red-500/40 transition-all placeholder:text-slate-700"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button 
              disabled={isSending || !inputText.trim()}
              onClick={handleSendMessage}
              className={`min-w-[54px] bg-red-600 text-white rounded-xl font-black text-[11px] shadow-lg transition-all ${isSending ? 'opacity-50' : 'active:scale-95 active:bg-red-700'}`}
            >
              {isSending ? '...' : '송출'}
            </button>
          </div>
          
          <div className="mt-2 text-center">
             <p className="text-[7px] text-slate-700 font-black uppercase tracking-widest leading-none">※ 송출된 내용은 본사 NAS 명령기록 폴더에 영구 보관됩니다.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="mt-6 mb-2 text-slate-700 font-bold text-[10px] underline underline-offset-4 hover:text-slate-500 transition-colors self-center shrink-0"
      >
        처음으로 돌아가기 (로그아웃)
      </button>
    </div>
  );
};

export default RoleSelectionPage;
