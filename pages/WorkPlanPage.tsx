
import React, { useState } from 'react';

interface WorkPlanPageProps {
  onBack: () => void;
}

const WorkPlanPage: React.FC<WorkPlanPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    workName: "태양광 기초철근 상하차 및 운반",
    period: "2026.05.10 ~ 2026.05.25",
    location: "안성 죽산면 1단지 현장 301동 인근",
    subcontractor: "(주)그랜드에너지",
    peopleCount: "8",
    
    // 운전원 정보
    operatorName: "",
    operatorLicense: "건설기계조종사면허(지게차)",
    operatorContact: "",
    
    // 유도자 정보
    signalmanName: "",
    signalMethod: "무전기/수신호",
    
    // 장비 제원
    eqName: "지게차(D30S-7)",
    eqRegNo: "",
    eqCapacity: "3000kg",
    eqInsurance: true
  });

  const handleSubmit = () => {
    if (!formData.operatorName || !formData.eqRegNo) {
      alert("운전원 성명과 장비 등록번호는 필수 입력 사항입니다.");
      return;
    }
    alert("지게차 작업계획서가 본사로 송부되었습니다. 승인 후 작업을 시작하십시오.");
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] safe-area-inset overflow-hidden">
      {/* 헤더 */}
      <div className="flex justify-between items-center bg-slate-900 border-b border-white/5 p-4 sticky top-0 z-50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white active:bg-yellow-400 active:text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="text-center">
           <h1 className="text-white font-black text-sm uppercase tracking-widest leading-none">차량계 하역운반기계 작업계획서</h1>
           <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase">Forklift & Equipment Work Plan</p>
        </div>
        <div className="w-10 h-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 touch-pan-y">
        
        {/* 1. 작업 개요 */}
        <section className="bg-slate-800/50 rounded-[24px] p-5 border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
             <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white">01</span>
             <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest italic">작업 개요 (Work Overview)</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">작업 명칭</label>
              <input type="text" value={formData.workName} onChange={e => setFormData({...formData, workName: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">작업 기간</label>
                <input type="text" value={formData.period} readOnly className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-3 text-xs text-slate-400 font-mono" />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">투입 인원</label>
                <input type="text" value={formData.peopleCount + "명"} readOnly className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-3 text-xs text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">작업 장소</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white" />
            </div>
          </div>
        </section>

        {/* 2. 인력 현황 (운전원/유도자/지휘자) */}
        <section className="bg-slate-800/50 rounded-[24px] p-5 border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
             <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white">02</span>
             <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest italic">운전원/유도자/지휘자 현황</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] text-yellow-400 font-black uppercase mb-2 tracking-widest">🚜 운전원 (Operator)</p>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="성명 입력" value={formData.operatorName} onChange={e => setFormData({...formData, operatorName: e.target.value})} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white" />
                <input type="text" placeholder="연락처" value={formData.operatorContact} onChange={e => setFormData({...formData, operatorContact: e.target.value})} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white" />
              </div>
              <input type="text" value={formData.operatorLicense} readOnly className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-2.5 text-[10px] text-slate-500 mt-2 italic" />
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] text-emerald-400 font-black uppercase mb-2 tracking-widest">🚩 유도자 / 신호수 (Signalman)</p>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="성명 입력" value={formData.signalmanName} onChange={e => setFormData({...formData, signalmanName: e.target.value})} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white" />
                <input type="text" value={formData.signalMethod} readOnly className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-xs text-slate-500" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. 기계·장비 제원 */}
        <section className="bg-slate-800/50 rounded-[24px] p-5 border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
             <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white">03</span>
             <h3 className="text-blue-400 font-black text-xs uppercase tracking-widest italic">장비 제원 및 등록 현황</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">장비명/모델명</label>
                <input type="text" value={formData.eqName} readOnly className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-3 text-xs text-slate-400" />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">등록번호</label>
                <input type="text" placeholder="부산 04가 0000" value={formData.eqRegNo} onChange={e => setFormData({...formData, eqRegNo: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">규격(적재능력)</label>
                <input type="text" value={formData.eqCapacity} readOnly className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-3 text-xs text-slate-400" />
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">보험 가입됨</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 작업도면 및 경로 (첨부) */}
        <section className="space-y-4">
          <h3 className="text-slate-500 font-black text-[9px] uppercase tracking-widest px-1">현장 작업 경로 및 증빙 (NAS 자동저장)</h3>
          <div className="grid grid-cols-2 gap-3">
             <button className="aspect-video bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2">
                <span className="text-2xl">🚜</span>
                <span className="text-[8px] text-slate-500 font-black uppercase">장비 전경 사진</span>
             </button>
             <button className="aspect-video bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2">
                <span className="text-2xl">🗺️</span>
                <span className="text-[8px] text-slate-500 font-black uppercase">작업 경로도</span>
             </button>
          </div>
        </section>

      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 z-50">
        <button 
          onClick={handleSubmit}
          className="w-full h-16 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 border-b-6 border-blue-800"
        >
          <span className="text-xl">📁</span>
          <span>작업계획서 승인요청 (본사송부)</span>
        </button>
      </div>
    </div>
  );
};

export default WorkPlanPage;
