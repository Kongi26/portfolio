import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, ArrowLeft, Plus, X } from 'lucide-react'

const IdentifyStakeholdersPage = () => {
  const navigate = useNavigate()
  const [stakeholders, setStakeholders] = useState([
    { id: 1, name: '', slackProfile: '', email: '' }
  ])

  const addStakeholder = () => {
    const newId = Math.max(...stakeholders.map(s => s.id)) + 1
    setStakeholders([...stakeholders, { id: newId, name: '', slackProfile: '', email: '' }])
  }

  const removeStakeholder = (id) => {
    if (stakeholders.length > 1) {
      setStakeholders(stakeholders.filter(s => s.id !== id))
    }
  }

  const updateStakeholder = (id, field, value) => {
    setStakeholders(stakeholders.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const handleNext = () => {
    const hasValidStakeholder = stakeholders.some(s => 
      s.name.trim() && (s.slackProfile.trim() || s.email.trim())
    )
    
    if (hasValidStakeholder) {
      navigate('/define-focus')
    }
  }

  const canProceed = stakeholders.some(s => 
    s.name.trim() && (s.slackProfile.trim() || s.email.trim())
  )

  // Mock Slack users for dropdown
  const mockSlackUsers = [
    'john.smith',
    'sarah.johnson', 
    'mike.chen',
    'emily.davis',
    'alex.rodriguez',
    'lisa.wang'
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-gray-50)', paddingTop: 'var(--spacing-8)', paddingBottom: 'var(--spacing-8)' }}>
      <div className="container">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center" style={{ marginBottom: 'var(--spacing-8)' }}>
            <Link 
              to="/connect-channels" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                color: 'var(--neutral-gray-600)', 
                textDecoration: 'none',
                marginBottom: 'var(--spacing-4)'
              }}
            >
              <ArrowLeft size={20} style={{ marginRight: 'var(--spacing-2)' }} />
              Back
            </Link>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 'var(--spacing-4)' 
            }}>
              <Activity 
                size={32} 
                style={{ 
                  color: 'var(--primary-blue)', 
                  marginRight: 'var(--spacing-2)' 
                }} 
              />
              <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>
                Stakeholder Pulse
              </h2>
            </div>
            
            <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Who are Your Key Stakeholders?</h1>
            <p style={{ color: 'var(--neutral-gray-600)', margin: 0, fontSize: 'var(--font-size-lg)' }}>
              Help us learn who to focus on. Add up to 10 key individuals and link their communication profiles.
            </p>
          </div>

          {/* Stakeholder Forms */}
          <div className="card" style={{ marginBottom: 'var(--spacing-8)' }}>
            <div className="card-body">
              {stakeholders.map((stakeholder, index) => (
                <div key={stakeholder.id} style={{ 
                  marginBottom: index === stakeholders.length - 1 ? 0 : 'var(--spacing-8)',
                  paddingBottom: index === stakeholders.length - 1 ? 0 : 'var(--spacing-8)',
                  borderBottom: index === stakeholders.length - 1 ? 'none' : '1px solid var(--neutral-gray-200)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-4)' 
                  }}>
                    <h3 style={{ margin: 0 }}>Stakeholder {index + 1}</h3>
                    {stakeholders.length > 1 && (
                      <button
                        onClick={() => removeStakeholder(stakeholder.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--neutral-gray-400)',
                          cursor: 'pointer',
                          padding: 'var(--spacing-1)'
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr',
                    gap: 'var(--spacing-4)' 
                  }}>
                    {/* Name field */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        Stakeholder Name *
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={stakeholder.name}
                        onChange={(e) => updateStakeholder(stakeholder.id, 'name', e.target.value)}
                        placeholder="e.g., John Smith"
                      />
                    </div>

                    {/* Slack Profile field */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        Link Slack Profile
                      </label>
                      <select
                        className="form-input"
                        value={stakeholder.slackProfile}
                        onChange={(e) => updateStakeholder(stakeholder.id, 'slackProfile', e.target.value)}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="">Select Slack user...</option>
                        {mockSlackUsers.map(user => (
                          <option key={user} value={user}>@{user}</option>
                        ))}
                      </select>
                    </div>

                    {/* Email field */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        value={stakeholder.email}
                        onChange={(e) => updateStakeholder(stakeholder.id, 'email', e.target.value)}
                        placeholder="john.smith@company.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Another Button */}
              {stakeholders.length < 10 && (
                <div style={{ marginTop: 'var(--spacing-6)' }}>
                  <button
                    onClick={addStakeholder}
                    className="btn btn-secondary"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Plus size={16} style={{ marginRight: 'var(--spacing-2)' }} />
                    Add Another Stakeholder
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Guidance */}
          <div style={{ 
            padding: 'var(--spacing-4)', 
            backgroundColor: 'var(--secondary-blue)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--neutral-gray-200)',
            marginBottom: 'var(--spacing-8)' 
          }}>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--neutral-gray-600)',
              margin: 0,
              textAlign: 'center' 
            }}>
              💡 <strong>Tip:</strong> Start with leads from Sales, Marketing, Engineering, and Customer Success.
            </p>
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button 
              className="btn btn-primary btn-large"
              onClick={handleNext}
              disabled={!canProceed}
            >
              Next: Define Product Focus
            </button>
            
            {!canProceed && (
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--neutral-gray-500)',
                marginTop: 'var(--spacing-2)',
                margin: 0 
              }}>
                Add at least one stakeholder with name and email/Slack profile to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdentifyStakeholdersPage