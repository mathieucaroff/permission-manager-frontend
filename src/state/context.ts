import * as React from 'react'
import { createApiClient } from '../apiClient/apiClient'

export let ApiClientContext = React.createContext(createApiClient())
