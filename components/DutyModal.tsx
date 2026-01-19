
import React from 'react';

interface DutyModalProps {
  onClose: () => void;
}

const DutyModal: React.FC<DutyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-red-600 text-white p-6">
          <h2 className="text-2xl font-black text-center">관리감독자 의무 안내</h2>
          <p className="text-center text-sm mt-1 font-bold opacity-90">(산업안전보건법 제16조)</p>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-slate-100 p-4 rounded-xl border-l-4 border-red-500">
            <p className="font-bold text-lg mb-2 text-red-600">1. 기계·기구 등의 점검</p>
            <p className="text-slate-700 leading-relaxed">작업과 관련된 기계·기구 또는 설비의 안전·보건 점검 및 이상 유무 확인</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-xl border-l-4 border-red-500">
            <p className="font-bold text-lg mb-2 text-red-600">2. 보호구 착용 지도</p>
            <p className="text-slate-700 leading-relaxed">근로자의 보호구 구입 시 적격품 선정 및 보호구 착용 상태 확인·지도</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-xl border-l-4 border-red-500">
            <p className="font-bold text-lg mb-2 text-red-600">3. 사고 보고 및 응급조치</p>
            <p className="text-slate-700 leading-relaxed">산업재해에 관한 보고 및 이에 대한 응급조치</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-xl border-l-4 border-red-500">
            <p className="font-bold text-lg mb-2 text-red-600">4. 작업장 정리정돈</p>
            <p className="text-slate-700 leading-relaxed">작업장의 정리·정돈 및 통로 확보에 대한 확인·감독</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t">
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-5 rounded-xl text-xl font-bold active:bg-black transition-colors"
          >
            내용 확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DutyModal;
