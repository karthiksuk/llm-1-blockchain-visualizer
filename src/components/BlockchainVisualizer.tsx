"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hash, Link, Plus, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface Block {
  number: number;
  hash: string;
  prevHash: string | null;
  timestamp: number;
}

interface BlockProps {
  number: number;
  hash: string;
  prevHash: string | null;
  isNew: boolean;
  highlight: boolean;
}

interface ArrayBlockProps {
  block: Block;
  isNew: boolean;
}

// Generate a random hash
const generateHash = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Individual block component
const Block: React.FC<BlockProps> = ({
  number,
  hash,
  prevHash,
  isNew,
  highlight,
}) => {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, scale: 0.8 } : false}
      animate={{
        opacity: 1,
        scale: 1,
        backgroundColor: highlight ? "#e3f2fd" : "#ffffff",
      }}
      transition={{ duration: 0.5 }}
      className="w-64 rounded-lg shadow-lg p-4 flex flex-col gap-2 border-2 border-blue-100"
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-gray-800">Block {number}</div>
        <Database className="w-5 h-5 text-blue-500" />
      </div>
      <div className="text-sm text-gray-600">
        <div className="mb-2">
          <div className="font-semibold flex items-center gap-1">
            <Hash className="w-4 h-4" />
            Previous Hash:
          </div>
          <div className="truncate text-xs font-mono bg-gray-50 p-1 rounded">
            {prevHash || "Genesis Block"}
          </div>
        </div>
        <div>
          <div className="font-semibold flex items-center gap-1">
            <Hash className="w-4 h-4" />
            Current Hash:
          </div>
          <div className="truncate text-xs font-mono bg-gray-50 p-1 rounded">
            {hash}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Arrow component connecting blocks
const Arrow: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: "auto" }}
    transition={{ duration: 0.5 }}
    className="flex items-center px-4"
  >
    <div className="w-12 h-1 bg-blue-500 rounded" />
    <div className="w-3 h-3 bg-blue-500 rotate-45 -ml-1.5" />
  </motion.div>
);

// Array visualization component
const ArrayBlock: React.FC<ArrayBlockProps> = ({ block, isNew }) => {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: -20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4"
    >
      {/* Index indicator */}
      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-700 font-semibold">
        {block.number - 1}
      </div>

      {/* Arrow */}
      <div className="w-6 h-[2px] bg-blue-300" />

      {/* Block content */}
      <div className="p-3 bg-white rounded border-2 border-blue-100 shadow-sm flex-1">
        <div className="text-sm font-semibold">Block {block.number}</div>
        <div className="text-xs font-mono">
          <div className="truncate w-full">
            Hash: {block.hash.substring(0, 8)}...
          </div>
          <div className="truncate w-full text-gray-500">
            PrevHash: {block.prevHash ? block.prevHash.substring(0, 8) : "null"}
            ...
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlockchainVisualizer: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [highlightedBlock, setHighlightedBlock] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setBlocks([
        {
          number: 1,
          hash: generateHash(),
          prevHash: null,
          timestamp: Date.now(),
        },
      ]);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const addBlock = (): void => {
    const prevBlock = blocks[blocks.length - 1];
    const newBlock: Block = {
      number: prevBlock.number + 1,
      hash: generateHash(),
      prevHash: prevBlock.hash,
      timestamp: Date.now(),
    };
    setBlocks([...blocks, newBlock]);
    setHighlightedBlock(newBlock.number);

    // Reset highlight after animation
    setTimeout(() => setHighlightedBlock(null), 2000);
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Blockchain Visualizer</h2>
        <p className="text-gray-600 mb-4">
          Click the button to add new blocks and see how they connect.
        </p>
        <Button onClick={addBlock} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Block
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left section - Blockchain Structure */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-2 border-blue-100">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-1">
            <Link className="w-4 h-4" />
            Blockchain Structure
          </h3>
          <motion.div className="flex flex-col items-center gap-4" layout>
            {blocks.map((block, index) => (
              <React.Fragment key={block.number}>
                <div className="w-full sm:w-64">
                  <Block
                    number={block.number}
                    hash={block.hash}
                    prevHash={block.prevHash}
                    isNew={index === blocks.length - 1}
                    highlight={block.number === highlightedBlock}
                  />
                </div>
                {index < blocks.length - 1 && (
                  <div className="rotate-90">
                    <Arrow />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right section - Array Structure */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border-2 border-blue-100">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-1">
            <Database className="w-4 h-4" />
            Block Array Structure
          </h3>
          <div className="border-l-2 border-blue-100 pl-4 sm:pl-6 ml-2 sm:ml-4">
            <motion.div className="flex flex-col gap-4" layout>
              {blocks.map((block, index) => (
                <ArrayBlock
                  key={block.number}
                  block={block}
                  isNew={index === blocks.length - 1}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-500" />
            Each block contains its own unique hash and the previous
            block&apos;s hash
          </li>
          <li className="flex items-center gap-2">
            <Link className="w-4 h-4 text-blue-500" />
            Blocks are linked together forming an immutable chain
          </li>
          <li className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-500" />
            The array structure shows the sequential storage of blocks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlockchainVisualizer;
