const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:8001';
export const fetchAgents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/agents`);
        if (!response.ok)
            throw new Error('Failed to fetch agents');
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching agents:', error);
        return [];
    }
};
export const createAgent = async (agentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/agents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agentData),
        });
        if (!response.ok)
            throw new Error('Failed to create agent');
        return await response.json();
    }
    catch (error) {
        console.error('Error creating agent:', error);
        throw error;
    }
};
export const runAgent = async (agentId, input) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/run`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });
        if (!response.ok)
            throw new Error('Failed to run agent');
        return await response.json();
    }
    catch (error) {
        console.error('Error running agent:', error);
        throw error;
    }
};
export const getAgentStatus = async (agentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/status`);
        if (!response.ok)
            throw new Error('Failed to get agent status');
        return await response.json();
    }
    catch (error) {
        console.error('Error getting agent status:', error);
        return { status: 'unknown' };
    }
};
export const getAgentResults = async (agentId, runId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/runs/${runId}/results`);
        if (!response.ok)
            throw new Error('Failed to get agent results');
        return await response.json();
    }
    catch (error) {
        console.error('Error getting agent results:', error);
        return { results: [] };
    }
};
export const healthCheck = async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok)
        throw new Error('Backend not reachable');
};
export const sendMessage = async (input) => {
    const response = await fetch(`${API_BASE_URL}/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
    });
    if (!response.ok)
        throw new Error('Failed to send message');
    return await response.json();
};
// ✅ All functions bundled here for default import
export default {
    fetchAgents,
    createAgent,
    runAgent,
    getAgentStatus,
    getAgentResults,
    healthCheck,
    sendMessage,
};
