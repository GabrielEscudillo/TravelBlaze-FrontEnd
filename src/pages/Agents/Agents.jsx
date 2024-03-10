import { useEffect, useState } from "react";
import "./Agents.css";
import { bringAllAgents } from "../../Services/apiCalls";

export const Agents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (agents.length === 0) {
      bringAllAgents().then((data) => {
        setAgents(data); 
      });
    }
  }, []);

  return (
    <>
      <h1 className="team-title">Meet the team</h1>
      <div className="agent-container">
        {agents && agents.length > 0 ? (
          agents.map((agent) => {
            return (
              <div key={agent.id} className="agent-card">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="agent-img"
                />
                <div className="agent-info">
                  <p className="agent-name">{agent.name}</p>
                  <p className="agent-name">{agent.specialty}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-agents">No hay agentas para mostrar.</p>
        )}
      </div>
    </>
  );
};
