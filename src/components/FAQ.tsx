'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronRight } from '@tabler/icons-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does a project take?',
    answer: 'Most projects take 3–6 weeks depending on scope and review speed.',
  },
  {
    id: 'faq-2',
    question: 'What do you need form us to get started?',
    answer: 'We typically need your product overview, key messages, brand guidelines, and any examples you like.',
  },
  {
    id: 'faq-3',
    question: 'Do you use AI in your workflow?',
    answer: 'Yes — for research, scripting assistance, and internal production efficiency. We never use AI to replace custom design or animation.',
  },
  {
    id: 'faq-4',
    question: 'Can you work as a long-term partner?',
    answer: 'Yes. Many clients bring us on as an ongoing video partner, shipping new explainer, demo, and feature videos every quarter.',
  },
  {
    id: 'faq-5',
    question: 'Do you work with US and EU time zones?',
    answer: "Yes. We're based in Vietnam and used to working async with US and EU teams.",
  },
  {
    id: 'faq-6',
    question: "What if we don't have a final script yet?",
    answer: "No problem — scriptwriting is part of our process. We'll refine it together.",
  },
  {
    id: 'faq-7',
    question: 'Can you localize videos for different market? (eg., Vietnam)?',
    answer: 'Yes. We can adapt scripts and voiceovers for multiple languages, including Vietnamese.',
  },
]

// Brush style green question mark matching Figma Node 34:602
function GreenQuestionMark() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] aspect-[3/4] flex items-center justify-center select-none pointer-events-none mt-4 lg:mt-8">
      <svg
        viewBox="0 0 320 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_24px_rgba(32,211,142,0.15)]"
      >
        {/* Brush question hook */}
        <path
          d="M78 128 C78 78, 120 48, 182 48 C244 48, 282 86, 282 144 C282 208, 224 238, 172 268 C154 278, 142 292, 140 318 C140 332, 128 340, 114 340 C100 340, 88 328, 88 312 C90 274, 112 248, 138 232 C184 204, 230 182, 230 142 C230 112, 206 92, 178 92 C138 92, 124 114, 102 128 C92 134, 82 132, 78 128 Z"
          fill="#20D38E"
        />
        {/* Brush dot */}
        <circle cx="114" cy="385" r="26" fill="#20D38E" />
      </svg>
    </div>
  )
}

export default function FAQ() {
  // Allow toggling open items (first item open by default)
  const [openId, setOpenId] = useState<string | null>('faq-1')

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-32 px-[24px] border-t border-black/5 z-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        
        {/* Left Column: Heading + Organic Green Question Mark (Columns 1 to 4/5) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:col-start-1 flex flex-col items-start justify-between"
        >
          <h2 className="font-display font-medium text-[52px] sm:text-[68px] lg:text-[80px] xl:text-[92px] leading-[0.98] tracking-[-0.04em] text-[#111827] mb-6 sm:mb-8">
            Got a<br />question?
          </h2>

          <GreenQuestionMark />
        </motion.div>

        {/* Right Column: 7 FAQ Accordions (Columns 6 to 12) */}
        <div className="lg:col-span-7 lg:col-start-6 flex flex-col divide-y divide-black/10 border-t border-b border-black/10 w-full mt-10 lg:mt-0">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-6 sm:py-7 flex items-center justify-between text-left group focus:outline-none cursor-pointer transition-colors"
                >
                  <span className="font-display font-medium text-[20px] sm:text-[22px] lg:text-[24px] leading-snug tracking-[-0.02em] text-[#111827] group-hover:text-[#0D382A] transition-colors pr-6">
                    {item.question}
                  </span>

                  {/* Arrow Icon with Smooth 90deg Rotation */}
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 group-hover:text-black transition-colors">
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center justify-center"
                    >
                      <IconChevronRight size={20} stroke={2.4} />
                    </motion.div>
                  </div>
                </button>

                {/* Collapsible Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 font-normal leading-relaxed tracking-[-0.01em] pb-6 sm:pb-7 max-w-[620px]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
