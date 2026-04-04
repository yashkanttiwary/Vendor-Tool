export const addAuditLog = (action: string, details: string) => {
  try {
    const stored = window.localStorage.getItem('genie-us-audit-logs');
    const auditLogs = stored ? JSON.parse(stored) : [];
    
    const userRole = window.localStorage.getItem('user_role') ? JSON.parse(window.localStorage.getItem('user_role')!) : 'Requester';
    
    const newLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      action,
      details,
      user: userRole,
      timestamp: new Date().toISOString(),
    };
    
    const updatedLogs = [newLog, ...auditLogs];
    window.localStorage.setItem('genie-us-audit-logs', JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Failed to add audit log', error);
  }
};
