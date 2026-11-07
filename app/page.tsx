
"use client";

import { useState, useEffect, useContext } from "react";
import { TriviaContext } from "../context/TriviaContext";
import { Preguntas } from "../modelos/Preguntas";
import { listaPreguntas } from "../modelos/DatosPreguntas";

export default function Home() {

    const { incrementarPuntaje, incrementarRespondidas } = useContext(TriviaContext);

    const [preguntas, setPreguntas] = useState<Preguntas[]>([]);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [opciones, setOpciones] = useState<boolean[]>([true, false]);
    const [seleccion, setSeleccion] = useState<boolean | null>(null);
    const [respondida, setRespondida] = useState(false);
    const [terminado, setTerminado] = useState(false);

    useEffect(() => {
        setPreguntas(listaPreguntas.slice(0, 5));
    }, []);

    const seleccionarRespuesta = (respuesta: boolean) => {

        if (respondida) return;

        setSeleccion(respuesta);
        setRespondida(true);
        incrementarRespondidas();

        if (respuesta === preguntas[preguntaActual].respuestaCorrecta) {
            incrementarPuntaje(preguntas[preguntaActual].puntajePregunta);
        }
    };

    const siguientePregunta = () => {

        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
            setSeleccion(null);
            setRespondida(false);
            setOpciones([true, false]);
        } else {
            setTerminado(true);
        }
    };

    const reiniciar = () => {
        setPreguntaActual(0);
        setSeleccion(null);
        setRespondida(false);
        setTerminado(false);
        setOpciones([true, false]);
    };

    if (preguntas.length === 0) {
        return <p className="text-center p-10">Cargando preguntas...</p>;
    }

    if (terminado) {
        return (
            <main className="max-w-xl mx-auto p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    ¡Trivia terminada!
                </h2>

                <p className="text-lg mb-6">
                    Has respondido las {preguntas.length} preguntas.
                </p>

                <button
                    onClick={reiniciar}
                    className="bg-black-700 text-white px-6 py-3 rounded-lg"
                >
                    Jugar nuevamente
                </button>
            </main>
        );
    }

    const pregunta = preguntas[preguntaActual];

    return (
        <main className="max-w-2xl mx-auto p-8">

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blank-700">
                    Trivia
                </h2>

                <p className="mt-3 text-gray-600">
                    Pregunta {preguntaActual + 1} de {preguntas.length}
                </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8">

                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                    {pregunta.DescripcionPregunta}
                </h3>

                <div className="flex flex-col gap-4">

                    {opciones.map((opcion, index) => (
                        <button
                            key={index}
                            onClick={() => seleccionarRespuesta(opcion)}
                            disabled={respondida}
                            className="border-2 border-pink-600 rounded-lg p-4 text-pink-700 font-semibold hover:bg-pink-100 disabled:opacity-70"
                        >
                            {opcion ? "Verdadero" : "Falso"}
                        </button>
                    ))}

                </div>

                {respondida && (
                    <div className="mt-6">

                        <p className={`font-bold text-lg ${
                            seleccion === pregunta.respuestaCorrecta
                                ? "text-green-600"
                                : "text-red-600"
                        }`}>
                            {seleccion === pregunta.respuestaCorrecta
                                ? "¡Respuesta correcta!"
                                : "Respuesta incorrecta"}
                        </p>

                        <p className="mt-2 text-gray-600">
                            La respuesta correcta es:{" "}
                            {pregunta.respuestaCorrecta ? "Verdadero" : "Falso"}
                        </p>

                        <button
                            onClick={siguientePregunta}
                            className="mt-6 w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800"
                        >
                            {preguntaActual === preguntas.length - 1
                                ? "Finalizar trivia"
                                : "Siguiente pregunta"}
                        </button>

                    </div>
                )}

            </div>
        </main>
    );
}
