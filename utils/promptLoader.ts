// promptLoader.ts
import fs from 'fs';
import path from 'path';

const promptFilePath = path.resolve(__dirname, '../../prompt.txt');

export const loadPrompt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(promptFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading prompt file:', err);
        reject('Could not load prompt.');
      } else {
        resolve(data);
      }
    });
  });
};

// Description:
// This file provides a utility function `loadPrompt` that reads the prompt text from `prompt.txt`.
// The prompt file is read asynchronously, and the content is returned as a string.
// This utility allows the prompt to be modified without changing the TypeScript code directly.
// Proper error handling is included to manage issues during file reading.
