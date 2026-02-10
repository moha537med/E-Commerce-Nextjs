import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <main className="max-w-4xl w-full px-6 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            E-Commerce Platform
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A modern e-commerce web application built using Next.js, Redux Toolkit,
            and REST APIs. This project demonstrates authentication, cart
            management, checkout flow, and product browsing experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <FeatureCard
            title="Authentication System"
            desc="Secure login, registration, password reset, and protected routes."
          />
          <FeatureCard
            title="Product Browsing"
            desc="Products listing, categories, brands, and detailed product pages."
          />
          <FeatureCard
            title="Shopping Cart"
            desc="Add, update, and remove items with real-time state management."
          />
          <FeatureCard
            title="Checkout Flow"
            desc="Shipping address handling and order creation workflow."
          />
          <FeatureCard
            title="Wishlist"
            desc="Save favorite products and manage them easily."
          />
          <FeatureCard
            title="Responsive UI"
            desc="Clean responsive interface built with Tailwind CSS."
          />
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-100 rounded-xl p-6 text-center mb-10">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Tech>Next.js</Tech>
            <Tech>TypeScript</Tech>
            <Tech>Redux Toolkit</Tech>
            <Tech>Tailwind CSS</Tech>
            <Tech>REST API</Tech>
            <Tech>Axios</Tech>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Explore Products
          </Link>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc }: any) {
  return (
    <div className="border rounded-xl p-5 hover:shadow-md transition bg-white">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function Tech({ children }: any) {
  return (
    <span className="px-3 py-1 bg-white border rounded-md text-sm">
      {children}
    </span>
  );
}
