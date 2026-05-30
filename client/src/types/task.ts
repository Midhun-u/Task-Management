export type Task = {
    id: string
    title: string
    project_id: string
    user_id: string
    status: "completed" | "pending"
    createdAt: string
}