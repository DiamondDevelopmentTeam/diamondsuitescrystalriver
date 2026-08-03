import { PageHero } from '../components/PageHero'

const policies = [
  { title: 'Respectful Salon Environment', text: 'Please be courteous to professionals, staff, and other guests. Harassment, discrimination, aggressive behavior, theft, or conduct that creates an unsafe environment may result in refusal of service and removal from the premises.' },
  { title: 'Guests, Children, and Service Animals', text: 'Please limit guests and avoid disruptions. Pets are not permitted except trained service animals. Children must be supervised at all times and should not climb, run, or play on salon equipment.' },
  { title: 'Mobile Devices', text: 'Keep devices on silent or vibrate. Please avoid speakerphone and video calls inside the salon. Step outside when a call may disturb other guests.' },
  { title: 'Cancellations and Rescheduling', text: 'Individual professionals may require up to 48 hours notice for appointment changes. Late cancellations and no-shows may be charged according to the provider’s booking policy.' },
  { title: 'Appointment Times', text: 'Contact your provider as soon as possible if you are running late. Late arrival may shorten the service or require rescheduling.' },
  { title: 'Service Concerns', text: 'Contact your independent professional promptly if you are unhappy with a service. Providers may be unable to guarantee results after at-home alterations or work completed by another professional.' },
  { title: 'Health and Well-Being', text: 'Tell your provider about pregnancy, nursing, allergies, medical conditions, or physical limitations relevant to your service. Please reschedule when you have a communicable illness or open wounds.' },
]

export function SalonEtiquette() {
  return (
    <>
      <PageHero eyebrow="Guest Guidelines" title="Salon Etiquette" image="lobby-window" description="A calm, professional environment depends on consideration from everyone who enters." />
      <section className="marble-surface section-space legal-page">
        <div className="container legal-container">
          <p>Diamond Suites Crystal River strives to provide a relaxing, professional, and comfortable experience for every guest. Because the professionals within our suites operate independent businesses, booking and service policies may vary. Please review both these shared-building guidelines and the policies of your individual provider.</p>
          <div className="policy-list">
            {policies.map((policy, index) => (
              <article key={policy.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{policy.title}</h2><p>{policy.text}</p></div></article>
            ))}
          </div>
          <p><strong>Thank you for helping us preserve a peaceful and welcoming environment.</strong></p>
        </div>
      </section>
    </>
  )
}
