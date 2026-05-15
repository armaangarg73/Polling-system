import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.08),transparent_50%)]" />

      <div
        className="fixed inset-0 opacity-[0.015] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[120px] rounded-full" />

      <nav className="relative z-50 max-w-[1600px] mx-auto px-12 lg:px-20 py-8">
        <div className="flex items-center justify-between backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl px-8 py-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/60 text-transparent bg-clip-text">
                PollSphere
              </span>
            </h1>
            <p className="text-xs text-gray-600 mt-0.5 tracking-wider uppercase font-medium">
              Enterprise Polling Platform
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-12 text-sm">
            <a
              href="#features"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Platform
            </a>
            <a
              href="#solutions"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Documentation
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-white/90 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      <section className="relative z-10 max-w-[1600px] mx-auto px-12 lg:px-20 pt-32 pb-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-12 backdrop-blur-xl">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-gray-400 text-xs tracking-wide font-medium">
              Real-time Analytics Engine • 99.99% Uptime
            </span>
          </div>
          <h1 className="text-[80px] lg:text-[120px] font-bold leading-[0.95] tracking-tighter mb-10">
            <span className="block text-white">Enterprise Polling,</span>
            <span className="block bg-gradient-to-r from-white via-gray-300 to-gray-600 text-transparent bg-clip-text">
              Redefined.
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto mb-16 font-light">
            Build intelligent polls with real-time analytics, instant feedback
            loops, and enterprise-grade infrastructure. Trusted by teams at the
            world's most innovative companies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 mb-5">
            <Link
              to="/register"
              className="px-10 py-4 rounded-2xl text-base font-medium bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              Start Building Free
            </Link>   
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1600px] mx-auto px-12 lg:px-20 pb-40">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-600/5 blur-3xl rounded-[60px]" />
          <div className="relative rounded-[40px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-2xl p-12 shadow-[0_0_100px_rgba(0,0,0,0.3)]">
            <div className="flex items-start justify-between mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-3 tracking-tight">
                  Real-Time Analytics Dashboard
                </h2>
                <p className="text-gray-500 text-lg">
                  Live audience insights powered by WebSocket infrastructure
                </p>
              </div>
              <div className="px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-medium text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                STREAMING
              </div>
            </div>
            <div className="space-y-10 mb-16">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-xl text-gray-300">
                    Iron Man
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="text-gray-500 text-sm">2,847 votes</span>
                    <span className="text-white font-semibold text-lg">
                      58.2%
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden border border-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400/80 via-blue-400/80 to-purple-500/80 relative overflow-hidden"
                    style={{ width: "58.2%" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-xl text-gray-300">
                    Spider-Man
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="text-gray-500 text-sm">1,421 votes</span>
                    <span className="text-white font-semibold text-lg">
                      29.1%
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden border border-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gray-400/60 to-gray-500/60"
                    style={{ width: "29.1%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-xl text-gray-300">
                    Vision
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="text-gray-500 text-sm">621 votes</span>
                    <span className="text-white font-semibold text-lg">
                      12.7%
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden border border-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gray-400/60 to-gray-500/60"
                    style={{ width: "12.7%" }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                <h3 className="text-5xl font-bold mb-2 bg-gradient-to-br from-white to-gray-500 text-transparent bg-clip-text">
                  4,889
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Total Responses
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                <h3 className="text-5xl font-bold mb-2 bg-gradient-to-br from-white to-gray-500 text-transparent bg-clip-text">
                  98.4%
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Completion Rate
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                <h3 className="text-5xl font-bold mb-2 bg-gradient-to-br from-white to-gray-500 text-transparent bg-clip-text">
                  1.2s
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Avg Response Time
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                <h3 className="text-5xl font-bold mb-2 text-emerald-400">
                  Live
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  Stream Status
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1600px] mx-auto px-12 lg:px-20 pb-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl text-center">
            <h2 className="text-6xl font-bold mb-3 bg-gradient-to-br from-white to-gray-600 text-transparent bg-clip-text">
              2.4M+
            </h2>
            <p className="text-gray-600 font-medium">Polls Created</p>
          </div>
          <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl text-center">
            <h2 className="text-6xl font-bold mb-3 bg-gradient-to-br from-white to-gray-600 text-transparent bg-clip-text">
              180M+
            </h2>
            <p className="text-gray-600 font-medium">Responses Collected</p>
          </div>
          <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl text-center">
            <h2 className="text-6xl font-bold mb-3 bg-gradient-to-br from-white to-gray-600 text-transparent bg-clip-text">
              99.99%
            </h2>
            <p className="text-gray-600 font-medium">Platform Uptime</p>
          </div>
          <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl text-center">
            <h2 className="text-6xl font-bold mb-3 bg-gradient-to-br from-white to-gray-600 text-transparent bg-clip-text">
              &lt;100ms
            </h2>
            <p className="text-gray-600 font-medium">Global Latency</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1600px] mx-auto px-12 lg:px-20 pb-40">
        <div className="text-center mb-24">
          <h2 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Built for Scale
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Enterprise-grade infrastructure designed to handle millions of
            concurrent users with real-time synchronization and zero latency.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="p-12 rounded-[35px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl mb-10 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              Real-Time Streaming
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              WebSocket-powered infrastructure delivers instant updates across
              all connected clients with sub-100ms synchronization.
            </p>
          </div>

          <div className="p-12 rounded-[35px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl mb-10 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              Advanced Analytics
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Comprehensive dashboards with participation tracking, demographic
              insights, and predictive trend analysis powered by AI.
            </p>
          </div>

          <div className="p-12 rounded-[35px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl mb-10 group-hover:scale-110 transition-transform">
              🔒
            </div>
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              Enterprise Security
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Bank-grade encryption, SSO integration, role-based access control,
              and full compliance with SOC 2, GDPR, and HIPAA.
            </p>
          </div>

          <div className="p-12 rounded-[35px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl mb-10 group-hover:scale-110 transition-transform">
              🌐
            </div>
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              Global Infrastructure
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Distributed across 25+ data centers worldwide with automatic
              failover and 99.99% guaranteed uptime SLA.
            </p>
          </div>

          <div className="p-12 rounded-[35px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-2xl mb-10 group-hover:scale-110 transition-transform">
              🎨
            </div>
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              White Label Ready
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Fully customizable branding, custom domains, and embedded widgets
              that seamlessly integrate with your brand identity.
            </p>
          </div>

          <div className="p-12 rounded-[35px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-2xl mb-10 group-hover:scale-110 transition-transform">
              🔌
            </div>
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              API-First Platform
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              RESTful and GraphQL APIs with comprehensive documentation, SDKs
              for 8 languages, and webhook integrations.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1600px] mx-auto px-12 lg:px-20 pb-40">
        <div className="relative rounded-[50px] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-600/5" />

          <div className="relative z-10">
            <h2 className="text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
              Join thousands of companies using PollSphere to gather real-time
              insights and make data-driven decisions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/register"
                className="px-12 py-5 rounded-2xl text-lg font-medium bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                Start Free Trial
              </Link>
              <button className="px-12 py-5 rounded-2xl text-lg font-medium bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-all backdrop-blur-xl text-white">
                Schedule Demo
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-8">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 max-w-[1600px] mx-auto px-12 lg:px-20 pb-20">
        <div className="border-t border-white/[0.05] pt-16">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-6">PollSphere</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enterprise polling infrastructure trusted by the world's most
                innovative companies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-gray-400">
                Product
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-gray-400">
                Company
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-gray-400">
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2026 PollSphere Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
