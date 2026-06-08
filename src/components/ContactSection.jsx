import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from '../utils/toast';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    // ⚠️ TODO: Replace this with your actual Web3Forms access key
    formData.append("access_key", "6b1165ad-e21b-4a4b-903a-e7399899b98c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
        toast.success('Message sent! I\'ll get back to you soon 🙌');
        setTimeout(() => setSent(false), 4000);
      } else {
        console.error('Form error:', data);
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to send. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4">Contact</p>
            <h2
              className="font-black tracking-tight leading-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
            >
              Let's build<br />
              something<br />
              <span style={{ color: 'var(--accent)' }}>great.</span>
            </h2>

            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--secondary)', maxWidth: '380px' }}>
              Whether it's a job opportunity, a freelance project, or just a conversation about tech — I'm all ears.
            </p>

            {/* Social links */}
            <div className="space-y-3">
              {[
                { icon: '✉️', label: 'Email', value: 'bhaumikhinunia019@gmail.com', href: 'mailto:bhaumikhinunia019@gmail.com' },
                { icon: '💼', label: 'LinkedIn', value: '/in/bhaumikhinunia1904', href: 'http://linkedin.com/in/bhaumikhinunia1904' },
                { icon: '🐙', label: 'GitHub', value: '@Bhaumik1904', href: 'https://github.com/Bhaumik1904' },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,113,227,0.25)';
                    e.currentTarget.style.background = 'rgba(0,113,227,0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg)';
                  }}
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--secondary)' }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{value}</p>
                  </div>
                  <span className="ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>↗</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="apple-card p-8 space-y-5">
              {[
                { label: 'Your name', name: 'name', type: 'text', placeholder: 'Bhaumik Hinunia' },
                { label: 'Email address', name: 'email', type: 'email', placeholder: 'hello@example.com' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label
                    className="block text-xs font-semibold mb-2"
                    style={{ color: 'var(--secondary)', letterSpacing: '0.03em' }}
                  >
                    {label.toUpperCase()}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(0,113,227,0.4)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.08)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-xs font-semibold mb-2"
                  style={{ color: 'var(--secondary)', letterSpacing: '0.03em' }}
                >
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, opportunity, or just say hi..."
                  required
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(0,113,227,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-apple w-full justify-center py-4 disabled:opacity-70"
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : (sent ? '✓ Message sent — I\'ll be in touch!' : 'Send message →')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
