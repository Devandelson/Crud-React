import { useState } from "react"

export default function Assistant() {
    const [activeAssistant, setActiveAssistant] = useState(false);

    const classActiveAssistant = activeAssistant == true ? 'translate-y-0 opacity-100' : '-translate-y-3.5 opacity-0';
    function handleActiveAssistant() {
        setActiveAssistant((prev) => prev == true ? false : true);
    }

    return (
        <section className="w-full h-full fixed p-4 top-0 left-0 flex flex-col items-end justify-end gap-2.5">

            <iframe src="https://app.thinkstack.ai/bot/index.html?chatbot_id=68dda94d0216a101087dbfe8&type=inline" className={`max-h-[400px] max-w-[400px] bg-white overflow-hidden rounded-lg transition-all ${classActiveAssistant}`} width="100%"
                height="100%"

                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
            </iframe>

            <span className="block bg-white rounded-full p-3 px-4 text-2xl w-max hover:scale-110 transition-transform cursor-pointer active:scale-[0.90]"
                onClick={handleActiveAssistant}
            ><i className="fa-solid fa-comment"></i></span>
        </section>
    )
}