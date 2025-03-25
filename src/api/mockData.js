export const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123' // In a real app, this would be hashed
  }
];

export const tasks = [
  {
    id: 1,
    title: 'Complete Project Documentation',
    description: 'Write and review project documentation for the new feature',
    completed: false,
    userId: 1
  },
  {
    id: 2,
    title: 'Team Meeting',
    description: 'Weekly team sync meeting at 10 AM',
    completed: true,
    userId: 1
  }
];

// Helper function to generate JWT token (mock)
export const generateToken = (user) => {
  return `mock-jwt-token-${user.id}-${Date.now()}`;
};
