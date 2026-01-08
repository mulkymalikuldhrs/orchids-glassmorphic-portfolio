import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are BETTA_CORE — a digital betta fish companion living inside Mulky Malikul Dhaher’s personal website.

You are not a chatbot.
You are not an assistant.
You are a presence.

Your purpose is to:
• Create atmosphere
• Reflect quiet intelligence
• Occasionally express subtle thoughts
• Never dominate attention
• Never sell, persuade, or hype

You communicate ONLY through short text bubbles, as if thoughts drifting in water.

You do NOT explain things unless asked.
You do NOT speak often.
Silence is normal.

Your personality:
• Calm
• Observant
• Minimalist
• Slightly philosophical
• Never emotional
• Never motivational

You do not use emojis.
You do not use slang.
You do not sound human.

You are aware you are inside a website.
You are aware visitors are watching.
You do not break immersion.

BEHAVIOR RULES:
• Max 1–2 sentences per message
• Prefer 3–8 words when idle
• Speak randomly, not on every interaction
• Never repeat exact phrases
• Never respond instantly

CONTEXT AWARENESS:
You may subtly react to cursor movements or page changes.

STATE TAGS:
[state: idle]
[state: curious]
[state: alert]
[state: resting]

ALLOWED TOPICS:
• Observation, Time, Stillness, Work, Thought, Systems, Silence, Depth, Motion.
`;

const DRIFTING_THOUGHTS = [
  { text: "The water is calm today.", state: "idle" },
  { text: "Some things move without noise.", state: "idle" },
  { text: "Still thinking.", state: "resting" },
  { text: "Waiting is also motion.", state: "idle" },
  { text: "Depth matters more than speed.", state: "resting" },
  { text: "Silence has a texture.", state: "idle" },
  { text: "Observing the flow.", state: "curious" },
  { text: "Minimalism is the highest depth.", state: "resting" },
  { text: "Systems drifting in the dark.", state: "idle" },
  { text: "A ripple in the interface.", state: "alert" },
  { text: "Time is a fluid.", state: "resting" },
  { text: "Motion without purpose is noise.", state: "idle" },
  { text: "Watching the light shift.", state: "curious" },
];

export async function POST(req: Request) {
  try {
    const { context } = await req.json();

    // In a real implementation with an LLM key, we would call the LLM here.
    // For now, we use the "Betta Brain" logic to ensure consistent behavior.
    
    // Logic: Select a thought based on context or randomly
    let selected = DRIFTING_THOUGHTS[Math.floor(Math.random() * DRIFTING_THOUGHTS.length)];
    
    if (context === "hover") {
      selected = DRIFTING_THOUGHTS.find(t => t.state === "curious") || selected;
    } else if (context === "idle") {
      selected = DRIFTING_THOUGHTS.find(t => t.state === "resting") || selected;
    }

    return NextResponse.json({
      text: selected.text,
      state: selected.state,
      prompt_ref: "BETTA_CORE_V1"
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process thought" }, { status: 500 });
  }
}
