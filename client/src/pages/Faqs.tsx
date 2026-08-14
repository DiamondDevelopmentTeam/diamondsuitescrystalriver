import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'

const faqs = [
  { question: 'Where is Diamond Suites Crystal River located?', answer: 'You will find us at 825 N Citrus Ave., Crystal River, FL 34428, conveniently accessible in the heart of Crystal River.' },
  { question: 'What types of professionals are at this location?', answer: 'Our private suites are home to professionals specializing in hair styling, lash and brow services, nails, massage, skincare, wellness, and other treatments.' },
  { question: 'Can I book services directly with Diamond Suites?', answer: 'Each suite is independently operated. Please visit our directory and contact the professional of your choice directly to schedule an appointment.' },
  { question: 'Are any suites available for rent?', answer: 'Availability changes. Please send an inquiry through our contact page and our team will provide current leasing information and tour options.' },
  { question: 'Is parking available?', answer: 'Yes. Complimentary parking is available directly in front of the building.' },
  { question: 'Are appointments required?', answer: 'Appointment policies vary by independent professional. Contact the provider directly before visiting whenever possible.' },
]

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const accordionId = useId()

  return (
    <>
      <PageHero eyebrow="Helpful Information" title="Frequently Asked Questions" image="directory-banner" description="A few quick answers before your visit or leasing inquiry." />
      <section className="marble-surface section-space">
        <div className="container faq-layout">
          <div className="faq-intro" data-reveal>
            <p className="eyebrow">Questions, Meet Answers</p>
            <h2 className="script-heading">Everything you need for a smooth visit</h2>
            <p>Services are provided by independent professionals inside Diamond Suites Crystal River. Booking details, pricing, and individual policies may vary by provider.</p>
            <Link className="button button--dark" to="/contact">Still Have a Question?</Link>
          </div>
          <div className="accordion" data-reveal>
            {faqs.map((faq, index) => {
              const open = index === openIndex
              const questionId = `${accordionId}-question-${index}`
              const answerId = `${accordionId}-answer-${index}`
              return (
                <article className={open ? 'accordion-item accordion-item--open' : 'accordion-item'} key={faq.question}>
                  <button
                    type="button"
                    id={questionId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={answerId}
                  >
                    <span>{faq.question}</span><ChevronDown aria-hidden="true" />
                  </button>
                  <div
                    className="accordion-answer"
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    aria-hidden={!open}
                  >
                    <div><p>{faq.answer}</p></div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
