/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"

import { ApplianceProvider } from './src/context/appliance-context';
import { LoginProvider } from './src/context/login-context';
import { CommandProvider } from "./src/context/command-context";
import { ProgramProvider } from "./src/context/program-context";

export const wrapRootElement = ({ element }) => (
  <LoginProvider>
    <ApplianceProvider>
      <CommandProvider>
        <ProgramProvider>
          {element}
        </ProgramProvider>
      </CommandProvider>
    </ApplianceProvider>
  </LoginProvider>
)
