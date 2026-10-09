import { useState } from 'react'
import { emailjsConfig, profile } from '../data/content'
import { GitHub, LinkedIn, Mail } from './Icons'
import SectionHeader from './SectionHeader'

const empty = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Loaded on demand so the email SDK never weighs down the first page load.
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        { from_name: form.name, to_name: profile.name, from_email: form.email, message: form.message },
        { publicKey: emailjsConfig.publicKey }
      )
      setStatus('sent')
      setForm(empty)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="card reveal relative overflow-hidden p-6 sm:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent2/15 blur-3xl" aria-hidden="true" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader eyebrow="Contact" title="Let's build something together">
              Have a role, a project or just a question? Send me a message and I'll get back to you.
            </SectionHeader>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <GitHub /> GitHub
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                  <LinkedIn /> LinkedIn
                </a>
              )}
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Name
                <input name="name" required autoComplete="name" value={form.name} onChange={onChange} className="field" placeholder="Your name" />
              </label>
              <label className="text-sm font-medium">
                Email
                <input name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} className="field" placeholder="you@example.com" />
              </label>
            </div>
            <label className="text-sm font-medium">
              Message
              <textarea name="message" required rows={5} value={form.message} onChange={onChange} className="field resize-y" placeholder="What would you like to talk about?" />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                <Mail /> {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p role="status" aria-live="polite" className="text-sm">
                {status === 'sent' && <span className="text-emerald-500">Thanks! Your message is on its way.</span>}
                {status === 'error' && <span className="text-rose-500">Something went wrong. Please try again in a moment.</span>}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
