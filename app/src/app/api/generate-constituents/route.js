import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { district } = await request.json();
    
    if (!district) {
      return NextResponse.json({ error: 'District is required' }, { status: 400 });
    }

    // Check if API key is available
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const prompt = `You are an expert in local government and demographic analysis. Generate exactly 5 realistic constituent agents for ${district}. 

Each agent should represent diverse demographics and viewpoints within the district. For each agent, provide:

1. A realistic full name
2. Age (between 18-75)
3. Occupation (realistic for the area and age)
4. Annual household income (realistic for their occupation and age, between $25,000-$200,000)
5. Key political issues they care about (3 one-sentence bullet points about issues they're passionate about)
6. Political sentiment (exactly one of: Progressive, Conservative, or Moderate)

IMPORTANT: Return ONLY a valid JSON array with this exact structure. Do not include any other text or explanations:

[
  {
    "id": 1,
    "name": "Full Name",
    "age": 25,
    "occupation": "Job Title",
    "district": "${district}",
    "income": 65000,
    "keyIssues": [
      "They are passionate about [specific local issue relevant to their background].",
      "They strongly support [local policy or initiative].",
      "They advocate for [community concern or improvement]."
    ],
    "sentiment": "Progressive"
  }
]

Ensure diversity in age, occupation, income, and political views. Focus on issues relevant to local government like housing, transportation, education, public safety, and community development.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response structure from Anthropic API');
    }

    const content = data.content[0].text;
    console.log('Raw Claude response:', content);
    
    // Try to extract JSON from the response
    let constituents;
    try {
      // First, try to parse the entire response as JSON
      constituents = JSON.parse(content);
    } catch (parseError) {
      // If that fails, try to extract JSON array from the text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from Claude response');
      }
      constituents = JSON.parse(jsonMatch[0]);
    }
    
    // Validate the structure
    if (!Array.isArray(constituents) || constituents.length !== 5) {
      throw new Error('Invalid constituents structure - expected array of 5 items');
    }

    // Validate each constituent
    for (let i = 0; i < constituents.length; i++) {
      const constituent = constituents[i];
      if (!constituent.name || !constituent.age || !constituent.occupation || 
          !constituent.income || !constituent.keyIssues || !Array.isArray(constituent.keyIssues) ||
          !constituent.sentiment) {
        throw new Error(`Invalid constituent structure at index ${i}`);
      }
    }
    
    return NextResponse.json({ constituents });
    
  } catch (error) {
    console.error('Error generating constituents:', error);
    return NextResponse.json(
      { error: `Failed to generate constituents: ${error.message}` }, 
      { status: 500 }
    );
  }
} 