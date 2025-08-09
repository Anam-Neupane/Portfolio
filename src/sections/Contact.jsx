import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const formRef = useRef(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            reply_to: form.email,
            message: form.message,
          },
          { publicKey }
        )
        setStatus('Thanks! Your message was sent successfully.')
        setForm({ name: '', email: '', message: '' })
        return
      } catch (err) {
        // continue to fallback
      }
    }

    // Fallback: open mail client
    const params = new URLSearchParams({
      subject: `Portfolio contact from ${form.name}`,
      body: `${form.message}\n\nReply to: ${form.email}`,
    })
    window.location.href = `mailto:anamn0377@gmail.com?${params.toString()}`
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
        <label className="field-label">Name</label>
        <input name="name" value={form.name} onChange={onChange} className="field-input focus-neon mt-2" placeholder="Your name" />
        <label className="field-label mt-4 block">Email</label>
        <input name="email" value={form.email} onChange={onChange} className="field-input focus-neon mt-2" placeholder="you@email.com" />
        <label className="field-label mt-4 block">Message</label>
        <textarea name="message" rows={5} value={form.message} onChange={onChange} className="field-input focus-neon mt-2" placeholder="Say hello!" />
        <button type="submit" className="field-btn mt-5">
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


