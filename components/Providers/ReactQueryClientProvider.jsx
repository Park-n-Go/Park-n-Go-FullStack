"use client"
import React, {useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const ReactQueryClientProvider = ({ children }) => {

// Create a client
const [queryClient] = useState(()=>new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
       

        <ReactQueryDevtools initialIsOpen={false} />
      {children}
        
      
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
