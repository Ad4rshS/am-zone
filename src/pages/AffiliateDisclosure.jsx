import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ExternalLink, Shield, Info, DollarSign } from 'lucide-react'

const AffiliateDisclosure = () => {
  const disclosurePoints = [
    {
      icon: Info,
      title: 'What are Affiliate Links?',
      description: 'Affiliate links are special URLs that allow us to track when someone visits a merchant\'s website through our recommendation. When you make a purchase through these links, we may earn a small commission.'
    },
    {
      icon: DollarSign,
      title: 'No Additional Cost to You',
      description: 'The commission we earn comes from the merchant\'s marketing budget, not from your pocket. You pay the same price whether you use our link or go directly to the merchant.'
    },
    {
      icon: Shield,
      title: 'Our Commitment to Transparency',
      description: 'We believe in complete transparency about our affiliate relationships. We only recommend products we genuinely believe in and have thoroughly researched.'
    }
  ]

  const howItWorks = [
    {
      step: '1',
      title: 'We Research Products',
      description: 'Our team thoroughly researches and tests products before recommending them to our audience.'
    },
    {
      step: '2',
      title: 'You Click Our Link',
      description: 'When you click on our affiliate link, you\'re taken to the merchant\'s website with our tracking code.'
    },
    {
      step: '3',
      title: 'You Make a Purchase',
      description: 'You complete your purchase on the merchant\'s website at the same price you would pay normally.'
    },
    {
      step: '4',
      title: 'We Earn a Commission',
      description: 'The merchant pays us a small commission for referring you, which helps support our platform.'
    }
  ]

  const benefits = [
    'Access to carefully curated product recommendations',
    'Detailed reviews and comparisons to help you make informed decisions',
    'Exclusive deals and discounts you might not find elsewhere',
    'Free content and resources to help you save money',
    'Transparent disclosure of all affiliate relationships'
  ]

  return (
    <>
      <Helmet>
        <title>Affiliate Disclosure - Transparency & Trust | AffiliateHub</title>
        <meta name="description" content="Learn about our affiliate disclosure policy and how we maintain transparency in our product recommendations. We're committed to building trust with our audience." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Affiliate Disclosure
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We believe in complete transparency about our affiliate relationships. 
            Here's everything you need to know about how we operate.
          </p>
        </div>
      </section>

      {/* Main Disclosure */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
              <div className="flex items-start space-x-4">
                <ExternalLink className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Important Disclosure
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    This website contains affiliate links. This means that when you click on certain links on our site and make a purchase, 
                    we may receive a small commission at no additional cost to you. This commission helps us maintain and improve our platform.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We only recommend products and services that we genuinely believe will provide value to our audience. 
                    Our recommendations are based on thorough research, testing, and customer feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {disclosurePoints.map((point, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <point.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            {/* How It Works */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How Our Affiliate Program Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorks.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Benefits for Our Audience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Commitment */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Commitment to You
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Quality Over Quantity
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We carefully select only the best products to recommend. We'd rather recommend fewer, 
                    high-quality products than overwhelm you with mediocre options.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Honest Reviews
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our reviews are honest and unbiased. If we don't like a product, we won't recommend it, 
                    regardless of the commission potential.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Always Transparent
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We clearly disclose our affiliate relationships and are always upfront about how we operate. 
                    Your trust is more important than any commission.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do I pay more when I use your affiliate links?
                  </h3>
                  <p className="text-gray-600">
                    No, you pay exactly the same price. The commission comes from the merchant's marketing budget, not from your purchase.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do you choose which products to recommend?
                  </h3>
                  <p className="text-gray-600">
                    We research products thoroughly, read customer reviews, and often test products ourselves before recommending them.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What if I have a problem with a product I bought through your link?
                  </h3>
                  <p className="text-gray-600">
                    While we don't sell products directly, we're happy to help you find the right customer support contact information.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I trust your recommendations?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely. Our reputation and your trust are more valuable than any commission. We only recommend products we genuinely believe in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Now that you understand how we operate, we invite you to explore our curated collection of products. 
            We're confident you'll find great deals and quality recommendations.
          </p>
          <Link
            to="/products"
            className="btn-primary bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center"
          >
            Browse Products
            <ExternalLink className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default AffiliateDisclosure
