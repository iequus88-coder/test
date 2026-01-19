
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FieldDashboardProps {
  onBack: () => void;
  onShowDuty: () => void;
}

interface SiteData {
  id: string;
  name: string;
  code: string;
  status: string;
  people: number;
  tbm: boolean;
  emoji: string;
  manager: string;
  period: string;
  workerCount: string;
  equipment: string;
  isFinished?: boolean;
}

const FieldDashboard: React.FC<FieldDashboardProps> = ({ onBack, onShowDuty }) => {
  const navigate = useNavigate();
  
  const [hqMessage, setHqMessage] = useState("금일 폭염주의보 발령. 실외 작업 시 1시간마다 15분 휴식 필수 준수!");
  const [isMsgConfirmed, setIsMsgConfirmed] = useState(false);

  const [allSites, setAllSites] = useState<SiteData[]>([
    { 
      id: 'S1', name: "안성시 죽산면 태양광 1단지", code: "GS-AS-2601", status: "안전", manager: "김안전", people: 5, tbm: true, emoji: "🏢",
      period: "2026.05.10 ~ 2026.05.25", workerCount: "8명 (외주 7, 관리 1)", equipment: "카고크레인 5톤, 지게차"
    },
    { 
      id: 'S2', name: "여주시 가남읍 발전소 현장", code: "GS-YJ-2605", status: "주의", manager: "이보건", people: 4, tbm: true, emoji: "☀️",
      period: "2026.05.15 ~ 2026.06.10", workerCount: "12명 (전기 10, 보조 2)", equipment: "스카이차 3.5톤"
    },
    { 
      id: 'S3', name: "이천시 마장면 신축 공구", code: "GS-IC-2609", status: "안전", manager: "박공사", people: 7, tbm: true, emoji: "🏗️",
      period: "2026.04.01 ~ 2026.04.30", workerCount: "15명 (토목 12, 장비 3)", equipment: "굴착기 06급 2대"
    },
    { 
      id: 'S4', name: "양평군 용문면 설치공사", code: "GS-YP-2612", status: "대기", manager: "최정수", people: 3, tbm: false, emoji: "🚜",
      period: "2026.06.01 ~ 2026.06.20", workerCount: "3명 (준비팀)", equipment: "지게차 3톤"
    },
  ]);

  const [selectedSite, setSelectedSite] = useState<SiteData>(allSites[0]);

  const handleConfirmMessage = () => {
    setIsMsgConfirmed(true);
    alert(`[본사 긴급지시 수신 확인 완료]\n확인자: ${selectedSite.manager} 팀장\n확인시간: ${new Date().toLocaleString()}\n본사 서버에 수신 확인 정보가 기록되었습니다.`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] safe-area-inset overflow-hidden relative">
      <style>{`
        @keyframes emergency-blink {
          0%, 100% { background-color: rgba(185, 28, 28, 0.9); }
          50% { background-color: rgba(220, 38, 38, 1); }
        }
        .animate-emergency {
          animation: emergency-blink 1.2s infinite;
        }
      `}</style>

      <div className="flex justify-between items-center bg-slate-900 border-b border-white/5 p-3 sticky top-0 z-50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white active:bg-yellow-400 active:text-slate-900 transition-all shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="text-center min-w-0 flex-1 px-2">
          <h1 className="text-white font-black text-sm uppercase tracking-widest leading-none truncate">그랜드썬 현장관리</h1>
          <p className="text-[8px] text-slate-500 font-bold mt-1 uppercase leading-none">현장 관리 시스템</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center text-lg bg-slate-800/50 rounded-xl border border-white/5 shrink-0">👷</div>
      </div>

      {hqMessage && (
        <div className={`sticky top-[56px] z-40 transition-all ${isMsgConfirmed ? 'bg-emerald-900/40' : 'animate-emergency'} px-3 sm:px-4 py-3 border-b border-white/10 shadow-xl`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span className="text-xl shrink-0">{isMsgConfirmed ? '✅' : '📢'}</span>
              <div className="min-w-0">
                <p className="text-[9px] text-white/60 font-black uppercase tracking-widest leading-none mb-1">본사 긴급 지시 수신 확인</p>
                <p className="text-white font-black text-[11px] whitespace-nowrap overflow-hidden text-ellipsis italic leading-tight">
                  {hqMessage}
                </p>
              </div>
            </div>
            
            <button 
              disabled={isMsgConfirmed}
              onClick={handleConfirmMessage}
              className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-[10px] font-black transition-all border-b-4 ${isMsgConfirmed ? 'bg-emerald-600 text-white border-emerald-800 opacity-60' : 'bg-white text-red-600 border-slate-300 active:translate-y-1 active:border-b-0 shadow-lg'}`}
            >
              {isMsgConfirmed ? '확인완료' : '지시 확인'}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-40">
        
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onShowDuty} className="bg-gradient-to-br from-red-600 to-red-800 p-3 sm:p-4 rounded-2xl flex flex-col justify-center border-b-6 border-red-950 shadow-2xl active:translate-y-1 active:border-b-0 transition-all min-h-[85px]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">🚨</span>
              <h3 className="font-black text-white text-[10px] uppercase tracking-tighter">법적 의무</h3>
            </div>
            <p className="text-white font-black text-[12px] italic leading-tight">의무사항 확인</p>
          </button>
          <button onClick={() => navigate('/safety-ai')} className="bg-gradient-to-br from-indigo-600 to-violet-800 p-3 sm:p-4 rounded-2xl border-b-6 border-indigo-950 shadow-2xl active:translate-y-1 active:border-b-0 transition-all min-h-[85px]">
             <div className="flex items-center gap-2 mb-1.5">
               <span className="text-lg">🤖</span>
               <h3 className="text-yellow-300 font-black text-[10px] uppercase tracking-tighter">AI 비서</h3>
             </div>
             <p className="text-white font-black text-[12px] italic leading-tight">안전 규정 분석</p>
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-slate-500 font-black text-[9px] uppercase tracking-widest px-1">현장 관리 목록</h3>
          <div className="grid grid-cols-1 gap-2">
            {allSites.map((site) => (
              <div 
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between gap-3 ${selectedSite.id === site.id ? 'bg-slate-800 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.1)] scale-[1.01]' : 'bg-slate-900/40 border-white/5 opacity-50'}`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`text-2xl transition-all shrink-0 ${selectedSite.id === site.id ? 'opacity-100 scale-110' : 'opacity-30'}`}>{site.emoji}</div>
                  <div className="min-w-0">
                    <p className="text-slate-600 text-[8px] font-black leading-none mb-1.5 uppercase tracking-wider truncate">현장코드: {site.code}</p>
                    <h2 className={`font-black tracking-tight truncate ${selectedSite.id === site.id ? 'text-white text-[14px]' : 'text-slate-500 text-[12px]'}`}>{site.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-slate-500 font-black text-[9px] uppercase tracking-widest px-1">실시간 현장 운용 핵심 지표</h3>
          <div className="bg-slate-900/80 rounded-[32px] p-5 sm:p-6 border-2 border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400"></div>
             <div className="grid grid-cols-1 gap-5">
                <div className="flex items-center justify-between gap-4">
                   <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5 italic truncate">총 공사 기간</span>
                      <span className="text-sm sm:text-base text-white font-black italic tracking-tight truncate">{selectedSite.period}</span>
                   </div>
                   <div className="text-right shrink-0">
                      <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1.5 italic">가동 상태</span>
                      <span className="text-sm sm:text-base text-emerald-400 font-black block leading-none">정상 가동</span>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
                   <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5 italic block truncate">금일 투입 인원</span>
                      <p className="text-[11px] sm:text-sm text-slate-200 font-black leading-tight break-all">{selectedSite.workerCount}</p>
                   </div>
                   <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5 italic block truncate">투입 장비 명세</span>
                      <p className="text-[11px] sm:text-sm text-blue-400 font-black leading-tight italic break-all">{selectedSite.equipment}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-slate-500 font-black text-[9px] uppercase tracking-widest px-1">행정 및 법정 서류 관리</h3>
          <button onClick={() => navigate('/personnel-equipment')} className="w-full bg-gradient-to-r from-emerald-600 to-teal-800 h-16 rounded-2xl flex items-center px-4 sm:px-6 shadow-xl border-b-6 border-emerald-950 active:translate-y-1 active:border-b-0 transition-all">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl mr-3 sm:mr-4 shrink-0">👷</div>
            <div className="text-left flex-1 min-w-0">
              <span className="text-white font-black text-[15px] sm:text-[16px] block leading-none italic truncate">인원 및 장비 현황</span>
              <span className="text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] mt-1 block truncate">실시간 데이터 동기화</span>
            </div>
            <div className="text-white/30 shrink-0">▶</div>
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/work-plan')} className="bg-gradient-to-br from-blue-600 to-indigo-800 h-28 rounded-3xl flex flex-col justify-center items-start px-4 sm:px-5 shadow-2xl border-b-6 border-blue-950 active:translate-y-1 active:border-b-0 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 shrink-0">📝</div>
              <p className="text-white font-black text-[14px] sm:text-[15px] italic truncate w-full">작업계획서</p>
              <p className="text-white/40 text-[9px] font-bold uppercase mt-1 tracking-widest leading-none truncate w-full">차량계 하역기계</p>
            </button>
            <button onClick={() => navigate('/safety-permit')} className="bg-gradient-to-br from-violet-600 to-purple-800 h-28 rounded-3xl flex flex-col justify-center items-start px-4 sm:px-5 shadow-2xl border-b-6 border-violet-950 active:translate-y-1 active:border-b-0 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 shrink-0">🔐</div>
              <p className="text-white font-black text-[14px] sm:text-[15px] italic truncate w-full">안전허가서</p>
              <p className="text-white/40 text-[9px] font-bold uppercase mt-1 tracking-widest leading-none truncate w-full">통합 작업 허가</p>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-[46px] left-0 right-0 p-4 z-50 pointer-events-none">
        <button 
          onClick={() => navigate('/tbm-check')}
          className="pointer-events-auto w-full bg-yellow-400 h-16 rounded-[24px] flex items-center justify-center gap-3 sm:gap-4 shadow-[0_15px_40px_rgba(250,204,21,0.2)] border-b-6 border-yellow-600 active:translate-y-1 active:border-b-0 transition-all"
        >
          <div className="text-2xl animate-bounce shrink-0">📸</div>
          <div className="text-left min-w-0">
            <span className="text-slate-900 font-black text-[17px] sm:text-[18px] italic leading-none block truncate">TBM 점검 시작</span>
            <span className="text-slate-900/60 text-[10px] font-bold truncate block max-w-[220px] mt-1">{selectedSite.name}</span>
          </div>
        </button>
      </div>

      <div className="bg-[#0f172a] p-2 text-center z-50 border-t border-white/5">
        <p className="text-slate-700 text-[8px] font-black tracking-[0.3em] uppercase italic leading-none">Safe-Sun 현장 운영 시스템</p>
      </div>
    </div>
  );
};

export default FieldDashboard;
