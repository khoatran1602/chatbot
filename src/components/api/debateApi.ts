import { DebateRequest, DebateResponse, ProviderStatus } from '../types/debate';

/**
 * API configuration - points to the Java backend
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Execute a multi-agent debate via the backend API.
 * Keys are kept server-side - no API keys in frontend!
 */
export async function executeDebate(request: DebateRequest): Promise<DebateResponse> {
  const response = await fetch(`${API_BASE_URL}/api/debate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (response.status === 429) {
    throw new Error('Rate limit exceeded. Please wait before trying again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Check for validation details
    if (errorData.details && Array.isArray(errorData.details)) {
       throw new Error(errorData.details.join(', '));
    }

    throw new Error(errorData.message || errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Get AI provider availability status.
 */
export async function getProviderStatus(): Promise<ProviderStatus> {
  const response = await fetch(`${API_BASE_URL}/api/debate/providers`);
  
  if (!response.ok) {
    throw new Error('Failed to get provider status');
  }
  
  return response.json();
}

/**
 * Health check for the debate service.
 */
export async function checkDebateHealth(): Promise<{ status: string; providers: ProviderStatus }> {
  const response = await fetch(`${API_BASE_URL}/api/debate/health`);
  
  if (!response.ok) {
    throw new Error('Debate service is not available');
  }
  
  return response.json();
}
