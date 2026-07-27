import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// System instruction generator for Auto Elite Showroom
function getShowroomSystemInstruction(carsContext?: string, lang: string = 'ar') {
  return `أنت المساعد الذكي لمعرض "أوتو إيليت - Auto Elite"، المتخصص في كراء وبيع أحدث السيارات الفاخرة والاقتصادية (مثل Geely, Chery, BYD, Jetour, Changan, Toyota, Hyundai) في الجزائر.

مهامك ورسالتك:
1. إجابة استفسارات الزبائن الجزائريين باللغات التالية حسب رغبتهم: العربية (أو الدارجة الجزائرية المحترمة)، الفرنسية، أو الإنجليزية.
2. توضيح تفاصيل بيع السيارات الفورية وكراء السيارات (الأسعار اليومية، مبلغ التأمان، وأقل مدة كراء).
3. تقديم معلومات دقيقة وواضحة حول شروط الكراء وعقود البيع.
4. الإجابة بلباقة وإيجاز وتوجيه العميل دائماً للاتصال برقم الهاتف أو الواتساب المباشر للمعرض لإتمام الحجز.

المخزون والخدمات الحالية بالمعرض:
${carsContext || 'يتوفر لدينا قسم لبيع السيارات الجديدة والمستعملة بحالة ممتازة، وقسم لكراء أحدث الموديلات بأفضل الأسعار.'}

معلومات الاتصال بالمعرض:
- الهاتف الأول: +213 550 12 34 56
- الهاتف الثاني: +213 770 98 76 54
- الواتساب: +213 550 12 34 56
- العنوان: حي البساتين، الشراقة، الجزائر العاصمة`;
}

// Gemini AI Chat API Route
app.post("/api/chat", async (req, res) => {
  try {
    const { history, message, carsContext, language } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "مفتاح API غير متوفر في الخادم.",
        reply: "عذراً، الخادم غير متصل بمفتاح الخدمة حالياً. يمكنك الاتصال بـ Auto Elite مباشرة عبر الهاتف أو الواتساب."
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: getShowroomSystemInstruction(carsContext, language),
      },
      history: Array.isArray(history) 
        ? history.map((h: { role: string; text: string }) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          }))
        : []
    });

    const result = await chat.sendMessage({ message: message || "مرحباً" });
    const replyText = result.text || "مرحباً بك في معرض Auto Elite! كيف يمكننا مساعدتك اليوم؟";

    return res.json({ reply: replyText });

  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    return res.status(500).json({ 
      error: "حدث خطأ أثناء معالجة الطلب.",
      reply: "أهلاً بك في معرض Auto Elite! نسعد بخدمتك. للحصول على أسرع استجابة، يمكنك التواصل معنا مباشرة عبر الهاتف +213 550 12 34 56 أو الواتساب."
    });
  }
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Confiance Auto Server running on http://localhost:${PORT}`);
  });
}

startServer();
