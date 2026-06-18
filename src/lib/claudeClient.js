function extractFirstJson(text) {
  const start = text.indexOf('{')
  if (start === -1) throw new Error('Response did not contain a JSON object.')
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (escaped) { escaped = false; continue }
    if (ch === '\\' && inString) { escaped = true; continue }
    if (ch === '"') { inString = !inString; continue }
    if (inString) continue
    if (ch === '{') depth++
    if (ch === '}' && --depth === 0) return JSON.parse(text.slice(start, i + 1))
  }
  throw new Error('Malformed JSON in response — no matching closing brace.')
}

export async function getFreightAnalysis(lane) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('Please set a valid VITE_ANTHROPIC_API_KEY in your .env file, then restart the dev server.')
  }

  const today = new Date().toISOString().split('T')[0]

  const response = await fetch('/api/anthropic/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      system: `You are a freight market analyst. Use web search to find current freight rate context. Respond ONLY with a valid JSON object, no preamble or markdown fences: {"summary": string, "key_drivers": string[], "risk_level": "Low"|"Medium"|"High", "outlook": string}`,
      messages: [
        {
          role: 'user',
          content: `Analyse current freight conditions for ${lane}. Today is ${today}.`
        }
      ]
    })
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`API error ${response.status}: ${errText}`)
  }

  const data = await response.json()
  // Concatenate all text blocks — web_search splits the response into many fragments
  const combined = data.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')
  if (!combined) throw new Error('No text response from Claude.')

  return extractFirstJson(combined)
}
