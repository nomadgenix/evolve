import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { agentsAPI } from '../api';

const Dashboard: React.FC = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await agentsAPI.getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
        toast.error('Failed to load agents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleAgentClick = (agentId: number) => {
    navigate(`/agents/${agentId}`);
  };

  if (isLoading) {
    return <div className="loading">Loading agents...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Agents</h2>
        <Link to="/agents/create" className="btn btn-primary">
          Create New Agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any agents yet.</p>
          <Link to="/agents/create" className="btn btn-secondary">
            Create Your First Agent
          </Link>
        </div>
      ) : (
        <div className="grid">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="card agent-card"
              onClick={() => handleAgentClick(agent.id)}
            >
              <h3>{agent.name}</h3>
              <p>{agent.description}</p>
              <div className="agent-meta">
                <span className="agent-model">{agent.model}</span>
                <span className="agent-date">
                  Created: {new Date(agent.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
