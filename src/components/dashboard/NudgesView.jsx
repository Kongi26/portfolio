import React, { useState } from 'react'
import { CheckCircle, X, MessageCircle, AlertTriangle, TrendingUp, Clock } from 'lucide-react'

const NudgesView = () => {
  const [nudges, setNudges] = useState([
    {
      id: 1,
      type: 'concern',
      stakeholder: 'John (Sales Lead)',
      title: 'Feature X Concern',
      context: 'Negative sentiment detected in Slack regarding \'Feature X\'.',
      snippet: 'Customers are really pushing back on X, it\'s missing Y for competitive parity.',
      source: '#sales-feedback, 2 hours ago',
      action: 'Follow up with John on Feature X and discuss workaround for Y.',
      status: 'active', // 'active', 'actioned', 'dismissed'
      priority: 'high',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'inquiry',
      stakeholder: 'Sarah (Eng Lead)',
      title: 'Pricing Model Z Inquiry',
      context: 'High inquiry about \'Pricing Model Z\' timeline in Gmail.',
      snippet: 'What\'s the latest on Z? Are we still targeting Q4? Need clarity for resourcing.',
      source: 'Email, 4 hours ago',
      action: 'Send a quick async update to Sarah regarding Pricing Model Z timeline.',
      status: 'active',
      priority: 'medium',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'positive',
      stakeholder: 'Marketing Team',
      title: 'Product Y Launch Excitement',
      context: 'Overall positive buzz in Slack regarding \'Product Y Launch\'.',
      snippet: 'Great energy around Product Y! Ready to prep for launch.',
      source: '#marketing-updates, yesterday',
      action: 'Ensure Marketing has latest comms materials for Product Y.',
      status: 'active',
      priority: 'low',
      timestamp: 'yesterday'
    }
  ])

  const [noteModal, setNoteModal] = useState({ show: false, nudgeId: null, note: '' })

  const updateNudgeStatus = (id, status) => {
    setNudges(nudges.map(nudge => 
      nudge.id === id ? { ...nudge, status } : nudge
    ))
  }

  const openNoteModal = (nudgeId) => {
    setNoteModal({ show: true, nudgeId, note: '' })
  }

  const saveNote = () => {
    // In a real app, this would save to backend
    setNoteModal({ show: false, nudgeId: null, note: '' })
    // For demo, we'll just mark as actioned
    updateNudgeStatus(noteModal.nudgeId, 'actioned')
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'concern':
        return <AlertTriangle size={20} style={{ color: 'var(--error-red)' }} />
      case 'inquiry':
        return <Clock size={20} style={{ color: 'var(--warning-orange)' }} />
      case 'positive':
        return <TrendingUp size={20} style={{ color: 'var(--success-green)' }} />
      default:
        return <MessageCircle size={20} style={{ color: 'var(--neutral-gray-500)' }} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'var(--error-red)'
      case 'medium':
        return 'var(--warning-orange)'
      case 'low':
        return 'var(--success-green)'
      default:
        return 'var(--neutral-gray-500)'
    }
  }

  const activeNudges = nudges.filter(nudge => nudge.status === 'active')
  const actionedNudges = nudges.filter(nudge => nudge.status === 'actioned')

  return (
    <div style={{ padding: 'var(--spacing-6)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Proactive Nudges</h1>
        <p style={{ color: 'var(--neutral-gray-600)', margin: 0 }}>
          AI-powered insights to help you stay aligned with your stakeholders
        </p>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-8)' 
      }}>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 'var(--font-size-3xl)', 
              fontWeight: '700',
              color: 'var(--primary-blue)',
              marginBottom: 'var(--spacing-2)'
            }}>
              {activeNudges.length}
            </div>
            <div style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--neutral-gray-600)'
            }}>
              Active Nudges
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 'var(--font-size-3xl)', 
              fontWeight: '700',
              color: 'var(--success-green)',
              marginBottom: 'var(--spacing-2)'
            }}>
              {actionedNudges.length}
            </div>
            <div style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--neutral-gray-600)'
            }}>
              Actioned Today
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 'var(--font-size-3xl)', 
              fontWeight: '700',
              color: 'var(--neutral-gray-600)',
              marginBottom: 'var(--spacing-2)'
            }}>
              6
            </div>
            <div style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--neutral-gray-600)'
            }}>
              Stakeholders Monitored
            </div>
          </div>
        </div>
      </div>

      {/* Active Nudges */}
      {activeNudges.length > 0 ? (
        <div style={{ marginBottom: 'var(--spacing-8)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-4)' }}>Active Nudges</h2>
          <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            {activeNudges.map((nudge) => (
              <div key={nudge.id} className="card">
                <div className="card-body">
                  {/* Header */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {getTypeIcon(nudge.type)}
                      <div style={{ marginLeft: 'var(--spacing-3)' }}>
                        <h3 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>
                          {nudge.title}
                        </h3>
                        <div style={{ 
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--neutral-gray-600)',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontWeight: '600' }}>{nudge.stakeholder}</span>
                          <span style={{ margin: '0 var(--spacing-2)' }}>•</span>
                          <span>{nudge.timestamp}</span>
                          <span style={{ 
                            marginLeft: 'var(--spacing-3)',
                            padding: 'var(--spacing-1) var(--spacing-2)',
                            backgroundColor: getPriorityColor(nudge.priority),
                            color: 'white',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--font-size-xs)',
                            textTransform: 'uppercase',
                            fontWeight: '600'
                          }}>
                            {nudge.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <p style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--neutral-gray-700)',
                      marginBottom: 'var(--spacing-3)'
                    }}>
                      <strong>Context:</strong> {nudge.context}
                    </p>
                    
                    <div style={{ 
                      padding: 'var(--spacing-3)',
                      backgroundColor: 'var(--neutral-gray-50)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: '3px solid var(--primary-blue)',
                      marginBottom: 'var(--spacing-3)'
                    }}>
                      <p style={{ 
                        fontSize: 'var(--font-size-sm)',
                        fontStyle: 'italic',
                        color: 'var(--neutral-gray-600)',
                        margin: 0,
                        marginBottom: 'var(--spacing-2)'
                      }}>
                        "{nudge.snippet}"
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--neutral-gray-500)',
                        margin: 0
                      }}>
                        Source: {nudge.source}
                      </p>
                    </div>

                    <p style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--neutral-gray-700)',
                      margin: 0
                    }}>
                      <strong>Recommended Action:</strong> {nudge.action}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    gap: 'var(--spacing-2)',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => updateNudgeStatus(nudge.id, 'actioned')}
                      className="btn btn-success btn-small"
                    >
                      <CheckCircle size={14} style={{ marginRight: 'var(--spacing-1)' }} />
                      Mark as Actioned
                    </button>
                    
                    <button
                      onClick={() => updateNudgeStatus(nudge.id, 'dismissed')}
                      className="btn btn-secondary btn-small"
                    >
                      <X size={14} style={{ marginRight: 'var(--spacing-1)' }} />
                      Dismiss
                    </button>
                    
                    <button
                      onClick={() => openNoteModal(nudge.id)}
                      className="btn btn-secondary btn-small"
                    >
                      <MessageCircle size={14} style={{ marginRight: 'var(--spacing-1)' }} />
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 'var(--spacing-8)' }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
              <CheckCircle size={48} style={{ 
                color: 'var(--success-green)',
                marginBottom: 'var(--spacing-4)'
              }} />
              <h3 style={{ marginBottom: 'var(--spacing-2)' }}>All Clear!</h3>
              <p style={{ 
                color: 'var(--neutral-gray-600)',
                margin: 0
              }}>
                No new high-priority nudges today. Keep an eye on your inbox for your next daily pulse.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {noteModal.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '500px', margin: 'var(--spacing-4)' }}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Add Note</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">
                  Note about this nudge:
                </label>
                <textarea
                  className="form-input"
                  rows="4"
                  value={noteModal.note}
                  onChange={(e) => setNoteModal({ ...noteModal, note: e.target.value })}
                  placeholder="Add your notes about how you handled this nudge..."
                />
              </div>
            </div>
            <div className="card-footer">
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setNoteModal({ show: false, nudgeId: null, note: '' })}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="btn btn-primary"
                >
                  Save & Mark Actioned
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NudgesView