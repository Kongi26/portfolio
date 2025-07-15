import React, { useState } from 'react'
import { CheckCircle, X, Plus, Trash2, Settings as SettingsIcon } from 'lucide-react'

const SettingsView = () => {
  const [emailTime, setEmailTime] = useState('08:30')
  const [realTimeAlerts, setRealTimeAlerts] = useState(true)
  const [connectedChannels, setConnectedChannels] = useState([
    { id: 1, name: 'Slack Workspace', type: 'slack', status: 'connected', lastSync: '2 minutes ago' },
    { id: 2, name: 'Google Mail', type: 'gmail', status: 'connected', lastSync: '5 minutes ago' },
    { id: 3, name: 'Discord Workspace', type: 'discord', status: 'disconnected', lastSync: 'Never' }
  ])
  const [productFocus, setProductFocus] = useState([
    'New Pricing Model',
    'Mobile App Redesign',
    'Login Flow'
  ])
  const [newProduct, setNewProduct] = useState('')
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const timeOptions = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'
  ]

  const handleDisconnectChannel = (channelId) => {
    setConnectedChannels(channels => 
      channels.map(channel => 
        channel.id === channelId 
          ? { ...channel, status: 'disconnected', lastSync: 'Never' }
          : channel
      )
    )
  }

  const handleReconnectChannel = (channelId) => {
    setConnectedChannels(channels => 
      channels.map(channel => 
        channel.id === channelId 
          ? { ...channel, status: 'connected', lastSync: 'Just now' }
          : channel
      )
    )
  }

  const addProduct = () => {
    if (newProduct.trim() && !productFocus.includes(newProduct.trim())) {
      setProductFocus([...productFocus, newProduct.trim()])
      setNewProduct('')
    }
  }

  const removeProduct = (productToRemove) => {
    setProductFocus(productFocus.filter(product => product !== productToRemove))
  }

  const getChannelIcon = (type) => {
    const iconStyles = { width: '24px', height: '24px', borderRadius: '4px', color: 'white', fontWeight: 'bold', fontSize: '12px' }
    
    switch (type) {
      case 'slack':
        return <div style={{ ...iconStyles, backgroundColor: '#4A154B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</div>
      case 'gmail':
        return <div style={{ ...iconStyles, backgroundColor: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>G</div>
      case 'discord':
        return <div style={{ ...iconStyles, backgroundColor: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>D</div>
      default:
        return null
    }
  }

  return (
    <div style={{ padding: 'var(--spacing-6)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Settings</h1>
        <p style={{ color: 'var(--neutral-gray-600)', margin: 0 }}>
          Manage your preferences and account settings
        </p>
      </div>

      {/* Email Preferences */}
      <div className="card" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="card-header">
          <h3 style={{ margin: 0 }}>Email Preferences</h3>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label className="form-label" htmlFor="emailTime">
              Daily Digest Time
            </label>
            <select
              id="emailTime"
              className="form-input"
              value={emailTime}
              onChange={(e) => setEmailTime(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <p style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--neutral-gray-500)',
              margin: 0,
              marginTop: 'var(--spacing-1)'
            }}>
              When should we send your daily stakeholder pulse?
            </p>
          </div>

          <div>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500'
            }}>
              <input
                type="checkbox"
                checked={realTimeAlerts}
                onChange={(e) => setRealTimeAlerts(e.target.checked)}
                style={{ marginRight: 'var(--spacing-2)' }}
              />
              Receive real-time critical alerts
            </label>
            <p style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--neutral-gray-500)',
              margin: 0,
              marginTop: 'var(--spacing-1)',
              marginLeft: 'var(--spacing-6)'
            }}>
              Get immediate notifications for very negative sentiment changes
            </p>
          </div>
        </div>
      </div>

      {/* Connected Channels */}
      <div className="card" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="card-header">
          <h3 style={{ margin: 0 }}>Connected Channels</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            {connectedChannels.map((channel) => (
              <div key={channel.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--neutral-gray-50)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {getChannelIcon(channel.type)}
                  <div style={{ marginLeft: 'var(--spacing-3)' }}>
                    <div style={{ 
                      fontWeight: '600',
                      fontSize: 'var(--font-size-sm)',
                      marginBottom: 'var(--spacing-1)'
                    }}>
                      {channel.name}
                    </div>
                    <div style={{ 
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--neutral-gray-500)'
                    }}>
                      Last sync: {channel.lastSync}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  {channel.status === 'connected' ? (
                    <>
                      <span className="status-connected">
                        <CheckCircle size={12} style={{ marginRight: 'var(--spacing-1)' }} />
                        Connected
                      </span>
                      <button
                        onClick={() => handleDisconnectChannel(channel.id)}
                        className="btn btn-secondary btn-small"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleReconnectChannel(channel.id)}
                      className="btn btn-primary btn-small"
                    >
                      Reconnect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Focus */}
      <div className="card" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="card-header">
          <h3 style={{ margin: 0 }}>Product Focus</h3>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label className="form-label">
              Products & Features You're Working On
            </label>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <input
                type="text"
                className="form-input"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addProduct()}
                placeholder="Add new product or feature..."
                style={{ flex: 1 }}
              />
              <button
                onClick={addProduct}
                className="btn btn-primary"
                disabled={!newProduct.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {productFocus.length > 0 && (
            <div>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 'var(--spacing-2)' 
              }}>
                {productFocus.map((product, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--primary-blue)',
                      color: 'white',
                      padding: 'var(--spacing-2) var(--spacing-3)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500'
                    }}
                  >
                    {product}
                    <button
                      onClick={() => removeProduct(product)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        marginLeft: 'var(--spacing-2)',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ margin: 0 }}>Account</h3>
        </div>
        <div className="card-body">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spacing-4)' 
          }}>
            <button className="btn btn-secondary">
              <SettingsIcon size={16} style={{ marginRight: 'var(--spacing-2)' }} />
              Change Password
            </button>
            
            <button 
              onClick={() => setShowConfirmDelete(true)}
              className="btn btn-secondary"
              style={{ color: 'var(--error-red)', borderColor: 'var(--error-red)' }}
            >
              <Trash2 size={16} style={{ marginRight: 'var(--spacing-2)' }} />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation */}
      {showConfirmDelete && (
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
              <h3 style={{ margin: 0, color: 'var(--error-red)' }}>Delete Account</h3>
            </div>
            <div className="card-body">
              <p style={{ marginBottom: 'var(--spacing-4)' }}>
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--neutral-gray-600)',
                margin: 0
              }}>
                This will disconnect all your channels and delete all stored insights.
              </p>
            </div>
            <div className="card-footer">
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would call the delete API
                    alert('Account deletion is not implemented in this demo')
                    setShowConfirmDelete(false)
                  }}
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--error-red)', borderColor: 'var(--error-red)' }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsView