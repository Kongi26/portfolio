import React from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { Activity, Home, Users, Settings, Bell } from 'lucide-react'
import NudgesView from './NudgesView'
import StakeholdersView from './StakeholdersView'
import SettingsView from './SettingsView'

const Dashboard = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.includes(path)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--neutral-gray-50)' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px',
        backgroundColor: 'white',
        borderRight: '1px solid var(--neutral-gray-200)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ 
          padding: 'var(--spacing-6)',
          borderBottom: '1px solid var(--neutral-gray-200)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>
            <Activity 
              size={32} 
              style={{ 
                color: 'var(--primary-blue)', 
                marginRight: 'var(--spacing-2)' 
              }} 
            />
            <h2 style={{ 
              margin: 0, 
              fontSize: 'var(--font-size-xl)',
              fontWeight: '700'
            }}>
              Stakeholder Pulse
            </h2>
          </div>
          <p style={{ 
            fontSize: 'var(--font-size-sm)',
            color: 'var(--neutral-gray-600)',
            margin: 0
          }}>
            Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: 'var(--spacing-4)' }}>
          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <Link
              to="/dashboard/nudges"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive('nudges') ? 'var(--primary-blue)' : 'var(--neutral-gray-700)',
                backgroundColor: isActive('nudges') ? 'var(--secondary-blue)' : 'transparent',
                fontWeight: isActive('nudges') ? '600' : '500',
                marginBottom: 'var(--spacing-2)'
              }}
            >
              <Bell size={20} style={{ marginRight: 'var(--spacing-3)' }} />
              Nudges
              {isActive('nudges') && (
                <span style={{
                  marginLeft: 'auto',
                  backgroundColor: 'var(--error-red)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: 'var(--font-size-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  3
                </span>
              )}
            </Link>

            <Link
              to="/dashboard/stakeholders"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive('stakeholders') ? 'var(--primary-blue)' : 'var(--neutral-gray-700)',
                backgroundColor: isActive('stakeholders') ? 'var(--secondary-blue)' : 'transparent',
                fontWeight: isActive('stakeholders') ? '600' : '500',
                marginBottom: 'var(--spacing-2)'
              }}
            >
              <Users size={20} style={{ marginRight: 'var(--spacing-3)' }} />
              Stakeholders
            </Link>

            <Link
              to="/dashboard/settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-3)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive('settings') ? 'var(--primary-blue)' : 'var(--neutral-gray-700)',
                backgroundColor: isActive('settings') ? 'var(--secondary-blue)' : 'transparent',
                fontWeight: isActive('settings') ? '600' : '500'
              }}
            >
              <Settings size={20} style={{ marginRight: 'var(--spacing-3)' }} />
              Settings
            </Link>
          </div>
        </nav>

        {/* User Info */}
        <div style={{ 
          padding: 'var(--spacing-4)',
          borderTop: '1px solid var(--neutral-gray-200)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 'var(--spacing-3)',
              color: 'white',
              fontWeight: '600'
            }}>
              O
            </div>
            <div>
              <div style={{ 
                fontWeight: '600',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--neutral-gray-900)'
              }}>
                Olivia Chen
              </div>
              <div style={{ 
                fontSize: 'var(--font-size-xs)',
                color: 'var(--neutral-gray-500)'
              }}>
                Product Manager
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/nudges" replace />} />
          <Route path="/nudges" element={<NudgesView />} />
          <Route path="/stakeholders" element={<StakeholdersView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard