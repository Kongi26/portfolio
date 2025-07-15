import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity, ArrowLeft } from 'lucide-react'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate successful signup
      navigate('/connect-channels')
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--neutral-gray-50)' }}>
      <div className="container-sm">
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-body">
            {/* Header */}
            <div className="text-center" style={{ marginBottom: 'var(--spacing-8)' }}>
              <Link 
                to="/welcome" 
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
              
              <h1 style={{ marginBottom: 'var(--spacing-2)' }}>Create Your Account</h1>
              <p style={{ color: 'var(--neutral-gray-600)', margin: 0 }}>
                Join thousands of PMs who save hours every week
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="olivia@company.com"
                  style={{ 
                    borderColor: errors.email ? 'var(--error-red)' : undefined 
                  }}
                />
                {errors.email && (
                  <p style={{ 
                    color: 'var(--error-red)', 
                    fontSize: 'var(--font-size-sm)', 
                    marginTop: 'var(--spacing-1)',
                    marginBottom: 0 
                  }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={{ 
                    borderColor: errors.password ? 'var(--error-red)' : undefined 
                  }}
                />
                {errors.password && (
                  <p style={{ 
                    color: 'var(--error-red)', 
                    fontSize: 'var(--font-size-sm)', 
                    marginTop: 'var(--spacing-1)',
                    marginBottom: 0 
                  }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  style={{ 
                    borderColor: errors.confirmPassword ? 'var(--error-red)' : undefined 
                  }}
                />
                {errors.confirmPassword && (
                  <p style={{ 
                    color: 'var(--error-red)', 
                    fontSize: 'var(--font-size-sm)', 
                    marginTop: 'var(--spacing-1)',
                    marginBottom: 0 
                  }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-large" 
                style={{ width: '100%', marginBottom: 'var(--spacing-4)' }}
              >
                Sign Up
              </button>
            </form>

            {/* Terms and Privacy */}
            <div className="text-center">
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--neutral-gray-500)',
                margin: 0 
              }}>
                By signing up, you agree to our{' '}
                <a href="#" style={{ color: 'var(--primary-blue)' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: 'var(--primary-blue)' }}>Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage