'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { contact, projects } from '@/lib/content';
import { Arrow } from './ui';
export function ContactForm() {
  const [interest, setInterest] = useState('General advisory');
  const [draft, setDraft] = useState<{ whatsapp: string; email: string } | null>(null);
  useEffect(() => { const query = new URLSearchParams(window.location.search); const p = query.get('project'); if (projects.some(x => x.name === p) || p === 'Developer partnership') setInterest(p!); }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Hello BestMark,\nI’m ${data.get('name')}.\nInterested in: ${interest}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\n${data.get('message') || 'I would like to arrange a conversation.'}`;
    setDraft({ whatsapp: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, email: `mailto:${contact.email}?subject=${encodeURIComponent(`BestMark enquiry: ${interest}`)}&body=${encodeURIComponent(text)}` });
  }
  return <form className="enquiry-form" onSubmit={submit} onChange={() => setDraft(null)}><span className="micro">LET’S FIND YOUR NEXT CHAPTER</span><h3>A conversation worth having.</h3><div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Full name" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" title="Enter a phone number with 7 to 20 digits, spaces, or + ( ) -" placeholder="+91" /></label><label className="full">Email <span>(optional)</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={150} /></label><label className="full">I’m interested in<select name="interest" value={interest} onChange={e => setInterest(e.target.value)}>{['General advisory', ...projects.map(p => p.name), 'Developer partnership', 'ORR land opportunities'].map(p => <option key={p}>{p}</option>)}</select></label><label className="full">A little about your plans <span>(optional)</span><textarea name="message" rows={3} maxLength={1500} placeholder="Tell us what you have in mind…" /></label></div><button type="submit" className="button">Prepare my enquiry <Arrow /></button><p className="form-note">Review your message, then send it through WhatsApp or email. Nothing is submitted automatically.</p>{draft && <div className="enquiry-result" role="status"><strong>Your enquiry is ready.</strong><p>Choose how to send it to our team.</p><a href={draft.whatsapp} target="_blank" rel="noopener noreferrer" className="text-link">Continue to WhatsApp <Arrow diagonal /></a><a href={draft.email} className="text-link">Open email draft <Arrow diagonal /></a></div>}</form>;
}
