
import React from 'react';

interface PWAInstallModalProps {
  onClose: () => void;
}

const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ onClose }) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-md rounded-t-[32px] sm:rounded-[32px] overflow-hidden flex flex-col border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
        
        {/* 헤더 */}
        <div className="p-6 border-b border-white/5 bg-slate-800/50">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-black text-xl tracking-tight">바탕화면 앱 설치 가이드</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <p className="text-yellow-400 text-xs mt-1 font-bold italic">※ 이 과정을 거쳐야 주소창 없는 "진짜 앱"이 됩니다!</p>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
          {/* 단계 1: 새 창으로 열기 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center font-black text-sm shadow-lg">1</div>
              <p className="text-white font-bold text-base">상단 [새 탭에서 열기] 아이콘 클릭</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-center gap-4 border border-white/5">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2 mx-auto">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <p className="text-[10px] text-slate-400 font-bold leading-tight">상단에 있는<br/>이 아이콘을 찾으세요!</p>
              </div>
              <div className="text-slate-600 text-2xl">▶</div>
              <p className="text-slate-300 text-xs leading-relaxed font-medium">
                구글 메뉴가 사라지고<br/>
                <span className="text-white font-bold">전체 화면</span>으로 바뀝니다.
              </p>
            </div>
          </div>

          {/* 단계 2: 홈 화면 추가 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center font-black text-sm shadow-lg">2</div>
              <p className="text-white font-bold text-base">브라우저 메뉴에서 [추가]</p>
            </div>
            
            <div className="bg-slate-800 p-5 rounded-2xl space-y-4 border border-white/5">
              {isIOS ? (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  </div>
                  <p className="text-slate-300 text-xs leading-tight">아이폰 하단 중앙 <span className="text-white font-bold">[공유]</span> 버튼을 누른 후, 아래로 스크롤하여 <span className="text-yellow-400 font-bold">[홈 화면에 추가]</span>를 누르세요.</p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <div className="flex gap-1 flex-col">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs leading-tight">안드로이드 우측 상단 <span className="text-white font-bold">[⋮]</span> 버튼을 누른 후, <span className="text-yellow-400 font-bold">[앱 설치]</span> 또는 <span className="text-yellow-400 font-bold">[홈 화면에 추가]</span>를 누르세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-4 bg-slate-800/30 border-t border-white/5">
          <button 
            onClick={onClose}
            className="w-full bg-yellow-400 text-slate-900 py-4 rounded-2xl text-base font-black active:bg-white transition-all shadow-xl active:scale-95"
          >
            가이드 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallModal;
