import { useState, useEffect } from 'react'

type FAQItem = {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'Do you offer steam cleaning, stain removal, or other advanced services?',
    answer: 'Currently, we focus on our core detailing packages (interior cleaning, exterior wash, and full wash). Advanced services like steam cleaning and specialized stain removal are not currently available, but we may offer these services in the future as we expand our capabilities. Please check back or contact us to be notified when new services become available.',
  },
  {
    question: 'How much does mobile car detailing cost?',
    answer: 'Our pricing varies by package and vehicle size. Contact us for a custom quote based on your specific needs. We offer transparent pricing with no hidden fees.',
  },
  {
    question: 'Do I need to be present during the detailing service?',
    answer: 'No, you don\'t need to be present. We can work around your schedule. Just provide access to your vehicle and we\'ll handle everything.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve the entire Piedmont Triad region including Greensboro, Winston-Salem, High Point, and surrounding counties: Guilford, Forsyth, Davidson, Randolph, Stokes, Surry, and Yadkin.',
  },
  {
    question: 'How long does a detail take?',
    answer: 'Service time depends on the package. Interior Package typically takes 1-2 hours, Exterior Package takes 1-2 hours, and Full Wash Package takes 2-3 hours.',
  },
  {
    question: 'What do I need to provide?',
    answer: 'Nothing! We bring all our own water, supplies, and equipment. We just need access to your vehicle at your home or office.',
  },
  {
    question: 'Are you insured?',
    answer: 'Yes, we are fully licensed and insured for your peace of mind. We take our business and your vehicle seriously.',
  },
  {
    question: 'Can you detail my car in the rain?',
    answer: 'We prefer to work in good weather conditions to ensure the best results. If weather is an issue, we\'ll work with you to reschedule.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit cards, and digital payment methods. Payment is due upon completion of service.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Add FAQ schema markup
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }

    // Remove existing FAQ schema if present
    const existingScript = document.querySelector('[data-faq-schema]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add FAQ schema
    const script = document.createElement('script')
    script.setAttribute('data-faq-schema', 'true')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(faqSchema)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.querySelector('[data-faq-schema]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return (
    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Common questions about our mobile car detailing services in the Piedmont Triad.
          </p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300 hover:border-primary-300 hover:shadow-lg"
            >
              <button
                className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg sm:text-base md:text-lg font-bold text-slate-800 pr-4">
                  {faq.question}
                </h3>
                <span className="text-primary-500 text-2xl font-bold flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed text-base sm:text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
