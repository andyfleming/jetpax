type Task = () => Promise<any>

const tasks: Task[] = []

export function registerShutdownTask(task: () => any) {
    tasks.push(task)
}

export default async function runShutdownTasks() {
    await Promise.all(tasks)
    process.exit(0)
}
