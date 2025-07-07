import HeroSection from "@/components/layout/landing/Hero";
import Navbar from "@/components/layout/landing/Navbar";
import React from "react";

const App = () => {
  return (
    <div
      data-theme="corporate"
      className="min-h-screen bg-base-100 text-base-content"
    >
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Earnverse?
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              We provide a halal way to earn online through verified tasks and
              advertisements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Halal Earning",
                description:
                  "All our earning methods are verified to be Sharia compliant",
              },
              {
                title: "No Investment Required",
                description: "Start earning with just your time and smartphone",
              },
              {
                title: "Instant Withdrawals",
                description:
                  "Withdraw your earnings instantly via popular payment methods",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body">
                  <h3 className="card-title">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Start earning in just a few simple steps
            </p>
          </div>

          <div className="steps steps-horizontal w-full justify-around mb-8">
            <div className="step step-primary">
              <div className="text-center">
                <div className="step-number">1</div>
                <div className="font-medium">Sign Up</div>
              </div>
            </div>
            <div className="step step-primary">
              <div className="text-center">
                <div className="step-number">2</div>
                <div className="font-medium">Complete Tasks</div>
              </div>
            </div>
            <div className="step step-primary">
              <div className="text-center">
                <div className="step-number">3</div>
                <div className="font-medium">Watch Ads</div>
              </div>
            </div>
            <div className="step step-primary">
              <div className="text-center">
                <div className="step-number">4</div>
                <div className="font-medium">Withdraw</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Real stories from our community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Muhammad Ali",
                testimonial:
                  "Earnverse has helped me pay my university fees. I complete tasks during breaks and earn decent money without any hassle.",
              },
              {
                name: "Ayesha Khan",
                testimonial:
                  "As a homemaker, this platform gives me financial independence. I earn while managing household chores.",
              },
              {
                name: "Zain Ahmed",
                testimonial:
                  "I use Earnverse as an additional income source. The interface is smooth and payments are always on time.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <p className="mb-4 italic">"{testimonial.testimonial}"</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl md:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p>
                Join thousands of users who are already earning through our
                halal methods.
              </p>
              <form
                // onSubmit={handleSubmit}
                className="form-control mt-4 flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input input-bordered w-full"
                  required
                />
                <button type="submit" className="btn btn-secondary">
                  Get Early Access
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-base-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base-content/70">
              Got questions? We've got answers!
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is Earnverse really halal?",
                a: "Yes! All our earning methods are carefully reviewed to ensure they comply with Islamic principles.",
              },
              {
                q: "How much can I earn?",
                a: "Your earnings depend on how much time you invest. On average, users earn between PKR 500-2000 daily.",
              },
              {
                q: "Are there any charges or fees?",
                a: "No! There are absolutely no charges to join or use our platform.",
              },
              {
                q: "How do I withdraw my earnings?",
                a: "You can withdraw instantly via JazzCash, Easypaisa, and bank transfers.",
              },
              {
                q: "Do I need any special skills?",
                a: "No special skills are required. Just follow instructions and start earning!",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="collapse collapse-arrow bg-base-100"
              >
                <summary className="collapse-title text-lg font-medium">
                  {item.q}
                </summary>
                <div className="collapse-content">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-bg bg-base-300 text-base-content p-10">
        <div>
          <span className="footer-title">Earnverse</span>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Blog</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Refund Policy</a>
        </div>
        <div>
          <span className="footer-title">Support</span>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">FAQ</a>
          <a className="link link-hover">Help Center</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
