import { useCallback } from "react";

// Css
import "./App.css";
// Component
import CalendarComponent from "./components/Core/Calendar";

function App() {
  const onSelected = useCallback((date) => {
    console.log("date", date);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-start p-5">
      <CalendarComponent onSelected={onSelected} />
    </div>
  );
}

export default App;
