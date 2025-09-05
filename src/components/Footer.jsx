const Footer = () => {
  const socialLinks = [
    { icon: '📧', href: 'mailto:hello@c-square.club', label: 'Email' },
    { icon: '💬', href: '#', label: 'Discord' },
    { icon: '🐱', href: '#', label: 'GitHub' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
    { icon: '🐦', href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative z-10 glass border-t border-neon-cyan mt-20">
      <div className="container-custom py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="w-12 h-12 flex items-center justify-center border-2 border-neon-cyan rounded-full text-xl transition-all duration-300 hover:bg-neon-cyan hover:text-black hover:scale-110"
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-400">
            &copy; 2024 C-Square Club. Building the future, one line of code at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
