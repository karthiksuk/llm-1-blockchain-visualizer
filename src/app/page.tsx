"use client";

import { useState } from "react";
import BlockchainVisualizer from "@/components/BlockchainVisualizer";
import LLMProcessingAnimation from "@/components/LLMVisualizer";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"blockchain" | "llm">(
    "blockchain"
  );

  return (
    <main className="container mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-center mb-4">
        <nav className="flex-1">
          <div className="border-b border-gray-200">
            <ul className="flex w-full">
              <li className="flex-1">
                <button
                  onClick={() => setActiveTab("blockchain")}
                  className={`w-full whitespace-nowrap inline-flex justify-center items-center px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === "blockchain"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Blockchain Visualizer
                </button>
              </li>
              <li className="flex-1">
                <button
                  onClick={() => setActiveTab("llm")}
                  className={`w-full whitespace-nowrap inline-flex justify-center items-center px-3 py-2 text-sm font-medium transition-colors ${
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

        <a
          href="https://github.com/karthiksuk/llm-1-blockchain-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 p-2 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="View on GitHub"
        >
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
      </div>

      <div className="w-full overflow-x-auto">
        {activeTab === "blockchain" ? (
          <BlockchainVisualizer />
        ) : (
          <LLMProcessingAnimation />
        )}
      </div>
    </main>
  );
}
