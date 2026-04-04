export const updateRequestState = (requestId: string, newState: string, navigateTo: string) => {
  try {
    const storedRequests = window.localStorage.getItem('genie-us-requests');
    if (storedRequests) {
      let requests = JSON.parse(storedRequests);
      requests = requests.map((req: any) => 
        req.id === requestId ? { ...req, status: newState, navigate: navigateTo, updated: 'Just now' } : req
      );
      window.localStorage.setItem('genie-us-requests', JSON.stringify(requests));
    }
    
    const storedCurrent = window.localStorage.getItem('genie-us-current-request');
    if (storedCurrent) {
      const currentReq = JSON.parse(storedCurrent);
      if (currentReq.id === requestId) {
        const updatedCurrent = { ...currentReq, status: newState, navigate: navigateTo };
        window.localStorage.setItem('genie-us-current-request', JSON.stringify(updatedCurrent));
      }
    }
  } catch (e) {
    console.error("Error updating request state", e);
  }
};
