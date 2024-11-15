
import { Shield, Users, Heart, LockKeyhole, Medal } from 'lucide-react';

const Hero = () => {
  return (
    <div className="pt-16">
      {/* Main Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-secondary to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-white/20 rounded-full" />
                <Heart className="h-16 w-16 text-white relative" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-fade-in">
              CareSphere
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-blue-100">
                Decentralized Healthcare Records
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Revolutionizing healthcare with blockchain technology. Secure, transparent, and accessible health records management system.
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 24.9999C240 74.9999 480 74.9999 720 49.9999C960 24.9999 1200 24.9999 1440 49.9999V73.9999H0V24.9999Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Secure",
                description: "Advanced encryption and blockchain security for your medical records",
                color: "text-emerald-500"
              },
              {
                icon: Users,
                title: "Accessible",
                description: "Easy access for authorized healthcare providers",
                color: "text-blue-500"
              },
              {
                icon: LockKeyhole,
                title: "Private",
                description: "Full control over your medical data access",
                color: "text-violet-500"
              }
            ].map((feature, index) => (
              <div key={index} 
                className="relative group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`inline-block p-3 ${feature.color} bg-gray-100 rounded-xl mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Medal className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-white font-medium">Premium Quality</span>
            </div>
            <p className="text-gray-400">Crafted with ❤️ by</p>
            <a href="https://github.com/kigarama" 
              className="mt-2 text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-all duration-300 transform hover:scale-105">
              Kigarama TSS
            </a>
            <div className="mt-4 flex items-center space-x-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'Blockchain'].map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;