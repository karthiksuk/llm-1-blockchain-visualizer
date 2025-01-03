import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CircleNodeProps {
  x: number;
  y: number;
  label: string;
  color?: string;
}

const CircleNode: React.FC<CircleNodeProps> = ({ x, y, label, color }) => {
  const words = label.split(" ");
  const lineHeight = 15;

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="40"
        fill={color || "#4a5568"}
        className="transition-colors duration-300"
      />
      {words.map((word, index) => (
        <text
          key={index}
          x={x}
          y={y + (index - (words.length - 1) / 2) * lineHeight}
          fill="white"
          textAnchor="middle"
          fontSize="12"
        >
          {word}
        </text>
      ))}
    </g>
  );
};

interface ConnectionProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  dashed?: boolean;
}

const Connection: React.FC<ConnectionProps> = ({ start, end, dashed }) => (
  <line
    x1={start.x}
    y1={start.y}
    x2={end.x}
    y2={end.y}
    stroke="#718096"
    strokeWidth="2"
    strokeDasharray={dashed ? "5,5" : "none"}
  />
);

const LLMProcessingAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState("");
  const [tokenizeProgress, setTokenizeProgress] = useState(0);
  const [attentionScore, setAttentionScore] = useState(0);
  const controls = useAnimation();

  const positions = [
    { x: 50, y: 150, label: "Input Text" },
    { x: 200, y: 150, label: "Tokenizer" },
    { x: 350, y: 150, label: "Embedding Layer" },
    { x: 500, y: 150, label: "Attention Mechanism" },
    { x: 650, y: 150, label: "Output Text" },
    { x: 350, y: 50, label: "Context Window" },
    { x: 500, y: 250, label: "Knowledge Base" },
  ];

  const runAnimation = async () => {
    setIsPlaying(true);
    setStatus("Starting LLM processing...");
    setTokenizeProgress(0);
    setAttentionScore(0);

    // Input Text to Tokenizer
    setStatus("Tokenizing input text");
    await controls.start({
      x: positions[1].x,
      y: positions[1].y,
      transition: { duration: 1 },
    });

    // Simulate tokenization progress
    for (let i = 0; i <= 100; i += 20) {
      setTokenizeProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Tokenizer to Embedding Layer
    setStatus("Converting tokens to embeddings");
    await controls.start({
      x: positions[2].x,
      y: positions[2].y,
      transition: { duration: 1 },
    });

    // Check Context Window
    setStatus("Checking context window");
    await controls.start({
      x: positions[5].x,
      y: positions[5].y,
      transition: { duration: 0.5 },
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return to Embedding Layer
    await controls.start({
      x: positions[2].x,
      y: positions[2].y,
      transition: { duration: 0.5 },
    });

    // Embedding Layer to Attention Mechanism
    setStatus("Processing attention weights");
    await controls.start({
      x: positions[3].x,
      y: positions[3].y,
      transition: { duration: 1 },
    });

    // Simulate attention score calculation
    for (let i = 0; i <= 100; i += 10) {
      setAttentionScore(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Attention Mechanism to Knowledge Base
    setStatus("Accessing knowledge base");
    await controls.start({
      x: positions[6].x,
      y: positions[6].y,
      transition: { duration: 1 },
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Back to Attention Mechanism
    await controls.start({
      x: positions[3].x,
      y: positions[3].y,
      transition: { duration: 1 },
    });

    // Final processing and output generation
    setStatus("Generating output text");
    await controls.start({
      x: positions[4].x,
      y: positions[4].y,
      transition: { duration: 1 },
    });

    setStatus("Processing complete");
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex space-x-4 mb-4">
        <Button onClick={runAnimation} disabled={isPlaying}>
          <Play className="mr-2 h-4 w-4" /> Play Animation
        </Button>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
      <svg width="700" height="300">
        {/* Main flow connections */}
        <Connection start={positions[0]} end={positions[1]} />
        <Connection start={positions[1]} end={positions[2]} />
        <Connection start={positions[2]} end={positions[3]} />
        <Connection start={positions[3]} end={positions[4]} />

        {/* Additional connections */}
        <Connection start={positions[2]} end={positions[5]} dashed={true} />
        <Connection start={positions[3]} end={positions[6]} dashed={true} />

        {positions.map((pos, index) => (
          <CircleNode
            key={index}
            x={pos.x}
            y={pos.y}
            label={pos.label}
            color={
              pos.label === "Tokenizer" && tokenizeProgress > 0
                ? `rgb(${Math.min(74 + tokenizeProgress, 200)}, 85, 104)`
                : pos.label === "Attention Mechanism" && attentionScore > 0
                ? `rgb(74, ${Math.min(85 + attentionScore, 200)}, 104)`
                : undefined
            }
          />
        ))}

        <motion.circle
          r="10"
          fill="#f56565"
          initial={{ x: positions[0].x, y: positions[0].y }}
          animate={controls}
        />
      </svg>
      <div className="mt-4 text-center">
        <p className="font-bold">Status: {status}</p>
        {tokenizeProgress > 0 && (
          <p>Tokenization Progress: {tokenizeProgress}%</p>
        )}
        {attentionScore > 0 && <p>Attention Score: {attentionScore}%</p>}
      </div>
    </div>
  );
};

export default LLMProcessingAnimation;
