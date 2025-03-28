import axios from 'axios';

const apiCandidates = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_CANDIDATES_URL || 'https://tools.qa.ale.ai/api/tools/candidates',
    validateStatus: (status: number): boolean => {
        return (status >= 200 && status < 300) || status === 400;
    },
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiCandidates;
