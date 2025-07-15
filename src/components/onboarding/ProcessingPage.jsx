import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, CheckCircle, Loader } from 'lucide-react'

const ProcessingPage = () => {
  const [processingComplete, setProcessingComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const processingSteps = [
    'Analyzing connected channels...',
    'Identifying stakeholder conversations...',
    'Building sentiment analysis models...',
    'Preparing your first insights...'
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepInterval)
          setTimeout(() => setProcessingComplete(true), 1000)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(stepInterval)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--neutral-gray-50)' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
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
            
            {!processingComplete ? (
              <h2 style={{ 
                fontSize: 'var(--font-size-2xl)', 
                fontWeight: '600',
                color: 'var(--neutral-gray-900)',
                marginBottom: 'var(--spacing-4)' 
              }}>
                Almost There, Olivia!
              </h2>
            ) : (
              <h2 style={{ 
                fontSize: 'var(--font-size-2xl)', 
                fontWeight: '600',
                color: 'var(--success-green)',
                marginBottom: 'var(--spacing-4)' 
              }}>
                Setup Complete! 🎉
              </h2>
            )}
          </div>

          {/* Processing Animation */}
          <div className="card" style={{ marginBottom: 'var(--spacing-8)' }}>
            <div className="card-body" style={{ padding: 'var(--spacing-8)' }}>
              {!processingComplete ? (
                <>
                  <div style={{ 
                    marginBottom: 'var(--spacing-6)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <div className="animate-pulse" style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, var(--primary-blue), var(--success-green))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Activity size={32} style={{ color: 'white' }} />
                    </div>
                  </div>

                  <p style={{ 
                    fontSize: 'var(--font-size-lg)', 
                    color: 'var(--neutral-gray-600)',
                    marginBottom: 'var(--spacing-6)' 
                  }}>
                    We're now analyzing your recent conversations to build your initial Stakeholder Pulse.
                  </p>

                  {/* Processing Steps */}
                  <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                    {processingSteps.map((step, index) => (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 'var(--spacing-3) 0',
                          opacity: index <= currentStep ? 1 : 0.3,
                          transition: 'opacity 0.3s ease'
                        }}
                      >
                        {index < currentStep ? (
                          <CheckCircle 
                            size={20} 
                            style={{ 
                              color: 'var(--success-green)', 
                              marginRight: 'var(--spacing-3)' 
                            }} 
                          />
                        ) : index === currentStep ? (
                          <Loader 
                            size={20} 
                            className="animate-spin" 
                            style={{ 
                              color: 'var(--primary-blue)', 
                              marginRight: 'var(--spacing-3)' 
                            }} 
                          />
                        ) : (
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: '2px solid var(--neutral-gray-300)',
                              marginRight: 'var(--spacing-3)'
                            }}
                          />
                        )}
                        <span style={{ 
                          fontSize: 'var(--font-size-sm)',
                          color: index <= currentStep ? 'var(--neutral-gray-700)' : 'var(--neutral-gray-400)'
                        }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ 
                    marginBottom: 'var(--spacing-6)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle size={60} style={{ color: 'var(--success-green)' }} />
                  </div>

                  <p style={{ 
                    fontSize: 'var(--font-size-lg)', 
                    color: 'var(--neutral-gray-600)',
                    marginBottom: 'var(--spacing-4)' 
                  }}>
                    Your Stakeholder Pulse is now active and monitoring your communications.
                  </p>

                  <p style={{ 
                    fontSize: 'var(--font-size-base)', 
                    color: 'var(--neutral-gray-600)',
                    marginBottom: 'var(--spacing-6)' 
                  }}>
                    Your first daily digest will arrive by <strong>8:30 AM tomorrow</strong>.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Next Steps */}
          {processingComplete && (
            <div style={{ marginBottom: 'var(--spacing-8)' }}>
              <Link 
                to="/dashboard" 
                className="btn btn-primary btn-large"
                style={{ marginBottom: 'var(--spacing-4)' }}
              >
                Go to Dashboard
              </Link>
              
              <div style={{ marginTop: 'var(--spacing-4)' }}>
                <Link 
                  to="/email-mockup"
                  style={{ 
                    color: 'var(--primary-blue)', 
                    textDecoration: 'none',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  Preview Sample Daily Email →
                </Link>
              </div>
            </div>
          )}

          {/* Additional Info */}
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
              💡 You can adjust settings and add more stakeholders anytime in your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessingPage