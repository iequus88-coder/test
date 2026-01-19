
import React, { useState, useEffect } from 'react';

interface TBMCheckPageProps {
  onBack: () => void;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean | null; // null: 미선택, true: YES, false: NO
}

const TBMCheckPage: React.FC<TBMCheckPageProps> = ({ onBack }) => {
  // 1. 공사 개요 및 일정 (사용자 필수 요청 사항)
  const [workInfo, setWorkInfo] = useState({
    workName: "안성 죽산면 태양광 1단지 모듈 설치 공사",
    location: "A-1 구역 어레이 현장",
    startDate: "2026-05-10", // 공사 시작일
    endDate: "2026-05-25",   // 공사 마지막날 (예정)
    isFirstDay: false,
    isLastDay: false
  });

  // 2. TBM 사전준비 (서식 1 발췌)
  const [prepChecklist, setPrepChecklist] = useState<ChecklistItem[]>([
    { id: 'p1', text: "해당 작업의 위험성평가를 실시하였는가? (결과물 확인)", checked: null },
    { id: 'p2', text: "해당 작업의 과거 사고보고서(아차사고 포함) 내용을 확인하였는가?", checked: null },
    { id: 'p3', text: "작업 물량, 범위, 작업내용 및 필수 보호구를 인지하고 있는가?", checked: null },
    { id: 'p4', text: "안전작업 지침 내용을 숙지하고 교육하였는가?", checked: null },
  ]);

  // 3. TBM 실행과정 (서식 1 발췌)
  const [execChecklist, setExecChecklist] = useState<ChecklistItem[]>([
    { id: 'e1', text: "작업자 음주, 발열, 약물 복용 등 건강상태를 확인하였는가?", checked: null },
    { id: 'e2', text: "중점 위험요인과 대책을 도출하고 작업자에게 숙지시켰는가?", checked: null },
    { id: 'e3', text: "위험 발견 시 즉시 작업을 멈추고 보고하도록 교육하였는가?", checked: null },
  ]);

  // 4. 잠재위험요인 및 중점대책 (서식 2 발췌)
  const [hazards, setHazards] = useState({
    potential: "",
    priority: "",
    countermeasure: ""
  });

  const [participants, setParticipants] = useState([
    { name: "김철수 (팀장)", signed: false },
    { name: "이영희", signed: false },
    { name: "박민수", signed: false },
    { name: "최광호", signed: false },
    { name: "정은지", signed: false },
  ]);

  const [photos, setPhotos] = useState<{ id: string, label: string, preview: string | null }[]>([
    { id: 'tbm_group', label: 'TBM 진행 단체 사진', preview: null },
    { id: 'site_hazard', label: '현장 위험요소 실물 사진', preview: null },
  ]);

  const toggleCheck = (id: string, value: boolean, section: 'prep' | 'exec') => {
    if (section === 'prep') {
      setPrepChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: value } : item));
    } else {
      setExecChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: value } : item));
    }
  };

  const toggleParticipant = (index: number) => {
    const newParticipants = [...participants];
    newParticipants[index].signed = !newParticipants[index].signed;
    setParticipants(newParticipants);
  };

  const handlePhotoUpload = (id: string) => {
    const dummyUrl = "https://images.unsplash.com/photo-1541625602330-2277a1cd43a1?auto=format&fit=crop&q=80&w=400";
    setPhotos(photos.map(p => p.id === id ? { ...p, preview: dummyUrl } : p));
  };

  const handleSubmit = () => {
    // 필수 유효성 검사
    if (!workInfo.startDate || !workInfo.endDate) {
      alert("공사 시작일과 마지막날(종료일)은 반드시 기록해야 합니다.");
      return;
    }
    if (!hazards.priority || !hazards.countermeasure) {
      alert("중점 위험요인과 대책을 입력해주세요 (서식 2 필수사항).");
      return;
    }
    
    const msg = workInfo.isLastDay 
      ? "공사 종료 TBM 일지가 제출되었습니다. 본사 승인 후 모든 자료가 아카이빙됩니다."
      : "금일 TBM 일지가 본사 승인 요청되었습니다.";
    
    alert(msg);
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
           <h1 className="text-white font-black text-sm uppercase tracking-widest leading-none">TBM 실행 체크리스트 / 회의록</h1>
           <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase">Standard Form V2.0</p>
        </div>
        <div className="w-10 h-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 touch-pan-y">
        
        {/* 1. 공사 개요 및 일정 섹션 (필수) */}
        <section className="bg-slate-800/50 rounded-[24px] p-5 border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
             <span className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-900">01</span>
             <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest italic">공사 개요 및 일정 기록</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">공사 명칭</label>
              <input 
                type="text" 
                value={workInfo.workName}
                onChange={(e) => setWorkInfo({...workInfo, workName: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">공사 시작일</label>
                <input 
                  type="date" 
                  value={workInfo.startDate}
                  onChange={(e) => setWorkInfo({...workInfo, startDate: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-yellow-400 font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block">공사 마지막날 (예정)</label>
                <input 
                  type="date" 
                  value={workInfo.endDate}
                  onChange={(e) => setWorkInfo({...workInfo, endDate: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-orange-400 font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
               <button 
                onClick={() => setWorkInfo({...workInfo, isFirstDay: !workInfo.isFirstDay, isLastDay: false})}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all border ${workInfo.isFirstDay ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg' : 'bg-slate-900 text-slate-500 border-white/5 opacity-50'}`}
               >
                 ✨ 공사 첫날 보고
               </button>
               <button 
                onClick={() => setWorkInfo({...workInfo, isLastDay: !workInfo.isLastDay, isFirstDay: false})}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all border ${workInfo.isLastDay ? 'bg-orange-600 text-white border-orange-500 shadow-lg' : 'bg-slate-900 text-slate-500 border-white/5 opacity-50'}`}
               >
                 🏁 공사 마지막날 보고
               </button>
            </div>
          </div>
        </section>

        {/* 2. TBM 사전준비 및 실행과정 (서식 1) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
             <span className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-900">02</span>
             <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest italic">TBM 실행 체크리스트 (서식 1 기반)</h3>
          </div>

          <div className="bg-slate-800/40 rounded-[24px] border border-white/5 overflow-hidden">
            <div className="bg-slate-900 p-3 border-b border-white/5">
               <p className="text-[10px] text-slate-400 font-black uppercase italic tracking-widest">A. TBM 사전준비</p>
            </div>
            {prepChecklist.map((item) => (
              <div key={item.id} className="p-4 border-b border-white/5 last:border-b-0">
                <p className="text-xs text-slate-200 font-medium mb-3 leading-relaxed">{item.text}</p>
                <div className="flex gap-2">
                   <button 
                    onClick={() => toggleCheck(item.id, true, 'prep')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${item.checked === true ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-600 border border-white/5'}`}
                   >
                     YES
                   </button>
                   <button 
                    onClick={() => toggleCheck(item.id, false, 'prep')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${item.checked === false ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-600 border border-white/5'}`}
                   >
                     NO
                   </button>
                </div>
              </div>
            ))}
            <div className="bg-slate-900 p-3 border-y border-white/5">
               <p className="text-[10px] text-slate-400 font-black uppercase italic tracking-widest">B. TBM 실행과정</p>
            </div>
            {execChecklist.map((item) => (
              <div key={item.id} className="p-4 border-b border-white/5 last:border-b-0">
                <p className="text-xs text-slate-200 font-medium mb-3 leading-relaxed">{item.text}</p>
                <div className="flex gap-2">
                   <button 
                    onClick={() => toggleCheck(item.id, true, 'exec')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${item.checked === true ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-600 border border-white/5'}`}
                   >
                     YES
                   </button>
                   <button 
                    onClick={() => toggleCheck(item.id, false, 'exec')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${item.checked === false ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-600 border border-white/5'}`}
                   >
                     NO
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 위험요인 및 중점대책 (서식 2) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
             <span className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-900">03</span>
             <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest italic">위험요인 및 중점대책 (서식 2 기반)</h3>
          </div>

          <div className="bg-slate-800/50 rounded-[24px] p-5 border border-white/5 space-y-4 shadow-xl">
             <div>
                <label className="text-slate-500 text-[10px] font-black uppercase mb-1 block italic">잠재위험요인 (Hazards)</label>
                <textarea 
                  value={hazards.potential}
                  onChange={(e) => setHazards({...hazards, potential: e.target.value})}
                  placeholder="현장에서 파악된 잠재적 위험요소들을 나열하세요..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-slate-200 min-h-[80px] focus:outline-none focus:border-yellow-400"
                />
             </div>
             
             <div className="bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
                <p className="text-[10px] text-blue-400 font-black uppercase mb-3 italic">중점위험요인 1개 선정 및 대책 (필수)</p>
                <div className="space-y-3">
                   <input 
                    type="text" 
                    value={hazards.priority}
                    onChange={(e) => setHazards({...hazards, priority: e.target.value})}
                    placeholder="선정된 중점위험요인" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-bold" 
                   />
                   <input 
                    type="text" 
                    value={hazards.countermeasure}
                    onChange={(e) => setHazards({...hazards, countermeasure: e.target.value})}
                    placeholder="구체적인 안전 대책 (제거/대체/통제)" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-emerald-400 font-bold" 
                   />
                </div>
             </div>
          </div>
        </section>

        {/* 4. 참석자 및 현장 사진 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
             <span className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-900">04</span>
             <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest italic">참석자 확인 및 현장 증빙</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {photos.map((photo) => (
              <button 
                key={photo.id}
                onClick={() => handlePhotoUpload(photo.id)}
                className="relative aspect-[4/3] bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden active:bg-slate-700 transition-all shadow-inner"
              >
                {photo.preview ? (
                  <img src={photo.preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-2xl mb-2">📸</span>
                    <span className="text-[9px] text-slate-500 font-black text-center px-4 leading-tight">{photo.label}</span>
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="bg-slate-800/50 rounded-[24px] overflow-hidden border border-white/5 shadow-xl">
            {participants.map((person, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-white/5 last:border-b-0 active:bg-slate-700 transition-all touch-manipulation">
                <div>
                   <p className="text-white font-bold text-sm italic">{person.name}</p>
                   <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Participant Status</p>
                </div>
                <button 
                  onClick={() => toggleParticipant(idx)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all shadow-md ${person.signed ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-700 text-slate-400 border border-white/5'}`}
                >
                  {person.signed ? '서명완료' : '확인/서명'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-6 text-center">
           <p className="text-[7px] text-slate-700 font-black uppercase tracking-[0.4em] mb-2 leading-none">Safe-Sun HQ Cloud Synchronized</p>
           <p className="text-[8px] text-slate-800 font-bold px-6 leading-relaxed">
             ※ 본 TBM 일지는 산업안전보건법에 의거하여 작성되었으며 본사 NAS 서버에 3년간 영구 보관됩니다.
           </p>
        </div>
      </div>

      {/* 하단 고정 승인 요청 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 z-50">
        <button 
          onClick={handleSubmit}
          className={`w-full h-16 rounded-[24px] font-black text-lg shadow-[0_12px_40px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-4 border-b-6 ${workInfo.isLastDay ? 'bg-orange-600 text-white border-orange-800' : 'bg-yellow-400 text-slate-900 border-yellow-600 hover:bg-white'}`}
        >
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xl">
             {workInfo.isLastDay ? '🚩' : '🛰️'}
          </div>
          <div className="text-left leading-none">
            <span className="text-[16px] italic tracking-tighter block">{workInfo.isLastDay ? '공사 종료 보고 및 일지 전송' : 'TBM 일지 승인 요청'}</span>
            <span className={`text-[9px] font-black uppercase tracking-widest mt-1 block ${workInfo.isLastDay ? 'text-white/50' : 'text-slate-900/50'}`}>Syncing with GrandSun HQ</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TBMCheckPage;
