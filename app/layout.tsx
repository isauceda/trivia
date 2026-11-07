
import type { Metadata } from "next";
import "./globals.css";
import TriviaProvider from "../providers/TriviaProvider";
import Header from "../components/Header";

export const metadata: Metadata = {
    title: "Trivia",
    description: "Juego de preguntas y respuestas"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>
                <TriviaProvider>
                    <Header />
                    {children}
                </TriviaProvider>
            </body>
        </html>
    );
}
