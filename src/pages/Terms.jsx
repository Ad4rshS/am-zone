import { Helmet } from 'react-helmet-async'
import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

const Terms = () => {
  const lastUpdated = 'January 1, 2024'

  const keyTerms = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      description: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
    },
    {
      icon: Shield,
      title: 'Use License',
      description: 'Permission is granted to temporarily download one copy of the materials on AffiliateHub for personal, non-commercial transitory viewing only.'
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer',
      description: 'The materials on AffiliateHub are provided on an \'as is\' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.'
    },
    {
      icon: FileText,
      title: 'Limitations',
      description: 'In no event shall AffiliateHub or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Terms of Service - Legal Agreement | AffiliateHub</title>
        <meta name="description" content="Read AffiliateHub's terms of service and legal agreement. Understand your rights and responsibilities when using our affiliate marketing platform." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Please read these terms carefully before using our website. 
            By using our services, you agree to be bound by these terms.
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
              Agreement to Terms
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the AffiliateHub website and services. 
              By accessing or using our website, you agree to be bound by these Terms and all applicable laws and regulations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              If you do not agree with any of these terms, you are prohibited from using or accessing this site. 
              The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </div>

          {/* Key Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Key Terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyTerms.map((term, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <term.icon className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {term.title}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {term.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Use License */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Use License
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on AffiliateHub's website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on AffiliateHub's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by AffiliateHub at any time. 
              Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials 
              in your possession whether in electronic or printed format.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Disclaimer
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The materials on AffiliateHub's website are provided on an 'as is' basis. AffiliateHub makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Further, AffiliateHub does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use 
              of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We do not guarantee that any product or service mentioned on our website will be available, accurate, or suitable for your needs. 
              Product information, prices, and availability are subject to change without notice.
            </p>
          </div>

          {/* Limitations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Limitations
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              In no event shall AffiliateHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use the materials on AffiliateHub's website, even if AffiliateHub 
              or a AffiliateHub authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, 
              these limitations may not apply to you.
            </p>
          </div>

          {/* Accuracy of Materials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Accuracy of Materials
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The materials appearing on AffiliateHub's website could include technical, typographical, or photographic errors. 
              AffiliateHub does not warrant that any of the materials on its website are accurate, complete or current. 
              AffiliateHub may make changes to the materials contained on its website at any time without notice.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              However, AffiliateHub does not make any commitment to update the materials. We strive to provide accurate and up-to-date information, 
              but we cannot guarantee the accuracy of all product information, prices, or availability.
            </p>
          </div>

          {/* Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Links
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AffiliateHub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
              The inclusion of any link does not imply endorsement by AffiliateHub of the site. Use of any such linked website is at the user's own risk.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When you click on affiliate links on our website, you will be redirected to third-party websites. We are not responsible for the content, 
              privacy policies, or practices of these third-party websites.
            </p>
          </div>

          {/* Modifications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Modifications
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AffiliateHub may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be 
              bound by the then current version of these Terms of Service. We encourage you to review these terms periodically for any changes.
            </p>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Governing Law
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit 
              to the exclusive jurisdiction of the courts in that location. Any disputes arising from these terms or your use of our website will 
              be resolved in accordance with applicable laws.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@affiliatehub.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Business Street, City, State 12345, United States</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Terms
