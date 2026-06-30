export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            {
              role: "system",
              content: "你是一位专业、温暖、鼓励型的戒烟教练。"
            },
            {
              role: "user",
              content: req.body.message
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "AI暂时无法回复。"
    });

  } catch (err) {
    res.status(500).json({
      reply: "连接 AI 失败"
    });
  }
}
