import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })

  const emailRegex = useMemo(() =>
    // RFC 5322–ish pragmatic regex
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
  , [])

  const validate = () => {
    const next = { name: '', email: '', message: '' }
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!emailRegex.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    setErrors(next)
    return !next.name && !next.email && !next.message
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    if (!validate()) return
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '60b09a58-24b9-4532-a1ce-f08035260fb3'
    const payload = {
      access_key: accessKey,
      name: form.name,
      email: form.email,
      message: form.message,
      subject: `Portfolio contact from ${form.name}`,
      botcheck: '',
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('Thanks! Your message was sent successfully.')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('Sorry, something went wrong. Please try again later.')
      }
    } catch (err) {
      setStatus('Network error. Please try again later.')
    }
  }

  return (
    <section className="flex justify-center anime-gradient rounded-2xl border border-black-300 p-4 sm:p-6">
      <div className="w-full max-w-2xl">
      <h2 className="head-text text-center">Contact</h2>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="contact-container mx-auto"
      >
        {/* Honeypot for spam protection (kept hidden) */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
        <label className="field-label">Name</label>
        <input name="name" value={form.name} onChange={onChange} className="field-input focus-neon mt-2" placeholder="Your name" aria-invalid={!!errors.name} />
        {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name}</p>}
        <label className="field-label mt-4 block">Email</label>
        <input name="email" value={form.email} onChange={onChange} className="field-input focus-neon mt-2" placeholder="you@email.com" aria-invalid={!!errors.email} />
        {errors.email && <p className="text-red-400 mt-1 text-sm">{errors.email}</p>}
        <label className="field-label mt-4 block">Message</label>
        <textarea name="message" rows={5} value={form.message} onChange={onChange} className="field-input focus-neon mt-2" placeholder="Say hello!" aria-invalid={!!errors.message} />
        {errors.message && <p className="text-red-400 mt-1 text-sm">{errors.message}</p>}
        <button type="submit" className="field-btn mt-5" disabled={!form.name.trim() || !form.email.trim() || !form.message.trim()}>
          Send
          <img src="/assets/right-arrow.png" alt="arrow" className="field-btn_arrow" />
        </button>
        {status && <p className="text-green-400 mt-4">{status}</p>}
      </motion.form>
      </div>
    </section>
  )
}

export default Contact


