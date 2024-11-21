import { useEffect, useState } from "react";
import { ThreatContext } from "./threath-context";
import { createThreathread } from "../services/gpt";


export const ThreatProvider = ({ children }) => {
  const [threathId, setThreathId] = useState(null);

  const handleCreateThreathread = async () => {
   await createThreathread().then((res) => {
      setThreathId(res.id)
    })
  }

  useEffect(() => {
    handleCreateThreathread()
  }, [])

  return (
    <ThreatContext.Provider value={{ threathId }}>
      {children}
    </ThreatContext.Provider>
  );
}