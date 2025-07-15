import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react'

const EmailMockup = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-gray-50)', paddingTop: 'var(--spacing-8)', paddingBottom: 'var(--spacing-8)' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <Link 
              to="/processing" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                color: 'var(--neutral-gray-600)', 
                textDecoration: 'none',
                marginBottom: 'var(--spacing-4)'
              }}
            >
              <ArrowLeft size={20} style={{ marginRight: 'var(--spacing-2)' }} />
              Back to Setup
            </Link>
            
            <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Daily Stakeholder Pulse - Email Preview</h1>
            <p style={{ color: 'var(--neutral-gray-600)', margin: 0 }}>
              This is what your daily digest email will look like.
            </p>
          </div>

          {/* Email Mockup */}
          <div className="card" style={{ 
            backgroundColor: 'white', 
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden'
          }}>
            {/* Email Header */}
            <div style={{ 
              backgroundColor: 'var(--neutral-gray-100)', 
              padding: 'var(--spacing-4)',
              borderBottom: '1px solid var(--neutral-gray-200)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--neutral-gray-600)'
              }}>
                <div>
                  <strong>From:</strong> Stakeholder Pulse &lt;noreply@stakeholderpulse.com&gt;
                </div>
                <div>
                  Tuesday, July 15, 2025 - 8:30 AM
                </div>
              </div>
              <div style={{ 
                marginTop: 'var(--spacing-2)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: '600',
                color: 'var(--neutral-gray-900)'
              }}>
                Your Stakeholder Pulse - Tuesday, July 15, 2025
              </div>
            </div>

            {/* Email Body */}
            <div style={{ padding: 'var(--spacing-6)' }}>
              {/* Greeting */}
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <p style={{ 
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--neutral-gray-700)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  Hi Olivia,
                </p>
                <p style={{ 
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--neutral-gray-700)',
                  margin: 0
                }}>
                  Here's your daily Stakeholder Pulse from your connected Slack and Google Mail accounts:
                </p>
              </div>

              {/* Recent Sentiment Shifts */}
              <div style={{ marginBottom: 'var(--spacing-8)' }}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  color: 'var(--neutral-gray-900)',
                  marginBottom: 'var(--spacing-4)',
                  borderBottom: '2px solid var(--primary-blue)',
                  paddingBottom: 'var(--spacing-2)'
                }}>
                  📊 Recent Sentiment Shifts
                </h3>

                {/* Sentiment Item 1 */}
                <div style={{ 
                  marginBottom: 'var(--spacing-4)',
                  padding: 'var(--spacing-4)',
                  backgroundColor: '#fef2f2',
                  borderLeft: '4px solid var(--error-red)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <AlertTriangle size={16} style={{ color: 'var(--error-red)', marginRight: 'var(--spacing-2)' }} />
                    <strong style={{ color: 'var(--neutral-gray-900)' }}>
                      John (Sales Lead): Sentiment on 'Feature X' shifted to Negative in Slack (2 mentions)
                    </strong>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-600)',
                    fontStyle: 'italic',
                    margin: 0,
                    paddingLeft: 'var(--spacing-6)'
                  }}>
                    "Customers are really pushing back on X, it's missing Y for competitive parity."
                  </p>
                </div>

                {/* Sentiment Item 2 */}
                <div style={{ 
                  marginBottom: 'var(--spacing-4)',
                  padding: 'var(--spacing-4)',
                  backgroundColor: '#fef9e7',
                  borderLeft: '4px solid var(--warning-orange)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <AlertTriangle size={16} style={{ color: 'var(--warning-orange)', marginRight: 'var(--spacing-2)' }} />
                    <strong style={{ color: 'var(--neutral-gray-900)' }}>
                      Sarah (Eng Lead): High Inquiry on 'Pricing Model Z' in Gmail (1 email)
                    </strong>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-600)',
                    fontStyle: 'italic',
                    margin: 0,
                    paddingLeft: 'var(--spacing-6)'
                  }}>
                    "What's the latest on Z? Are we still targeting Q4? Need clarity for resourcing."
                  </p>
                </div>

                {/* Sentiment Item 3 */}
                <div style={{ 
                  marginBottom: 0,
                  padding: 'var(--spacing-4)',
                  backgroundColor: '#f0fdf4',
                  borderLeft: '4px solid var(--success-green)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    <TrendingUp size={16} style={{ color: 'var(--success-green)', marginRight: 'var(--spacing-2)' }} />
                    <strong style={{ color: 'var(--neutral-gray-900)' }}>
                      Marketing Team (Overall): Overall Positive buzz around 'Product Y Launch' in Slack (#marketing-updates)
                    </strong>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-600)',
                    fontStyle: 'italic',
                    margin: 0,
                    paddingLeft: 'var(--spacing-6)'
                  }}>
                    Great energy around Product Y! Ready to prep for launch.
                  </p>
                </div>
              </div>

              {/* Proactive Nudges */}
              <div style={{ marginBottom: 'var(--spacing-8)' }}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  color: 'var(--neutral-gray-900)',
                  marginBottom: 'var(--spacing-4)',
                  borderBottom: '2px solid var(--primary-blue)',
                  paddingBottom: 'var(--spacing-2)'
                }}>
                  🎯 Proactive Nudges & Recommended Actions
                </h3>

                {/* Nudge 1 */}
                <div style={{ 
                  marginBottom: 'var(--spacing-4)',
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'var(--secondary-blue)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-gray-200)'
                }}>
                  <div style={{ marginBottom: 'var(--spacing-2)' }}>
                    <strong style={{ color: 'var(--error-red)' }}>Action Recommended:</strong>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-700)',
                    margin: 0
                  }}>
                    Follow up with John regarding Feature X. Consider providing an update on the workaround for Y. 
                    <em style={{ color: 'var(--neutral-gray-500)' }}> (Slack DM / Quick Call)</em>
                  </p>
                </div>

                {/* Nudge 2 */}
                <div style={{ 
                  marginBottom: 'var(--spacing-4)',
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'var(--secondary-blue)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-gray-200)'
                }}>
                  <div style={{ marginBottom: 'var(--spacing-2)' }}>
                    <strong style={{ color: 'var(--warning-orange)' }}>Check In:</strong>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-700)',
                    margin: 0
                  }}>
                    Sarah seems to need clarity on Pricing Model Z timeline. A quick async update might help. 
                    <em style={{ color: 'var(--neutral-gray-500)' }}> (Email / Slack DM)</em>
                  </p>
                </div>

                {/* Nudge 3 */}
                <div style={{ 
                  marginBottom: 0,
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'var(--secondary-blue)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-gray-200)'
                }}>
                  <div style={{ marginBottom: 'var(--spacing-2)' }}>
                    <strong style={{ color: 'var(--success-green)' }}>FYI:</strong>
                  </div>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-gray-700)',
                    margin: 0
                  }}>
                    Marketing's energy on Product Y is high. Ensure they have latest comms materials available.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div style={{ 
                textAlign: 'center',
                marginBottom: 'var(--spacing-6)',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--neutral-gray-50)',
                borderRadius: 'var(--radius-md)'
              }}>
                <Link 
                  to="/dashboard" 
                  className="btn btn-primary btn-large"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                >
                  View Full Dashboard
                  <ExternalLink size={16} style={{ marginLeft: 'var(--spacing-2)' }} />
                </Link>
              </div>

              {/* Footer */}
              <div style={{ 
                fontSize: 'var(--font-size-xs)',
                color: 'var(--neutral-gray-500)',
                textAlign: 'center',
                borderTop: '1px solid var(--neutral-gray-200)',
                paddingTop: 'var(--spacing-4)'
              }}>
                <p style={{ margin: 0, marginBottom: 'var(--spacing-2)' }}>
                  <a href="#" style={{ color: 'var(--neutral-gray-500)' }}>Unsubscribe</a> | 
                  <a href="#" style={{ color: 'var(--neutral-gray-500)' }}> Manage Preferences</a> | 
                  <a href="#" style={{ color: 'var(--neutral-gray-500)' }}> Need Help?</a>
                </p>
                <p style={{ margin: 0 }}>
                  Stakeholder Pulse - Helping PMs stay connected with their teams
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: 'var(--spacing-6)' 
          }}>
            <Link 
              to="/dashboard" 
              className="btn btn-secondary"
              style={{ marginRight: 'var(--spacing-3)' }}
            >
              Skip to Dashboard
            </Link>
            <Link 
              to="/processing" 
              className="btn btn-primary"
            >
              Back to Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailMockup