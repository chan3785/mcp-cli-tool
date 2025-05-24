#!/usr/bin/env node
import process from 'node:process';
import { handleCommand } from '../lib/client.js';

//main entry point
const [, , command, ...args] = process.argv;
if (!command) {
  console.error('Usage: mcp <command> [args]. see more information to use `--help`');
  process.exit(1);
}

if (command == '--help' || command == '-h') {
  console.info(`mcp command line interface tool. 
Usage: mcp <command> [args]\n
Commands:
hello               it returns "hello world!". use to check connection with mcp servers
chat                start chating with Ai agent in chat interface`);
} else {
  if (command == 'chat' && args.includes('--help')) {
    console.info(`chatting with Ai agent on you want to talk 
Usage: mcp chat [options]\n
Options:
      eliza                  start chating with agent eliza`);
  } else {
    handleCommand(command, args);
  }
}
