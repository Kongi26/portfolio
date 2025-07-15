import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, ArrowLeft, Check, Loader } from 'lucide-react'

const ConnectChannelsPage = () => {
  const navigate = useNavigate()
  const [connectionStates, setConnectionStates] = useState({
    slack: 'disconnected', // 'disconnected', 'connecting', 'connected'
    gmail: 'disconnected',
    discord: 'disconnected'
  })

  const handleConnect = (channel) => {
    // Set connecting state
    setConnectionStates(prev => ({
      ...prev,
      [channel]: 'connecting'
    }))

    // Simulate OAuth flow with loading delay
    setTimeout(() => {
      setConnectionStates(prev => ({
        ...prev,
        [channel]: 'connected'
      }))
    }, 2000) // 2 second delay to simulate OAuth flow
  }

  const isAnyConnected = Object.values(connectionStates).some(state => state === 'connected')

  const handleNext = () => {
    if (isAnyConnected) {
      navigate('/identify-stakeholders')
    }
  }

  const getChannelIcon = (channel) => {
    const iconStyles = { width: '32px', height: '32px' }
    
    switch (channel) {
      case 'slack':
        return <div style={{ ...iconStyles, backgroundColor: '#4A154B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>S</div>
      case 'gmail':
        return <div style={{ ...iconStyles, backgroundColor: '#EA4335', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>G</div>
      case 'discord':
        return <div style={{ ...iconStyles, backgroundColor: '#5865F2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>D</div>
      default:
        return null
    }
  }

  const getButtonContent = (channel) => {
    const state = connectionStates[channel]
    
    switch (state) {
      case 'connecting':
        return (
          <>
            <Loader size={16} className="animate-spin" style={{ marginRight: 'var(--spacing-2)' }} />
            Connecting...
          </>
        )
      case 'connected':
        return (
          <>
            <Check size={16} style={{ marginRight: 'var(--spacing-2)' }} />
            Connected
          </>
        )
      default:
        return `Connect ${channel.charAt(0).toUpperCase() + channel.slice(1)}`
    }
  }

  const getButtonClass = (channel) => {
    const state = connectionStates[channel]
    
    if (state === 'connected') {
      return 'btn btn-success'
    } else if (state === 'connecting') {
      return 'btn btn-secondary'
    } else {
      return 'btn btn-primary'
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--neutral-gray-50)' }}>
      <div className="container">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center" style={{ marginBottom: 'var(--spacing-8)' }}>
            <Link 
              to="/signup" 
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
            
            <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Connect Your Communication Channels</h1>
            <p style={{ color: 'var(--neutral-gray-600)', margin: 0, fontSize: 'var(--font-size-lg)' }}>
              We'll analyze your conversations to understand stakeholder sentiment and deliver personalized insights.
            </p>
          </div>

          {/* Integration Blocks */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--spacing-6)',
            marginBottom: 'var(--spacing-8)' 
          }}>
            {/* Slack Block */}
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                  {getChannelIcon('slack')}
                  <div style={{ marginLeft: 'var(--spacing-3)' }}>
                    <h3 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>Slack Workspace</h3>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--neutral-gray-600)' }}>
                      Monitor channels and direct messages
                    </p>
                  </div>
                </div>
                
                <button 
                  className={getButtonClass('slack')}
                  onClick={() => handleConnect('slack')}
                  disabled={connectionStates.slack !== 'disconnected'}
                  style={{ width: '100%' }}
                >
                  {getButtonContent('slack')}
                </button>
              </div>
            </div>

            {/* Gmail Block */}
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                  {getChannelIcon('gmail')}
                  <div style={{ marginLeft: 'var(--spacing-3)' }}>
                    <h3 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>Google Mail</h3>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--neutral-gray-600)' }}>
                      Gmail & Google Workspace emails
                    </p>
                  </div>
                </div>
                
                <button 
                  className={getButtonClass('gmail')}
                  onClick={() => handleConnect('gmail')}
                  disabled={connectionStates.gmail !== 'disconnected'}
                  style={{ width: '100%' }}
                >
                  {getButtonContent('gmail')}
                </button>
              </div>
            </div>

            {/* Discord Block */}
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                  {getChannelIcon('discord')}
                  <div style={{ marginLeft: 'var(--spacing-3)' }}>
                    <h3 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>Discord Workspace</h3>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--neutral-gray-600)' }}>
                      Monitor Discord servers and DMs
                    </p>
                  </div>
                </div>
                
                <button 
                  className={getButtonClass('discord')}
                  onClick={() => handleConnect('discord')}
                  disabled={connectionStates.discord !== 'disconnected'}
                  style={{ width: '100%' }}
                >
                  {getButtonContent('discord')}
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Reminder */}
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
              🔒 We only read content relevant to your product discussions to provide insights. Your data is never shared.
            </p>
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button 
              className="btn btn-primary btn-large"
              onClick={handleNext}
              disabled={!isAnyConnected}
            >
              Next: Identify Stakeholders
            </button>
            
            {!isAnyConnected && (
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--neutral-gray-500)',
                marginTop: 'var(--spacing-2)',
                margin: 0 
              }}>
                Connect at least one channel to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectChannelsPage