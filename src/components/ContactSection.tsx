import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);

  const directEmail = 'alex.smith.css@example.com';

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g. alex@example.com).';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 600);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-28 bg-[var(--surface-color)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--primary-color)] mb-3">
            Inquiries & Accessibility Audits
          </p>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-4 text-base text-[var(--text-muted)]">
            Looking for architectural CSS consulting, WCAG compliance audits, or high-performance design system engineering? Drop a note below.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Accessible Form Container */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[var(--bg-color)] border border-[var(--border-color)] shadow-[var(--shadow)]">
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="py-10 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)]">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
                  Thank you for reaching out. Alex will review your requirements and respond within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[var(--text-main)] mb-2">
                    Full Name <span aria-hidden="true" className="text-red-500">*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Jordan Taylor"
                    className={`w-full px-4 py-3 rounded-lg border bg-[var(--surface-color)] text-[var(--text-main)] transition-all ${
                      errors.name
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[var(--border-color)] focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/20'
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[var(--text-main)] mb-2">
                    Email Address <span aria-hidden="true" className="text-red-500">*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. jordan@company.com"
                    className={`w-full px-4 py-3 rounded-lg border bg-[var(--surface-color)] text-[var(--text-main)] transition-all ${
                      errors.email
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[var(--border-color)] focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/20'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[var(--text-main)] mb-2">
                    Message <span aria-hidden="true" className="text-red-500">*</span>
                    <span className="sr-only">(Required)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell me about your architectural goals or upcoming accessibility requirements..."
                    className={`w-full px-4 py-3 rounded-lg border bg-[var(--surface-color)] text-[var(--text-main)] transition-all resize-y min-h-[120px] ${
                      errors.message
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[var(--border-color)] focus:border-[var(--primary-color)] focus:ring-3 focus:ring-[var(--primary-color)]/20'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{status === 'sending' ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}

            {/* Direct Email Copy fallback */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Direct correspondence:</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 font-mono text-[var(--primary-color)] hover:underline cursor-pointer"
                aria-label={`Copy email address ${directEmail}`}
              >
                {emailCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{directEmail}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
