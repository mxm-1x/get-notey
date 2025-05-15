"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
// ... existing code ...

function Dashboard() {
    const { user } = useUser();
    // ... existing code ...
    
    // Only query when user email is available
    const fileList = useQuery(
        api.fileStorage.GetUserFiles, 
        user?.primaryEmailAddress?.emailAddress 
            ? { userEmail: user.primaryEmailAddress.emailAddress }
            : "skip" // Skip the query if email is not available
    );

    // ... existing code ...
}

export default Dashboard