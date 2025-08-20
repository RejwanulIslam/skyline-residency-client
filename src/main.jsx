import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './route/Route'
import AuthProvider from './authcontex/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MakePaymentProvider from './dashboard/memberDashboard/MakePayment'
import ThemContex from './themcontex/ThemContex'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemContex>
          <RouterProvider router={router}></RouterProvider>
          </ThemContex>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
