
import React from 'react';
import LargeButton from '../components/LargeButton';

interface DashboardProps {
  onBack: () => void;
  onShowDuty: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack, onShowDuty }) => {
  const handleNextStep = () => {
    alert("3단계: TBM 점검 화면으로 이동합니다.");
  };

  const handleMenuClick = (menu: string) => {
    alert(`${menu} 기능은 현재 개발 중입니다.`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] safe-area-inset overflow-hidden">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center bg-slate-900 border-b-2 border-slate-800 p-4 sticky top-0 z-40">
        <button 
          onClick={onBack}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800 border-2 border-slate-700 text-white active:bg-yellow-400 active:text-black transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        
        <div className="text-center">
          <p className="text-yellow-400 text-[10px] font-black tracking-widest uppercase mb-0.5">GrandSun SP</p>
          <h1 className="text-white font-black text-lg">현장 관리 센터</h1>
        </div>

        <button 
          onClick={handleNextStep}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800 border-2 border-slate-700 text-white active:bg-yellow-400 active:text-black transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* 법적 의무 알림 (상단으로 배치하여 중요도 강조) */}
        <button 
          onClick={onShowDuty}
          className="w-full bg-red-600 text-white p-4 rounded-2xl flex items-center justify-between border-b-4 border-red-800 active:translate-y-1 active:border-b-0 transition-all shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">⚠️</span>
            <div className="text-left">
              <p className="font-black text-lg leading-tight">관리감독자 필수 의무</p>
              <p className="text-xs font-normal opacity-80">작업 시작 전 필수 확인</p>
            </div>
          </div>
          <span className="text-xl opacity-50">▶</span>
        </button>

        {/* 현장 정보 */}
        <div className="bg-slate-800 rounded-3xl p-5 border-l-8 border-yellow-400 shadow-xl">
          <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">Current Site</p>
          <h2 className="text-2xl font-black text-white mb-1">부산 강서구 B구역</h2>
          <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            김안전 관리자 (접속중)
          </div>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          <LargeButton 
            label="현장 변경" 
            onClick={() => handleMenuClick('현장 선택')} 
            icon="📍" 
            variant="secondary"
          />
          <LargeButton 
            label="TBM 점검" 
            onClick={handleNextStep} 
            icon="✅" 
          />
          <div className="col-span-2">
            <LargeButton 
              label="작업허가서 신청/결재" 
              onClick={() => handleMenuClick('작업허가')} 
              icon="📝" 
              className="!min-h-[100px]"
            />
          </div>
        </div>

        {/* 하단 요약 데이터 */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner">
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <p className="text-slate-500 text-[10px] font-black mb-1 tracking-tighter">오늘 투입 인원</p>
              <p className="text-3xl font-black text-white">12<span className="text-xs font-normal text-slate-500 ml-1 font-sans">명</span></p>
            </div>
            <div className="w-px h-10 bg-slate-800 mx-4"></div>
            <div className="flex-1">
              <p className="text-slate-500 text-[10px] font-black mb-1 tracking-tighter">미조치 현황</p>
              <p className="text-3xl font-black text-red-500">0<span className="text-xs font-normal text-slate-500 ml-1 font-sans">건</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 text-center opacity-20">
        <p className="text-slate-600 text-[8px] font-black tracking-[0.4em] uppercase">Safe-Sun v1.0 Standard</p>
      </div>
    </div>
  );
};

export default Dashboard;
