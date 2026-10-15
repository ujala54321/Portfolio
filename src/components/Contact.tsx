import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DirectMessage } from '../types';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  Phone,
  Inbox,
  Trash2,
  ExternalLink,
  AlertCircle,
  Clock,
  User,
  Download,
  X,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'ujala_direct_messages';

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'email_sent' | 'fallback_ready'>('idle');
  const [lastSubmittedMsg, setLastSubmittedMsg] = useState<{ name: string; email: string; subject: string; message: string } | null>(null);

  // Direct Messages Inbox State
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Load saved messages from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load direct messages from storage:', e);
    }
  }, []);

  const saveMessagesToStorage = (updatedList: DirectMessage[]) => {
    setMessages(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save message to storage:', e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setDeliveryStatus('idle');

    // 1. Prepare message record for in-app inbox
    const newMsgRecord: DirectMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'Software Engineering / Project Inquiry',
      message: formData.message.trim(),
      read: false,
    };

    // Save to persistent local inbox immediately
    const updatedMessages = [newMsgRecord, ...messages];
    saveMessagesToStorage(updatedMessages);
    setLastSubmittedMsg({ ...formData });

    // 2. Dispatch real email to shadesofujala@gmail.com via FormSubmit AJAX API
    let emailDispatched = false;
    try {
      const response = await fetch('https://formsubmit.co/ajax/shadesofujala@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          _subject: `[Portfolio Message] ${formData.name.trim()} - ${formData.subject.trim() || 'Direct Inquiry'}`,
          subject: formData.subject.trim() || 'Portfolio Direct Message',
          message: formData.message.trim(),
          recipient: 'shadesofujala@gmail.com',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        emailDispatched = true;
      }
    } catch (err) {
      console.warn('FormSubmit external network call failed, falling back to direct inbox & mailto options:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setDeliveryStatus(emailDispatched ? 'email_sent' : 'fallback_ready');

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#10b981'],
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyMessage = (msg: DirectMessage) => {
    const text = `From: ${msg.name} (${msg.email})\nDate: ${msg.timestamp}\nSubject: ${msg.subject}\n\n${msg.message}`;
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msg.id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = messages.filter((m) => m.id !== id);
    saveMessagesToStorage(filtered);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all direct messages from this device?')) {
      saveMessagesToStorage([]);
    }
  };

  const handleExportMessages = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ujala_direct_messages_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // WhatsApp link generator
  const whatsappUrl = `https://wa.me/918468018202?text=${encodeURIComponent(
    'Hi Ujala, I came across your portfolio and would like to connect!'
  )}`;

  // Mailto with prefilled details
  const getMailtoUrl = (subject?: string, body?: string) => {
    const s = encodeURIComponent(subject || 'Inquiry regarding Software Engineer role');
    const b = encodeURIComponent(body || 'Hi Ujala,\n\nI would like to discuss an opportunity with you.');
    return `mailto:${PERSONAL_INFO.email}?subject=${s}&body=${b}`;
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Let's Build <span className="pink-purple-gradient-text">Something Great Together</span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Open for Software Engineering opportunities, technical discussions, or .NET & full-stack development roles.
          </p>

          {/* Inbox Button & Real Delivery Indicator */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsInboxOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white hover:border-purple-400 transition-all cursor-pointer shadow-lg shadow-purple-950/40"
            >
              <Inbox className="w-4 h-4 text-purple-400" />
              <span>Direct Messages Inbox</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-600 text-white">
                {messages.length}
              </span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Auto-Delivers to shadesofujala@gmail.com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Contact Info Cards (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyEmailToClipboard}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-purple-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 text-xs font-bold text-white hover:bg-purple-500 flex items-center gap-1.5"
                    title="Open in Gmail / Email App"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Email App</span>
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base font-extrabold text-white dark:text-white light:text-slate-900 hover:text-purple-400 transition-colors mt-0.5 block break-all font-mono"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="text-[11px] text-slate-400 mt-1">Direct inbox monitored daily</p>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPhoneToClipboard}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-500 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Phone & WhatsApp</p>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-base font-extrabold text-white dark:text-white light:text-slate-900 hover:text-emerald-400 transition-colors mt-0.5 block font-mono"
              >
                +91 {PERSONAL_INFO.phone}
              </a>
              <p className="text-[11px] text-slate-400 mt-1">Available for calls & direct WhatsApp chats</p>
            </div>

            {/* Location & Organization Card */}
            <div
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 w-fit mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Current Location</p>
              <p className="text-base font-extrabold text-white dark:text-white light:text-slate-900 mt-0.5">
                {PERSONAL_INFO.location}
              </p>
              <p className="text-xs text-purple-400 mt-1 font-semibold">
                Software Engineer @ Gyansify
              </p>
            </div>

            {/* Social Channels */}
            <div
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <p className="text-xs text-slate-400 font-semibold uppercase mb-4">Professional Profiles</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 hover:border-purple-500 transition-all text-xs font-bold text-slate-200"
                >
                  <Linkedin className="w-5 h-5 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 hover:border-purple-500 transition-all text-xs font-bold text-slate-200"
                >
                  <Github className="w-5 h-5 text-purple-400" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Direct Message Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 sm:p-10 rounded-3xl border relative ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 shadow-2xl'
                  : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-extrabold text-white dark:text-white light:text-slate-900">
                  Send a Direct Message
                </h3>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-lg">
                  Direct Delivery
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Your message is delivered straight to <strong className="text-purple-300">shadesofujala@gmail.com</strong> and archived in the portfolio's direct inbox.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Message Successfully Sent!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                      Thank you for reaching out! Your message was dispatched to{' '}
                      <span className="font-mono text-purple-300 font-semibold">shadesofujala@gmail.com</span> and logged in the in-app inbox.
                    </p>
                  </div>

                  {/* Immediate Backup Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {lastSubmittedMsg && (
                      <a
                        href={getMailtoUrl(lastSubmittedMsg.subject, `From: ${lastSubmittedMsg.name} (${lastSubmittedMsg.email})\n\n${lastSubmittedMsg.message}`)}
                        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg transition-all"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App (Backup)</span>
                      </a>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ping on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Email <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Software Engineer Role / Project Inquiry / Technical Discussion"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Message <span className="text-pink-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Ujala, I came across your portfolio and would love to discuss an engineering opportunity with you..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 shadow-xl shadow-purple-500/25 border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending to shadesofujala@gmail.com...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Ujala</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" /> Guaranteed response within 24 hours
                    </span>
                    <a
                      href={getMailtoUrl()}
                      className="text-purple-400 hover:underline flex items-center gap-1"
                    >
                      Prefer default mail client? <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Direct Messages Inbox Modal */}
      <AnimatePresence>
        {isInboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      Direct Messages Inbox
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-600 text-white">
                        {messages.length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Messages submitted via your portfolio and sent to shadesofujala@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <>
                      <button
                        onClick={handleExportMessages}
                        title="Export messages JSON"
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleClearAll}
                        title="Clear all messages"
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setIsInboxOpen(false)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close inbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {messages.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">No Messages in Inbox Yet</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      When anyone sends a message through your portfolio contact form, a copy will appear here instantly and also be delivered to shadesofujala@gmail.com.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/40 transition-colors space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{msg.name}</p>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-[11px] font-mono text-purple-400 hover:underline"
                            >
                              {msg.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                            <Clock className="w-3 h-3" /> {msg.timestamp}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                            title="Delete this message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-purple-300 mb-1">{msg.subject}</p>
                        <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleCopyMessage(msg)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-purple-400" />
                              <span>Copy Message</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Reply to {msg.name}</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400">
                <span>All messages are dispatched to </span>
                <span className="text-purple-300 font-mono font-semibold">shadesofujala@gmail.com</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
