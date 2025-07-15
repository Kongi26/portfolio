import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, ArrowLeft, Plus, X } from 'lucide-react'

const DefineProductFocusPage = () => {
  const navigate = useNavigate()
  const [currentInput, setCurrentInput] = useState('')
  const [products, setProducts] = useState([])

  const addProduct = () => {
    const trimmedInput = currentInput.trim()
    if (trimmedInput && !products.includes(trimmedInput)) {
      setProducts([...products, trimmedInput])
      setCurrentInput('')
    }
  }

  const removeProduct = (productToRemove) => {
    setProducts(products.filter(product => product !== productToRemove))
  }

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addProduct()
    }
  }

  const handleNext = () => {
    if (products.length > 0) {
      navigate('/processing')
    }
  }

  const canProceed = products.length > 0

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--neutral-gray-50)' }}>
      <div className="container">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center" style={{ marginBottom: 'var(--spacing-8)' }}>
            <Link 
              to="/identify-stakeholders" 
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
            
            <h1 style={{ marginBottom: 'var(--spacing-2)' }}>What Products or Features Are You Working On?</h1>
            <p style={{ color: 'var(--neutral-gray-600)', margin: 0, fontSize: 'var(--font-size-lg)' }}>
              This helps our AI understand the context of your conversations.
            </p>
          </div>

          {/* Input Section */}
          <div className="card" style={{ marginBottom: 'var(--spacing-8)' }}>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label" htmlFor="productInput">
                  Add Product/Feature Name
                </label>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                  <input
                    type="text"
                    id="productInput"
                    className="form-input"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    placeholder="e.g., 'New Pricing Model', 'Mobile App Redesign'"
                    style={{ flex: 1 }}
                  />
                  <button
                    onClick={addProduct}
                    className="btn btn-primary"
                    disabled={!currentInput.trim()}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Product Tags */}
              {products.length > 0 && (
                <div style={{ marginTop: 'var(--spacing-6)' }}>
                  <label className="form-label" style={{ marginBottom: 'var(--spacing-3)' }}>
                    Your Products & Features
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 'var(--spacing-2)' 
                  }}>
                    {products.map((product, index) => (
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
              💡 <strong>Examples:</strong> "New Pricing Model", "Mobile App Redesign", "Login Flow", "Customer Dashboard"
            </p>
          </div>

          {/* Examples for inspiration */}
          <div style={{ marginBottom: 'var(--spacing-8)' }}>
            <h4 style={{ textAlign: 'center', marginBottom: 'var(--spacing-4)', color: 'var(--neutral-gray-600)' }}>
              Quick Add Examples:
            </h4>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 'var(--spacing-2)',
              justifyContent: 'center' 
            }}>
              {[
                'New Pricing Model',
                'Mobile App Redesign', 
                'Login Flow',
                'Customer Dashboard',
                'Payment System',
                'User Onboarding'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => {
                    if (!products.includes(example)) {
                      setProducts([...products, example])
                    }
                  }}
                  className="btn btn-secondary btn-small"
                  disabled={products.includes(example)}
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  + {example}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button 
              className="btn btn-primary btn-large"
              onClick={handleNext}
              disabled={!canProceed}
            >
              Finish Setup & Start Listening
            </button>
            
            {!canProceed && (
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--neutral-gray-500)',
                marginTop: 'var(--spacing-2)',
                margin: 0 
              }}>
                Add at least one product or feature to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefineProductFocusPage