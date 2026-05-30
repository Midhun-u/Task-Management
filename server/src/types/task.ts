export type TaskBody = {
    title: string
    description: string
    projectId: string
}

export type TaskType = {
    title: string
    user_id: string
    id: string
    project_id: string
    createdAt: string
    updatedAt: string
    status: "pending" | "completed"
}