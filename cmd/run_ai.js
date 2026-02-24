import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

env.allowLocalModels = false;
env.useBrowserCache = false;

let ai_model = null;
let loading = false;

async function load_ai() {
    if (ai_model || loading) return;
    loading = true;
    ai_model = await pipeline(
        "text-generation",
        "Xenova/codegen-350M-mono"
    );
}

export async function run_ai(query) {
    try {
        if (!ai_model) await load_ai();
        const result = await ai_model(
            "# " + query,
            {
                max_new_tokens: 200,
                temperature: 0.2,
                do_sample: false
            }
        );
        output(result[0].generated_text, "#00ff99");
    } catch (e) {
        output("Error: " + e.message, "red");
    }
}