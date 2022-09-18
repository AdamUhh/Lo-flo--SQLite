import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CardProvider } from "./contexts/cardContext";
import { FlashCardProvider } from "./contexts/flashcardContext";
import { SubjectProvider } from "./contexts/subjectContext";
import { UrlProvider } from "./contexts/urlContext";
import { ThemeProvider } from "next-themes";
import { PanelProvider } from "./contexts/panelContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UrlProvider>
        <CardProvider>
          <SubjectProvider>
            <PanelProvider>
              <FlashCardProvider>
                <App />
              </FlashCardProvider>
            </PanelProvider>
          </SubjectProvider>
        </CardProvider>
      </UrlProvider>
    </ThemeProvider>
  </React.StrictMode>
);
