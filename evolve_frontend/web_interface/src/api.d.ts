declare module './api' {
  export const fetchAgents: () => Promise<any[]>;
  export const createAgent: (agentData: any) => Promise<any>;
  export const runAgent: (agentId: string, input: string) => Promise<any>;
  export const getAgentStatus: (agentId: string) => Promise<{ status: string }>;
  export const getAgentResults: (agentId: string, runId: string) => Promise<{ results: any[] }>;
}
