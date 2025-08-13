import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Users, Award, Shield, Heart, ArrowRight } from 'lucide-react'

const About = () => {
  const stats = [
    { number: '1L+', label: 'Happy Customers', icon: Users },
    { number: '2K+', label: 'Products Curated', icon: Award },
    { number: '200+', label: 'Trusted Brands', icon: Shield },
    { number: '4.9', label: 'Average Rating', icon: Heart }
  ]

  const values = [
    { icon: '🎯', title: 'Quality First', description: 'We recommend and list only the best products from trusted brands.' },
    { icon: '⚡', title: 'Great Value', description: 'Amazing deals and offers tailored for shoppers in India.' },
    { icon: '🔒', title: 'Trust & Safety', description: 'Secure experience and transparent policies for peace of mind.' },
    { icon: '🚚', title: 'Fast Delivery', description: 'Partnered with the best for quick and reliable delivery.' }
  ]

  const team = [
    {
      name: 'Adarsh Sukumar',
      role: 'Founder & Creator',
      image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop&crop=face',
      bio: 'Building A.M Zone to deliver a modern, smooth and trustworthy shopping experience for everyone in India.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About Us - A.M Zone</title>
        <meta name="description" content="A.M Zone is India’s modern shopping destination founded by Adarsh Sukumar, focused on quality, value, and trust." />
      </Helmet>

      <section className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About A.M Zone</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Our mission is to make online shopping simple, reliable and delightful for everyone in India.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-purple-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At A.M Zone, we believe everyone deserves the best products at the best value. We curate listings, highlight offers, and keep the experience secure and intuitive.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We’re committed to delivering a clean and modern interface with a strong focus on Indian shoppers and local preferences.
              </p>
              <Link to="/products" className="btn-primary inline-flex items-center">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" alt="Team" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">These values shape the way we build and improve A.M Zone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Led by our founder and creator.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center md:col-start-2">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">Browse our latest products and offers.</p>
          <Link to="/products" className="btn-primary bg-white text-purple-700 hover:bg-gray-100 inline-flex items-center">Browse Products<ArrowRight className="ml-2 w-5 h-5" /></Link>
        </div>
      </section>
    </>
  )
}

export default About
