"use client";

import { useState } from "react";
import BlockchainVisualizer from "@/components/BlockchainVisualizer";
import LLMProcessingAnimation from "@/components/LLMVisualizer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"blockchain" | "llm">(
    "blockchain"
  );

  return (
    <main className="container mx-auto p-4">
      <nav className="mb-8">
        <div className="border-b border-gray-200">
          <ul className="flex -mb-px">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("blockchain")}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  activeTab === "blockchain"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Blockchain Visualizer
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("llm")}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  activeTab === "llm"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                LLM Visualizer
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {activeTab === "blockchain" ? (
        <BlockchainVisualizer />
      ) : (
        <LLMProcessingAnimation />
      )}
    </main>
  );
}
