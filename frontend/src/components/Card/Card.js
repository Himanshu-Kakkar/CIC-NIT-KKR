import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const Card = ({ member }) => {
  return (
    <div className="relative overflow-hidden flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl p-8 min-h-[380px] w-full text-center text-white transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/20 group">
      {/* Glassmorphism gradients */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl z-0" style={{background: 'linear-gradient(135deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.02) 100%)'}}></div>
      <div className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0" style={{background: 'radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 50%)'}}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative w-[140px] h-[140px] mx-auto mb-6 overflow-hidden rounded-full">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
          <div className="pointer-events-none absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle at 50% 0%,rgba(255,255,255,0.1),transparent 70%)'}}></div>
        </div>
        <h2 className="text-2xl font-semibold my-4 mt-0 text-white">{member.name}</h2>
        <p className="text-base text-white/90 mb-6 min-h-[40px] leading-tight">{member.role}</p>
        <div className="flex justify-center gap-4 mt-auto pt-5">
          {/* Always show email icon */}
          <a 
            href={member.email ? `mailto:${member.email}` : '#'} 
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] text-lg no-underline border border-white/10 ${!member.email ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/5' : 'hover:bg-white/20 hover:scale-110 hover:border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)]'}`}
            onClick={(e) => !member.email && e.preventDefault()}
            title={member.email || 'Email not available'}
          >
            <FaEnvelope />
          </a>
          {/* Always show phone icon */}
          <a 
            href={member.phone ? `tel:${member.phone}` : '#'} 
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] text-lg no-underline border border-white/10 ${!member.phone ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/5' : 'hover:bg-white/20 hover:scale-110 hover:border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)]'}`}
            onClick={(e) => !member.phone && e.preventDefault()}
            title={member.phone || 'Phone not available'}
          >
            <FaPhone />
          </a>
          {/* Always show LinkedIn icon */}
          <a 
            href={member.linkedin || '#'} 
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] text-lg no-underline border border-white/10 ${!member.linkedin ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/5' : 'hover:bg-white/20 hover:scale-110 hover:border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)]'}`}
            onClick={(e) => !member.linkedin && e.preventDefault()}
            target={member.linkedin ? "_blank" : undefined}
            rel={member.linkedin ? "noopener noreferrer" : undefined}
            title={member.linkedin ? 'View LinkedIn Profile' : 'LinkedIn not available'}
          >
            <FaLinkedin />
          </a>
          {/* Always show Instagram icon */}
          <a 
            href={member.instagram || '#'} 
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] text-lg no-underline border border-white/10 ${!member.instagram ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/5' : 'hover:bg-white/20 hover:scale-110 hover:border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)]'}`}
            onClick={(e) => !member.instagram && e.preventDefault()}
            target={member.instagram ? "_blank" : undefined}
            rel={member.instagram ? "noopener noreferrer" : undefined}
            title={member.instagram ? 'View Instagram Profile' : 'Instagram not available'}
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

