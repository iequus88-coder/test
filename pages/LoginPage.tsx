
import React, { useState } from 'react';
import PWAInstallModal from '../components/PWAInstallModal';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPWAInistall, setShowPWAInstall] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-start sm:justify-center p-6 sm:p-8 bg-[#0f172a] overflow-y-auto h-full">
      {/* 캐릭터 영역 */}
      <div className="mt-4 sm:mt-0 mb-4 sm:mb-8 relative shrink-0">
        <div className="w-40 h-40 sm:w-52 sm:h-52 bg-slate-800 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.2)] overflow-hidden border-4 border-yellow-400 p-1">
          <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white/10 bg-[#334155]">
            <img 
              src="https://img.freepik.com/free-vector/hand-drawn-construction-worker-illustration_23-2149342961.jpg" 
              alt="Friendly Safety Character" 
              className="w-full h-full object-cover scale-150 translate-y-6 sm:translate-y-8"
              onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
              style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
              onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/4202/4202831.png"; }}
            />
            <div className="absolute top-[20px] sm:top-[34px] left-1/2 -translate-x-1/2 z-10">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center border-2 border-green-600 shadow-md">
                <svg className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none"><path d="M12 4V20M4 12H20" stroke="#16a34a" strokeWidth="5" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-1.5 sm:py-2.5 rounded-full font-black text-sm sm:text-base border-2 border-slate-900 shadow-[0_6px_15px_rgba(0,0,0,0.6)] whitespace-nowrap z-20">
          안 전 제 일 !
        </div>
      </div>

      <div className="text-center mb-6 sm:mb-10 shrink-0">
        <h1 className="text-4xl sm:text-5xl font-black text-yellow-400 tracking-tighter mb-1 italic drop-shadow-xl">Safe-Sun</h1>
        <p className="text-slate-300 text-sm sm:text-lg font-bold tracking-tight opacity-90">
          (주)그랜드썬에스피 <span className="text-yellow-400/80">스마트 안전관리</span>
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4 sm:space-y-6 pb-4">
        {/* 로그인 폼 */}
        <div className="space-y-3 sm:space-y-4">
          <input type="text" placeholder="사번 또는 아이디" className="w-full bg-slate-900/70 border-2 border-slate-700 text-white rounded-2xl py-4 px-6 text-lg focus:outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600 shadow-inner" />
          <input type="password" placeholder="비밀번호" className="w-full bg-slate-900/70 border-2 border-slate-700 text-white rounded-2xl py-4 px-6 text-lg focus:outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600 shadow-inner" />
        </div>

        <button onClick={onLogin} className="w-full bg-yellow-400 text-slate-900 py-5 rounded-2xl text-xl font-black shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:translate-y-1 transition-all border-b-6 border-yellow-600">
          현장 로그인
        </button>

        {/* 앱 설치 가이드 버튼 - 시각적으로 강조 */}
        <button 
          onClick={() => setShowPWAInstall(true)}
          className="w-full flex flex-col items-center justify-center gap-1 py-4 rounded-2xl border-2 border-dashed border-yellow-400/30 bg-yellow-400/5 text-yellow-400 active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl group-hover:animate-bounce">📱</span>
            <span className="text-sm font-black italic">스마트폰 바탕화면 앱 설치 가이드</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">주소창 없이 앱처럼 사용하기</span>
        </button>

        <div className="pt-2 text-center">
          <p className="text-slate-500 text-[11px] font-medium">본 계정은 관리자 전용입니다. T. 051-XXX-XXXX</p>
        </div>
      </div>

      {showPWAInistall && <PWAInstallModal onClose={() => setShowPWAInstall(false)} />}
    </div>
  );
};

export default LoginPage;
