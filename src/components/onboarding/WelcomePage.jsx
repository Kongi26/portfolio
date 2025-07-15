import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Users, Zap, Shield } from 'lucide-react'

const WelcomePage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--neutral-gray-50)' }}>
      <div className="container">
        <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--spacing-12)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 'var(--spacing-6)' 
            }}>
              <Activity 
                size={48} 
                style={{ 
                  color: 'var(--primary-blue)', 
                  marginRight: 'var(--spacing-3)' 
                }} 
              />
              <h1 style={{ 
                fontSize: 'var(--font-size-3xl)', 
                fontWeight: '700',
                margin: 0 
              }}>
                Stakeholder Pulse
              </h1>
            </div>
            
            <h2 style={{ 
              fontSize: 'var(--font-size-2xl)', 
              fontWeight: '600',
              color: 'var(--neutral-gray-900)',
              marginBottom: 'var(--spacing-4)' 
            }}>
              Effortless Stakeholder Alignment: Your AI Co-pilot
            </h2>
            
            <h3 style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: '500',
              color: 'var(--primary-blue)',
              marginBottom: 'var(--spacing-6)' 
            }}>
              Stop Missing Critical Signals. Start Proactively Managing Stakeholder Relationships.
            </h3>
          </div>

          {/* Value Proposition */}
          <div style={{ marginBottom: 'var(--spacing-12)' }}>
            <p style={{ 
              fontSize: 'var(--font-size-lg)', 
              lineHeight: '1.6',
              color: 'var(--neutral-gray-600)',
              marginBottom: 'var(--spacing-8)' 
            }}>
              Stakeholder Pulse helps you anticipate concerns, foster alignment, and save hours of sifting through communication. Connect your channels, identify key stakeholders, and get personalized, actionable nudges daily.
            </p>

            {/* Feature highlights */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: 'var(--spacing-6)',
              marginBottom: 'var(--spacing-8)' 
            }}>
              <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-6)' }}>
                <Users size={32} style={{ color: 'var(--primary-blue)', marginBottom: 'var(--spacing-3)' }} />
                <h4 style={{ marginBottom: 'var(--spacing-2)' }}>Connect Channels</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                  Integrate Slack, Gmail, and Discord to monitor all communications
                </p>
              </div>
              
              <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-6)' }}>
                <Zap size={32} style={{ color: 'var(--primary-blue)', marginBottom: 'var(--spacing-3)' }} />
                <h4 style={{ marginBottom: 'var(--spacing-2)' }}>AI Insights</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                  Get sentiment analysis and proactive nudges for key stakeholders
                </p>
              </div>
              
              <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-6)' }}>
                <Shield size={32} style={{ color: 'var(--primary-blue)', marginBottom: 'var(--spacing-3)' }} />
                <h4 style={{ marginBottom: 'var(--spacing-2)' }}>Secure & Private</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                  Your data is secure and never shared with third parties
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ marginBottom: 'var(--spacing-8)' }}>
            <Link 
              to="/signup" 
              className="btn btn-primary btn-large"
              style={{ marginBottom: 'var(--spacing-4)' }}
            >
              Get Started - It's Free
            </Link>
            
            <div style={{ marginTop: 'var(--spacing-4)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--neutral-gray-500)',
                margin: 0
              }}>
                Trusted by PMs at leading tech companies
              </p>
            </div>
          </div>

          {/* Privacy reassurance */}
          <div style={{ 
            padding: 'var(--spacing-4)', 
            backgroundColor: 'var(--secondary-blue)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--neutral-gray-200)' 
          }}>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--neutral-gray-600)',
              margin: 0 
            }}>
              🔒 Your data is secure and private. We only analyze product-related discussions to provide insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage