/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"

import { ApplianceProvider } from './src/context/applianceContext';
import { LoginProvider } from './src/context/loginContext';
import { CommandProvider } from "./src/context/commandContext";
import { ProgramProvider } from "./src/context/programContext";

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