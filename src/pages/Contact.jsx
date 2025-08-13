import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@affiliatehub.com', 'support@affiliatehub.com'],
      link: 'mailto:contact@affiliatehub.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Business Street', 'City, State 12345', 'United States'],
      link: null
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
      link: null
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - Get in Touch | AffiliateHub</title>
        <meta name="description" content="Contact AffiliateHub for support, questions, or feedback. We're here to help you find the best products and deals." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions, feedback, or need help? We'd love to hear from you. 
            Our team is here to assist you with anything you need.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  Thank you for your message! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="mb-1">{detail}</p>
                        ))}
                      </a>
                    ) : (
                      <div className="text-gray-600">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="mb-1">{detail}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    How do affiliate links work?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    When you click on our affiliate links and make a purchase, we may earn a small commission at no additional cost to you.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    How do you choose products?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We carefully research and test products before recommending them, focusing on quality, value, and customer satisfaction.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    What if I have a problem with a product?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    While we don't sell products directly, we're happy to help you find the right contact information for customer support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
