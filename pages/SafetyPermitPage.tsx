
import React, { useState } from 'react';

interface SafetyPermitPageProps {
  onBack: () => void;
}

const SafetyPermitPage: React.FC<SafetyPermitPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    permitNo: "P-" + new Date().getTime().toString().slice(-6),
    applicant: "김철수 팀장",
    location: "외부인 작업신청 현장 - 태양광 어레이 B지구",
    startTime: "",
    endTime: "",
    peopleCount: "5",
    workSummary: ""
  });

  const [permitTypes, setPermitTypes] = useState([
    { id: 'general', name: '일반위험(통합)', selected: true, icon: '🛡️' },
    { id: 'fire', name: '화기작업', selected: false, icon: '🔥' },
    { id: 'height', name: '고소작업', selected: false, icon: '🪜' },
    { id: 'confined', name: '밀폐공간', selected: false, icon: '🕳️' },
    { id: 'radiation', name: '방사선작업', selected: false, icon: '☢️' }
  ]);

  const [checklists, setChecklists] = useState([
    { id: 'c1', text: "작업구역 설정 및 출입경고 표지 설치", checked: false },
    { id: 'c2', text: "작업주위 가연성물질 제거 및 방화포 설치", checked: false },
    { id: 'c3', text: "가스농도 측정 (밀폐/화기 시 필수)", checked: false },
    { id: 'c4', text: "조명장비 및 통신수단 확보", checked: false },
    { id: 'c5', text: "안전교육 및 위험성평가 전파 완료", checked: false },
    { id: 'c6', text: "개인보호구(안전모, 안전화, 안전대) 착용", checked: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklists(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const toggleType = (id: string) => {
    setPermitTypes(prev => prev.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  };

  const handleSubmit = () => {
    if (!formData.startTime || !formData.workSummary) {
      alert("허가 기간과 작업 개요를 입력해주세요.");
      return;
    }
    alert(`${formData.permitNo} 허가서가 승인 대기 상태로 본사에 전송되었습니다.`);
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] safe-area-inset overflow-hidden">
      {/* 헤더 */}
      <div className="flex justify-between items-center bg-slate-900 border-b border-white/5 p-4 sticky top-0 z-50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white active:bg-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="text-center">
           <h1 className="text-white font-black text-sm uppercase tracking-widest leading-none">안전작업허가서 (통합)</h1>
           <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase">Safety Work Permit System</p>
        </div>
        <div className="w-10 h-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 touch-pan-y">
        
        {/* 허가 정보 메타 */}
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex justify-between items-center shadow-inner">
           <div>
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Permit Number</p>
              <p className="text-sm text-yellow-400 font-black font-mono leading-none">{formData.permitNo}</p>
           </div>
           <div className="text-right">
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Applicant</p>
              <p className="text-sm text-white font-black leading-none italic">{formData.applicant}</p>
           </div>
        </div>

        {/* 1. 작업 허가 유형 선택 (이미지 2, 3 기반) */}
        <section className="space-y-4">
          <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest px-1 italic">01. 작업 허가 유형 (Multiple Selection)</h3>
          <div className="grid grid-cols-2 gap-2">
            {permitTypes.map(t => (
              <button 
                key={t.id} 
                onClick={() => toggleType(t.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${t.selected ? 'bg-orange-600 border-orange-400 shadow-lg' : 'bg-slate-800/40 border-white/5 opacity-50'}`}
              >
                <span className="text-xl">{t.icon}</span>
                <span className={`text-[11px] font-black ${t.selected ? 'text-white' : 'text-slate-400'}`}>{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. 작업 개요 및 기간 (서식 발췌) */}
        <section className="bg-slate-800/50 rounded-[24px] p-5 border border-white/5 space-y-4 shadow-xl">
           <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest italic flex items-center gap-2">
              <span className="w-1 h-3 bg-yellow-400 rounded-full"></span> 02. 작업 개요 및 허가 기간
           </h3>
           <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="text-slate-500 text-[9px] font-black uppercase mb-1 block">시작 일시</label>
                    <input type="datetime-local" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white" />
                 </div>
                 <div>
                    <label className="text-slate-500 text-[9px] font-black uppercase mb-1 block">종료 일시</label>
                    <input type="datetime-local" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white" />
                 </div>
              </div>
              <div>
                 <label className="text-slate-500 text-[9px] font-black uppercase mb-1 block">작업 장소 및 설비</label>
                 <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div>
                 <label className="text-slate-500 text-[9px] font-black uppercase mb-1 block">작업 내용 요약</label>
                 <textarea value={formData.workSummary} onChange={e => setFormData({...formData, workSummary: e.target.value})} placeholder="실시할 작업의 구체적인 내용을 입력하세요..." className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white min-h-[60px]" />
              </div>
           </div>
        </section>

        {/* 3. 안전조치 요구사항 (서식 기반 체크리스트) */}
        <section className="space-y-4">
          <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest px-1 italic">03. 안전조치 이행 확인 (Checklist)</h3>
          <div className="bg-slate-800/40 rounded-[24px] border border-white/5 overflow-hidden">
            {checklists.map((c) => (
              <div 
                key={c.id} 
                onClick={() => toggleCheck(c.id)}
                className={`p-4 border-b border-white/5 last:border-b-0 flex items-center justify-between active:bg-slate-700 transition-all ${c.checked ? 'bg-emerald-500/5' : ''}`}
              >
                <p className={`text-[11px] font-medium leading-tight ${c.checked ? 'text-white' : 'text-slate-500'}`}>{c.text}</p>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${c.checked ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-900 border-white/10'}`}>
                  {c.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 가스 농도 측정 (화기/밀폐 전용) */}
        {(permitTypes.find(t => t.id === 'fire')?.selected || permitTypes.find(t => t.id === 'confined')?.selected) && (
          <section className="bg-red-500/10 rounded-[24px] p-5 border border-red-500/20 space-y-4 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-red-500 font-black text-xs uppercase tracking-widest italic flex items-center gap-2">
               🚨 가스 농도 측정 기록 (필수)
            </h3>
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-black/50 p-3 rounded-xl border border-red-500/10">
                  <p className="text-[8px] text-slate-500 font-black uppercase mb-1">O2 (18%이상)</p>
                  <input type="text" placeholder="결과(%)" className="w-full bg-transparent text-sm text-white font-black outline-none" />
               </div>
               <div className="bg-black/50 p-3 rounded-xl border border-red-500/10">
                  <p className="text-[8px] text-slate-500 font-black uppercase mb-1">CO (30ppm 미만)</p>
                  <input type="text" placeholder="결과(ppm)" className="w-full bg-transparent text-sm text-white font-black outline-none" />
               </div>
            </div>
          </section>
        )}

      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 z-50">
        <button 
          onClick={handleSubmit}
          className="w-full h-16 bg-green-600 text-white rounded-[24px] font-black text-lg shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 border-b-6 border-green-800"
        >
          <span className="text-xl">🔐</span>
          <span>허가서 전송 및 승인요청 (본사송부)</span>
        </button>
      </div>
    </div>
  );
};

export default SafetyPermitPage;
