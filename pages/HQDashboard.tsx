
import React, { useState } from 'react';

interface HQDashboardProps {
  onBack: () => void;
}

interface SiteReport {
  id: string;
  name: string;
  code: string;
  status: '승인대기' | '진행중' | '주의' | '미보고' | '종료승인대기';
  compliance: {
    tbm: boolean;
    plan: '대기' | '승인' | '반려';
    permit: '대기' | '승인' | '반려';
    photos: number;
  };
  metrics: {
    people: number;
    equipment: number;
  };
  nasPath: string;
  manager: string;
  lastUpdate: string;
  details: {
    workPlan: {
      title: string;
      period: string;
      workerCount: string;
      equipment: string;
      cargo: string;
      weight: string;
      supervisor: string;
      operator: string;
      regNo: string;
    };
    permit: {
      type: string[];
      risks: string;
      measures: string[];
      startTime: string;
      endTime: string;
    };
    tbmHistory: {
      date: string;
      hazards: string;
      countermeasure: string;
      checklist: { text: string; checked: boolean }[];
    };
  };
}

const HQDashboard: React.FC<HQDashboardProps> = ({ onBack }) => {
  const [reports, setReports] = useState<SiteReport[]>([
    { 
      id: 'S1', name: "안성 죽산면 태양광 1단지", code: "AS-2601", status: "종료승인대기", 
      compliance: { tbm: true, plan: '승인', permit: '승인', photos: 12 },
      metrics: { people: 8, equipment: 3 },
      nasPath: "/NAS/2026/FIELD_AS2601/SAFETY",
      manager: "김안전", lastUpdate: "10분 전",
      details: {
        workPlan: { 
          title: "모듈 양중 및 기초 공사", 
          period: "2026.05.10 ~ 2026.05.25", 
          workerCount: "총 8명 (팀장 1, 기능 5, 신호 2)",
          equipment: "카고 크레인 5톤, 지게차 3톤", 
          cargo: "태양광 모듈 240매", 
          weight: "2,800kg", 
          supervisor: "김철수 팀장",
          operator: "이장비",
          regNo: "부산 04가 1234"
        },
        permit: { 
          type: ["일반위험", "고소작업"], 
          risks: "모듈 인양 중 낙하 및 전도 위험", 
          measures: ["작업반경 통제", "신호수 배치", "2중 줄걸이"],
          startTime: "2026-05-20 08:00",
          endTime: "2026-05-20 18:00"
        },
        tbmHistory: {
          date: "2026-05-20",
          hazards: "모듈 인양 로프 마모 확인 필요",
          countermeasure: "신규 로프 교체 및 하부 통제 철저",
          checklist: [
            { text: "해당 작업의 위험성평가를 실시하였는가?", checked: true },
            { text: "작업자 음주 및 건강상태를 확인하였는가?", checked: true },
            { text: "보호구(안전모, 안전대) 착용을 확인하였는가?", checked: true }
          ]
        }
      }
    },
    { 
      id: 'S2', name: "여주 가남읍 발전소 현장", code: "YJ-2605", status: "진행중", 
      compliance: { tbm: true, plan: '승인', permit: '승인', photos: 24 },
      metrics: { people: 12, equipment: 5 },
      nasPath: "/NAS/2026/FIELD_YJ2605/SAFETY",
      manager: "이보건", lastUpdate: "1시간 전",
      details: {
        workPlan: { 
          title: "어레이 구조물 조립", 
          period: "2026.05.15 ~ 2026.06.10", 
          workerCount: "총 12명 (기능 10, 장비 2)",
          equipment: "스카이차 3.5톤, 화물트럭", 
          cargo: "알루미늄 프로파일", 
          weight: "500kg", 
          supervisor: "박정배 기사",
          operator: "최스카이",
          regNo: "경기 77로 9988"
        },
        permit: { 
          type: ["고소작업", "전기작업"], 
          risks: "추락 및 감전 위험", 
          measures: ["안전대 상시 체결", "절연 장구 착용", "전원 차단 확인"],
          startTime: "2026-05-20 09:00",
          endTime: "2026-05-20 17:00"
        },
        tbmHistory: {
          date: "2026-05-20",
          hazards: "스카이차 아우트리거 지반 약화",
          countermeasure: "침목 추가 설치 및 수평 확인",
          checklist: [
            { text: "해당 작업의 위험성평가를 실시하였는가?", checked: true },
            { text: "작업자 음주 및 건강상태를 확인하였는가?", checked: true },
            { text: "보호구(안전모, 안전대) 착용을 확인하였는가?", checked: true }
          ]
        }
      }
    },
    { 
      id: 'S3', name: "이천 마장면 신축 공구", code: "IC-2609", status: "주의", 
      compliance: { tbm: false, plan: '승인', permit: '대기', photos: 5 },
      metrics: { people: 15, equipment: 7 },
      nasPath: "/NAS/2026/FIELD_IC2609/SAFETY",
      manager: "박공사", lastUpdate: "방금 전",
      details: {
        workPlan: { 
          title: "기초 토목 및 굴착", 
          period: "2026.04.01 ~ 2026.04.30", 
          workerCount: "총 15명 (토목 8, 장비 7)",
          equipment: "굴착기 06급 3대, 덤프 4대", 
          cargo: "토사 및 자재", 
          weight: "N/A", 
          supervisor: "마동석 기사",
          operator: "이토목",
          regNo: "서울 00고 0000"
        },
        permit: { 
          type: ["굴착작업", "화기작업"], 
          risks: "지하 매설물 파손 및 화재", 
          measures: ["매설물 탐지", "소화기 비치", "화기감시자"],
          startTime: "2026-05-20 10:00",
          endTime: "2026-05-20 19:00"
        },
        tbmHistory: {
          date: "2026-05-20",
          hazards: "굴착 반경 내 보행자 접근 우려",
          countermeasure: "안전 펜스 보강 및 유도원 추가 배치",
          checklist: [
            { text: "해당 작업의 위험성평가를 실시하였는가?", checked: true },
            { text: "작업자 음주 및 건강상태를 확인하였는가?", checked: true },
            { text: "보호구(안전모, 안전대) 착용을 확인하였는가?", checked: true }
          ]
        }
      }
    }
  ]);

  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedSite, setSelectedSite] = useState<SiteReport | null>(reports[0]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [docViewer, setDocViewer] = useState<{ isOpen: boolean, type: 'tbm' | 'plan' | 'permit' | 'nas' | null }>({ isOpen: false, type: null });

  const [instructionText, setInstructionText] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'single'>('all');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const totalPeople = reports.reduce((acc, curr) => acc + curr.metrics.people, 0);
  const pendingApprovals = reports.filter(r => r.status === '종료승인대기' || r.compliance.plan === '대기' || r.compliance.permit === '대기').length;

  const handleSiteSelect = (site: SiteReport) => {
    setSelectedSite(site);
    setViewMode('detail');
  };

  const handleBroadcast = () => {
    if (!instructionText.trim()) return;
    setIsBroadcasting(true);
    
    setTimeout(() => {
      const targetName = broadcastTarget === 'all' ? "전국 모든 현장" : `${selectedSite?.name || '선택된 현장'}`;
      alert(`[긴급 안전 지시 송신 완료]\n대상: ${targetName}\n내용: "${instructionText}"\n\n지시는 즉시 송출되었습니다.`);
      setInstructionText("");
      setIsBroadcasting(false);
    }, 1500);
  };

  const handleFinalApprove = () => {
    if (!selectedSite) return;
    setIsSyncing(true);
    setTimeout(() => {
      setReports(prev => prev.filter(r => r.id !== selectedSite.id));
      alert(`[최종 승인 완료] NAS 이관이 완료되었습니다.`);
      setIsSyncing(false);
      setDocViewer({ isOpen: false, type: null });
      setSelectedSite(null);
      setViewMode('list');
    }, 2000);
  };

  const openDoc = (type: 'tbm' | 'plan' | 'permit' | 'nas') => {
    setDocViewer({ isOpen: true, type });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#020617] text-slate-200 overflow-hidden font-sans h-full">
      <header className="bg-slate-900 border-b border-white/5 p-4 flex justify-between items-center shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={viewMode === 'detail' ? () => setViewMode('list') : onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white shadow-lg active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter text-white leading-none">그랜드썬 본사 <span className="text-yellow-400">관제 센터</span></h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest leading-none mt-1">본사 통합 안전관제 및 서류 열람 시스템</p>
          </div>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center pr-2 sm:pr-4">
          <div className="text-right">
             <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">실시간 인원</p>
             <p className="text-lg sm:text-xl font-black text-emerald-400 leading-none mt-1.5">{totalPeople}<span className="text-xs sm:text-sm ml-1">명</span></p>
          </div>
          <div className="text-right">
             <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">승인 대기</p>
             <p className="text-lg sm:text-xl font-black text-yellow-500 leading-none mt-1.5">{pendingApprovals}<span className="text-xs sm:text-sm ml-1">건</span></p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className={`${viewMode === 'list' ? 'flex' : 'hidden sm:flex'} w-full sm:w-[320px] lg:w-[360px] border-r border-white/5 flex flex-col overflow-hidden bg-slate-900/30 shrink-0`}>
          <div className="p-4 border-b border-white/5 bg-slate-900/50">
            <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">전국 가동 현황</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2 touch-pan-y">
            {reports.map(site => (
              <div 
                key={site.id}
                onClick={() => handleSiteSelect(site)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${selectedSite?.id === site.id ? 'bg-slate-800 border-yellow-500 shadow-lg scale-[1.02]' : 'bg-slate-900/40 border-white/5'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${site.status === '종료승인대기' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                    <h3 className="text-sm font-black text-white italic truncate max-w-[150px]">{site.name}</h3>
                  </div>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${site.status === '종료승인대기' ? 'bg-orange-600 text-white' : 'bg-slate-950 text-slate-400'}`}>{site.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-2">
                   <p className="text-[9px] text-slate-500 truncate italic font-bold">인원: {site.metrics.people}명</p>
                   <p className="text-[9px] text-slate-500 truncate italic font-bold">장비: {site.metrics.equipment}대</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-red-950/20 border-t border-red-500/20">
             <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                   <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                   </span>
                   <h4 className="text-red-500 font-black text-[10px] uppercase tracking-widest italic">긴급 지시 송수신</h4>
                </div>
                <div className="flex bg-black/40 p-0.5 rounded-lg border border-red-900/20 shadow-inner">
                   <button onClick={() => setBroadcastTarget('all')} className={`px-2 py-1 rounded-md transition-all text-[9px] font-black ${broadcastTarget === 'all' ? 'bg-red-600 text-white' : 'text-slate-600'}`}>전체</button>
                   <button onClick={() => setBroadcastTarget('single')} className={`px-2 py-1 rounded-md transition-all text-[9px] font-black ${broadcastTarget === 'single' ? 'bg-red-600 text-white' : 'text-slate-600'}`}>개별</button>
                </div>
             </div>
             <textarea value={instructionText} onChange={(e) => setInstructionText(e.target.value)} placeholder={broadcastTarget === 'all' ? "전국 모든 현장 지시 입력..." : `[${selectedSite?.name || '현장'}] 지시 입력...`} className="w-full bg-black/50 border border-red-900/30 rounded-xl p-3 text-[11px] text-white min-h-[100px] focus:outline-none focus:border-red-500 transition-all placeholder:text-slate-700 mb-3" />
             <button disabled={isBroadcasting || !instructionText.trim()} onClick={handleBroadcast} className={`w-full h-11 bg-red-600 text-white rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all ${isBroadcasting ? 'opacity-50' : 'active:scale-95 hover:bg-red-500 border-b-4 border-red-800'}`}>
                {isBroadcasting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>📡 즉시 송출</>}
             </button>
          </div>
        </div>

        <div className={`${viewMode === 'detail' ? 'flex' : 'hidden sm:flex'} flex-1 flex-col overflow-hidden bg-slate-950`}>
          {selectedSite ? (
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10 sm:space-y-12 touch-pan-y">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/5 pb-8 gap-6 sm:gap-0">
                <div className="flex-1">
                  <p className="text-yellow-400 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2 italic">현장 정밀 관제 및 운용 지표</p>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight break-keep">{selectedSite.name}</h2>
                  <div className="flex gap-6 sm:gap-8 mt-5 text-sm sm:text-base font-black">
                     <p className="text-slate-500">책임자: <span className="text-slate-200">{selectedSite.manager}</span></p>
                     <p className="text-slate-500">현장코드: <span className="text-slate-200 font-mono tracking-widest">{selectedSite.code}</span></p>
                  </div>
                </div>
                {selectedSite.status === '종료승인대기' && (
                  <button onClick={() => openDoc('nas')} className="w-full sm:w-auto bg-orange-600 hover:bg-white hover:text-orange-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-2xl transition-all flex items-center justify-center gap-3 animate-bounce">
                    🚩 공사 종료 최종 승인 대기중
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
                <div className="bg-[#0f172a]/80 rounded-[40px] p-6 sm:p-10 border-2 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-8 sm:mb-10">
                    <span className="text-2xl">📊</span>
                    <h3 className="text-xl sm:text-2xl font-black italic text-white leading-none">공사 요약 (팀장 보고)</h3>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <div className="bg-black/60 p-6 sm:p-8 rounded-3xl border border-white/5">
                       <p className="text-[10px] text-slate-500 font-black uppercase mb-2 italic tracking-[0.2em]">총 공사 기간</p>
                       <p className="text-xl sm:text-2xl text-yellow-400 font-black font-mono italic">{selectedSite.details.workPlan.period}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                       <div className="bg-black/60 p-6 sm:p-8 rounded-3xl border border-white/5">
                          <p className="text-[10px] text-slate-500 font-black uppercase mb-3 italic tracking-[0.2em]">실시간 투입 인원</p>
                          <p className="text-[12px] sm:text-[13px] text-slate-200 font-black leading-relaxed">
                            {selectedSite.details.workPlan.workerCount}
                          </p>
                       </div>
                       <div className="bg-black/60 p-6 sm:p-8 rounded-3xl border border-white/5">
                          <p className="text-[10px] text-slate-500 font-black uppercase mb-3 italic tracking-[0.2em]">운용 장비 내역</p>
                          <p className="text-[12px] sm:text-[13px] text-blue-400 font-black italic leading-relaxed">
                            {selectedSite.details.workPlan.equipment}
                          </p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f172a]/80 rounded-[40px] p-6 sm:p-10 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8 sm:mb-10">
                    <span className="text-2xl">📝</span>
                    <h3 className="text-xl sm:text-2xl font-black italic text-white leading-none">안전 규정 이행 및 서류 열람</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10">
                    <button onClick={() => openDoc('tbm')} className="bg-[#111827] border border-white/5 p-4 sm:p-6 rounded-3xl text-center group active:scale-95 transition-all">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase mb-2 leading-none">TBM 일지</p>
                       <p className="text-emerald-400 text-base sm:text-lg font-black italic mb-2 sm:mb-3 leading-none">완료</p>
                       <span className="text-[8px] sm:text-[10px] bg-white/10 text-white font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full group-hover:bg-emerald-500 transition-all inline-block">열람하기</span>
                    </button>
                    <button onClick={() => openDoc('plan')} className="bg-[#111827] border border-white/5 p-4 sm:p-6 rounded-3xl text-center group active:scale-95 transition-all">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase mb-2 leading-none">작업계획서</p>
                       <p className="text-emerald-400 text-base sm:text-lg font-black italic mb-2 sm:mb-3 leading-none">승인</p>
                       <span className="text-[8px] sm:text-[10px] bg-white/10 text-white font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full group-hover:bg-emerald-500 transition-all inline-block">열람하기</span>
                    </button>
                    <button onClick={() => openDoc('permit')} className="bg-[#111827] border border-white/5 p-4 sm:p-6 rounded-3xl text-center group active:scale-95 transition-all">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase mb-2 leading-none">안전허가서</p>
                       <p className="text-emerald-400 text-base sm:text-lg font-black italic mb-2 sm:mb-3 leading-none">승인</p>
                       <span className="text-[8px] sm:text-[10px] bg-white/10 text-white font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full group-hover:bg-emerald-500 transition-all inline-block">열람하기</span>
                    </button>
                  </div>

                  <div className="bg-black/40 p-5 sm:p-6 rounded-[28px] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                       <p className="text-[9px] text-slate-600 font-black uppercase mb-1.5 italic">본사 서버 데이터 경로</p>
                       <code className="text-[10px] sm:text-[11px] text-blue-400 font-mono tracking-tight block overflow-hidden text-ellipsis whitespace-nowrap">{selectedSite.nasPath}</code>
                    </div>
                    <button onClick={() => alert(`${selectedSite.nasPath} 경로 탐색기를 실행합니다.`)} className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-xl sm:text-2xl hover:bg-slate-700 transition-all shadow-xl shrink-0">
                       📂
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-800 p-6 text-center">
               <p className="font-black italic text-xl">현장을 선택해 주십시오.</p>
            </div>
          )}
        </div>
      </main>

      {docViewer.isOpen && selectedSite && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/95 backdrop-blur-2xl">
           <div className="bg-white w-full max-w-4xl max-h-full rounded-[32px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-slate-900 p-6 sm:p-8 flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-4 sm:gap-5">
                    <span className="text-2xl sm:text-3xl">📄</span>
                    <div>
                       <h2 className="text-white font-black text-xl sm:text-2xl italic leading-none uppercase">
                          {docViewer.type === 'tbm' && 'TBM 일지 상세 열람'}
                          {docViewer.type === 'plan' && '작업계획서 상세 열람'}
                          {docViewer.type === 'permit' && '안전작업허가서 상세 열람'}
                          {docViewer.type === 'nas' && '현장 공사 종료 승인'}
                       </h2>
                       <p className="text-slate-500 text-[9px] sm:text-[11px] font-bold mt-2 uppercase tracking-widest">본사 통합 안전 관리 아카이브</p>
                    </div>
                 </div>
                 <button onClick={() => setDocViewer({ isOpen: false, type: null })} className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all shrink-0">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-12 text-slate-900 bg-slate-50">
                <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
                   <div className="border-b-4 border-slate-900 pb-4 sm:pb-6 flex justify-between items-end">
                      <h3 className="text-xl sm:text-3xl font-black italic uppercase">보고서 상세</h3>
                      <span className="text-xs sm:text-sm font-bold text-slate-500">서버 ID: {selectedSite.code}</span>
                   </div>
                   
                   <section className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] border shadow-sm space-y-6 sm:space-y-8">
                      {docViewer.type === 'plan' ? (
                        <div className="space-y-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">작업 명칭</p>
                                 <p className="text-base sm:text-lg font-bold">{selectedSite.details.workPlan.title}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">현장 책임자</p>
                                 <p className="text-base sm:text-lg font-bold">{selectedSite.details.workPlan.supervisor}</p>
                              </div>
                           </div>
                           <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">투입 인원 현황</p>
                                 <p className="text-sm font-bold text-slate-700 leading-relaxed">{selectedSite.details.workPlan.workerCount}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">투입 장비 현황</p>
                                 <p className="text-sm font-bold text-blue-600 italic leading-relaxed">{selectedSite.details.workPlan.equipment}</p>
                              </div>
                           </div>
                        </div>
                      ) : (
                        <p className="text-center py-16 sm:py-20 text-slate-400 font-bold">문서 상세 내용을 구성 중입니다...</p>
                      )}
                   </section>
                </div>
              </div>

              <div className="bg-slate-100 p-6 sm:p-8 border-t flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 shrink-0">
                 <button onClick={() => alert('PDF 다운로드 시작')} className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-white border border-slate-300 text-slate-900 rounded-2xl font-black text-sm sm:text-base hover:bg-slate-50 transition-all">다운로드</button>
                 <button onClick={() => alert('프린트 대기열 추가')} className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-2xl font-black text-sm sm:text-base hover:bg-slate-800 transition-all">인쇄하기</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default HQDashboard;
