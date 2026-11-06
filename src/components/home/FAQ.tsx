'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronRight } from '@tabler/icons-react'
import AnimatedQuestionMark from './AnimatedQuestionMark'

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

export default function FAQ() {
  // Allow multiple FAQ items to be open simultaneously (first item open by default)
  const [openIds, setOpenIds] = useState<string[]>(['faq-1'])

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section id="faq" className="relative w-full bg-[#FFFFFF] py-16 sm:py-24 lg:py-32 px-[24px] border-t border-black/5 z-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        
        {/* Left Column: Heading + Organic Green Question Mark (Columns 1 to 4) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 lg:col-start-1 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start justify-between w-full"
        >
          <h2 className="font-display font-medium text-[42px] sm:text-[54px] md:text-[62px] lg:text-[clamp(44px,4.2vw,72px)] xl:text-[84px] leading-[0.98] tracking-[-0.04em] text-[#111827] mb-6 sm:mb-0 lg:mb-8">
            Got a<br />question?
          </h2>

          <AnimatedQuestionMark className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-full self-center sm:self-auto lg:self-start mt-4 sm:mt-0 lg:mt-8" />
        </motion.div>

        {/* Right Column: 7 FAQ Accordions (Columns 6 to 12) */}
        <div className="lg:col-span-7 lg:col-start-6 flex flex-col divide-y divide-black/10 border-t border-b border-black/10 w-full mt-10 lg:mt-0">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIds.includes(item.id)

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
                  className="w-full py-5 sm:py-6 lg:py-7 flex items-center justify-between text-left group focus:outline-none cursor-pointer transition-colors"
                >
                  <span className="font-display font-medium text-[18px] sm:text-[20px] lg:text-[22px] xl:text-[24px] leading-snug tracking-[-0.02em] text-[#111827] group-hover:text-[#0D382A] transition-colors pr-6">
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
                      <p className="font-sans text-[14px] sm:text-[15px] lg:text-[16px] text-gray-600 font-normal leading-relaxed tracking-[-0.01em] pb-5 sm:pb-6 lg:pb-7 max-w-[640px]">
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
