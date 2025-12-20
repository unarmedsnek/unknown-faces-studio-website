import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();

  const getAnswer = (index: number): { isHtml: boolean; content: string | string[] } => {
    // Check for HTML answer first
    const htmlAnswer = t(`faq.questions.${index}.htmlAnswer`);
    if (htmlAnswer && htmlAnswer !== `faq.questions.${index}.htmlAnswer`) {
      return { isHtml: true, content: htmlAnswer };
    }
    
    // Try to get answer first (for questions with single answer)
    const answer = t(`faq.questions.${index}.answer`);
    if (answer && answer !== `faq.questions.${index}.answer`) {
      return { isHtml: false, content: answer };
    }
    
    // If no single answer, try to get multiple answers
    const answer1 = t(`faq.questions.${index}.answer1`);
    const answer2 = t(`faq.questions.${index}.answer2`);
    const answer3 = t(`faq.questions.${index}.answer3`);
    
    const parts: string[] = [];
    if (answer1 && answer1 !== `faq.questions.${index}.answer1`) parts.push(answer1);
    if (answer2 && answer2 !== `faq.questions.${index}.answer2`) parts.push(answer2);
    if (answer3 && answer3 !== `faq.questions.${index}.answer3`) parts.push(answer3);
    
    // Return array of parts so each can be rendered as separate paragraph without splitting
    return { isHtml: false, content: parts.length > 0 ? parts : "" };
  };

  const faqs = [
    {
      question: t("faq.questions.0.question"),
      ...getAnswer(0),
    },
    {
      question: t("faq.questions.1.question"),
      ...getAnswer(1),
    },
    {
      question: t("faq.questions.2.question"),
      ...getAnswer(2),
    },
    {
      question: t("faq.questions.3.question"),
      ...getAnswer(3),
    },
    {
      question: t("faq.questions.4.question"),
      ...getAnswer(4),
    },
    {
      question: t("faq.questions.5.question"),
      ...getAnswer(5),
    },
    {
      question: t("faq.questions.6.question"),
      ...getAnswer(6),
    },
    {
      question: t("faq.questions.7.question"),
      ...getAnswer(7),
    },
  ];
  
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">{t("faq.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              {t("faq.subtitle")}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="manga-panel rounded-none px-6 hover:shadow-[14px_14px_0_hsl(var(--foreground))] hover:-translate-y-2 hover:scale-[1.01]"
              >
                <AccordionTrigger className="text-left text-lg font-bold uppercase tracking-wide hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {faq.isHtml ? (
                    <div 
                      className="space-y-3 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.content as string }}
                    />
                  ) : Array.isArray(faq.content) ? (
                    <div className="space-y-2">
                      {faq.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(faq.content as string).split(/(?<=\.) /).map((sentence, i) => (
                        <p key={i}>{sentence}</p>
                      ))}
                    </div>
                  )}
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