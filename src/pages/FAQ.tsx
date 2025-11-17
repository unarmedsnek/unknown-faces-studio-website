import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What equipment do you have in the studio?",
    answer:
      "We have industry-standard recording equipment including high-end microphones, preamps, audio interfaces, and monitoring systems. Our studio is equipped with both analog and digital recording capabilities to suit any production style.",
  },
  {
    question: "Can I bring my own producer or engineer?",
    answer:
      "Absolutely! You're welcome to bring your own producer or engineer. We also have experienced in-house engineers available if you need one.",
  },
  {
    question: "What's included in a session?",
    answer:
      "Each session includes studio time, an engineer, use of all studio equipment and instruments, and basic mixing. Final mastering is available as an add-on service.",
  },
  {
    question: "How do I book a session?",
    answer:
      "You can book a session through our booking page by filling out the form or using our calendar integration. We'll get back to you within 24 hours to confirm your booking.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We require at least 48 hours notice for cancellations. Cancellations made less than 48 hours before your session may be subject to a cancellation fee.",
  },
  {
    question: "Do you offer mixing and mastering services?",
    answer:
      "Yes, we offer both mixing and mastering services. These can be added to your recording session or booked separately for tracks recorded elsewhere.",
  },
  {
    question: "Can I purchase additional studio time?",
    answer:
      "Yes, you can add extra hours to your session. Just select the option when booking or let us know during your session if you need more time.",
  },
  {
    question: "Do you provide instruments?",
    answer:
      "We have a selection of instruments available including drums, guitars, bass, and keyboards. Please inquire about specific instruments when booking.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about booking and recording
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-foreground bg-card px-6"
              >
                <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
}
