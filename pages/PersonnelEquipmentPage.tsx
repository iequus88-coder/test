
import React, { useState } from 'react';

interface PersonnelEquipmentPageProps {
  onBack: () => void;
}

const PersonnelEquipmentPage: React.FC<PersonnelEquipmentPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'personnel' | 'equipment'>('equipment');

  const [workers, setWorkers] = useState([
    { id: 1, name: "김철수", duty: "현장팀장/지휘", health: "Normal", alcohol: "0.000%", bp: "125/82", sign: "완료" },
    { id: 2, name: "이영희", duty: "모듈 설치", health: "Normal", alcohol: "0.000%", bp: "118/75", sign: "완료" },
    { id: 3, name: "박민수", duty: "전기 결선", health: "Warning", alcohol: "0.000%", bp: "145/95", sign: "주의" },
    { id: 4, name: "최광호", duty: "장비 조종", health: "Normal", alcohol: "0.000%", bp: "122/80", sign: "완료" },
    { id: 5, name: "정은지", duty: "신호수/안전", health: "Normal", alcohol: "0.000%", bp: "110/70", sign: "완료" },
  ]);

  const [equipmentList, setEquipmentList] = useState([
    { 
      id: 1, 
      type: "카고 크레인 (인양)", 
      model: "현대 5톤 / KANGLIM", 
      operator: "최광호 (기사)",
      license: "기사 1급 (No. 24-01-082)",
      spec: "최대 인양 15m / 2.9t",
      inspectTime: "07:45 (TBM 완료)",
      status: "정상", 
      refDoc: "WP-2401-A",
      // 대표 장비 이미지
      imgSrc: "https://images.unsplash.com/photo-1590487823816-f6a623f9540b?auto=format&fit=crop&q=80&w=400",
      // 실제 현장에서 찍은 사진 (가정)
      sitePhoto: "https://images.unsplash.com/photo-1541625602330-2277a1cd43a1?auto=format&fit=crop&q=80&w=200"
    },
    { 
      id: 2, 
      type: "고소작업차 (스카이)", 
      model: "3.5톤 화이트 / 다산중공업", 
      operator: "박정배 (기사)",
      license: "특수면허 (No. 23-11-004)",
      spec: "최대 작업 높이 24m",
      inspectTime: "07:50 (TBM 완료)",
      status: "정상", 
      refDoc: "WP-2401-B",
      imgSrc: "https://images.unsplash.com/photo-1621905252507-b35220adcfba?auto=format&fit=crop&q=80&w=400",
      sitePhoto: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200"
    },
    { 
      id: 3, 
      type: "디젤식 지게차", 
      model: "두산 D30S-7 (5톤)", 
      operator: "김용수 (기사)",
      license: "건설기계조종 (No. 22-05-112)",
      spec: "중량물 이송 전용",
      inspectTime: "08:10 (TBM 완료)",
      status: "정상", 
      refDoc: "WP-2401-C",
      imgSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400",
      sitePhoto: "https://images.unsplash.com/photo-1519003300449-424ad040507b?auto=format&fit=crop&q=80&w=200"
    },
    { 
      id: 4, 
      type: "굴착기 (기초공사)", 
      model: "볼보 EC60E (06급)", 
      operator: "마동석 (기사)",
      license: "굴착기면허 (No. 24-02-099)",
      spec: "어레이 기초 및 토목",
      inspectTime: "07:30 (TBM 완료)",
      status: "정상", 
      refDoc: "WP-2401-D",
      imgSrc: "https://images.unsplash.com/photo-1579489225078-27977a77bf72?auto=format&fit=crop&q=80&w=400",
      sitePhoto: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200"
    },
    { 
      id: 5, 
      type: "덤프트럭 (사토운반)", 
      model: "볼보 FH540 (25.5톤)", 
      operator: "이정재 (기사)",
      license: "대형면허 (No. 21-08-012)",
      spec: "토사 및 자재 대량 운반",
      inspectTime: "08:20 (TBM 완료)",
      status: "정상", 
      refDoc: "WP-2401-E",
      imgSrc: "https://images.unsplash.com/photo-1591768793355-74d7c8696561?auto=format&fit=crop&q=80&w=400",
      sitePhoto: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=200"
    },
  ]);

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] safe-area-inset overflow-hidden">
      {/* 헤더 */}
      <div className="flex justify-between items-center bg-slate-900 border-b border-white/5 p-2 sticky top-0 z-50">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 border border-white/5 text-white active:bg-yellow-400 active:text-slate-900 transition-all shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-white font-black text-xs uppercase tracking-widest">통합 인원/장비 관제</h1>
        <div className="w-9 h-9"></div>
      </div>

      {/* 탭 컨트롤 */}
      <div className="flex p-1.5 bg-slate-900 border-b border-white/5 gap-1.5">
        <button 
          onClick={() => setActiveTab('personnel')}
          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'personnel' ? 'bg-yellow-400 text-slate-900 shadow-[0_4px_15px_rgba(250,204,21,0.3)]' : 'text-slate-500 hover:text-slate-300 bg-slate-800/50'}`}
        >
          <span>👨‍🔧</span> 인원 관리 ({workers.length})
        </button>
        <button 
          onClick={() => setActiveTab('equipment')}
          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'equipment' ? 'bg-yellow-400 text-slate-900 shadow-[0_4px_15px_rgba(250,204,21,0.3)]' : 'text-slate-500 hover:text-slate-300 bg-slate-800/50'}`}
        >
          <span>🚜</span> 장비 관리 ({equipmentList.length})
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-32">
        {activeTab === 'personnel' ? (
          <section className="space-y-2.5">
            <div className="flex justify-between items-end px-1 mb-2">
              <h3 className="text-slate-500 font-black text-[9px] uppercase tracking-widest leading-none">실시간 건강 체크 현황</h3>
              <div className="flex items-center gap-2">
                 <span className="text-[8px] text-green-500 font-black tracking-widest">ALL NORMAL</span>
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            {workers.map((worker) => (
              <div key={worker.id} className={`bg-slate-800/40 rounded-2xl p-4 border transition-all ${worker.health === 'Warning' ? 'border-red-500/40 bg-red-500/5' : 'border-white/5 shadow-lg'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-full border border-white/10 flex items-center justify-center text-lg overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${worker.id}`} alt="avatar" className="w-full h-full object-cover opacity-70" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-[14px] leading-tight mb-0.5">{worker.name}</h4>
                      <p className="text-slate-500 text-[10px] font-bold">{worker.duty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${worker.sign === '완료' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500 text-white shadow-md animate-pulse'}`}>
                      {worker.sign === '완료' ? '✅ 서명완료' : '🚨 미서명'}
                    </span>
                    <p className="text-[8px] text-slate-600 mt-1 font-bold">확인: 07:32</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-950/60 p-2 rounded-xl text-center border border-white/5">
                    <p className="text-[8px] text-slate-500 font-black mb-1 uppercase tracking-tighter">혈중 알코올</p>
                    <p className={`text-[11px] font-black ${worker.alcohol !== "0.000%" ? 'text-red-500' : 'text-slate-200'}`}>{worker.alcohol}</p>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl text-center border border-white/5">
                    <p className="text-[8px] text-slate-500 font-black mb-1 uppercase tracking-tighter">최근 혈압</p>
                    <p className={`text-[11px] font-black ${worker.health === 'Warning' ? 'text-red-400' : 'text-slate-200'}`}>{worker.bp}</p>
                  </div>
                  <button className="bg-blue-600/10 border border-blue-500/30 text-blue-400 p-2 rounded-xl text-[10px] font-black active:bg-blue-600 active:text-white transition-all">
                    재측정 요청
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-widest">장비 투입 및 연동 명세</h3>
              <span className="text-[8px] text-yellow-500 font-black bg-yellow-400/10 px-2 py-1 rounded-full">계획서/TBM 연동됨</span>
            </div>
            
            {equipmentList.map((eq) => (
              <div key={eq.id} className="bg-slate-800/50 rounded-[24px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
                {/* 상단: 장비 기본 정보 */}
                <div className="p-4 flex gap-4">
                  {/* 장비 대표 이미지 */}
                  <div className="relative w-28 h-28 shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                      <img src={eq.imgSrc} alt={eq.type} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white shadow-lg border border-emerald-600">
                       ✓
                    </div>
                  </div>

                  {/* 상세 텍스트 정보 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-black text-[15px] italic leading-none">{eq.type}</h4>
                        <span className="text-[8px] text-slate-500 font-bold bg-black/40 px-1.5 py-0.5 rounded border border-white/5 uppercase tracking-tighter leading-none">Doc: {eq.refDoc}</span>
                      </div>
                      <p className="text-yellow-400 text-[10px] font-black leading-none mb-2">{eq.model}</p>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter w-12 shrink-0">조종원:</span>
                           <span className="text-[11px] text-slate-200 font-bold">{eq.operator}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter w-12 shrink-0">자격증:</span>
                           <span className="text-[10px] text-slate-400 font-medium truncate">{eq.license}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter w-12 shrink-0">제원:</span>
                           <span className="text-[10px] text-slate-400 font-medium">{eq.spec}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 하단: 현장 연동 데이터 영역 */}
                <div className="bg-black/40 p-3 flex items-center justify-between border-t border-white/5">
                   <div className="flex items-center gap-4">
                      {/* 현장 실물 사진 썸네일 */}
                      <div className="relative group">
                        <div className="w-16 h-12 bg-slate-900 rounded-lg overflow-hidden border-2 border-yellow-400/50">
                           <img src={eq.sitePhoto} alt="Site focus" className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="absolute inset-0 bg-yellow-400/10 group-active:bg-yellow-400/0 transition-all"></div>
                        <span className="absolute -top-1.5 -left-1.5 bg-yellow-400 text-slate-900 text-[7px] font-black px-1 rounded-sm shadow-sm">현장실물</span>
                      </div>

                      <div>
                         <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-0.5">최근 점검 기록</p>
                         <p className="text-[10px] text-emerald-400 font-bold tracking-tight italic">{eq.inspectTime}</p>
                      </div>
                   </div>

                   <div className="flex flex-col items-end gap-1.5">
                      <div className="flex gap-1">
                        <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20 uppercase tracking-tighter leading-none italic">장비 정상</span>
                        <span className="text-[8px] font-black bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md border border-blue-500/20 uppercase tracking-tighter leading-none italic">자격 적격</span>
                      </div>
                      <p className="text-[7px] text-slate-700 font-black tracking-widest uppercase">Certified by NAS GrandSun</p>
                   </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* 플로팅 통합 저장 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 z-50">
        <button 
          onClick={() => {
            alert("현장 인원 및 장비 통합 관제 데이터가 본사 NAS로 안전하게 전송 및 영구 보관되었습니다.");
            onBack();
          }}
          className="w-full bg-gradient-to-r from-slate-100 to-slate-300 text-slate-900 h-14 rounded-2xl font-black text-sm shadow-[0_10px_25px_rgba(0,0,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3 border-b-6 border-slate-500"
        >
          <span className="text-xl">💾</span>
          통합 정보 저장 및 본사 전송
        </button>
      </div>
    </div>
  );
};

export default PersonnelEquipmentPage;
