
"use client";

import { useContext } from "react";
import { TriviaContext } from "../context/TriviaContext";

export default function Header() {

    const { puntaje, preguntasRespondidas } = useContext(TriviaContext);

    return (
        <header className="bg-pink-300 text-gray-800 text-black p-5">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    Trivia: Verdadero o Falso
                </h1>

                <div className="text-right">
                    <p className="font-bold">
                        Puntaje: {puntaje}
                    </p>

                    <p className="text-sm">
                        Respondidas: {preguntasRespondidas}
                    </p>
                </div>
            </div>
        </header>
    );
}
