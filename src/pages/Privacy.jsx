import { Helmet } from 'react-helmet-async'
import { Shield, Eye, Lock, Database } from 'lucide-react'

const Privacy = () => {
  const lastUpdated = 'January 1, 2024'

  const dataWeCollect = [
    {
      category: 'Personal Information',
      items: ['Name', 'Email address', 'Phone number (if provided)', 'Mailing address (if provided)']
    },
    {
      category: 'Usage Information',
      items: ['Pages visited', 'Time spent on pages', 'Links clicked', 'Browser type and version', 'Device information']
    },
    {
      category: 'Technical Information',
      items: ['IP address', 'Cookies and similar technologies', 'Referrer information', 'User agent string']
    }
  ]

  const howWeUseData = [
    {
      icon: Eye,
      title: 'Improve Our Services',
      description: 'We use your data to understand how you use our website and improve your experience.'
    },
    {
      icon: Database,
      title: 'Personalize Content',
      description: 'We may use your preferences to show you relevant products and recommendations.'
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'We use data to protect our website and users from fraud and abuse.'
    },
    {
      icon: Shield,
      title: 'Communication',
      description: 'We may contact you about your account or important updates to our services.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Your Data Protection | AffiliateHub</title>
        <meta name="description" content="Learn how AffiliateHub protects your privacy and handles your personal information. We're committed to transparency and data protection." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We respect your privacy and are committed to protecting your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </p>
          <p className="text-blue-200 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Introduction
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At AffiliateHub ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By using our website, you consent to the data practices described in this policy. If you do not agree with our policies and practices, 
              please do not use our website.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Information We Collect
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We collect several types of information from and about users of our website, including:
            </p>
            
            <div className="space-y-6">
              {dataWeCollect.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.category}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {category.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How We Use Your Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We use the information we collect for various purposes, including:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howWeUseData.map((use, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <use.icon className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {use.title}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {use.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Information Sharing and Disclosure
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With trusted service providers who assist us in operating our website</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </div>

          {/* Cookies and Tracking */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve our website performance and functionality</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
            </p>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Data Security
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Rights and Choices
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Access and Portability</h3>
                <p className="text-gray-700">Request access to your personal information and receive a copy of your data.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Correction</h3>
                <p className="text-gray-700">Request correction of inaccurate or incomplete personal information.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deletion</h3>
                <p className="text-gray-700">Request deletion of your personal information in certain circumstances.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Objection</h3>
                <p className="text-gray-700">Object to processing of your personal information for certain purposes.</p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Children's Privacy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Changes to This Privacy Policy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@affiliatehub.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Business Street, City, State 12345, United States</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Privacy
