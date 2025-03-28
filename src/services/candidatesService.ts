import apiCandidates from './apiCandidates';

export interface ILevelResponse {
    levels: string[];
}

export async function getLevels(): Promise<ILevelResponse> {
    const res = await apiCandidates.get<ILevelResponse>('/levels');
    return res.data;
}

export interface IAssignmentsResponse {
    status: 'success' | 'error';
    errors?: string[];
}

export interface IAssignmentsValues {
    name: string;
    email: string;
    assignment_description: string;
    github_repo_url: string;
    candidate_level: string;
}

export async function submitAssignments(values: IAssignmentsValues): Promise<IAssignmentsResponse> {
    const res = await apiCandidates.post<IAssignmentsResponse>('/assignments', values);
    return res.data;
}
