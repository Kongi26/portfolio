import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './components/onboarding/WelcomePage'
import SignUpPage from './components/onboarding/SignUpPage'
import ConnectChannelsPage from './components/onboarding/ConnectChannelsPage'
import IdentifyStakeholdersPage from './components/onboarding/IdentifyStakeholdersPage'
import DefineProductFocusPage from './components/onboarding/DefineProductFocusPage'
import ProcessingPage from './components/onboarding/ProcessingPage'
import Dashboard from './components/dashboard/Dashboard'
import EmailMockup from './components/EmailMockup'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Onboarding Flow */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/connect-channels" element={<ConnectChannelsPage />} />
        <Route path="/identify-stakeholders" element={<IdentifyStakeholdersPage />} />
        <Route path="/define-focus" element={<DefineProductFocusPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        
        {/* Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        
        {/* Email Mockup */}
        <Route path="/email-mockup" element={<EmailMockup />} />
      </Routes>
    </div>
  )
}

export default App