import React, { useState } from 'react'
import { Plus, Mail, MessageSquare, TrendingUp, TrendingDown, Minus, Eye } from 'lucide-react'

const StakeholdersView = () => {
  const [stakeholders] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Sales Lead',
      email: 'john.smith@company.com',
      slackProfile: '@john.smith',
      avatar: 'J',
      lastInteraction: '2 hours ago',
      lastInteractionType: 'Slack',
      sentiment: 'negative', // 'positive', 'neutral', 'negative'
      sentimentLast7Days: 'slightly_negative',
      keyTopics: ['Feature X', 'Customer Feedback', 'Competitive Analysis'],
      recentActivity: [
        {
          type: 'slack',
          content: 'Customers are really pushing back on X...',
          timestamp: '2 hours ago',
          sentiment: 'negative'
        },
        {
          type: 'email',
          content: 'Can we schedule a quick sync on the roadmap?',
          timestamp: '1 day ago',
          sentiment: 'neutral'
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Engineering Lead',
      email: 'sarah.johnson@company.com',
      slackProfile: '@sarah.johnson',
      avatar: 'S',
      lastInteraction: '4 hours ago',
      lastInteractionType: 'Email',
      sentiment: 'neutral',
      sentimentLast7Days: 'neutral',
      keyTopics: ['Pricing Model Z', 'Resourcing', 'Technical Architecture'],
      recentActivity: [
        {
          type: 'email',
          content: 'What\'s the latest on Z? Are we still targeting Q4?',
          timestamp: '4 hours ago',
          sentiment: 'neutral'
        },
        {
          type: 'slack',
          content: 'Good progress on the backend infrastructure',
          timestamp: '2 days ago',
          sentiment: 'positive'
        }
      ]
    },
    {
      id: 3,
      name: 'Marketing Team',
      role: 'Marketing Department',
      email: 'marketing@company.com',
      slackProfile: '#marketing-updates',
      avatar: 'M',
      lastInteraction: 'yesterday',
      lastInteractionType: 'Slack',
      sentiment: 'positive',
      sentimentLast7Days: 'positive',
      keyTopics: ['Product Y Launch', 'Campaign Materials', 'Go-to-Market'],
      recentActivity: [
        {
          type: 'slack',
          content: 'Great energy around Product Y! Ready to prep for launch.',
          timestamp: 'yesterday',
          sentiment: 'positive'
        },
        {
          type: 'slack',
          content: 'The new messaging is really resonating with customers',
          timestamp: '2 days ago',
          sentiment: 'positive'
        }
      ]
    }
  ])

  const [selectedStakeholder, setSelectedStakeholder] = useState(null)

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp size={16} style={{ color: 'var(--success-green)' }} />
      case 'negative':
        return <TrendingDown size={16} style={{ color: 'var(--error-red)' }} />
      case 'slightly_negative':
        return <Minus size={16} style={{ color: 'var(--warning-orange)' }} />
      default:
        return <Minus size={16} style={{ color: 'var(--neutral-gray-500)' }} />
    }
  }

  const getSentimentText = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'Positive'
      case 'negative':
        return 'Negative'
      case 'slightly_negative':
        return 'Slightly Negative'
      default:
        return 'Neutral'
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'var(--success-green)'
      case 'negative':
        return 'var(--error-red)'
      case 'slightly_negative':
        return 'var(--warning-orange)'
      default:
        return 'var(--neutral-gray-500)'
    }
  }

  return (
    <div style={{ padding: 'var(--spacing-6)' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 'var(--spacing-6)' 
      }}>
        <div>
          <h1 style={{ marginBottom: 'var(--spacing-2)' }}>My Key Stakeholders</h1>
          <p style={{ color: 'var(--neutral-gray-600)', margin: 0 }}>
            Monitor sentiment and communication patterns across your team
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} style={{ marginRight: 'var(--spacing-2)' }} />
          Add New Stakeholder
        </button>
      </div>

      {/* Stakeholders Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-8)' 
      }}>
        {stakeholders.map((stakeholder) => (
          <div key={stakeholder.id} className="card">
            <div className="card-body">
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: 'var(--spacing-4)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 'var(--spacing-3)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 'var(--font-size-lg)'
                }}>
                  {stakeholder.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>
                    {stakeholder.name}
                  </h3>
                  <p style={{ 
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-600)'
                  }}>
                    {stakeholder.role}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: 'var(--spacing-2)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-gray-600)'
                }}>
                  <Mail size={14} style={{ marginRight: 'var(--spacing-2)' }} />
                  {stakeholder.email}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-gray-600)'
                }}>
                  <MessageSquare size={14} style={{ marginRight: 'var(--spacing-2)' }} />
                  {stakeholder.slackProfile}
                </div>
              </div>

              {/* Last Interaction */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <p style={{ 
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-gray-700)',
                  margin: 0,
                  marginBottom: 'var(--spacing-1)'
                }}>
                  <strong>Last Interaction:</strong> {stakeholder.lastInteraction}
                </p>
                <p style={{ 
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--neutral-gray-500)',
                  margin: 0
                }}>
                  via {stakeholder.lastInteractionType}
                </p>
              </div>

              {/* Sentiment */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: 'var(--spacing-2)'
                }}>
                  <span style={{ 
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                    color: 'var(--neutral-gray-700)'
                  }}>
                    Overall Sentiment (Last 7 Days):
                  </span>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: getSentimentColor(stakeholder.sentimentLast7Days)
                  }}>
                    {getSentimentIcon(stakeholder.sentimentLast7Days)}
                    <span style={{ 
                      marginLeft: 'var(--spacing-1)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '600'
                    }}>
                      {getSentimentText(stakeholder.sentimentLast7Days)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Topics */}
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <p style={{ 
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-gray-700)',
                  marginBottom: 'var(--spacing-2)'
                }}>
                  Key Topics:
                </p>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 'var(--spacing-1)' 
                }}>
                  {stakeholder.keyTopics.map((topic, index) => (
                    <span
                      key={index}
                      style={{
                        padding: 'var(--spacing-1) var(--spacing-2)',
                        backgroundColor: 'var(--neutral-gray-100)',
                        color: 'var(--neutral-gray-700)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: '500'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Profile Button */}
              <div>
                <button 
                  onClick={() => setSelectedStakeholder(stakeholder)}
                  className="btn btn-secondary btn-small"
                  style={{ width: '100%' }}
                >
                  <Eye size={14} style={{ marginRight: 'var(--spacing-2)' }} />
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stakeholder Profile Modal */}
      {selectedStakeholder && (
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
          <div className="card" style={{ width: '700px', margin: 'var(--spacing-4)', maxHeight: '80vh', overflow: 'auto' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  {selectedStakeholder.avatar}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedStakeholder.name}</h3>
                  <p style={{ margin: 0, color: 'var(--neutral-gray-600)' }}>
                    {selectedStakeholder.role}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/* Recent Activity */}
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Recent Activity</h4>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  {selectedStakeholder.recentActivity.map((activity, index) => (
                    <div 
                      key={index}
                      style={{
                        padding: 'var(--spacing-3)',
                        backgroundColor: 'var(--neutral-gray-50)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: `3px solid ${getSentimentColor(activity.sentiment)}`
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-2)'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center'
                        }}>
                          {activity.type === 'slack' ? (
                            <MessageSquare size={14} style={{ marginRight: 'var(--spacing-2)' }} />
                          ) : (
                            <Mail size={14} style={{ marginRight: 'var(--spacing-2)' }} />
                          )}
                          <span style={{ 
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '600',
                            textTransform: 'capitalize'
                          }}>
                            {activity.type}
                          </span>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: getSentimentColor(activity.sentiment)
                        }}>
                          {getSentimentIcon(activity.sentiment)}
                          <span style={{ 
                            marginLeft: 'var(--spacing-1)',
                            fontSize: 'var(--font-size-xs)'
                          }}>
                            {getSentimentText(activity.sentiment)}
                          </span>
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--neutral-gray-700)',
                        margin: 0,
                        marginBottom: 'var(--spacing-1)'
                      }}>
                        "{activity.content}"
                      </p>
                      <p style={{ 
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--neutral-gray-500)',
                        margin: 0
                      }}>
                        {activity.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedStakeholder(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StakeholdersView