import "regenerator-runtime/runtime";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import { Suspense } from "react";
import App from "./App";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
}
