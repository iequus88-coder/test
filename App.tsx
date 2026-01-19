
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import FieldDashboard from './pages/FieldDashboard';
import HQDashboard from './pages/HQDashboard';
import TBMCheckPage from './pages/TBMCheckPage';
import WorkPlanPage from './pages/WorkPlanPage';
import SafetyPermitPage from './pages/SafetyPermitPage';
import PersonnelEquipmentPage from './pages/PersonnelEquipmentPage';
import SafetyAIChat from './pages/SafetyAIChat';
import DutyModal from './components/DutyModal';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDutyModal, setShowDutyModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/role-selection');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDutyModal = () => setShowDutyModal(!showDutyModal);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/role-selection" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/role-selection" 
          element={
            isLoggedIn ? (
              <RoleSelectionPage onBack={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/field-dashboard" 
          element={
            isLoggedIn ? (
              <FieldDashboard 
                onBack={() => navigate('/role-selection')} 
                onShowDuty={toggleDutyModal} 
              />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/safety-ai" 
          element={
            isLoggedIn ? (
              <SafetyAIChat onBack={() => navigate('/field-dashboard')} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/tbm-check" 
          element={
            isLoggedIn ? (
              <TBMCheckPage onBack={() => navigate('/field-dashboard')} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/work-plan" 
          element={
            isLoggedIn ? (
              <WorkPlanPage onBack={() => navigate('/field-dashboard')} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/safety-permit" 
          element={
            isLoggedIn ? (
              <SafetyPermitPage onBack={() => navigate('/field-dashboard')} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/personnel-equipment" 
          element={
            isLoggedIn ? (
              <PersonnelEquipmentPage onBack={() => navigate('/field-dashboard')} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/hq-dashboard" 
          element={
            isLoggedIn ? (
              <HQDashboard 
                onBack={() => navigate('/role-selection')} 
              />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Duty Modal */}
      {showDutyModal && <DutyModal onClose={() => setShowDutyModal(false)} />}
    </div>
  );
};

export default App;
